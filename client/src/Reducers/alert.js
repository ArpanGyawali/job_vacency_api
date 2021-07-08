import { SET_ALERT, REMOVE_ALERT } from '../Actions/constants';

const initialState = []; //id, message and alertType

const alert = (state = initialState, action) => {
	//action contails type and payload(optional)
	const { type, payload } = action;
	switch (type) {
		case SET_ALERT:
			return [...state, payload];
		case REMOVE_ALERT:
			return state.filter((alert) => alert.id !== payload);
		default:
			return state;
	}
};

export default alert;
