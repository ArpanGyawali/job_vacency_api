const User = require('../Models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { SECRET } = require('../Config')


// Function to login the users (SEEKER, RECRUITER, ADMIN)

const userLogin = async(userCreds, role, res) => {
   try {
      const { username, password } = userCreds
      // Firse, Check wheatheer the username is in database
      const user = await User.findOne( {username} )
      if (!user) {
         return res.status(404).json({
            message: `Username not found. Invalid login credentials`,
            success: false
         })
      }
      // Then, Check the role
      if (user.role !== role){
         return res.status(403).json({
            message: `You are logging in from wrong portal`,
            success: false
         })
      }
      // Now user is valid. Lets compare the password
      let isMatch = await bcrypt.compare(password, user.password)
      if (!isMatch){
         return res.status(404).json({
            message: `Incorrect password. Invalid login credentials`,
            success: false
         })
      } 
      // Password Matches. Lets generate a token
      let token = jwt.sign( { //user payload
         user_id: user._id,
         role: user.role,
         username: user.username,
         email: user.email   
      },
      SECRET, 
      { expiresIn:  "5 days" })

      let data = {
         role: user.role,
         username: user.username,
         email: user.email , 
         token: `Bearer ${ token }`,
         expiresIn: 120
      }  

      return res.status(200).json({
         ...data,
         message: `You are now logged in`,
         success: true
      })
   } catch(err) {
      return res.status(400).json({
         message: `Unable to log in \n${ err }`,
         success: false
      })
   }
}
//       // Validate the email
//       let emailNotTaken = await validateEmail(userCreds.email);
//       if (!emailNotTaken) {
//          return res.status(400).json({
//             message: `Email is already registered.`,
//             success: false
//          });
//       }

//       // Get the hashed password
//       const password = await bcrypt.hash(userCreds.password, 10)

//       // Create a new User
//       const newUser = new User({
//          ...userCreds,
//          password,
//          role
//       })
//       await newUser.save()

//       return res.status(201).json({
//          message: "You are successfully registred. Please login.",
//          success: true
//       })
//    } catch (err) {
//       // Check for validation error
//       if (err.name === "ValidationError"){
//          const {email, username} = error.errors
//          if(email){
//             return res.status(500).json({
//                message: email.message,
//                success: false
//             })
//          }else if(username){
//             return res.status(500).json({
//                message: username.message,
//                success: false
//             })
//          }
//       }
//    }
// }

// const validateUsername = async username => {
//    let user = User.findOne({ username });
//    return user ? false : true
// }

// const validateEmail = async email => {
//    let user = User.findOne({ email });
//    return user ? false : true
// }

module.exports = {
   userLogin
}