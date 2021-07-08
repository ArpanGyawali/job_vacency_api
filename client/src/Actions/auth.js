import axios from 'axios';
import { setAlert } from './alert';
import setAuthToken from '../Utils/setAuthToken';
import {
	REGISTER_SUCCESS,
	REGISTER_FAIL,
	LOGIN_FAIL,
	LOGIN_SUCCESS,
	USER_LOADED,
	AUTH_ERROR,
	LOGOUT,
	CLEAR_PROFILE,
} from './constants';

// Load User
export const loadUser = () => async (dispatch) => {
	if (localStorage.token) {
		setAuthToken(localStorage.token);
	}

	try {
		const res = await axios.get('/api/auth');
		dispatch({
			type: USER_LOADED,
			payload: res.data,
		});
	} catch (err) {
		dispatch({
			type: AUTH_ERROR,
		});
	}
};

// Register User
export const register =
	({ name, username, email, password, role }) =>
	async (dispatch) => {
		//because of thunk middleware
		const body = { name, username, email, password };
		try {
			let url;
			if (role === 'seeker') {
				url = '/api/users/register-seeker';
			} else {
				url = '/api/users/register-recruiter';
			}
			const res = await axios.post(url, body);
			dispatch({
				type: REGISTER_SUCCESS,
				payload: res.data,
			});

			dispatch(loadUser());
		} catch (err) {
			const errors = err.response.data.message;

			if (errors) {
				errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
			}

			dispatch({
				type: REGISTER_FAIL,
			});
		}
	};

//Login User
export const login =
	({ username, password, role }) =>
	async (dispatch) => {
		//because of thunk middleware
		const body = { username, password };
		try {
			let url;
			if (role === 'seeker') {
				url = '/api/users/login-seeker';
			} else {
				url = '/api/users/login-recruiter';
			}
			const res = await axios.post(url, body);
			console.log(res.data);
			dispatch({
				type: LOGIN_SUCCESS,
				payload: res.data,
			});

			dispatch(loadUser());
		} catch (err) {
			const errors = err.response.data.message;

			if (errors) {
				errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
			}

			dispatch({
				type: LOGIN_FAIL,
			});
		}
	};

// Logout /Clear Profile
export const logout = () => (dispatch) => {
	dispatch({
		type: CLEAR_PROFILE,
	});
	dispatch({
		type: LOGOUT,
	});
};
