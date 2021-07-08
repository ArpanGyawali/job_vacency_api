import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { setAlert } from '../../Actions/alert';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const PrivateRoute = ({ component: Component, auth, ...rest }) => {
	// if (!auth.isAuthenticated && !auth.isLoading) {
	//   setAlert('You need to resister or log in first', 'danger')
	// }
	return (
		<Route
			{...rest}
			render={(props) =>
				!auth.isAuthenticated && !auth.isLoading ? (
					<Redirect to='/' />
				) : (
					<Component {...props} />
				)
			}
		/>
	);
}; //if someone wants to go private toutes without log in

PrivateRoute.propTypes = {
	auth: PropTypes.object.isRequired,
	setAlert: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
	auth: state.auth,
});

export default connect(mapStateToProps, { setAlert })(PrivateRoute);
