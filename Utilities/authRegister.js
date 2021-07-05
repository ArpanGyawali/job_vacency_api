const User = require('../Models/User')
const gravatar = require('gravatar')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { SECRET } = require('../Config')

// Function to register the users (SEEKER, RECRUITER, ADMIN)

const userRegister = async(userCreds, role, res) => {
   try {
      const { username, password, email } = userCreds 
      //validate the username
      let usernameNotTaken = await validateUsername(username);
      if (!usernameNotTaken) {
         return res.status(400).json({
            message: [{ msg: 'Username is already taken' }],
            success: false
         })
      }
      // Validate the email
      let emailNotTaken = await validateEmail(email);
      if (!emailNotTaken) {
         return res.status(400).json({
            message: [{ msg: 'Email is already registered' }],
            success: false
         })
      }

      const avatar = gravatar.url(email, {
         s: '150',
         r: 'pg',
         d: 'mm',
         protocol: "https"
      })

      // Get the hashed password
      const hashPassword = await bcrypt.hash(password, 10)

      // Create a new User
      const newUser = new User({
         ...userCreds,
         password: hashPassword,
         avatar,
         role
      })
      await newUser.save()

      const payload = {
         user_id: newUser._id,
         username: newUser.username,
         email: newUser.email,
      }

      jwt.sign( 
      payload,
      SECRET, 
      { expiresIn:  86400 },
      (err, token) => {
         if (err) throw err
         return res.status(200).json({
            token,
            message: `You are registered and now logged in`,
            success: true
         })
      })
   } catch (err) {
      // Check for validation error
      return res.status(500).json({
         message: `Server Error ${err}`,
         success: false
      })
   }
}

const validateUsername = async username => {
   let user = await User.findOne({ username });
   return user ? false : true
}

const validateEmail = async email => {
   let user = await User.findOne({ email });
   return user ? false : true
}

module.exports = { userRegister }