import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { getJobs } from '../../Actions/job';
import JobItem from './JobItem';
import Spinner from '../Layouts/Spinner';
import { connect } from 'react-redux';

const Jobs = ({ getJobs, job: { jobs, isLoading }, auth: { user } }) => {
	const role = user && user.role;

	const [allJobs, setAllJobs] = useState([]);
	const [filteredJobs, setFilteredJobs] = useState([]);
	const [searchBy, setSearchBy] = useState('title');
	const [searchField, setSearchField] = useState('');

	let filterJobs;
	if (searchBy === 'title') {
		filterJobs = allJobs.filter((job) =>
			job.title.toLowerCase().includes(searchField.toLowerCase())
		);
	} else if (searchBy === 'catagory') {
		filterJobs = allJobs.filter((job) =>
			job.catagory.toLowerCase().includes(searchField.toLowerCase())
		);
	} else if (searchBy === 'level') {
		filterJobs = allJobs.filter((job) =>
			job.level.toLowerCase().includes(searchField.toLowerCase())
		);
	} else if (searchBy === 'location') {
		filterJobs = allJobs.filter((job) =>
			job.location.toLowerCase().includes(searchField.toLowerCase())
		);
	}

	useEffect(() => {
		getJobs();
		setAllJobs(jobs);
	}, [getJobs, jobs]);

	useEffect(() => {
		setFilteredJobs(filterJobs);
	}, [searchField, allJobs]);

	return isLoading ? (
		<Spinner />
	) : (
		<Fragment>
			<h1 className='large text-primary'>Jobs</h1>
			{role === 'recruiter' ? (
				<Link to={`/post-job`} className='btn btn-primary'>
					<i className='fa fa-briefcase'></i>
					{' Post A Job'}
					<small className='form-text'>
						<i className='fa fa-arrow-up'></i>
						You can post a new job here
					</small>
				</Link>
			) : (
				<p className='lead'>
					<i className='fas fa-briefcase'></i> You can find your dream job right
					here
				</p>
			)}
			<div className='search-wrap'>
				<i className='fa fa-search'></i>
				<input
					className='search'
					type='search'
					placeholder='Search'
					onChange={(e) => setSearchField(e.target.value)}
					// onKeyPress={props.onKeyPresshandleKeyPress}
				/>
				<h5 className='searchBy'>Search By:</h5>
				<select
					defaultValue='title'
					onChange={(e) => setSearchBy(e.target.value)}
				>
					<option selected value='title'>
						Job Title
					</option>
					<option value='catagory'>Job Catagory</option>
					<option value='level'>Job Level</option>
					<option value='location'>Job Location</option>
				</select>
			</div>
			<div className='posts'>
				<br />
				{filteredJobs.length > 0 ? (
					filteredJobs.map((job) => <JobItem key={job._id} jobb={job} />)
				) : (
					<h4>No Job Found</h4>
				)}
			</div>
		</Fragment>
	);
};

Jobs.propTypes = {
	getJobs: PropTypes.func.isRequired,
	job: PropTypes.object.isRequired,
	auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
	job: state.job,
	auth: state.auth,
});

export default connect(mapStateToProps, { getJobs })(Jobs);
