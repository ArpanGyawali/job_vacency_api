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
} = require('../Utilities/authJobs');

const validationJobArr = [
	check('location', 'Loaction is required').not().isEmpty(),
	check('title', 'Enter the job title').not().isEmpty(),
	check('catagory', 'Enter the job catagory').not().isEmpty(),
	check('level', 'Enter the job level').not().isEmpty(),
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

router.get('/view-job', userAuth, async (req, res) => {
	await viewJobs(req, res);
});

router.get('/view-job/:jobId', userAuth, async (req, res) => {
	await viewJobById(req, res);
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
	'/apply/:jobId',
	userAuth,
	checkRole(['seeker']),
	async (req, res) => {
		await applyJob(req, res);
	}
);

module.exports = router;
