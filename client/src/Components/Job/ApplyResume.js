import React, { useState, useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { applyFile, fileId, deleteFile } from '../../Actions/job';
import spinner from './spinner.gif';

const ApplyResume = ({
	jobId,
	applyFile,
	deleteFile,
	fileId,
	job: { job },
	auth: { user },
	file,
}) => {
	const [files, setFile] = useState(null);
	const [inputContainsFile, setInputContainsFile] = useState(false);
	const [currentlyUploading, setCurrentlyUploading] = useState(false);
	const handleFile = (event) => {
		setFile(event.target.files[0]);
		setInputContainsFile(true);
	};

	const handleSubmit = (event) => {
		if (inputContainsFile) {
			setCurrentlyUploading(true);
			const fd = new FormData();
			fd.append('file', files, files.name);
			event.preventDefault();
			applyFile(jobId, fd);
			// setFile(null);
			// setInputContainsFile(false);
			// setCurrentlyUploading(false);
		}
	};

	const handleDelete = (id) => {
		//fileId(job._id, user._id);
		deleteFile(id, job._id);
		setFile(null);
		setInputContainsFile(false);
		setCurrentlyUploading(false);
		//setAlert('File Removed/ Applicaion cancelled', 'success');
	};

	useEffect(() => {
		fileId(job._id, user._id);
	}, [job]);

	return (
		<div className='post-form'>
			<div className='row'>
				<div className='col-md-6 m-auto'>
					{file.isFile ? (
						<div>
							<h3>Your applied Resume:</h3>
							<a
								href={`https://damp-spire-73123.herokuapp.com/api/jobs/files/${file.fileId}`}
								className='btn btn-primary'
								target='_blank'
							>
								<i className='fas fa-file-pdf fa-lg'></i>
								{'   ' + file.fileName}
							</a>
							{/* <form
								method='POST'
								action={`${window.location.protocol}//localhost:8000/api/jobs/file/${file.fileId}?_method=DELETE`}
							> */}
							<br />
							<button
								className='btn btn-danger mt-4'
								onClick={() => handleDelete(file.fileId)}
							>
								Delete/ Cancel Apply
							</button>
							{/* </form> */}
						</div>
					) : (
						<Fragment>
							<h3 className='text-primary'>
								<i className='fas fa-file-pdf fa-lg'></i>
								{`  Upload pdf of your resume to apply`}
							</h3>
							{currentlyUploading ? (
								//<h2>Uploading......</h2>
								<div>
									<img
										src={spinner}
										style={{ width: '200px', margin: 'auto', display: 'block' }}
										alt='Uploading...'
									/>
								</div>
							) : (
								<form
									className='form my-1'
									onSubmit={(event) => handleSubmit(event)}
									// onSubmit={(e) => {
									// 	e.preventDefault();
									// 	applyJob(jobId, { resume });
									// 	setResume('');
									// }}
								>
									<div class='custom-file mb-3'>
										<input
											type='file'
											name='file'
											id='file'
											onChange={(event) => handleFile(event)}
											className='custom-file-input'
											required
										/>
										<label htmlFor='file' className='custom-file-label'>
											{files ? files.name : 'Choose File'}
										</label>
									</div>
									<input
										type='submit'
										value='Apply'
										className='btn btn-primary'
									/>
								</form>
							)}
						</Fragment>
					)}
				</div>
			</div>
		</div>
	);
};

ApplyResume.propTypes = {
	applyFile: PropTypes.func.isRequired,
	fileId: PropTypes.func.isRequired,
	deleteFile: PropTypes.func.isRequired,
	job: PropTypes.object.isRequired,
	auth: PropTypes.object.isRequired,
	file: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
	job: state.job,
	auth: state.auth,
	file: state.file,
});

export default connect(mapStateToProps, {
	applyFile,
	fileId,
	deleteFile,
})(ApplyResume);
