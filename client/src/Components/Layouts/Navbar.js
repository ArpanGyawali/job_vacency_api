import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { PropTypes } from 'prop-types'
import { logout } from '../../Actions/auth'
//import image from '../../img/logo192.png'

const Navbar = ( {auth, logout} ) => {
  //const role = auth.user.role                    //if role is re  required
  const { isAuthenticated, isLoading } = auth

  const authLinks = (
      <li><Link to="/"
      onClick={ logout }>
        <i className="fas fa-sign-out-alt"></i>{' '}
        <span className="hide-sm">Logout</span>
        </Link></li>
  )

  return (
    <nav className="navbar bg-dark">
      <Link to="/" className="navbar-brand">
        {/* <div className = "logo-image">
          <img src={image} alt="logo of the website" />
        </div> */}
        <h1>The Unnamed</h1>
      </Link>    
      <ul>
        <li><Link to="#!">Companies</Link></li>
        { !isLoading && (<Fragment>{ isAuthenticated && authLinks }</Fragment>)}
      </ul> 
    </nav>
  )
}

Navbar.propTypes ={
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  auth: state.auth
}) 

export default connect(mapStateToProps, { logout })(Navbar)