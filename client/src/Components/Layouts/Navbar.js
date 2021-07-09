import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { logout } from '../../Actions/auth';

//import image from '../../img/logo192.png'

const Navbar = ({ auth, logout }) => {
	//const role = auth.user.role                    //if role is re  required
	const { isAuthenticated, isLoading, user } = auth;
	const role = isAuthenticated && user.role;
	const id = isAuthenticated && user._id;
	let route;
	if (role === 'seeker') {
		route = `/seekerProfile/${id}`;
	} else {
		route = `/recruiterProfile/${id}`;
	}
	const authLinks = (
		<Fragment>
			<li>
				<Link to={route}>
					<i className='fas fa-user'></i>{' '}
					<span className='hide-sm'>Profile</span>
				</Link>
			</li>
			<li>
				<Link to='/' onClick={logout}>
					<i className='fas fa-sign-out-alt'></i>{' '}
					<span className='hide-sm'>Logout</span>
				</Link>
			</li>
		</Fragment>
	);

	return (
		<nav className='navbar bg-dark'>
			<Link to='/' className='navbar-brand'>
				{/* <div className = "logo-image">
          <img src={image} alt="logo of the website" />
        </div> */}
				<h1>The Unnamed</h1>
			</Link>
			<ul>
				<li>
					<Link to='/companies'>Companies</Link>
				</li>
				{!isLoading && <Fragment>{isAuthenticated && authLinks}</Fragment>}
			</ul>
		</nav>
	);
};

Navbar.propTypes = {
	logout: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
	auth: state.auth,
});

export default connect(mapStateToProps, { logout })(Navbar);
