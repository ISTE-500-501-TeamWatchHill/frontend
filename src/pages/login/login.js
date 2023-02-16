import React from 'react'
import './login.css';

const Login = (props) => {   
    return (
          <>
            <h1 class="centerItem"> Login </h1>
            <h3 class="centerItem"> Log into your account! </h3>
            <div class="center">
                <br/><br/>
                <form action="/login" method="get">
                    <label for="fname">University Email:</label><br/>
                    <input type="text" id="email" name="email" value=""></input><br/><br/>

                    <label for="fname">Password:</label><br/>
                    <input type="text" id="password" name="password" value=""></input><br/><br/>

                    <input type="submit" value="Submit"></input>
                </form>
            </div>
            <br/>
            <h3 class="centerItem"> Not registered for the tournament yet? <a href="/register">Register here</a></h3>
          </>
    )
};
  
export default Login;