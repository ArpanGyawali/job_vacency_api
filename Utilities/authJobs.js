const Job = require('../Models/Job');
const mongoose = require('mongoose');
const { RecruiterProfile } = require('../Models/Profile');
const User = require('../Models/User');
const Company = require('../Models/AdminCompany');
// const User = require('../Models/User');

const addJob = async (req, res) => {
	const {
		company,
		title,
		catagory,
		level,
		vacancyNo,
		hrEmail,
		deadline,
		type,
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
		//const user_id = await User.findOne({ name: company });
		jobFields.company = company;
		jobFields.user = req.user._id;
		// jobFields.avatar = user_id.avatar;
	}
	if (title) jobFields.title = title;
	if (catagory) jobFields.catagory = catagory;
	if (level) jobFields.level = level;
	if (vacancyNo) jobFields.vacancyNo = vacancyNo;
	if (deadline) jobFields.deadline = deadline;
	if (type) jobFields.type = type;
	if (hrEmail) jobFields.hrEmail = hrEmail;
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
		const adminCompany = await Company.findOne({ name: company });
		const job = new Job(jobFields);
		await job.save();
		if (job && req.user.role === 'admin') {
			if (adminCompany) {
				adminCompany.noOfJobs += 1;
				await adminCompany.save();
			} else {
				const newCompany = new Company({ name: company, noOfJobs: 1 });
				await newCompany.save();
			}
		}

		if (job) {
			await RecruiterProfile.findOneAndUpdate(
				{ user: req.user.id },
				{ $inc: { noOfJobs: 1 } }
			);
		}
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
		if (req.body.sortBy === 'vacancyNo') {
			jobs = await Job.find()
				.sort({ vacancyNo: -1 })
				.populate('user', ['role']);
		} else {
			jobs = await Job.find({ vacancyNo: { $gt: 0 } })
				.sort({ posted: -1 })
				.populate('user', ['role']);
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
		const job = await Job.findById(req.params.jobId).populate('user', ['role']);
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
		const jobs = await Job.find({ user: req.params.userId })
			.sort({
				vacancyNo: -1,
			})
			.populate('user', ['role']);
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

const viewAppliedJobs = async (req, res) => {
	try {
		const jobs = await Job.find({
			'appliers.user': req.params.userId,
		}).populate('user', ['role']);
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
		if (job.user.toString() !== req.user._id.toString()) {
			return res.status(401).json({
				message: `You cannot delete the job`,
				success: false,
			});
		}
		await job.remove();
		if (job) {
			await RecruiterProfile.findOneAndUpdate(
				{ user: req.user.id },
				{ $inc: { noOfJobs: -1 } }
			);
		}

		// Updating the count
		if (req.user.role === 'admin') {
			const adminCompany = await Company.findOne({ name: job.company });
			if (adminCompany) {
				adminCompany.noOfJobs -= 1;
				await adminCompany.save();
			}
		}

		return res.status(200).json({
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

// Apply for a job
const applyJob = async (req, res) => {
	try {
		const user = await User.findById(req.user.id).select('-password');
		const job = await Job.findById(req.params.jobId);
		const newApply = {
			user: req.user.id,
			name: user.name,
			avatar: user.avatar,
			resume: req.body.resume,
		};
		if (!job) {
			return res.status(404).json({
				message: `Job not found`,
				success: false,
			});
		}
		// Check if the post is already applied
		if (
			job.appliers.filter(
				(applier) => applier.user.toString() === req.user.id.toString()
			).length > 0
		) {
			return res.status(400).json({
				message: 'Job already applied',
				success: false,
			});
		}
		job.appliers.unshift(newApply);
		await job.save();
		res.json(job.appliers);
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

// Apply for a job
const applyFile = async (req, res, file) => {
	try {
		const user = await User.findById(req.user.id).select('-password');
		const job = await Job.findById(req.params.jobId);
		const newApply = {
			user: req.user.id,
			name: user.name,
			avatar: user.avatar,
			file: file.id,
			filename: file.originalname,
		};
		if (!job) {
			return res.status(404).json({
				message: `Job not found`,
				success: false,
			});
		}
		// Check if the post is already applied
		if (
			job.appliers.filter(
				(applier) => applier.user.toString() === req.user.id.toString()
			).length > 0
		) {
			return res.status(400).json({
				message: 'Job already applied',
				success: false,
			});
		}
		job.appliers.unshift(newApply);
		await job.save();
		res.json(job.appliers);
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

const countJobs = async (req, res) => {
	try {
		const companies = await Company.find().sort({ noOfJobs: -1 });
		if (companies.length > 0) {
			return res.json(companies);
		} else {
			return res.status(404).json({
				message: `No Companies Found`,
				success: false,
			});
		}
	} catch (err) {
		if (err.kind === 'ObjectId') {
			return res.status(404).json({
				message: `No Companies Found`,
				success: false,
			});
		}
		return res.status(500).json({
			message: `Server error ${err}`,
			success: false,
		});
	}
};

const deleteFile = async (req, res, gfs) => {
	try {
		await Job.findOneAndUpdate(
			{ _id: req.params.jobId },
			{ $pull: { appliers: { file: req.params.fileId } } }
		);
		//res.redirect(`/api/jobs/view-jobs`);
		await gfs.delete(
			new mongoose.Types.ObjectId(req.params.fileId),
			async (err, data) => {
				if (err)
					return res.status(404).json({
						message: err.msg,
						success: false,
					});
			}
		);
		res.status(200).json(req.params.fileId);
	} catch (err) {
		return res.status(500).json({
			message: `Server error ${err}`,
			success: false,
		});
	}
};

const findFileId = async (req, res) => {
	try {
		const job = await Job.findById(req.params.jobId);
		const filteredApplier =
			job &&
			job.appliers.filter(
				(applier) => applier.user.toString() === req.params.userId.toString()
			);
		if (filteredApplier && filteredApplier.length > 0) {
			const fileData = {
				id: new mongoose.Types.ObjectId(filteredApplier[0].file),
				name: filteredApplier[0].filename,
			};
			res.json(fileData);
		} else {
			res.status(404).json({
				message: 'No file found',
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

// View Appliers
// const viewAppliers = async(req, res) => {
// 	try {
// 		const job = await Job.findById(req.params.jobId);
// 		if(job.appliers.length() === 0){
// 			return res.status(404).json({
// 				message: `No appliers`,
// 				success: false,
// 			});
// 		}
// 		return res.json(job.appliers)
// 	}
// }

module.exports = {
	addJob,
	viewJobs,
	viewJobById,
	deleteById,
	applyJob,
	viewJobByUserId,
	viewAppliedJobs,
	countJobs,
	applyFile,
	deleteFile,
	findFileId,
};
