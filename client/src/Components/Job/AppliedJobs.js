import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { getAppliedJobs } from '../../Actions/job';
import JobItem from './JobItem';
import Spinner from '../Layouts/Spinner';
import { connect } from 'react-redux';

const AppliedJobs = ({ getAppliedJobs, job: { jobs, isLoading }, id }) => {
	useEffect(() => {
		getAppliedJobs(id);
	}, [getAppliedJobs, id]);

	return isLoading ? (
		<Spinner />
	) : (
		<Fragment>
			<div className='posts'>
				<div class='profile-job bg-light p-2'>
					<h2 class='text-primary'>Jobs Applied</h2>
					{jobs.length === 0 && <h4>No jobs applied</h4>}
					{jobs.map((job) => (
						<JobItem key={job._id} jobb={job} />
					))}
				</div>
			</div>
		</Fragment>
	);
};

AppliedJobs.propTypes = {
	getAppliedJobs: PropTypes.func.isRequired,
	job: PropTypes.object.isRequired,
	auth: PropTypes.object.isRequired,
	id: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
	job: state.job,
	auth: state.auth,
});

export default connect(mapStateToProps, { getAppliedJobs })(AppliedJobs);
