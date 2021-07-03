const { Schema, model } = require('mongoose')

const userSchema = new Schema({
   name: {
      type: String,
      required: true,
   },
   email: {
      type: String,
      required: true,
   },
   username: {
      type: String,
      required: true,
   },
   avatar: {
      type: String
   },
   role: {
      type: String,
      default: "seeker",
      enum: ["seeker", "recruiter", "admin"]
   },
   password: {
      type: String,
      required: true,
   }
}, { timestamps: true })

const User = model('users', userSchema)

module.exports = User
