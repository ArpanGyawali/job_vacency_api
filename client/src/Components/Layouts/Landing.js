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
			<section className='banner_main'>
				<div className='container'>
					<div className='row d_flex'>
						<div className='col-md-5'>
							<div className='text-bg'>
								<h1>The Unnamed</h1>
								<span>A Job Hosting Web App</span>
								<p>
									Recruiter companies can provide job opportunity for the people
									out there seeking for jobs in a convinient way. This benefits
									companies as well as job seekers{' '}
								</p>
								<a href='#service'>Our Service</a>
								<a href='#get'>Get Started</a>
							</div>
						</div>
						<div className='col-md-7'>
							<div className='text-img'>
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
