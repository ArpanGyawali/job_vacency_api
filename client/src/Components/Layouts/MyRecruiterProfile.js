import React, { useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getMyProfile } from '../../Actions/profile';
import Spinner from '../Layouts/Spinner';

const MyRecruiterProfile = ({
	getMyProfile,
	auth: { user },
	profile: { profile, isLoading },
}) => {
	useEffect(() => {
		getMyProfile();
	}, []);

	return isLoading && profile === null ? (
		<Spinner />
	) : (
		<Fragment>
			<h1 className='large text-primary'>Profile</h1>
			<p className='lead'>
				<i className='fas fa-user'></i>Hello {user && user.name}
			</p>

			{profile != null ? (
				<Fragment>
					<Link to='/updateRecruiterProfile' className='btn btn-primary my-1'>
						Update Profile
					</Link>
				</Fragment>
			) : (
				<Fragment>
					<p>You have not yet setup your profile, please add some info</p>
					<Link to='/createRecruiterProfile' className='btn btn-primary my-1'>
						Create Profile
					</Link>
				</Fragment>
			)}
		</Fragment>
	);
};

MyRecruiterProfile.propTypes = {
	getMyProfile: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
	profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
	auth: state.auth,
	profile: state.profile,
});

export default connect(mapStateToProps, { getMyProfile })(MyRecruiterProfile);
