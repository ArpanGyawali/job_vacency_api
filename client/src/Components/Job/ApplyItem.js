import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Moment from 'react-moment';

const ApplyItem = ({ apply: { _id, resume, name, avatar, applied, user } }) => {
	return (
		<div className='post bg-white p-1 my-1'>
			<div>
				<Link to={`/seekerProfile/${user}`}>
					<img className='round-img' src={avatar} alt='' />
					<h4>{name}</h4>
				</Link>
			</div>
			<div>
				<a href={resume} className='my-1'>
					{resume}
				</a>
				<p className='post-date'>
					<Moment format='YYYY/MM/DD'>{applied}</Moment>
				</p>
			</div>
		</div>
	);
};

ApplyItem.propTypes = {
	apply: PropTypes.object.isRequired,
};

export default ApplyItem;
