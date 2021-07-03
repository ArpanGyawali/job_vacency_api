const router = require('express').Router()
const { check, validationResult } = require('express-validator')
const { userAuth } = require('../Middlewares/userAuth')
const { checkRole } = require('../Middlewares/checkRole')
const { addJob, viewJobs, viewJobById } = require('../Utilities/authJobs')


const validationJobArr = [
  check('location', 'Loaction is required').not().isEmpty(),
  check('title', 'Enter the job title').not().isEmpty(),
  check('catagory', 'Enter the job catagory').not().isEmpty(),
  check('level', 'Enter the job level').not().isEmpty(),
]

// Create a job posting
router.post('/post-job', userAuth, checkRole(['admin','recruiter']), validationJobArr, async (req,res) => {
  const errors = validationResult(req)
  if(!errors.isEmpty()){
    return res.status(400).json({
      message: errors.array(),
      success: false
    })
  } else{
    await addJob(req, res)
  }
})

router.get('/view-job', userAuth, async (req, res) => {
  viewJobs(req, res)
})

router.get('/view-job/:jobId', userAuth, async (req, res) => {
  viewJobById(req, res)
})

module.exports = router