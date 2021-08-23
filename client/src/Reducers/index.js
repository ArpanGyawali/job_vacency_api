import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import profile from './profile';
import job from './job';
import count from './count';
import file from './file';

export default combineReducers({
	alert,
	auth,
	profile,
	job,
	count,
	file,
});
