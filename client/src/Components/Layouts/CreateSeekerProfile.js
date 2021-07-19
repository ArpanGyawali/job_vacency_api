import React, { useState, Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createUpdate } from '../../Actions/profile';

const CreateSeekerProfile = ({
	createUpdate,
	history,
	auth: { user, isAuthenticated },
}) => {
	const id = isAuthenticated && user !== null && user._id;

	const [seekerProfileData, setSeekerProfileData] = useState({
		location: '',
		jobInterests: '',
		workEmail: '',
		currentStatus: '',
		currentJob: '',
		portfolio: '',
		contactNo: '',
		desc: '',
		facebook: '',
		twitter: '',
		linkedin: '',
		github: '',
	});

	const [displaySocial, toggleSocial] = useState(false);

	const {
		location,
		jobInterests,
		workEmail,
		currentStatus,
		currentJob,
		contactNo,
		desc,
		portfolio,
		facebook,
		linkedin,
		twitter,
		github,
	} = seekerProfileData;

	const handleChange = (ele) =>
		setSeekerProfileData({
			...seekerProfileData,
			[ele.target.name]: ele.target.value,
		});

	const handleSubmit = (ele) => {
		ele.preventDefault();
		createUpdate(seekerProfileData, history, 'seeker', id);
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
						Add a contact no in case the companies want to contact you
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
					<select
						name='currentStatus'
						value={currentStatus}
						onChange={(ele) => handleChange(ele)}
					>
						<option value='0'>* Select your current status</option>
						<option value='Unemployed'>Unemployed</option>
						<option value='Employed'>Employed/Intern</option>
						<option value='Student'>Student/Learning</option>
						<option value='Other'>Other</option>
					</select>
					<small className='form-text'>
						Give us an idea of where you are at in your career
					</small>
				</div>
				{currentStatus === 'Employed' && (
					<div className='form-group'>
						<input
							type='text'
							placeholder='Current Job/Internship'
							name='currentJob'
							value={currentJob}
							onChange={(ele) => handleChange(ele)}
						/>
					</div>
				)}
				<div className='form-group'>
					<input
						type='text'
						placeholder='* Job Interest'
						name='jobInterests'
						value={jobInterests}
						onChange={(ele) => handleChange(ele)}
					/>
					<small className='form-text'>
						Write all your field of interests for the job seperated by comma
					</small>
				</div>
				<div className='form-group'>
					<input
						type='text'
						placeholder='Portfolio Website'
						name='portfolio'
						value={portfolio}
						onChange={(ele) => handleChange(ele)}
					/>
					<small className='form-text'>
						If you have your portfolio website, give us its link
					</small>
				</div>
				<div className='form-group'>
					<textarea
						placeholder='A short bio of yourself'
						name='desc'
						value={desc}
						onChange={(ele) => handleChange(ele)}
					/>
					<small className='form-text'>Tell us a little about yourself</small>
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
							<i className='fab fa-github fa-2x'></i>
							<input
								type='text'
								placeholder='Github URL'
								name='github'
								value={github}
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

CreateSeekerProfile.propTypes = {
	createUpdate: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
	auth: state.auth,
});

export default connect(mapStateToProps, { createUpdate })(
	withRouter(CreateSeekerProfile)
); //this allows us to use history object as props
