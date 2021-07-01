const router = require('express').Router()
const { userAuth } = require('../Middlewares/userAuth')
const { checkRole } = require('../Middlewares/checkRole')

// Seeker Protected routes
router.get('/protected-seeker', userAuth, checkRole(['seeker']), async(req, res) => {
   res.status(200).send('Yeah, I am Seeker Dashboard')
})

// Recruiter Protected routes
router.get('/protected-seeker', userAuth, checkRole(['recruiter']), async(req, res) => {
   res.status(200).send('Yeah, I am Recruiter Dashboard')
})

// Admin Protected routes
router.get('/protected-admin', userAuth, checkRole(['admin']), async(req, res) => {
   res.status(200).send('Yeah, I am Admin Dashboard')
})

module.exports = router