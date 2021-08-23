import React from 'react';
import { Link } from 'react-router-dom';

const GettingStarted = () => {
	return (
		<div class='gettingStart'>
			<div id='why' class='why'>
				<div class='titlepage'>
					<h1>GETTING STARTED</h1>
					<p>Hope you find the app useful and user friendly</p>
				</div>
			</div>
			<div className='start'>
				<h1></h1>
				<div className='buttons'>
					<Link
						to={{
							pathname: '/register',
							role: 'seeker',
						}}
						className='button'
					>
						Register As Seeker
					</Link>
					<Link
						to={{
							pathname: '/register',
							role: 'recruiter',
						}}
						className='button'
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
						className='button'
					>
						Login As Seeker
					</Link>
					<Link
						to={{
							pathname: '/login',
							role: 'recruiter',
						}}
						className='button'
					>
						Login As Recruiter
					</Link>
				</div>
			</div>
		</div>
	);
};

export default GettingStarted;
