import React from 'react'
// import styles from './login.module.css';

const Login = (props) => {   
    return (
          <>
            <h1 className="centerItem"> Login </h1>
            <h3 className="centerItem"> Log into your account! </h3>
            <div className="center">
                <br/><br/>
                <form action="/login" method="POST">
                    <label htmlFor="email">University Email:</label><br/>
                    <input type="text" id="email" name="email"></input><br/><br/>

                    <label htmlFor="password">Password:</label><br/>
                    <input type="text" id="password" name="password"></input><br/><br/>

                    <input type="submit" value="Submit"></input>
                </form>
            </div>
            <br/>
            <h3 className="centerItem"> Not registered for the tournament yet? <a href="/register">Register here</a></h3>
            <h3 className="centerItem"> Are you an administrator or moderator? <a href="/stafflogin">Login here</a></h3>
          </>
    )
};
  
export default Login;