const passport = require('passport');

// Passport Middleware
const userAuth = passport.authenticate('jwt', { session: false });

module.exports = {
	userAuth,
};
