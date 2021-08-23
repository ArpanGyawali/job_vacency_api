import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { getJobsByUserId } from '../../Actions/job';
import JobItem from './JobItem';
import Spinner from '../Layouts/Spinner';
import { connect } from 'react-redux';

const Jobs = ({ getJobsByUserId, job: { jobs, isLoading }, id }) => {
	useEffect(() => {
		getJobsByUserId(id);
	}, [getJobsByUserId, id]);

	return isLoading ? (
		<Spinner />
	) : (
		<Fragment>
			<div className='posts'>
				<div class='profile-job bg-light p-2'>
					<h2 class='text-primary'>Jobs Provided</h2>
					{jobs.length === 0 && <h4>No jobs provided</h4>}
					{jobs.map((job) => (
						<JobItem key={job._id} jobb={job} />
					))}
				</div>
			</div>
		</Fragment>
	);
};

Jobs.propTypes = {
	getJobsByUserId: PropTypes.func.isRequired,
	job: PropTypes.object.isRequired,
	id: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
	job: state.job,
});

export default connect(mapStateToProps, { getJobsByUserId })(Jobs);
