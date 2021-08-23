import React, { Fragment, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { login } from '../../Actions/auth';
import PropTypes from 'prop-types';
//import axios from 'axios'

const AdminLogin = (props) => {
	const { login, isAuthenticated } = props;
	const [formData, setFormData] = useState({
		username: '',
		password: '',
	});

	const { username, password } = formData;
	const [isPassword, togglePass] = useState(0);

	const handleChange = (ele) =>
		setFormData({
			...formData,
			[ele.target.name]: ele.target.value,
		});

	const role = 'admin';

	const handleSubmit = async (ele) => {
		ele.preventDefault();
		login({ username, password, role });
	};

	// Redirect if logged in
	if (isAuthenticated) {
		return <Redirect to='/admin-dash' />;
	}

	return (
		<Fragment>
			<h1 className='large text-primary'>Sign In as Admin</h1>
			<p className='lead'>
				<i className='fas fa-user'></i> Provide Correct Credentials
			</p>
			<form className='form' onSubmit={(ele) => handleSubmit(ele)}>
				<div className='form-group'>
					<input
						type='text'
						placeholder='Unique Username'
						name='username'
						value={username}
						onChange={(ele) => handleChange(ele)}
					/>
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
				<input type='submit' className='btn btn-primary' value='Login' />
			</form>
		</Fragment>
	);
};

AdminLogin.propTypes = {
	login: PropTypes.func.isRequired,
	isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
	isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { login })(AdminLogin);
