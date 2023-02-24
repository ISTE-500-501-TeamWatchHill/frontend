import React from 'react'
import styles from './adminmoderatorlogin.module.css';

const AdminModeratorLogin = () => {   
    return (
          <>
            <h1 className="centerItem"> Login </h1>
            <div className="center">
                <br/><br/>
                <form action="/login" method="POST">
                    <label htmlFor="username">Username:</label><br/>
                    <input type="text" id="email" name="email"></input><br/><br/>

                    <label htmlFor="password">Password:</label><br/>
                    <input type="text" id="password" name="password"></input><br/><br/>

                    <input type="submit" value="Submit"></input>
                </form>
                <br/>
                <h3 className="centerItem"> Are you a player? <a href="/login">Login here</a></h3>
            </div>
          </>
    )
};
  
export default AdminModeratorLogin;