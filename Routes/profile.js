const router = require('express').Router();
const { userAuth } = require('../Middlewares/userAuth');
const { checkRole } = require('../Middlewares/checkRole');
const { check, validationResult } = require('express-validator');
const {
	userMyProfile,
	userProfileUpdate,
	getRecruiterById,
	getSeekerById,
	deleteRecruiter,
	deleteSeeker,
} = require('../Utilities/authProfile');
const { RecruiterProfile } = require('../Models/Profile');

// Seeker profile Routes
// router.get('/profile-seeker&recruiter', userAuth,  checkRole(['seeker', 'recruiter', 'admin']), (req, res) => {
//    if (req.user.role === 'admin'){
//       return res.status(401).json({
//          message: "Cannot view admin profile",
//          success: false
//       })
//    }
//    res.json(serializeUser(req.user))
// })

const validationSeekerArr = [
	check('location', 'Loaction is required').not().isEmpty(),
	check('currentStatus', 'Your current status is required').not().isEmpty(),
	check('workEmail', 'Email is required').not().isEmpty(),
	check('workEmail', 'Enter a valid email address').isEmail(),
	check('contactNo', 'Your contact number is required').not().isEmpty(),
];

const validationRecruiterArr = [
	check('location', 'Loaction is required').not().isEmpty(),
	check('contactNo', 'Your contact number is required').not().isEmpty(),
	check('workEmail', 'Email is required').not().isEmpty(),
	check('workEmail', 'Enter a valid email address').isEmail(),
];

// Seeker Own Profile Route
router.get('/myProfile', userAuth, async (req, res) => {
	await userMyProfile(req.user, res);
});

// Seeker Profile Update
router.post(
	'/profile-seeker',
	userAuth,
	checkRole(['seeker']),
	validationSeekerArr,
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({
				message: errors.array(),
				success: false,
			});
		} else {
			await userProfileUpdate(req, 'seeker', res);
		}
	}
);

// Recruiter Profile Update
router.post(
	'/profile-recruiter',
	validationRecruiterArr,
	userAuth,
	checkRole(['recruiter']),
	validationRecruiterArr,
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({
				message: errors.array(),
				success: false,
			});
		} else {
			await userProfileUpdate(req, 'recruiter', res);
		}
	}
);

// Get all the companies profile
router.get('/recruiters', async (req, res) => {
	try {
		const recruiters = await RecruiterProfile.find()
			.populate('user', ['name', 'avatar'])
			.sort({ noOfJobs: -1 });
		res.json(recruiters);
	} catch (err) {
		return res.status(500).json({
			message: `Server error ${err}`,
			success: false,
		});
	}
});

// Get recruitrers profile by id
router.get('/recruiter/:user_id', userAuth, async (req, res) => {
	getRecruiterById(req, res);
});

// Get seekers profile by id
router.get('/seeker/:user_id', userAuth, async (req, res) => {
	getSeekerById(req, res);
});

// Deletes the Recruiters,their profiles and their jobs posted
router.delete(
	'/delete-recruiter',
	userAuth,
	checkRole(['recruiter']),
	async (req, res) => {
		deleteRecruiter(req, res);
	}
);

// Deletes the Seekers and their profiles
router.delete(
	'/delete-seeker',
	userAuth,
	checkRole(['seeker']),
	async (req, res) => {
		deleteSeeker(req, res);
	}
);

module.exports = router;
