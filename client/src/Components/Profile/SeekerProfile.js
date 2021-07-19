import React, { Fragment, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../Layouts/Spinner';
import SeekerProfileData from './SeekerProfileData';
import AppliedJobs from '../Job/AppliedJobs';
import { getProfileById, DeleteAccount } from '../../Actions/profile';

const SeekerProfile = ({
	getProfileById,
	DeleteAccount,
	profile: { profile, isLoading },
	auth,
}) => {
	let { id } = useParams();
	console.log(id);
	useEffect(() => {
		getProfileById(id, 'seeker');
	}, [getProfileById, id]);

	return (
		<Fragment>
			{profile === null || isLoading ? (
				<Fragment>
					<Spinner />
					<div>
						<p>You have not yet setup your profile, please add some info</p>
						<Link to='/createSeekerProfile' className='btn btn-primary my-1'>
							Create Profile
						</Link>
					</div>
				</Fragment>
			) : (
				<Fragment>
					{auth.isAuthenticated &&
						auth.isLoading === false &&
						auth.user._id === id &&
						profile !== null && (
							<Link to='/updateSeekerProfile' className='btn btn-dark'>
								Edit Profile
							</Link>
						)}
					{auth.user.email.includes('@pcampus.edu.np') && (
						<div class='isPul'>
							<p>Pulchowk Campus Student</p>
						</div>
					)}
					<div class='profile-grid my-1'>
						<SeekerProfileData profile={profile} seeker={auth.user} />
						{auth.isAuthenticated &&
							auth.isLoading === false &&
							auth.user._id === id && <AppliedJobs id={id} />}
					</div>
					{auth.isAuthenticated &&
						auth.isLoading === false &&
						auth.user._id === profile.user._id && (
							<div className='my-2'>
								<button
									className='btn btn-danger'
									onClick={() => DeleteAccount('seeker')}
								>
									<i className='fa fa-trash'></i> Delete Account
								</button>
							</div>
						)}
				</Fragment>
			)}
		</Fragment>
	);
};

SeekerProfile.propTypes = {
	profile: PropTypes.object.isRequired,
	DeleteAccount: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
	getProfileById: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
	profile: state.profile,
	auth: state.auth,
});

export default connect(mapStateToProps, { getProfileById, DeleteAccount })(
	SeekerProfile
);

//Create a SeekerProfile and Recuiter Profile By Id and for My REcruiter and My seeker id pass it own id as params
//For if the authenticated user is same is that of the profile add Edit Profile to it
