import axios from 'axios';
import { setAlert } from './alert';
import { PROFILE_ERROR, GET_PROFILE } from './constants';

export const getMyProfile = () => async (dispatch) => {
	try {
		const res = await axios.get('./api/profiles/myProfile');

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

export const createUpdate =
	(profileData, history, role) => async (dispatch) => {
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
				history.push('/Seeker-Dashboard');
			} else {
				history.push('/Recruiter-Dashboard');
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
