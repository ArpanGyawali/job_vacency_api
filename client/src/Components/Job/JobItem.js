import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { deleteJob } from '../../Actions/job';
import Moment from 'react-moment';
import { connect } from 'react-redux';

const JobItem = ({
	deleteJob,
	jobb: {
		_id,
		user,
		company,
		avatar,
		title,
		catagory,
		level,
		location,
		deadline,
		vacancyNo,
		posted,
	},
	auth,
}) => {
	const userr = auth.user;
	const { isLoading } = auth;
	if (userr && !userr.email.includes('@pcampus.edu.np')) {
		if (user && user.role === 'admin') {
			return null;
		}
	}
	return (
		<Fragment>
			<div className='post bg-white p-1 my-1'>
				{user && user.role === 'admin' ? (
					<div>
						<h4>{company}</h4>
					</div>
				) : (
					<div>
						<Link to={`/recruiterProfile/${user && user._id}`}>
							<img className='round-img' src={avatar} alt='' />
							<h4>{company}</h4>
						</Link>
					</div>
				)}
				<div>
					<p className='my-1'>
						<strong>Title: </strong>
						{title}
					</p>
					<p className='job-date'>
						Posted on <Moment format='YYYY/MM/DD'>{posted}</Moment>
					</p>
					<br />

					<p className='my-1'>
						<strong>Catagory: </strong>
						{catagory} | <strong>Level: </strong>
						{level}
					</p>
					<p className='job-date'>
						Deadline: <Moment format='YYYY/MM/DD'>{deadline}</Moment>
					</p>
					<p className='my-1'>
						<strong>Vacancy: </strong>
						{vacancyNo} | <strong>Locaion: </strong>
						{location}
					</p>
					<Link to={`/job/${_id}`} className='btn btn-primary'>
						{'View More  '}
						<i className='fa fa-arrow-right'></i>
					</Link>
					{!isLoading && userr && user && user._id === userr._id && (
						<button
							type='button'
							className='btn btn-danger'
							onClick={() => deleteJob(_id)}
						>
							<i className='fas fa-trash'></i>
						</button>
					)}
				</div>
			</div>
		</Fragment>
	);
};

JobItem.propTypes = {
	deleteJob: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
	jobb: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
	auth: state.auth,
});

export default connect(mapStateToProps, { deleteJob })(JobItem);
