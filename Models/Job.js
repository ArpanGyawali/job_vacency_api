const { Schema, model } = require('mongoose')

const jobSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },  
  company: {
    type: 'String'
  },
  avatar: {
    type: 'String'
  },
  title: {
    type: String,
    required: true
  },
  catagory: {
    type: String,
    required: true
  }, 
  level: {
    type: String,
    required: true
  }, 
  vacancyNo: {
    type: Number,
    default: 1
  },
  forPulchowk: {
    type: Boolean,
    default: false
  },
  deadline: {
    type: Date,
    default: Date.now
  }, 
  type: {
    type: String,
  },
  educationReq: {
    type: String,
  },
  salary: {
    type: String,
    default: 'Negotiable'
  },
  location: {
    type: String,
    required: true
  },
  skillsAndQualifications: {    //seperated by \n
    type: [String]
  },
  description: {
    type: String
  },
  appliers: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
      },
      accept: {
        type: Boolean,
        default: false
      },
      resume: {

      },
      name: {
        type: String
      },
      avatar: {
        type: String
      },
      applied: {
        type: Date,
        default: Date.now
      }
    }
  ],
  appliersNo: {
    type: Number,
    default: 0
  },
  posted: {
    type: Date,
    default: Date.now
  }
})

const Job = model('jobs', jobSchema)

module.exports = Job
