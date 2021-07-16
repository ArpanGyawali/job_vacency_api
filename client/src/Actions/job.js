import axios from 'axios';
import { setAlert } from './alert';
import {
	GET_JOBS,
	JOB_ERROR,
	DELETE_JOB,
	POST_JOB,
	CLEAR_JOBS,
	GET_JOB,
	APPLY_JOB,
	GET_COUNTS,
	COUNT_ERROR,
} from './constants';

// Get all the Jobs
export const getJobs = () => async (dispatch) => {
	//dispatch({ type: CLEAR_JOBS });
	try {
		const res = await axios.get('/api/jobs/view-jobs');
		dispatch({
			type: GET_JOBS,
			payload: res.data,
		});
	} catch (err) {
		dispatch({
			type: JOB_ERROR,
			payload: err.response.data.message,
		});
	}
};

// Get Jobs by user id
export const getJobsByUserId = (id) => async (dispatch) => {
	dispatch({ type: CLEAR_JOBS });
	try {
		const res = await axios.get(`/api/jobs/view-jobs/${id}`);

		dispatch({
			type: GET_JOBS,
			payload: res.data,
		});
	} catch (err) {
		dispatch({
			type: JOB_ERROR,
			payload: err.response.data.message,
		});
	}
};

export const getAppliedJobs = (id) => async (dispatch) => {
	dispatch({ type: CLEAR_JOBS });
	try {
		const res = await axios.get(`/api/jobs/applied-jobs/${id}`);

		dispatch({
			type: GET_JOBS,
			payload: res.data,
		});
	} catch (err) {
		dispatch({
			type: JOB_ERROR,
			payload: err.response.data.message,
		});
	}
};

// Get Jobs by job id
export const getJobById = (id) => async (dispatch) => {
	dispatch({ type: CLEAR_JOBS });
	try {
		const res = await axios.get(`/api/jobs/view-job/${id}`);

		dispatch({
			type: GET_JOB,
			payload: res.data,
		});
	} catch (err) {
		dispatch({
			type: JOB_ERROR,
			payload: err.response.data.message,
		});
	}
};

// Delete Job
export const deleteJob = (id) => async (dispatch) => {
	try {
		await axios.delete(`/api/jobs/delete-job/${id}`);

		dispatch({
			type: DELETE_JOB,
			payload: id,
		});

		dispatch(setAlert('Job post removed', 'success'));
	} catch (err) {
		dispatch({
			type: JOB_ERROR,
			payload: err.response.data.message,
		});
	}
};

// Post Job
export const postJob = (jobData) => async (dispatch) => {
	try {
		const res = await axios.post(`/api/jobs/post-job`, jobData);

		dispatch({
			type: POST_JOB,
			payload: res.data,
		});

		dispatch(setAlert('Job Post Created', 'success'));
	} catch (err) {
		const errors = err.response.data.message;
		dispatch({
			type: JOB_ERROR,
			payload: err.response.data.message,
		});
		if (errors) {
			errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
		}
	}
};

// Apply Job
export const applyJob = (jobId, applyData) => async (dispatch) => {
	try {
		const res = await axios.post(`/api/jobs/apply-job/${jobId}`, applyData);

		dispatch({
			type: APPLY_JOB,
			payload: res.data,
		});

		dispatch(setAlert('Apply Successful', 'success'));
	} catch (err) {
		dispatch(setAlert('Job already applied', 'danger'));

		dispatch({
			type: JOB_ERROR,
			payload: err.response.data.message,
		});
	}
};

export const jobCount = () => async (dispatch) => {
	try {
		const res = await axios.get('/api/jobs/jobs-count');

		dispatch({
			type: GET_COUNTS,
			payload: res.data,
		});
	} catch (err) {
		dispatch({
			type: COUNT_ERROR,
			payload: err.response.data.message,
		});
	}
};

// Count Job for individual company
