const router = require('express').Router()
// Bring Utilities function
const { userRegister } = require('../Utilities/authRegister')

// Seeker registration
router.post('/register-seeker', async (req, res) => {
   await userRegister(req.body, 'seeker', res)
})

// Recruiter registration
router.post('/register-recruiter', async (req, res) => {
   await userRegister(req.body, 'recruiter', res)
})

// Admin Registration
router.post('/register-admin', async (req, res) => {
   await userRegister(req.body, 'admin', res)
})

module.exports = router