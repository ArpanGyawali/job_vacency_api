import React, { Fragment, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getJobById } from '../../Actions/job';
import Moment from 'react-moment';
import Spinner from '../Layouts/Spinner';
import ApplyForm from './ApplyForm';
import ApplyResume from './ApplyResume';
import ApplyItem from './ApplyItem';
import { connect } from 'react-redux';

const JobById = ({
	getJobById,
	job: { isLoading, job },
	auth: { isAuthenticated, user },
}) => {
	const { id } = useParams();

	useEffect(() => {
		getJobById(id);
	}, [getJobById, id]);

	// if (!isLoading) {
	// 	const {
	// 		company,
	// 		title,
	// 		catagory,
	// 		level,
	// 		type,
	// 		location,
	// 		deadline,
	// 		posted,
	// 		appliersNo,
	// 		skillsAndQualifications,
	// 		description,
	// 		vacancyNo,
	// 		salary,
	// 		avatar,
	// 		user,
	// 	} = job;
	// }

	return (
		<Fragment>
			{job === null || isLoading ? (
				<Spinner />
			) : (
				<Fragment>
					{job && (
						<Fragment>
							{job.user.role === 'recruiter' ? (
								<h2 className='text-primary'>
									{`${job.title} by `}
									<Link to={`/recruiterProfile/${job.user._id}`}>
										{job.company}
									</Link>
								</h2>
							) : (
								<h2 className='text-primary'>
									{`${job.title} by ${job.company} posted by Admin`}
								</h2>
							)}
							<table className='GeneratedTable'>
								<tr>
									<th>Title</th>
									<td colSpan='3'>{job.title}</td>
								</tr>
								<tr>
									<th>Catagory</th>
									<td>{job.catagory}</td>
									<th>Level</th>
									<td>{job.level}</td>
								</tr>
								<tr>
									<th>Type</th>
									<td>{job.type}</td>
									<th>Salary</th>
									<td>{job.salary}</td>
								</tr>
								<tr>
									<th>No of Vacancy</th>
									<td>{job.vacancyNo}</td>
									<th>No of appliers</th>
									<td>{job.appliers.length}</td>
								</tr>
								<tr>
									<th>Posted In</th>
									<td>
										<Moment format='YYYY/MM/DD'>{job.posted}</Moment>
									</td>
									<th>Deadline</th>
									<td>
										<Moment format='YYYY/MM/DD'>{job.deadline}</Moment>
									</td>
								</tr>
								<tr>
									<th>Job Location</th>
									<td colSpan='3'>{job.location}</td>
								</tr>
								<tr>
									<th>Skills and Qualifications</th>
									<td colSpan='3'>
										{job.skillsAndQualifications.map((item) => (
											<p className='my-1'>
												<i className='fa fa-arrow-right'></i> {` ${item}`}
											</p>
										))}
									</td>
								</tr>
								<tr>
									<th>Job Description</th>
									<td colSpan='3'>{job.description}</td>
								</tr>
							</table>
							{job.hrEmail && (
								<p>
									For more information about the job, email{' '}
									<strong>{job.hrEmail}</strong>
								</p>
							)}
							<br />

							{isAuthenticated && user.role === 'seeker' && (
								<ApplyResume key={user._id} jobId={job._id} />
							)}
							{isAuthenticated &&
								job.user._id === user._id &&
								(user.role === 'recruiter' || user.role === 'admin') && (
									<Fragment>
										<h3 className='text-primary'>Appliers</h3>
										{job.appliers.length === 0 && <h4>No one has applied</h4>}
										{job.appliers.map((apply) => (
											<ApplyItem key={apply._id} apply={apply} />
										))}
									</Fragment>
								)}
						</Fragment>
					)}
				</Fragment>
			)}
		</Fragment>
	);
};

JobById.propTypes = {
	getJobById: PropTypes.func.isRequired,
	job: PropTypes.object.isRequired,
	auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
	job: state.job,
	auth: state.auth,
});

export default connect(mapStateToProps, { getJobById })(JobById);
