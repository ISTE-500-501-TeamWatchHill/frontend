import React from 'react';

import './home.css';
import Button from '../../components/button/button';
import Spacer from '../../components/spacer/spacer';

// TODO
    // Add footer
    // Make dynamic
    // Make responsive
    // Change images + add alt text
    // Make dynamic timer
    // Add fonts
    // Change favicon
    // Set button functions
        // make button size and shape dynaimc
    // Make components out of repeated items

// TechDebt
    // Refactor dynamic text elements
const Home = () => {
    return (
        <>
            <div className='home-title-section'>
                <h1 className='home-title'>The New World</h1>
                <Spacer height='16px' />
                <div className='text'>Introducing Aardvark's newest board game, A New World, with a global collegiate competition!</div>
                <Spacer height='42px' />
                <div className='countdown'>TODO: Dynamic countdown timer here</div>
                <Spacer height='40px' />
                <div className='button-row'>
                    <Button name="Learn More" transparentBackground={true}/>
                    <Spacer width="20px"/>
                    <Button name="Register for Tournament" link="/register"/>
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

            <div className='third-section'>
                <img src='https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=Aardvark%20Games' alt='TODO'/>
                <Spacer width='75px'/>
                <p className='text'>All players who complete at least one round of tournament play will receive a complimentary copy of A New World. Each university's final round teams will go home with some awesome Aardvark Games swag. The First Place team for each university will receive a cash prize of $1,000 and each individual team member will get a $100 gift certificate for the Aardvark Games online store.</p>
            </div>

            <div className='fourth-section'>
                <h3 className='text'>WHO'S PLAYING?</h3>
                <Spacer height='48px' />
                <div className='teams-playing'>
                    <div className='team-playing'>
                        <img src='https://api.qrserver.com/v1/create-qr-code/?size=80x80&data=Aardvark%20Games' alt='TODO'/>
                        <Spacer width='24px'/>
                        <div className='small-text'>Cornell University</div>
                    </div>

                    <div className='team-playing'>
                        <img src='https://api.qrserver.com/v1/create-qr-code/?size=80x80&data=Aardvark%20Games' alt='TODO'/>
                        <Spacer width='24px'/>
                        <div className='small-text'>University College of Dublin</div>
                    </div>

                    <div className='team-playing'>
                        <img src='https://api.qrserver.com/v1/create-qr-code/?size=80x80&data=Aardvark%20Games' alt='TODO'/>
                        <Spacer width='24px'/>
                        <div className='small-text'>IIT Delhi</div>
                    </div>

                    <div className='team-playing'>
                        <img src='https://api.qrserver.com/v1/create-qr-code/?size=80x80&data=Aardvark%20Games' alt='TODO'/>
                        <Spacer width='24px'/>
                        <div className='small-text'>Kyoto University</div>
                    </div>

                    <div className='team-playing'>
                        <img src='https://api.qrserver.com/v1/create-qr-code/?size=80x80&data=Aardvark%20Games' alt='TODO'/>
                        <Spacer width='24px'/>
                        <div className='small-text'>Pontificia UCC</div>
                    </div>

                    <div className='team-playing'>
                        <img src='https://api.qrserver.com/v1/create-qr-code/?size=80x80&data=Aardvark%20Games' alt='TODO'/>
                        <Spacer width='24px'/>
                        <div className='small-text'>Rochester Institute of Technology </div>
                    </div>
                </div>
            </div>
        </>
    )
};
  
export default Home;