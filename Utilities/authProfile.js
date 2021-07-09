const { SeekerProfile, RecruiterProfile } = require('../Models/Profile');
const User = require('../Models/User');
const Job = require('../Models/Job');

const userMyProfile = async (user, res) => {
	try {
		let profile;
		if (user.role === 'seeker') {
			profile = await SeekerProfile.findOne({ user: user._id }).populate(
				'user',
				['name', 'username', 'avatar', 'role']
			);
		} else if (user.role === 'recruiter') {
			profile = await RecruiterProfile.findOne({ user: user._id }).populate(
				'user',
				['name', 'username', 'avatar', 'role']
			);
		}
		if (!profile) {
			return res.status(400).json({
				message: `You don't have a profile`,
				success: false,
			});
		}
		res.status(200).json(profile);
	} catch (err) {
		return res.status(500).json({
			message: `Server error ${err}`,
			success: false,
		});
	}
};

// Common code for updating
const updateUser = async (req, res, database, profileFields) => {
	try {
		let profile = await database.findOne({ user: req.user._id });

		// Existing profile and need to update
		if (profile) {
			profile = await database.findOneAndUpdate(
				{ user: req.user.id },
				{ $set: profileFields },
				{ new: true }
			);
			return res.status(200).json(profile);
		}

		// Adding new Profile
		profile = new database(profileFields);
		await profile.save();
		return res.status(200).json(profile);
	} catch (err) {
		return res.status(500).json({
			message: `Server error ${err}`,
			success: false,
		});
	}
};
// Create or update user profile
const userProfileUpdate = async (req, role, res) => {
	const {
		location,
		jobInterests,
		workEmail,
		isPulchowk,
		currentStatus,
		currentJob,
		desc,
		facebook,
		twitter,
		linkedin,
		github,
		instagram,
		website,
		portfolio,
		contactNo,
	} = req.body;

	// BUild profile object
	const profileFields = {};
	profileFields.user = req.user._id;
	if (location) profileFields.location = location;
	if (portfolio) profileFields.portfolio = portfolio;
	if (workEmail) profileFields.workEmail = workEmail;
	profileFields.isPulchowk = isPulchowk;
	if (currentStatus) profileFields.currentStatus = currentStatus;
	if (currentJob) profileFields.currentJob = currentJob;
	if (desc) profileFields.desc = desc;
	if (website) profileFields.website = website;
	if (contactNo) profileFields.contactNo = contactNo;

	if (jobInterests) {
		profileFields.jobInterests = jobInterests
			.split(',')
			.map((interest) => interest.trim());
	}

	// Build social object
	profileFields.social = {};
	if (facebook) profileFields.social.facebook = facebook;
	if (linkedin) profileFields.social.linkedin = linkedin;
	if (github) profileFields.social.github = github;
	if (twitter) profileFields.social.twitter = twitter;
	if (instagram) profileFields.social.instagram = instagram;

	if (role === 'seeker') {
		updateUser(req, res, SeekerProfile, profileFields);
	} else if (role === 'recruiter') {
		updateUser(req, res, RecruiterProfile, profileFields);
	}
};

// Common code for getting by id
const getById = async (req, res, database) => {
	try {
		const profile = await database
			.findOne({ user: req.params.user_id })
			.populate('user', ['name', 'avatar', 'username']);
		if (!profile) {
			return res.status(400).json({
				message: `Profile Not found`,
				success: false,
			});
		}
		return res.json(profile);
	} catch (err) {
		if (err.kind === 'ObjectId') {
			return res.status(400).json({
				message: `Profile Not found`,
				success: false,
			});
		}
		return res.status(500).json({
			message: `Server error ${err}`,
			success: false,
		});
	}
};

const getRecruiterById = async (req, res) => {
	getById(req, res, RecruiterProfile);
};

const getSeekerById = async (req, res) => {
	getById(req, res, SeekerProfile);
};

const deleteRecruiter = async (req, res) => {
	try {
		// Delete all Jobs of the user
		await Job.deleteMany({ user: req.user._id });
		// Delete Profile
		await RecruiterProfile.findOneAndRemove({ user: req.user._id });
		// Delete Recruiter
		await User.findOneAndRemove({ _id: req.user._id });
		return res.status(200).json({
			message: `User Deleated`,
			success: true,
		});
	} catch (err) {
		return res.status(500).json({
			message: `Server error ${err}`,
			success: false,
		});
	}
};

const deleteSeeker = async (req, res) => {
	try {
		// Delete Profile
		await SeekerProfile.findOneAndRemove({ user: req.user._id });
		// Delete Seeker
		await User.findOneAndRemove({ _id: req.user._id });
		return res.status(200).json({
			message: `User Deleated`,
			success: true,
		});
	} catch (err) {
		return res.status(500).json({
			message: `Server error ${err}`,
			success: false,
		});
	}
};

module.exports = {
	userMyProfile,
	userProfileUpdate,
	getSeekerById,
	getRecruiterById,
	deleteRecruiter,
	deleteSeeker,
};
