import React, { Fragment, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../Layouts/Spinner';
import JobsByUser from '../Job/JobsByUser';
import RecruiterProfileData from './RecruiterProfileData';
import { getProfileById, DeleteAccount } from '../../Actions/profile';

const RecruiterProfile = ({
	getProfileById,
	DeleteAccount,
	profile: { profile, isLoading },
	auth,
}) => {
	let { id } = useParams();
	useEffect(() => {
		getProfileById(id, 'recruiter');
	}, [getProfileById, id]);

	return (
		<Fragment>
			{profile === null || isLoading ? (
				<Fragment>
					<Spinner />
					<div>
						<p>You have not yet setup your profile, please add some info</p>
						<Link to='/createRecruiterProfile' className='btn btn-primary my-1'>
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
							<Link to='/updateRecruiterProfile' className='btn btn-dark'>
								Edit Profile
							</Link>
						)}
					<div class='profile-grid my-1'>
						<RecruiterProfileData profile={profile} recruiter={auth.user} />
						<JobsByUser id={id} />
					</div>
					{auth.isAuthenticated &&
						auth.isLoading === false &&
						auth.user._id === profile.user._id && (
							<div className='my-2'>
								<button
									className='btn btn-danger'
									onClick={() => DeleteAccount('recruiter')}
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

RecruiterProfile.propTypes = {
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
	RecruiterProfile
);

//Create a SeekerProfile and Recuiter Profile By Id and for My REcruiter and My seeker id pass it own id as params
//For if the authenticated user is same is that of the profile add Edit Profile to it
