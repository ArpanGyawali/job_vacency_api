const router = require('express').Router()
const { userAuth } = require('../Middlewares/userAuth')
const { checkRole } = require('../Middlewares/checkRole')
const { serializeUser } = require('../Middlewares/passport')

// Seeker Protected routes
router.get('/protected-seeker', userAuth, checkRole(['seeker']), (req, res) => {
   res.status(200).json(serializeUser(req.user))
})

// Recruiter Protected routes
router.get('/protected-seeker', userAuth, checkRole(['recruiter']), (req, res) => {
   res.status(200).json(serializeUser(req.user))
})

// Admin Protected routes
router.get('/protected-admin', userAuth, checkRole(['admin']), (req, res) => {
   res.status(200).json(serializeUser(req.user))
})

module.exports = router