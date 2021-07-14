const router = require('express').Router();
const { check, validationResult } = require('express-validator');
const { userAuth } = require('../Middlewares/userAuth');
const { checkRole } = require('../Middlewares/checkRole');
const {
	addJob,
	viewJobs,
	viewJobById,
	deleteById,
	applyJob,
	viewJobByUserId,
	viewAppliedJobs,
} = require('../Utilities/authJobs');

const validationJobArr = [
	check('location', 'Loaction is required').not().isEmpty(),
	check('title', 'Enter the job title').not().isEmpty(),
	check('catagory', 'Enter the job catagory').not().isEmpty(),
	check('level', 'Enter the job level').not().isEmpty(),
];

const validationApplyArr = [
	check('resume', 'Please provide a resume').not().isEmpty(),
];

// Create a job posting
router.post(
	'/post-job',
	userAuth,
	checkRole(['admin', 'recruiter']),
	validationJobArr,
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({
				message: errors.array(),
				success: false,
			});
		} else {
			await addJob(req, res);
		}
	}
);

router.get('/view-jobs', userAuth, async (req, res) => {
	await viewJobs(req, res);
});

router.get('/view-job/:jobId', userAuth, async (req, res) => {
	await viewJobById(req, res);
});

router.get('/view-jobs/:userId', userAuth, async (req, res) => {
	await viewJobByUserId(req, res);
});

router.delete(
	'/delete-job/:jobId',
	userAuth,
	checkRole(['admin', 'recruiter']),
	async (req, res) => {
		await deleteById(req, res);
	}
);

// Apply for job with some id
router.post(
	'/apply-job/:jobId',
	userAuth,
	checkRole(['seeker']),
	validationApplyArr,
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({
				message: errors.array(),
				success: false,
			});
		} else {
			await applyJob(req, res);
		}
	}
);

router.get('/applied-jobs/:userId', userAuth, async (req, res) => {
	await viewAppliedJobs(req, res);
});

router.delete(
	'/delete-job/:jobId',
	userAuth,
	checkRole(['admin', 'recruiter']),
	async (req, res) => {
		await deleteById(req, res);
	}
);

// // View appliers on a job
// router.get(
// 	'/view-appliers/:jobId',
// 	userAuth,
// 	checkRole(['recruiter']),
// 	async (req, res) => {
// 		await viewAppliers(req, res);
// 	}
// );

module.exports = router;
