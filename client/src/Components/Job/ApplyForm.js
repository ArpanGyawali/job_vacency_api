import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { applyJob } from '../../Actions/job';

const ApplyForm = ({ jobId, applyJob }) => {
	const [resume, setResume] = useState('');
	return (
		<div className='post-form'>
			<div className='post bg-white p-1 my-1'>
				<h3 class='text-primary'>Add your resume and Apply</h3>
				<form
					className='form my-1'
					onSubmit={(e) => {
						e.preventDefault();
						applyJob(jobId, { resume });
						setResume('');
					}}
				>
					<input
						type='text'
						name='resume'
						placeholder='Add your resume link'
						value={resume}
						onChange={(e) => setResume(e.target.value)}
						required
					/>
					<input type='submit' className='btn btn-primary' value='Apply' />
				</form>
			</div>
		</div>
	);
};

ApplyForm.propTypes = {
	applyJob: PropTypes.func.isRequired,
	jobId: PropTypes.string.isRequired,
};

export default connect(null, { applyJob })(ApplyForm);
