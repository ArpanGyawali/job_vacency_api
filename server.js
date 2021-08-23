// Import all packages
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const { success, error } = require('consola');
const passport = require('passport');
const methodOverride = require('method-override');

const { DB } = require('./Config');
const { jwtPassport } = require('./Middlewares/passport');

// Initialize the application
const app = express();

const PORT = process.env.PORT || 8000;
// Packages middlewares
app.use(cors());
app.use(express.json());
app.use(passport.initialize());
app.use(methodOverride('_method'));
// User Defined Middlewares
jwtPassport(passport);

// Router middleware
app.use('/api/users', require('./Routes/registration'));
app.use('/api/users', require('./Routes/login'));
app.use('/api/profiles', require('./Routes/profile'));
app.use('/api/jobs', require('./Routes/jobPosts'));
app.use('/api/auth', require('./Routes/auth'));

const connectandStart = async () => {
	try {
		// Connection with the database
		await mongoose.connect(DB, {
			useFindAndModify: false,
			useUnifiedTopology: true,
			useNewUrlParser: true,
			useCreateIndex: true,
		});

		success({
			message: 'Successfully connected with the MongoDB atlas',
			badge: true,
		});
		// Listening to the port
		app.listen(PORT, () =>
			success({
				message: `Server listening to port ${PORT}`,
				badge: true,
			})
		);
	} catch (err) {
		error({
			message: `Unable to connect to MongoDB atlas \n${err}`,
			badge: true,
		});
		connectandStart();
	}
};

connectandStart();
