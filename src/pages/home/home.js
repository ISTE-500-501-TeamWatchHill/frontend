import React from 'react';

import './home.css';
import Button from '../../components/button/button';
import Spacer from '../../components/spacer/spacer';


const Home = () => {
    
    return (
        <>
            <div className='title-section'>
                <h1 className='title'>The New World</h1>
                <Spacer height='16px' />
                <div className='text'>Introducing Aardvark's newest board game, A New World, with a global collegiate competition!</div>
                <div>DD HH MM SS</div>
                <Button name="Learn More"/>
                <Button name="Register"/>
            </div>
        </>
    )
};
  
export default Home;