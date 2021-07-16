import React, { useState, useEffect, Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { createUpdate, getProfileById } from '../../Actions/profile';
import { connect } from 'react-redux';

const EditRecruiterProfile = (props) => {
	const {
		createUpdate,
		getProfileById,
		history,
		profile: { profile, isLoading },
	} = props;
	const {
		auth: { user, isAuthenticated },
	} = props;
	const id = isAuthenticated && user._id;
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

	useEffect(() => {
		getProfileById(id, 'recruiter');

		setRecruiterProfileData({
			location: isLoading || !profile.location ? '' : profile.location,
			website: isLoading || !profile.website ? '' : profile.website,
			workEmail: isLoading || !profile.workEmail ? '' : profile.workEmail,
			contactNo: isLoading || !profile.contactNo ? '' : profile.contactNo,
			desc: isLoading || !profile.desc ? '' : profile.desc,
			facebook: isLoading || !profile.social ? '' : profile.social.facebook,
			twitter: isLoading || !profile.social ? '' : profile.social.twitter,
			linkedin: isLoading || !profile.social ? '' : profile.social.linkedin,
			instagram: isLoading || !profile.social ? '' : profile.social.instagram,
		});
	}, [isLoading, getProfileById]);

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
		createUpdate(recruiterProfileData, history, 'recruiter', id);
	};

	return (
		<Fragment>
			<h1 className='large text-primary'>Edit Your Profile</h1>
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

EditRecruiterProfile.propTypes = {
	createUpdate: PropTypes.func.isRequired,
	getProfileById: PropTypes.func.isRequired,
	profile: PropTypes.object.isRequired,
	auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
	profile: state.profile,
	auth: state.auth,
});

export default connect(mapStateToProps, {
	createUpdate,
	getProfileById,
})(withRouter(EditRecruiterProfile)); //
