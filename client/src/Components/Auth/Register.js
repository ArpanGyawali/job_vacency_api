import React, { Fragment, useState } from 'react'
import { Link, Redirect  } from 'react-router-dom'
import { connect } from 'react-redux'
import { setAlert } from '../../Actions/alert'
import { register } from '../../Actions/auth'
import PropTypes from 'prop-types'

//import axios from 'axios'

const Register = (props) => {
  const role = props.location.role
  const { setAlert, register, isAuthenticated } = props
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  })

  const { name, email, username, password, confirmPassword } = formData

  const handleChange = ele => setFormData({
    ...formData,
    [ele.target.name]: ele.target.value
  })

  const handleSubmit = async ele => {
    ele.preventDefault()
    if(password !== confirmPassword) {
      setAlert('Passwords do not match', 'danger')
    } else {
      register({ name, username, email, password, role })   //role also passed here
    }   
  }

  //Redirext if authenticated
  if(isAuthenticated) {
    if (role === 'seeker'){
      return <Redirect to='/Seeker-Dashboard' />
    }else {
      return <Redirect to='/Recruiter-Dashboard' />
    }
  }


  return (
    <Fragment>
      <h1 className="large text-primary">Register as {role}</h1>
      <p className="lead"><i className="fas fa-user"></i> Create Your Account</p>
      <form className="form" onSubmit={ele => handleSubmit(ele)}>
        <div className="form-group">
          <input 
            type="text" 
            placeholder="Full Name" 
            name="name" 
            value={name}
            onChange={ele => handleChange(ele)}
          />
        </div>
        <div className="form-group">
          <input 
            type="text" 
            placeholder="Unique Username" 
            name="username" 
            value={username}
            onChange={ele => handleChange(ele)}
          />
        </div>
        <div className="form-group">
          <input 
            type="email" 
            placeholder="Email Address" 
            name="email" 
            value={email}
            onChange={ele => handleChange(ele)}
          />
          <small className="form-text"
            >This site uses Gravatar so if you want a profile image, use a
            Gravatar email</small
          >
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={ele => handleChange(ele)}
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Confirm Password"
            name="confirmPassword"
            value={confirmPassword}
            onChange={ele => handleChange(ele)}
          />
        </div>
        <input type="submit" className="btn btn-primary" value="Register" />
      </form>
      <p className="my-1">
        Already have an account? 
        <Link to={{
          pathname: "/login",
          role: role
        }}>Log in</Link>
      </p>
    </Fragment>           
  )
}

Register.propTypes = {                  //actions to props
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, { setAlert, register })(Register)       
