const router = require('express').Router();
const { check, validationResult } = require('express-validator');
// Bring Utilities function
const { userLogin } = require('../Utilities/authLogin');

const validationArr = [
	check('username', 'Username is required').not().isEmpty(),
	check('password', 'Password is required').not().isEmpty(),
];

// Seeker login
router.post('/login-seeker', validationArr, async (req, res) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({
			message: errors.array(),
			success: false,
		});
	} else {
		await userLogin(req.body, 'seeker', res);
	}
});

// Recruiter login
router.post('/login-recruiter', validationArr, async (req, res) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({
			message: errors.array(),
			success: false,
		});
	} else {
		await userLogin(req.body, 'recruiter', res);
	}
});

// Admin login
router.post('/login-admin', validationArr, async (req, res) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({
			message: errors.array(),
			success: false,
		});
	} else {
		await userLogin(req.body, 'admin', res);
	}
});

module.exports = router;
