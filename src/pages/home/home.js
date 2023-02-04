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

            <div className='second-section'>
                <h3 className='text'>CAN YOUR UNIVERSITY'S TEAM BRING HOME THE PRIZE?</h3>
                <Spacer height='32px'/>
                <div className='text'>
                    <p className='text'>Gather a team and sign up to play, first for the honor of being your University's championship team and then for the chance to represent your school in continued rounds of global competition.</p>
                    <Spacer height='40px'/>
                    <p className='text'>A New World requires a team of 2-5 players who will work together to score as many points as possible after being dropped into a new, unpopulated world. For the tournament, teams will play in a head-to-head competition with an opponent seeking to survive in its own New World, but competing with your team for the same resources.</p>
                    <Spacer height='40px'/>
                    <p className='text'>Join us for some great gaming fun! Join us for some awesome tournament prizes!</p>
                </div>
            </div>
        </>
    )
};
  
export default Home;