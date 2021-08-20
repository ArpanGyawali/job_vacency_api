import React from 'react';
import './Landing.css';
import post from '../../img/post.png';
import search from '../../img/search.png';
import applients from '../../img/applients.png';
import apply from '../../img/apply.png';
import profile from '../../img/profile.png';
import interview from '../../img/interview.png';

const WhatWeDo = () => {
	return (
		<div id='service' className='Services'>
			<div className='container'>
				<div className='row'>
					<div className='col-md-12'>
						<div className='titlepage'>
							<h1>OUR SERVICES</h1>
							<p>
								We do our best in satisfying you and fulfiling your needs <br />
								The services we provide and things you can do through our app...
							</p>
						</div>
					</div>
				</div>
				<div className='row'>
					<div className='col-xl-4 col-lg-4 col-md-4 col-sm-12'>
						<div className='Services-box'>
							<i>
								<img src={post} alt='#' />
							</i>
							<h3>Post jobs</h3>
							<p>Companies can post the job specifying every details.</p>
							<br />
						</div>
					</div>
					<div className='col-xl-4 col-lg-4 col-md-4 col-sm-12'>
						<div className='Services-box'>
							<i>
								<img src={search} alt='#' />
							</i>
							<h3>Search for jobs</h3>
							<p>
								Job seekers can easily find the jobs that they are looking for
								provided by various companies.
							</p>
						</div>
					</div>
					<div className='col-xl-4 col-lg-4 col-md-4 col-sm-12'>
						<div className='Services-box'>
							<i>
								<img src={apply} alt='#' />
							</i>
							<h3>Apply for jobs</h3>
							<p>
								If you are interested for some job, you can provide them their
								resume and apply for it.
							</p>
						</div>
					</div>
					<div className='col-xl-4 col-lg-4 col-md-4 col-sm-12'>
						<div className='Services-box'>
							<i>
								<img src={profile} alt='#' />
							</i>
							<h3>Add a profile</h3>
							<p>
								You can add and change your profile data so that other can
								recognize you and see your provided information.
							</p>
						</div>
					</div>
					<div className='col-xl-4 col-lg-4 col-md-4 col-sm-12'>
						<div className='Services-box'>
							<i>
								<img src={applients} alt='#' />
							</i>
							<h3>Know your applients</h3>
							<p>Recruiters can see who applied for the job and know them.</p>
							<br />
						</div>
					</div>
					<div className='col-xl-4 col-lg-4 col-md-4 col-sm-12'>
						<div className='Services-box'>
							<i>
								<img src={interview} alt='#' />
							</i>
							<h3>Call for interview</h3>
							<p>
								If you are selected among the applients, you will be called for
								an interview. That happens outside our app.
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default WhatWeDo;
