const router = require('express').Router()
const { userAuth } = require('../Middlewares/userAuth')
const { checkRole } = require('../Middlewares/checkRole')
const { check, validationResult } = require('express-validator')
const { userMyProfile, userProfileUpdate, getRecruiterById, getSeekerById, deleteRecruiter, deleteSeeker } = require('../Utilities/authProfile')
const { SeekerProfile, RecruiterProfile } = require('../Models/Profile')


// Seeker profile Routes
// router.get('/profile-seeker&recruiter', userAuth,  checkRole(['seeker', 'recruiter', 'admin']), (req, res) => {
//    if (req.user.role === 'admin'){
//       return res.status(401).json({
//          message: "Cannot view admin profile",
//          success: false
//       })
//    }
//    res.json(serializeUser(req.user))
// })

const validationSeekerArr = [
   check('location', 'Loaction is required').not().isEmpty(),
   check('isPulchowk', 'Pulchowk Student or not??').not().isEmpty(),
   check('currentStatus', 'Your current status is required').not().isEmpty(),
   check('workEmail', 'Email is required').not().isEmpty(),
   check('workEmail', 'Enter a valid email address').isEmail(),
]

const validationRecruiterArr = [
   check('location', 'Loaction is required').not().isEmpty(),
   check('contactNo', 'Your contact number is required').not().isEmpty(),
   check('workEmail', 'Email is required').not().isEmpty(),
   check('workEmail', 'Enter a valid email address').isEmail(),
]

// Seeker Own Profile Route
router.get('/profile-seekerMe', userAuth, checkRole(['seeker','admin']), async(req, res) => {
   await userMyProfile(req.user, 'seeker', res)
})

// Recruiter Own Profile Route
router.get('/profile-recruiterMe', userAuth, checkRole(['recruiter','admin']), async(req, res) => {
   await userMyProfile(req.user, 'recruiter', res)
})

// Seeker Profile Update
router.post('/profile-seeker', validationSeekerArr, userAuth, checkRole(['seeker']), async (req, res) => {
   const errors = validationResult(req)
   if(!errors.isEmpty()) {
      return res.status(400).json({
         message: errors.array(),
         success: false
      })
   } else{
   await userProfileUpdate(req, 'seeker', res)
   }
})

// Recruiter Profile Update
router.post('/profile-recruiter', validationRecruiterArr, userAuth, checkRole(['recruiter']), async (req, res) => {
   const errors = validationResult(req)
   if(!errors.isEmpty()) {
      return res.status(400).json({
         message: errors.array(),
         success: false
      })
   } else{
   await userProfileUpdate(req, 'recruiter', res)
   }
})

// Get all the companies profile
router.get('/recruiters', async (req, res) => {
   try {
      const recruiters = await RecruiterProfile.find().sort({noOfJobs: 1}).populate('users', ['name', 'avatar']) 
      res.json(recruiters)
   } catch(err) {
      return res.status(500).json({
         message: `Server error ${err}`,
         success: false
      })
   }
})

// Get all the recruitrers profile
router.get('/recruiter/:user_id', userAuth, async (req, res) => {
   getRecruiterById(req, res)
})

// Get all the seekers profile
router.get('/seeker/:user_id', userAuth, async (req, res) => {
   getSeekerById(req, res)
})

// Deletes the Recruiters,their profiles and their jobs posted
router.delete('/delete-recruiter', userAuth, checkRole(['recruiter']), async (req, res) => {
   deleteRecruiter(req, res)
})

// Deletes the Seekers and their profiles 
router.delete('/delete-seeker', userAuth, checkRole(['seeker']), async (req, res) => {
   deleteSeeker(req, res)
})

module.exports = router