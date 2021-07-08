import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const Landing = ({ isAuthenticated }) => {
	if (isAuthenticated) {
		return <Redirect to='#' />;
	}
	return (
		<section className='landing'>
			<div className='dark-overlay'>
				<div className='landing-inner'>
					<h1 className='x-large'>Developer Connector</h1>
					<h1 className='large'>A Jov Vacancy Web App</h1>
					<p className='lead'>
						Provides a job by various recruiter companies for the job seekers
						out there
					</p>
					<div className='buttons'>
						<Link
							to={{
								pathname: '/register',
								role: 'seeker',
							}}
							className='btn btn-primary'
						>
							Register As Seeker
						</Link>
						<Link
							to={{
								pathname: '/register',
								role: 'recruiter',
							}}
							className='btn btn-primary'
						>
							Register As Recruiter
						</Link>
						<br />
						<br />
						<Link
							to={{
								pathname: '/login',
								role: 'seeker',
							}}
							className='btn btn-light'
						>
							Login As Seeker
						</Link>
						<Link
							to={{
								pathname: '/login',
								role: 'recruiter',
							}}
							className='btn btn-light'
						>
							Login As Recruiter
						</Link>
					</div>
				</div>
			</div>
		</section>
	);
};

Landing.propTypes = {
	isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
	isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps)(Landing);
