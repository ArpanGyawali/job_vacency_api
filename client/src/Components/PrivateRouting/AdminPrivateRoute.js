import React, { Fragment } from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const AdminPrivateRoute = ({ component: Component, auth, ...rest }) => {
	return (
		<Route
			{...rest}
			render={(props) => (
				<Fragment>
					{!auth.isAuthenticated && !auth.isLoading ? (
						<Redirect to='/' />
					) : (
						<Component {...props} />
					)}
					{auth.user && !auth.user.role !== 'admin' ? (
						<Redirect to='/jobs' />
					) : (
						<Component {...props} />
					)}
				</Fragment>
			)}
		/>
	);
}; //if someone wants to go private toutes without log in

AdminPrivateRoute.propTypes = {
	auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
	auth: state.auth,
});

export default connect(mapStateToProps, {})(AdminPrivateRoute);
