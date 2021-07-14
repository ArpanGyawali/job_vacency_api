import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

const SeekerProfileData = ({
	profile: {
		location,
		desc,
		portfolio,
		jobInterests,
		currentStatus,
		workEmail,
		currentJob,
		social,
		user: { name, username, avatar },
	},
}) => {
	return (
		<div>
			<div class='profile-top bg-primary p-2'>
				<img class='round-img my-1' src={avatar} alt='' />
				<h1 class='large'>{name}</h1>
				<p class='lead'>
					<i>{username}</i>
				</p>
				<p>{location && <span>{location}</span>}</p>
				<div class='icons my-1'>
					{portfolio && (
						<a href={portfolio} target='_blank' rel='noopener noreferrer'>
							<i class='fas fa-globe fa-2x'></i>
						</a>
					)}
					{social && social.github && (
						<a href={social.github} target='_blank' rel='noopener noreferrer'>
							<i class='fab fa-github fa-2x'></i>
						</a>
					)}
					{social && social.twitter && (
						<a href={social.twitter} target='_blank' rel='noopener noreferrer'>
							<i class='fab fa-twitter fa-2x'></i>
						</a>
					)}
					{social && social.facebook && (
						<a href={social.facebook} target='_blank' rel='noopener noreferrer'>
							<i class='fab fa-facebook fa-2x'></i>
						</a>
					)}
					{social && social.linkedin && (
						<a href={social.linkedin} target='_blank' rel='noopener noreferrer'>
							<i class='fab fa-linkedin fa-2x'></i>
						</a>
					)}
				</div>
			</div>
			<div class='profile-about bg-light p-2'>
				{desc && (
					<Fragment>
						<h2 class='text-primary'>Bio</h2>
						<p>{desc}</p>
						<div class='line'></div>
					</Fragment>
				)}

				<h2 class='text-primary'>Info</h2>
				<div class='skills'>
					<div class='p-1'>
						<i class='fa fa-envelope'></i>
						<strong>Email: </strong>
						{workEmail && <span>{`${workEmail}  | `}</span>}
						<i class='fa fa-user'></i>
						<strong>Status: </strong>
						{currentStatus && <span>{`${currentStatus}  | `} </span>}
						<i class='fa fa-briefcase'></i>
						<strong>Currently: </strong>
						{currentJob && <span>{`${currentJob}`} </span>}
					</div>
				</div>
				<br />
				<div class='profile-about bg-light p-2'>
					<div class='skills'>
						<strong>Interested In: </strong>
						{jobInterests &&
							jobInterests.map((jobInterest, index) => (
								<div key={index} className='p-1'>
									<i className='fa fa-check' aria-hidden='true'></i>
									<span>{jobInterest}</span>
								</div>
							))}
					</div>
				</div>
			</div>
		</div>
	);
};

SeekerProfileData.propTypes = {
	profile: PropTypes.object.isRequired,
};

export default SeekerProfileData;
