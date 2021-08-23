import { GET_COUNTS, COUNT_ERROR } from '../Actions/constants';

const initialState = {
	companies: [],
	isLoading: true,
	error: '',
};

const count = (state = initialState, action) => {
	const { type, payload } = action;
	switch (type) {
		case GET_COUNTS:
			return {
				...state,
				companies: payload,
				isLoading: false,
			};
		case COUNT_ERROR:
			return {
				...state,
				companies: [],
				error: payload,
				isLoading: false,
			};
		default:
			return state;
	}
};

export default count;
