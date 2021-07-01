const router = require('express').Router()
const { userAuth } = require('../Middlewares/userAuth')
const { serializeUser } = require('../Middlewares/passport')
const { checkRole } = require('../Middlewares/checkRole')

// Seeker profile Routes
router.get('/profile-seeker&recruiter', userAuth,  checkRole(['seeker', 'recruiter', 'admin']), (req, res) => {
   if (req.user.role === 'admin'){
      return res.status(401).json({
         message: "Cannot view admin profile",
         success: false
      })
   }
   res.json(serializeUser(req.user))
})

// Admin profile Routes
router.get('/profile-admin', userAuth,  checkRole(['admin']), (req, res) => {
   return res.json(serializeUser(req.user))
})

module.exports = router