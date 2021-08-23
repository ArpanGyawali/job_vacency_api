import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getJobsByUserId } from '../../Actions/job';
import { jobCount } from '../../Actions/job';
import JobItem from '../Job/JobItem';
import Spinner from '../Layouts/Spinner';
import { connect } from 'react-redux';

const Admin = ({
	getJobsByUserId,
	jobCount,
	job: { jobs, isLoading },
	auth: { user },
	count,
}) => {
	const id = user && user._id;
	const name = user && user.name;
	useEffect(() => {
		getJobsByUserId(id);
		jobCount();
	}, [getJobsByUserId, jobCount, id]);

	return (
		<Fragment>
			<h1 className='large text-primary'>{`Welcome ${name}`}</h1>
			<Link to={`/post-job`} className='btn btn-primary'>
				<i className='fa fa-briefcase'></i>
				{' Post A Job'}
				<small className='form-text'>
					<i className='fa fa-arrow-up'></i>
					You can post a new job here
				</small>
			</Link>
			<br />
			<br />
			{count.isLoading ? (
				<Spinner />
			) : (
				<div class='profile-job bg-light p-2'>
					<h2 class='text-primary'>Stats</h2>
					<table className='GeneratedTable'>
						<tr>
							<th>Company</th>
							<th>No of Jobs</th>
						</tr>
						{count.companies.length === 0 ? (
							<tr>
								<td colSpan='2'>No companies listed</td>
							</tr>
						) : (
							<Fragment>
								{count.companies.map((company) => (
									<tr>
										<td>{company.name}</td>
										<td>{company.noOfJobs}</td>
									</tr>
								))}
							</Fragment>
						)}
					</table>
				</div>
			)}
			<br />
			{isLoading ? (
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
			)}
		</Fragment>
	);
};

Admin.propTypes = {
	getJobsByUserId: PropTypes.func.isRequired,
	jobCount: PropTypes.func.isRequired,
	job: PropTypes.object.isRequired,
	auth: PropTypes.object.isRequired,
	count: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
	job: state.job,
	auth: state.auth,
	count: state.count,
});

export default connect(mapStateToProps, { getJobsByUserId, jobCount })(Admin);
