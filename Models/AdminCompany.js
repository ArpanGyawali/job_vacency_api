const { Schema, model } = require('mongoose');

const companySchema = new Schema({
	name: {
		type: String,
	},
	noOfJobs: {
		type: Number,
		default: 0,
	},
});

const Company = model('companies', companySchema);

module.exports = Company;
