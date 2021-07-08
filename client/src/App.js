import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './Components/Layouts/Navbar';
import Landing from './Components/Layouts/Landing';
import Register from './Components/Auth/Register';
import Login from './Components/Auth/Login';
import Alert from './Components/Layouts/Alert';
import SeekerDash from './Components/Dashboard/SeekerDash';
import RecruiterDash from './Components/Dashboard/RecruiterDash';
import MySeekerProfile from './Components/Layouts/MySeekerProfile';
import MyRecruiterProfile from './Components/Layouts/MyRecruiterProfile';
import CreateSeekerProfile from './Components/Layouts/CreateSeekerProfile';
import CreateRecruiterProfile from './Components/Layouts/CreateRecruiterProfile';
import EditSeekerProfile from './Components/Layouts/EditSeekerProfile';
import EditRecruiterProfile from './Components/Layouts/EditRecruiterProfile';
import { loadUser } from './Actions/auth';
import setAuthToken from './Utils/setAuthToken';
import PrivateRoute from './Components/PrivateRouting/PrivateRoute';
// import Particles from 'react-particles-js'
import './App.css';
// Redux
import { Provider } from 'react-redux';
import store from './store';
// const ParticlesParams = {
//   particles: {
//     number: {
//       value: 70,
//       density: {
//         enable:true,
//         value_area: 600
//       }
//     }
// }}

if (localStorage.token) {
	setAuthToken(localStorage.token);
}

const App = () => {
	useEffect(() => {
		store.dispatch(loadUser());
	}, []);

	return (
		<Provider store={store}>
			<Router>
				<Fragment>
					{/* <Particles className='particles' params={ParticlesParams}/> */}
					<Navbar />
					<Route exact path='/' component={Landing} />
					<section className='container'>
						<Alert />
						<Switch>
							<Route exact path='/register' component={Register} />
							<Route exact path='/login' component={Login} />
							<PrivateRoute
								exact
								path='/Seeker-Dashboard'
								component={SeekerDash}
							/>
							<PrivateRoute
								exact
								path='/Recruiter-Dashboard'
								component={RecruiterDash}
							/>
							<PrivateRoute
								exact
								path='/mySeekerProfile'
								component={MySeekerProfile}
							/>
							<PrivateRoute
								exact
								path='/myRecruiterProfile'
								component={MyRecruiterProfile}
							/>
							<PrivateRoute
								exact
								path='/createSeekerProfile'
								component={CreateSeekerProfile}
							/>
							<PrivateRoute
								exact
								path='/createRecruiterProfile'
								component={CreateRecruiterProfile}
							/>
							<PrivateRoute
								exact
								path='/updateSeekerProfile'
								component={EditSeekerProfile}
							/>
							<PrivateRoute
								exact
								path='/updateRecruiterProfile'
								component={EditRecruiterProfile}
							/>
						</Switch>
					</section>
				</Fragment>
			</Router>
		</Provider>
	);
};

export default App;
