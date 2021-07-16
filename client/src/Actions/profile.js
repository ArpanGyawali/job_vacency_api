import axios from 'axios';
import { setAlert } from './alert';
import {
	PROFILE_ERROR,
	GET_PROFILE,
	ACCOUNT_DELEATED,
	CLEAR_PROFILE,
	GET_PROFILES,
} from './constants';

// Get profiles by ID (also for getting own profile)
export const getProfileById = (userId, role) => async (dispatch) => {
	dispatch({ type: CLEAR_PROFILE });
	try {
		let url;
		if (role === 'seeker') {
			url = `/api/profiles/seeker/${userId}`;
		} else {
			url = `/api/profiles/recruiter/${userId}`;
		}

		const res = await axios.get(url);

		dispatch({
			type: GET_PROFILE,
			payload: res.data,
		});
	} catch (err) {
		dispatch({
			type: PROFILE_ERROR,
			payload: err.response.data.message,
		});
	}
};

// Create and Update User
export const createUpdate =
	(profileData, history, role, id) => async (dispatch) => {
		try {
			let url;
			if (role === 'seeker') {
				url = '/api/profiles/profile-seeker';
			} else {
				url = '/api/profiles/profile-recruiter';
			}
			const res = await axios.post(url, profileData);

			dispatch({
				type: GET_PROFILE,
				payload: res.data,
			});
			dispatch(setAlert('Profile Updated', 'success'));

			if (role === 'seeker') {
				history.push(`/seekerProfile/${id}`);
			} else {
				history.push(`/recruiterProfile/${id}`);
			}
		} catch (err) {
			const errors = err.response.data.message;

			if (errors) {
				errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
			}
			dispatch({
				type: PROFILE_ERROR,
				payload: err.response.data.message,
			});
		}
	};

// Delete account and profile
export const DeleteAccount = (role) => async (dispatch) => {
	if (
		window.confirm(
			'Are you sure you want to DELETE the account? This can NOT be undone!'
		)
	) {
		try {
			let url;
			if (role === 'seeker') {
				url = '/api/profiles/delete-seeker';
			} else {
				url = '/api/profiles/delete-recruiter';
			}

			await axios.delete(url);
			dispatch({ type: CLEAR_PROFILE });
			dispatch({ type: ACCOUNT_DELEATED });

			dispatch(setAlert('Your account has been permanently deleted'));
		} catch (err) {
			dispatch({
				type: PROFILE_ERROR,
				payload: err.response.data.message,
			});
		}
	}
};

// Get all company profiles
export const getCompanies = () => async (dispatch) => {
	dispatch({ type: CLEAR_PROFILE });
	try {
		const res = await axios.get('./api/profiles/recruiters');

		dispatch({
			type: GET_PROFILES,
			payload: res.data,
		});
	} catch (err) {
		dispatch({
			type: PROFILE_ERROR,
			payload: err.response.data.message,
		});
	}
};
