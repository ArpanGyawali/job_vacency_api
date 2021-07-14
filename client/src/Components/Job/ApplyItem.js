import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Moment from 'react-moment';

const ApplyItem = ({ apply: { _id, resume, name, avatar, applied, user } }) => {
	return (
		<div class='post bg-white p-1 my-1'>
			<div>
				<Link to={`/seekerProfile/${user}`}>
					<img class='round-img' src={avatar} alt='' />
					<h4>{name}</h4>
				</Link>
			</div>
			<div>
				<p class='my-1'>{resume}</p>
				<p class='post-date'>
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
