import React, {useState, useEffect} from 'react'
import Select from 'react-select'
import globalStyles from '../pages.module.css';
import styles from './profile.module.css';
import { Navigate, useNavigate } from "react-router-dom";
import Cookies from 'universal-cookie';
import Header from '../../components/header/header';


const Profile = (props) => {  

    // Needed for all API calls
    const BASE_URL = process.env.REACT_APP_BASE_URL;
    const cookies = new Cookies();
    const user = cookies.get('user');

    /* TODO:
     * change the Welcome in nav to image
        * need endpoint for this also? 
        * use dummy for now 
     * finish adding in all of the other stuff that's supposed to go on this page as dummy data
     * connect to backend
        * what endpoint will allow me to get user info based on whats in the cookie? 
        * /how do i get this info 
     * style it  
    */
    

    return (
        <>
            {!user && (
                <Navigate to="/" replace={true} />
            )}
          <div className={globalStyles.background}>
            <Header 
              name={`${user.firstName} ${user.lastName}`}
            />
          </div>
        </>
  )
};

export default Profile;