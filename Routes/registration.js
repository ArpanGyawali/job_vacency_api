const router = require('express').Router();
const { check, validationResult } = require('express-validator');
// Bring Utilities function
const { userRegister } = require('../Utilities/authRegister');

const validationArr = [
	check('name', 'Name is required').not().isEmpty(),
	check('username', 'Username is required').not().isEmpty(),
	check(
		'username',
		'Must contain only letters, numbers and an optional underscore in between and must start with a letter'
	).matches(/^[a-z][a-z\d]*_?[a-z\d]+$/i),
	check('email', 'Email is required').not().isEmpty(),
	check('email', 'Enter a valid email address').isEmail(),
	check('password', 'Password must at least be 7 characters long').isLength({
		min: 7,
	}),
];

// Seeker registration
router.post('/register-seeker', validationArr, async (req, res) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({
			message: errors.array(),
			success: false,
		});
	} else {
		await userRegister(req.body, 'seeker', res);
	}
});

// Recruiter registration
router.post('/register-recruiter', validationArr, async (req, res) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({
			message: errors.array(),
			success: false,
		});
	} else {
		await userRegister(req.body, 'recruiter', res);
	}
});

// Admin Registration
router.post('/register-admin', validationArr, async (req, res) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({
			message: errors.array(),
			success: false,
		});
	} else {
		await userRegister(req.body, 'admin', res);
	}
});

module.exports = router;
