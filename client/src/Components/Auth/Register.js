import React, { Fragment, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { setAlert } from '../../Actions/alert';
import { register } from '../../Actions/auth';
import PropTypes from 'prop-types';

//import axios from 'axios'

const Register = (props) => {
	const role = props.location.role;
	const { setAlert, register, isAuthenticated } = props;
	const [formData, setFormData] = useState({
		name: '',
		username: '',
		email: '',
		password: '',
		confirmPassword: '',
	});
	const [isPassword, togglePass] = useState(false);
	const [isPasswordConfirm, togglePassConf] = useState(false);

	const { name, email, username, password, confirmPassword } = formData;

	const handleChange = (ele) =>
		setFormData({
			...formData,
			[ele.target.name]: ele.target.value,
		});

	const handleSubmit = async (ele) => {
		ele.preventDefault();
		if (password !== confirmPassword) {
			setAlert('Passwords do not match', 'danger');
		} else {
			register({ name, username, email, password, role }); //role also passed here
		}
	};

	//Redirext if authenticated
	if (isAuthenticated) {
		if (role === 'seeker') {
			return <Redirect to='/createSeekerProfile' />;
		} else {
			return <Redirect to='/createRecruiterProfile' />;
		}
	}

	return (
		<Fragment>
			<h1 className='large text-primary'>Register as {role}</h1>
			<p className='lead'>
				<i className='fas fa-user'></i> Create Your Account
			</p>
			<form className='form' onSubmit={(ele) => handleSubmit(ele)}>
				<div className='form-group'>
					<input
						type='text'
						placeholder='Full Name'
						name='name'
						value={name}
						onChange={(ele) => handleChange(ele)}
					/>
				</div>
				<div className='form-group'>
					<input
						type='text'
						placeholder='Unique Username'
						name='username'
						value={username}
						onChange={(ele) => handleChange(ele)}
					/>
				</div>
				<div className='form-group'>
					<input
						type='email'
						placeholder='Email Address'
						name='email'
						value={email}
						onChange={(ele) => handleChange(ele)}
					/>
					<small className='form-text'>
						If you have an organization or university email, we recommend you to
						use that email. (Your email should be valid)
					</small>
				</div>
				<div className='form-group pass'>
					<input
						type={isPassword ? 'text' : 'password'}
						placeholder='Password'
						name='password'
						value={password}
						onChange={(ele) => handleChange(ele)}
					/>
					<i
						className={`fa ${isPassword ? 'fa-eye-slash' : 'fa-eye'}`}
						onClick={() => togglePass(!isPassword)}
					/>
				</div>
				<div className='form-group pass'>
					<input
						type={isPasswordConfirm ? 'text' : 'password'}
						placeholder='Confirm Password'
						name='confirmPassword'
						value={confirmPassword}
						onChange={(ele) => handleChange(ele)}
					/>
					<i
						className={`fa ${isPasswordConfirm ? 'fa-eye-slash' : 'fa-eye'}`}
						onClick={() => togglePassConf(!isPasswordConfirm)}
					/>
				</div>
				<input type='submit' className='btn btn-primary' value='Register' />
			</form>
			<p className='my-1'>
				Already have an account?
				<Link
					to={{
						pathname: '/login',
						role: role,
					}}
				>
					Log in
				</Link>
			</p>
		</Fragment>
	);
};

Register.propTypes = {
	//actions to props
	setAlert: PropTypes.func.isRequired,
	register: PropTypes.func.isRequired,
	isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
	isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { setAlert, register })(Register);
