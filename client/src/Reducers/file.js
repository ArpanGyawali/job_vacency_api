import { FILE_ID, FILE_ERROR, DELETE_FILE } from '../Actions/constants';

const initialState = {
	isFile: false,
	fileId: '',
	fileName: '',
	error: '',
};

const fileId = (state = initialState, action) => {
	const { type, payload } = action;
	switch (type) {
		case FILE_ID:
			return {
				...state,
				isFile: true,
				fileId: payload.id,
				fileName: payload.name,
				error: '',
			};
		case DELETE_FILE:
			return {
				...state,
				isFile: false,
				fileId: '',
				fileName: '',
			};
		case FILE_ERROR:
			return {
				...state,
				isFile: false,
				fileId: '',
				fileName: '',
				error: payload,
			};
		default:
			return state;
	}
};

export default fileId;
