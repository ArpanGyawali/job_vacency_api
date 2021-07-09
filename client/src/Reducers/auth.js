import {
	REGISTER_SUCCESS,
	REGISTER_FAIL,
	LOGIN_SUCCESS,
	LOGIN_FAIL,
	LOGOUT,
	USER_LOADED,
	AUTH_ERROR,
	ACCOUNT_DELEATED,
} from '../Actions/constants';

const initialState = {
	token: localStorage.getItem('token'),
	isAuthenticated: null,
	isLoading: true,
	user: null,
};

const auth = (state = initialState, action) => {
	const { type, payload } = action;

	switch (type) {
		case USER_LOADED:
			return {
				...state,
				user: payload,
				isAuthenticated: true,
				isLoading: false,
			};
		case REGISTER_SUCCESS:
		case LOGIN_SUCCESS:
			localStorage.setItem('token', payload.token);
			return {
				...state,
				...payload,
				isAuthenticated: true,
				isLoading: false,
			};
		case REGISTER_FAIL:
		case LOGIN_FAIL:
		case AUTH_ERROR:
		case ACCOUNT_DELEATED:
		case LOGOUT:
			localStorage.removeItem('token');
			return {
				...state,
				token: null,
				isAuthenticated: false,
				isLoading: false,
				//user: null
			};
		default:
			return state;
	}
};

export default auth;
