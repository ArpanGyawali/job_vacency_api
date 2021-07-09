const Job = require('../Models/Job');
const User = require('../Models/User');

const addJob = async (req, res) => {
	const {
		company,
		title,
		catagory,
		level,
		vacancyNo,
		deadline,
		type,
		educationReq,
		salary,
		location,
		skillsAndQualifications,
		description,
	} = req.body;

	// BUild profile object
	const jobFields = {};
	if (req.user.role === 'recruiter') {
		jobFields.user = req.user._id;
		jobFields.company = req.user.name;
		jobFields.avatar = req.user.avatar;
	} else {
		const user_id = await User.findOne({ name: company });
		jobFields.company = company;
		jobFields.forPulchowk = true;
		jobFields.user = user_id;
		jobFields.avatar = user_id.avatar;
	}
	if (title) jobFields.title = title;
	if (catagory) jobFields.catagory = catagory;
	if (level) jobFields.level = level;
	if (vacancyNo) jobFields.vacancyNo = vacancyNo;
	if (deadline) jobFields.deadline = deadline;
	if (educationReq) jobFields.educationReq = educationReq;
	if (type) jobFields.type = type;
	if (salary) jobFields.salary = salary;
	if (location) jobFields.location = location;
	if (description) jobFields.description = description;
	if (skillsAndQualifications) {
		jobFields.skillsAndQualifications = skillsAndQualifications.split('\n');
	}
	try {
		// let job = await Job.findOne({ user: jobFields.user } )

		// // Updating Job
		// if(job) {
		//   job = await Job.findOneAndUpdate(
		//     {company: jobFields.company},
		//     {$set: jobFields},
		//     {new: true}
		//   )
		//   return res.status(200).json(job)
		// }
		// Adding new Job
		const job = new Job(jobFields);
		await job.save();
		return res.status(200).json(job);
	} catch (err) {
		return res.status(500).json({
			message: `Server error ${err}`,
			success: false,
		});
	}
};

const viewJobs = async (req, res) => {
	try {
		let jobs;
		if (req.body.sortBy === 'date') {
			jobs = await Job.find({ vacancyNo: { $gt: 0 } }).sort({ date: -1 });
		} else if (req.body.sortBy === 'popularity') {
			jobs = await Job.find({ vacancyNo: { $gt: 0 } }).sort({ appliersNo: -1 });
		} else if (req.body.sortBy === 'vacancyNo') {
			jobs = await Job.find().sort({ vacancyNo: -1 });
		}
		if (jobs.length > 0) {
			return res.json(jobs);
		} else {
			return res.status(404).json({
				message: `No Jobs Found`,
				success: false,
			});
		}
	} catch (err) {
		return res.status(500).json({
			message: `Server error ${err}`,
			success: false,
		});
	}
};

const viewJobById = async (req, res) => {
	try {
		const job = await Job.findById(req.params.jobId);
		if (!job) {
			return res.status(404).json({
				message: `Job not found`,
				success: false,
			});
		}
		return res.json(job);
	} catch (err) {
		if (err.kind === 'ObjectId') {
			return res.status(404).json({
				message: `Job not found`,
				success: false,
			});
		}
		return res.status(500).json({
			message: `Server error ${err}`,
			success: false,
		});
	}
};

const viewJobByUserId = async (req, res) => {
	try {
		const jobs = await Job.find({ user: req.params.userId }).sort({
			vacancyNo: -1,
		});
		if (jobs.length > 0) {
			return res.json(jobs);
		} else {
			return res.status(404).json({
				message: `No Jobs Found`,
				success: false,
			});
		}
	} catch (err) {
		if (err.kind === 'ObjectId') {
			return res.status(404).json({
				message: `No Jobs Found`,
				success: false,
			});
		}
		return res.status(500).json({
			message: `Server error ${err}`,
			success: false,
		});
	}
};

const deleteById = async (req, res) => {
	try {
		const job = await Job.findById(req.params.jobId);
		if (!job) {
			return res.status(404).json({
				message: `Job not found`,
				success: false,
			});
		}
		// Check User
		if (job.user.toString() !== req.user._id && req.user.role !== 'admin') {
			return res.status(401).json({
				message: `You cannot delete the job`,
				success: false,
			});
		}
		await job.remove();
		return res.status(401).json({
			message: `Job deleated`,
			success: true,
		});
	} catch (err) {
		if (err.kind === 'ObjectId') {
			return res.status(404).json({
				message: `Job not found`,
				success: false,
			});
		}
		return res.status(500).json({
			message: `Server error ${err}`,
			success: false,
		});
	}
};

const applyJob = async (req, res) => {
	try {
		const job = await Job.findById(req.params.jobId);
		if (!job) {
			return res.status(404).json({
				message: `Job not found`,
				success: false,
			});
		}
	} catch (err) {
		if (err.kind === 'ObjectId') {
			return res.status(404).json({
				message: `Job not found`,
				success: false,
			});
		}
		return res.status(500).json({
			message: `Server error ${err}`,
			success: false,
		});
	}
};

module.exports = {
	addJob,
	viewJobs,
	viewJobById,
	deleteById,
	applyJob,
	viewJobByUserId,
};
