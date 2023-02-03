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
                <Spacer height='42px' />
                <div className='countdown'>TODO: Dynamic countdown timer here</div>
                <Spacer height='40px' />
                <div className='button-row'>
                    <Button name="Learn More"/>
                    <Spacer width="20px"/>
                    <Button name="Register"/>
                </div>
            </div>
        </>
    )
};
  
export default Home;