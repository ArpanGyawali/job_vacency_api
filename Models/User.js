const { Schema, model } = require('mongoose')
const validator = require('validator');

const userSchema = new Schema({
   name: {
      type: String,
      required: [true, 'Full name field is empty.'],
   },
   email: {
      type: String,
      required: [true, 'Email address field is empty.'],
      validate: [validator.isEmail, 'Enter a valid email address.']
   },
   username: {
      type: String,
      required: [true, 'Username field is empty.'],
      validate: [validator.isAlphanumeric, 'Usernames may only have letters and numbers.']
   },
   role: {
      type: String,
      default: "seeker",
      enum: ["seeker", "recruiter", "admin"]
   },
   password: {
      type: String,
      required: [true, 'Password field is empty.'],
      minLength: [8, 'Password should be at least 8 characters'],
   }
}, { timestamps: true })

const User = model('User', userSchema)

module.exports = User
