import React, { useState, Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { createUpdate } from '../../Actions/profile';
import { connect } from 'react-redux';
import { setAlert } from '../../Actions/alert';

const CreateRecruiterProfile = (props) => {
	const { setAlert, createUpdate, history } = props;
	const {
		auth: { user, isAuthenticated },
	} = props;
	const email = isAuthenticated && user.email;
	const [recruiterProfileData, setRecruiterProfileData] = useState({
		location: '',
		website: '',
		contactNo: '',
		workEmail: email,
		desc: '',
		facebook: '',
		twitter: '',
		linkedin: '',
		instagram: '',
	});

	const [displaySocial, toggleSocial] = useState(false);

	const {
		location,
		website,
		contactNo,
		workEmail,
		desc,
		facebook,
		linkedin,
		twitter,
		instagram,
	} = recruiterProfileData;

	const handleChange = (ele) =>
		setRecruiterProfileData({
			...recruiterProfileData,
			[ele.target.name]: ele.target.value,
		});

	const handleSubmit = (ele) => {
		ele.preventDefault();
		createUpdate(recruiterProfileData, history, 'recruiter');
		setAlert('Profile Created', 'success');
	};

	return (
		<Fragment>
			<h1 className='large text-primary'>Create Your Profile</h1>
			<p className='lead'>
				<i className='fas fa-user'></i> Let's get some information
			</p>
			<small>
				<strong>* = required field</strong>
			</small>
			<form className='form' onSubmit={(ele) => handleSubmit(ele)}>
				<div className='form-group'>
					<input
						type='text'
						placeholder='* Current Location'
						name='location'
						value={location}
						onChange={(ele) => handleChange(ele)}
					/>
					<small className='form-text'>
						City & state suggested (eg. Dhumbarahi, Kathmandu)
					</small>
				</div>
				<div className='form-group'>
					<input
						type='text'
						placeholder='* Contact Number'
						name='contactNo'
						value={contactNo}
						onChange={(ele) => handleChange(ele)}
					/>
					<small className='form-text'>
						Add a contact no in which other can call for queries
					</small>
				</div>
				<div className='form-group'>
					<input
						type='text'
						placeholder='Website'
						name='website'
						value={website}
						onChange={(ele) => handleChange(ele)}
					/>
					<small className='form-text'>
						If your company has a website, please add it
					</small>
				</div>
				<div className='form-group'>
					<input
						type='email'
						placeholder='Work Email'
						name='workEmail'
						value={workEmail}
						onChange={(ele) => handleChange(ele)}
					/>
					<small className='form-text'>
						Give us your email that you use professionally
					</small>
				</div>
				<div className='form-group'>
					<textarea
						placeholder='A short intro'
						name='desc'
						value={desc}
						onChange={(ele) => handleChange(ele)}
					/>
					<small className='form-text'>
						Tell us a little about your company
					</small>
				</div>
				<div className='my-2'>
					<button
						onClick={() => toggleSocial(!displaySocial)}
						type='button'
						className='btn btn-light'
					>
						Add Social Network Links
					</button>
					<span>Optional</span>
				</div>
				{displaySocial && (
					<Fragment>
						<div className='form-group social-input'>
							<i className='fab fa-twitter fa-2x'></i>
							<input
								type='text'
								placeholder='Twitter URL'
								name='twitter'
								value={twitter}
								onChange={(ele) => handleChange(ele)}
							/>
						</div>

						<div className='form-group social-input'>
							<i className='fab fa-facebook fa-2x'></i>
							<input
								type='text'
								placeholder='Facebook URL'
								name='facebook'
								value={facebook}
								onChange={(ele) => handleChange(ele)}
							/>
						</div>

						<div className='form-group social-input'>
							<i className='fab fa-linkedin fa-2x'></i>
							<input
								type='text'
								placeholder='Linkedin URL'
								name='linkedin'
								value={linkedin}
								onChange={(ele) => handleChange(ele)}
							/>
						</div>

						<div className='form-group social-input'>
							<i className='fab fa-instagram fa-2x'></i>
							<input
								type='text'
								placeholder='Instagram URL'
								name='instagram'
								value={instagram}
								onChange={(ele) => handleChange(ele)}
							/>
						</div>
					</Fragment>
				)}

				<input type='submit' className='btn btn-primary my-1' />
			</form>
		</Fragment>
	);
};

CreateRecruiterProfile.propTypes = {
	createUpdate: PropTypes.func.isRequired,
	setAlert: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
	auth: state.auth,
});

export default connect(mapStateToProps, { createUpdate, setAlert })(
	withRouter(CreateRecruiterProfile)
);
