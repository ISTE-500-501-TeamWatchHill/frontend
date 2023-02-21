import React from 'react'
// import styles from './registration.module.css';

const Registration = (props) => {   
    return (
          <>
            <h1 className="centerItem"> Register for the Tournament </h1>
            <h3 className="centerItem"> Sign up as an individual and then find a team! </h3>
            <div className="center">
                <br/><br/>
                <form action="/login" method="POST">
                    <label htmlFor="fname">First name:</label><br/>
                    <input type="text" id="fname" name="fname"></input><br/><br/>

                    <label htmlFor="lname">Last name:</label><br/>
                    <input type="text" id="lname" name="lname"></input><br/><br/>

                    <label htmlFor="fname">University Email:</label><br/>
                    <input type="text" id="email" name="email"></input><br/><br/>

                    <label htmlFor="fname">Create Password:</label><br/>
                    <input type="text" id="password" name="password"></input><br/><br/>

                    <input type="submit" value="Submit"></input>
                </form>
            </div>
            <br/>
            <h3 className="centerItem"> Already registered? <a href="/login">Login here</a></h3>
          </>
    )
};
  
export default Registration;