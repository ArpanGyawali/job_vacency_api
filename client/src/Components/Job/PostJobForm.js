import React, { useState, Fragment } from 'react';
import { postJob } from '../../Actions/job';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const PostJobForm = ({ postJob, auth: { user, isAuthenticated } }) => {
	const recruiter = isAuthenticated && user.name;
	const [jobData, setJobData] = useState({
		company: '',
		title: '',
		catagory: '',
		level: '',
		hrEmail: '',
		vacancyNo: 1,
		deadline: Date.now,
		type: '',
		salary: 'Negotiable',
		location: '',
		skillsAndQualifications: '',
		description: '',
	});

	const {
		company,
		title,
		catagory,
		level,
		vacancyNo,
		deadline,
		hrEmail,
		type,
		salary,
		location,
		skillsAndQualifications,
		description,
	} = jobData;

	const handleChange = (ele) =>
		setJobData({
			...jobData,
			[ele.target.name]: ele.target.value,
		});

	const handleSubmit = (ele) => {
		ele.preventDefault();
		postJob(jobData);
	};
	const role = user && user.role;

	return (
		<Fragment>
			<h1 className='large text-primary'>Post Job</h1>
			<p className='lead'>
				{role === 'admin' ? (
					<Fragment>
						<i className='fas fa-briefcase'></i>{' '}
						{`Let your student know what opportunities are presented for them by various companies`}
					</Fragment>
				) : (
					<Fragment>
						<i className='fas fa-briefcase'></i>{' '}
						{`Let people out there know what ${recruiter} is looking for. Its for the best! `}
					</Fragment>
				)}
			</p>
			<small>
				<strong>* = required field</strong>
			</small>

			<form className='form' onSubmit={(ele) => handleSubmit(ele)}>
				{role === 'admin' && (
					<Fragment>
						<div className='form-group'>
							<input
								type='text'
								placeholder='* Name of the Company'
								name='company'
								value={company}
								onChange={(ele) => handleChange(ele)}
							/>
							<small className='form-text'>
								<strong>Important Note: </strong>Enter the exact name of the
								company. This name is used for calculating no of jobs provided
								by them for your institution student.
							</small>
						</div>
					</Fragment>
				)}
				<div className='form-group'>
					<input
						type='text'
						placeholder='* Job Title'
						name='title'
						value={title}
						onChange={(ele) => handleChange(ele)}
					/>
					<small className='form-text'>Enter an appropriate job title</small>
				</div>
				<div className='form-group'>
					<input
						type='text'
						placeholder='* Catagory'
						name='catagory'
						value={catagory}
						onChange={(ele) => handleChange(ele)}
					/>
					<small className='form-text'>
						eg: Networking, Architecture, Designing
					</small>
				</div>
				<div className='form-group'>
					<select
						name='level'
						value={level}
						onChange={(ele) => handleChange(ele)}
					>
						<option value='0'>* Select job level</option>
						<option value='Internship'>Internship</option>
						<option value='Employed'>Junior</option>
						<option value='Assistent'>Assistent</option>
						<option value='Mid'>Mid</option>
						<option value='Senior'>Senior</option>
						<option value='Other'>Other</option>
					</select>
				</div>
				<div className='form-group'>
					<input
						type='number'
						placeholder='Number of vacancy'
						name='vacancyNo'
						value={vacancyNo}
						onChange={(ele) => handleChange(ele)}
					/>
					<small className='form-text'>
						* Enter the number of vacancies opened.
					</small>
				</div>
				<h5>* Deadline</h5>
				<div className='form-group'>
					<input
						type='date'
						name='deadline'
						value={deadline}
						onChange={(ele) => handleChange(ele)}
					/>
				</div>
				<div className='form-group'>
					<select
						name='type'
						value={type}
						onChange={(ele) => handleChange(ele)}
					>
						<option value='0'>* Select job type</option>
						<option value='Full Time'>Full Time</option>
						<option value='Part Time'>Part Time</option>
					</select>
				</div>
				<div className='form-group'>
					<input
						type='text'
						placeholder='* Exact Job Location'
						name='location'
						value={location}
						onChange={(ele) => handleChange(ele)}
					/>
					<small className='form-text'>
						* Enter the location where employee need to work. You can specify
						Online if job is online
					</small>
				</div>
				<div className='form-group'>
					<input
						type='text'
						placeholder='Salary'
						name='salary'
						value={salary}
						onChange={(ele) => handleChange(ele)}
					/>
					<small className='form-text'>
						You can leave this field if salary negotiable. Otherwise provide the
						number
					</small>
				</div>
				<div className='form-group'>
					<textarea
						placeholder='Education, skills and other qualification required for this job'
						name='skillsAndQualifications'
						value={skillsAndQualifications}
						onChange={(ele) => handleChange(ele)}
					/>
					<small className='form-text'>
						Seperate different quallifications by enter key(Next line) so that
						it appears as a list.
					</small>
				</div>
				<div className='form-group'>
					<textarea
						placeholder='Short description about the job'
						name='description'
						value={description}
						onChange={(ele) => handleChange(ele)}
					/>
				</div>
				<div className='form-group'>
					<input
						type='text'
						placeholder='Email of HR or anyone concerned with management of this job'
						name='hrEmail'
						value={hrEmail}
						onChange={(ele) => handleChange(ele)}
					/>
					<small className='form-text'>
						This is so that the appliers can email hr for more queries or to
						apply.
					</small>
				</div>
				<input type='submit' value='Post' className='btn btn-primary my-1' />
			</form>
		</Fragment>
	);
};

PostJobForm.propTypes = {
	postJob: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
	auth: state.auth,
});

export default connect(mapStateToProps, { postJob })(PostJobForm);
