import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Moment from 'react-moment';

const ApplyItem = ({
	apply: { _id, resume, file, filename, name, avatar, applied, user },
}) => {
	return (
		<div className='post bg-white p-1 my-1'>
			<div>
				<Link to={`/seekerProfile/${user}`}>
					<img className='round-img' src={avatar} alt='' />
					<h4>{name}</h4>
				</Link>
			</div>
			<div>
				<a
					href={`https://damp-spire-73123.herokuapp.com/api/jobs/files/${file}`}
					className='btn btn-primary'
					target='_blank'
				>
					<i className='fas fa-file-pdf fa-lg'></i>
					{'   ' + filename}
				</a>
				<p className='post-date'>
					<strong>Applied: </strong>
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
