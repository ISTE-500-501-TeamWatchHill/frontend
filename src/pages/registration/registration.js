import React from 'react'
import './registration.css';

const Registration = (props) => {   
    return (
          <>
            <h1 class="centerItem"> Register for the Tournament </h1>
            <h3 class="centerItem"> Sign up as an individual and then find a team! </h3>
            <div class="center">
                <br/><br/>
                <form action="/login" method="get">
                    <label for="fname">First name:</label><br/>
                    <input type="text" id="fname" name="fname" value=""></input><br/><br/>

                    <label for="lname">Last name:</label><br/>
                    <input type="text" id="lname" name="lname" value=""></input><br/><br/>

                    <label for="fname">University Email:</label><br/>
                    <input type="text" id="email" name="email" value=""></input><br/><br/>

                    <label for="fname">Create Password:</label><br/>
                    <input type="text" id="password" name="password" value=""></input><br/><br/>

                    <input type="submit" value="Submit"></input>
                </form>
            </div>
            <br/>
            <h3 class="centerItem"> Already registered? <a href="/login">Login here</a></h3>
          </>
    )
};
  
export default Registration;