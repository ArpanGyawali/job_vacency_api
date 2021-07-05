const router = require('express').Router()
const { userAuth } = require('../Middlewares/userAuth')
const User = require('../Models/User')

// For authorization and sending user object
///api/auth

router.get('/', userAuth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password')
    res.json(user)
  } catch(err) {
    return res.status(500).json({
      message: `Server Error ${err}`,
      success: false
    })
  }
})

module.exports = router