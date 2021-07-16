const { Schema, model } = require('mongoose');

const jobSchema = new Schema({
	user: {
		//role => admin
		type: Schema.Types.ObjectId,
		ref: 'users',
	},
	company: {
		type: 'String',
	},
	avatar: {
		type: 'String',
	},
	title: {
		type: String,
		required: true,
	},
	catagory: {
		type: String,
		required: true,
	},
	level: {
		type: String,
		required: true,
	},
	vacancyNo: {
		type: Number,
		default: 1,
	},
	forPulchowk: {
		type: Boolean,
		default: false,
	},
	deadline: {
		type: Date,
		default: Date.now,
	},
	type: {
		type: String,
	},
	salary: {
		type: String,
		default: 'Negotiable',
	},
	hrEmail: {
		type: String,
	},
	location: {
		type: String,
		required: true,
	},
	skillsAndQualifications: {
		//seperated by \n
		type: [String],
	},
	description: {
		type: String,
	},
	appliers: [
		{
			user: {
				type: Schema.Types.ObjectId,
				ref: 'users',
			},
			resume: {
				type: String,
				required: true,
			},
			name: {
				type: String,
			},
			avatar: {
				type: String,
			},
			applied: {
				type: Date,
				default: Date.now,
			},
		},
	],
	posted: {
		type: Date,
		default: Date.now,
	},
});

const Job = model('jobs', jobSchema);

module.exports = Job;
