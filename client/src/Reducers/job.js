import {
	GET_JOBS,
	JOB_ERROR,
	DELETE_JOB,
	POST_JOB,
	CLEAR_JOBS,
	GET_JOB,
	APPLY_JOB,
} from '../Actions/constants';

const initialState = {
	job: null,
	jobs: [],
	isLoading: true,
	error: '',
};

const job = (state = initialState, action) => {
	const { type, payload } = action;
	switch (type) {
		case GET_JOBS:
			return {
				...state,
				jobs: payload,
				isLoading: false,
			};
		case GET_JOB:
			return {
				...state,
				job: payload,
				isLoading: false,
			};
		case POST_JOB:
			return {
				...state,
				jobs: [...state.jobs, payload],
				isLoading: false,
			};
		case DELETE_JOB:
			return {
				...state,
				jobs: state.jobs.filter((job) => job._id !== payload),
				isLoading: false,
			};
		case JOB_ERROR:
			return {
				...state,
				error: payload,
				isLoading: false,
			};
		case CLEAR_JOBS:
			return {
				...state,
				jobs: [],
				error: '',
			};
		case APPLY_JOB:
			return {
				...state,
				job: { ...state.job, appliers: payload },
				isLoading: false,
			};
		default:
			return state;
	}
};

export default job;
