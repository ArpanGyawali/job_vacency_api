import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

const RecruiterProfileData = ({
	profile: {
		location,
		noOfJobs,
		desc,
		website,
		contactNo,
		workEmail,
		social,
		user: { name, username, avatar },
	},
	recruiter: { email },
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
					{website && (
						<a href={website} target='_blank' rel='noopener noreferrer'>
							<i class='fas fa-globe fa-2x'></i>
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
					{social && social.instagram && (
						<a
							href={social.instagram}
							target='_blank'
							rel='noopener noreferrer'
						>
							<i class='fab fa-instagram fa-2x'></i>
						</a>
					)}
				</div>
			</div>
			<div class='profile-about bg-light p-2'>
				{desc && (
					<Fragment>
						<h2 class='text-primary'>About</h2>
						<p>{desc}</p>
						<div class='line'></div>
					</Fragment>
				)}

				<h2 class='text-primary'>Info</h2>
				<div class='skills'>
					<div class='p-1'>
						<i class='fa fa-envelope'></i>
						<strong>Email: </strong>
						{workEmail ? (
							<span>{`${workEmail}  | `}</span>
						) : (
							<span>{`${email}  | `}</span>
						)}
						<i class='fa fa-phone'></i>
						<strong>Contact Number: </strong>
						{contactNo && <span>{`${contactNo}  | `} </span>}
						<i class='fa fa-briefcase'></i>
						<strong>No of Jobs Provided: </strong>
						<span>{noOfJobs}</span>
					</div>
				</div>
			</div>
		</div>
	);
};

RecruiterProfileData.propTypes = {
	profile: PropTypes.object.isRequired,
	recruiter: PropTypes.object.isRequired,
};

export default RecruiterProfileData;
