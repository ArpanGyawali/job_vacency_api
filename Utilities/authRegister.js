const User = require('../Models/User')
const bcrypt = require('bcrypt')

// Function to register the users (SEEKER, RECRUITER, ADMIN)

const userRegister = async(userCreds, role, res) => {
   try {
      const { username, name, password, email } = userCreds 
      //validate the username
      let usernameNotTaken = await validateUsername(username);
      if (!usernameNotTaken) {
         return res.status(400).json({
            message: `Username is already taken.`,
            success: false
         })
      }
      // Validate the email
      let emailNotTaken = await validateEmail(email);
      if (!emailNotTaken) {
         return res.status(400).json({
            message: `Email is already registered.`,
            success: false
         })
      }
      // Validate password
      if (password.length < 8) {
         return res.status(400).json({
            message: `Password must at least be 8 characters long.`,
            success: false
         })
      }
      // Get the hashed password
      const hashPassword = await bcrypt.hash(userCreds.password, 10)

      // Create a new User
      const newUser = new User({
         ...userCreds,
         password: hashPassword,
         role
      })
      await newUser.save()

      return res.status(201).json({
         message: `You are successfully registered as ${ role }. Please login.`,
         success: true
      })
   } catch (err) {
      // Check for validation error
      if (err.name === "ValidationError"){
         const {email, username, name} = err.errors
         if(email){
            return res.status(500).json({
               message: email.message,
               success: false
            })
         }else if(username){
            return res.status(500).json({
               message: username.message,
               success: false
            })
         }
         else if(name){
            return res.status(500).json({
               message: name.message,
               success: false
            })
         }
      }
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