const checkRole = (roles) => (req, res, next) => {
	if (!roles.includes(req.user.role)) {
		return res.status(401).json({
			message: 'Unauthorized',
			success: false,
		});
	}

	next();
};

module.exports = {
	checkRole,
};
