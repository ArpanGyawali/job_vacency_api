import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './Components/Layouts/Navbar';
import Landing from './Components/Layouts/Landing';
import Register from './Components/Auth/Register';
import Login from './Components/Auth/Login';
import AdminLogin from './Components/Auth/AdminLogin';
import Admin from './Components/Profile/Admin';
import Alert from './Components/Layouts/Alert';
import SeekerDash from './Components/Dashboard/SeekerDash';
import RecruiterDash from './Components/Dashboard/RecruiterDash';
import CreateSeekerProfile from './Components/Layouts/CreateSeekerProfile';
import CreateRecruiterProfile from './Components/Layouts/CreateRecruiterProfile';
import EditSeekerProfile from './Components/Layouts/EditSeekerProfile';
import EditRecruiterProfile from './Components/Layouts/EditRecruiterProfile';
import Companies from './Components/Companies/Companies';
import RecruiterProfile from './Components/Profile/RecruiterProfile';
import SeekerProfile from './Components/Profile/SeekerProfile';
import PostJobForm from './Components/Job/PostJobForm';
import Jobs from './Components/Job/Jobs';
import JobById from './Components/Job/JobById';
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
							<Route exact path='/login-admin' component={AdminLogin} />
							<Route exact path='/companies' component={Companies} />
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
							<PrivateRoute
								exact
								path='/recruiterProfile/:id'
								component={RecruiterProfile}
							/>
							<PrivateRoute
								exact
								path='/seekerProfile/:id'
								component={SeekerProfile}
							/>
							<PrivateRoute exact path='/admin-dash' component={Admin} />
							<PrivateRoute exact path='/job/:id' component={JobById} />
							<PrivateRoute exact path='/post-job' component={PostJobForm} />
							<PrivateRoute exact path='/jobs' component={Jobs} />
						</Switch>
					</section>
				</Fragment>
			</Router>
		</Provider>
	);
};

export default App;
