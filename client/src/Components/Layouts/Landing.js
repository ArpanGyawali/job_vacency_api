// import React from 'react';
// import { Link, Redirect } from 'react-router-dom';
// import { connect } from 'react-redux';
// import PropTypes from 'prop-types';

// const Landing = ({ isAuthenticated }) => {
// 	if (isAuthenticated) {
// 		return <Redirect to='#' />;
// 	}
// 	return (
// 		<section className='landing'>
// 			<div className='dark-overlay'>
// 				<div className='landing-inner'>
// 					<h1 className='x-large'>Developer Connector</h1>
// 					<h1 className='large'>A Jov Vacancy Web App</h1>
// 					<p className='lead'>
// 						Provides a job by various recruiter companies for the job seekers
// 						out there
// 					</p>
// 					<div className='buttons'>
// 						<Link
// 							to={{
// 								pathname: '/register',
// 								role: 'seeker',
// 							}}
// 							className='btn btn-primary'
// 						>
// 							Register As Seeker
// 						</Link>
// 						<Link
// 							to={{
// 								pathname: '/register',
// 								role: 'recruiter',
// 							}}
// 							className='btn btn-primary'
// 						>
// 							Register As Recruiter
// 						</Link>
// 						<br />
// 						<br />
// 						<Link
// 							to={{
// 								pathname: '/login',
// 								role: 'seeker',
// 							}}
// 							className='btn btn-light'
// 						>
// 							Login As Seeker
// 						</Link>
// 						<Link
// 							to={{
// 								pathname: '/login',
// 								role: 'recruiter',
// 							}}
// 							className='btn btn-light'
// 						>
// 							Login As Recruiter
// 						</Link>
// 					</div>
// 				</div>
// 			</div>
// 		</section>
// 	);
// };

// Landing.propTypes = {
// 	isAuthenticated: PropTypes.bool,
// };

// const mapStateToProps = (state) => ({
// 	isAuthenticated: state.auth.isAuthenticated,
// });

// export default connect(mapStateToProps)(Landing);

import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Fragment } from 'react';
import main from '../../img/main.png';
import WhatWeDo from './WhatWeDo';
import GettingStarted from './GettingStarted';
import Footer from './Footer';
import './Landing.css';

const Landing = ({ isAuthenticated }) => {
	if (isAuthenticated) {
		return <Redirect to='#' />;
	}
	return (
		<Fragment>
			<section class='banner_main'>
				<div class='container'>
					<div class='row d_flex'>
						<div class='col-md-5'>
							<div class='text-bg'>
								<h1>The Unnamed</h1>
								<span>A Job Hosting Web App</span>
								<p>
									Provides jobs by various recruiter companies for the people
									seeking for jobs they want out there in convinient way{' '}
								</p>
								<a href='#service'>Our Service</a>
								<a href='#get'>Get Started</a>
							</div>
						</div>
						<div class='col-md-7'>
							<div class='text-img'>
								<figure>
									<img src={main} alt='' />
								</figure>
							</div>
						</div>
					</div>
				</div>
			</section>
			<div id='service'>
				<WhatWeDo />
			</div>
			<div id='get'>
				<GettingStarted />
			</div>
			<Footer />
		</Fragment>
	);
};

Landing.propTypes = {
	isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
	isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps)(Landing);
