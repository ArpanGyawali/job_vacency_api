import React, { Fragment, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { login } from '../../Actions/auth';
import PropTypes from 'prop-types';
//import axios from 'axios'

const Login = (props) => {
	const role = props.location.role;
	const { login, isAuthenticated } = props;
	const [formData, setFormData] = useState({
		username: '',
		password: '',
	});

	const { username, password } = formData;

	const handleChange = (ele) =>
		setFormData({
			...formData,
			[ele.target.name]: ele.target.value,
		});

	const handleSubmit = async (ele) => {
		ele.preventDefault();
		login({ username, password, role });
	};

	// Redirect if logged in
	if (isAuthenticated) {
		return <Redirect to='/jobs' />; //dashboard
	}

	return (
		<Fragment>
			<h1 className='large text-primary'>Sign In as {role}</h1>
			<p className='lead'>
				<i className='fas fa-user'></i> Create Your Account
			</p>
			<form className='form' onSubmit={(ele) => handleSubmit(ele)}>
				<div className='form-group'>
					<input
						type='text'
						placeholder='Unique Username'
						name='username'
						value={username}
						onChange={(ele) => handleChange(ele)}
						required
					/>
				</div>
				<div className='form-group'>
					<input
						type='password'
						placeholder='Password'
						name='password'
						minLength='7'
						value={password}
						onChange={(ele) => handleChange(ele)}
					/>
				</div>
				<input type='submit' className='btn btn-primary' value='Login' />
			</form>
			<p className='my-1'>
				Don't have an account?
				<Link
					to={{
						pathname: '/register',
						role: role,
					}}
				>
					Register
				</Link>
			</p>
		</Fragment>
	);
};

Login.propTypes = {
	login: PropTypes.func.isRequired,
	isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
	isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { login })(Login);
