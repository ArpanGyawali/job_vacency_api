import React from 'react'
import { Link } from 'react-router-dom'

const Landing = () => {
  return (
    <section className="landing">
      <div className="dark-overlay">
        <div className="landing-inner">
          <h1 className="x-large">Developer Connector</h1>
          <h1 className="large">A Jov Vacancy Web App</h1>
          <p className="lead">
            Provides a job by various recruiter companies for the job seekers out there
          </p>
          <div className="buttons">
            <Link 
              to={{
                pathname: "/register",
                role: "seeker"
              }}
              className="btn btn-primary">Register As Seeker</Link>
            <Link 
              to={{
                pathname: "/register",
                role: "recruiter"
              }} 
              className="btn btn-primary">Register As Recruiter</Link>
            <br />
            <br />
            <Link 
              to={{
                pathname: "/login",
                role: "seeker"
              }}
              className="btn btn-light">Login As Seeker</Link>
            <Link 
              to={{
                pathname: "/login",
                role: "recruiter"
              }}
              className="btn btn-light">Login As Recruiter</Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Landing
