import { v4 as uuidv4 } from 'uuid';
import { SET_ALERT, REMOVE_ALERT } from './constants';

export const setAlert = (message, alertType) => (dispatch) => {
	//because of thunk middleware
	const id = uuidv4(); //gives random long string
	dispatch({
		type: SET_ALERT,
		payload: { message, alertType, id },
	});

	setTimeout(
		() =>
			dispatch({
				type: REMOVE_ALERT,
				payload: id,
			}),
		5000
	);
};
