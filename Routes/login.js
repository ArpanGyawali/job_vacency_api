const router = require('express').Router()
// Bring Utilities function
const { userLogin } = require('../Utilities/authLogin')

// Seeker login
router.post('/login-seeker', async (req, res) => {
   await userLogin(req.body, 'seeker', res)
})

// Recruiter login
router.post('/login-recruiter', async (req, res) => {
   await userLogin(req.body, 'recruiter', res)
})

// Admin login
router.post('/login-admin', async (req, res) => {
   await userLogin(req.body, 'admin', res)
})

module.exports = router