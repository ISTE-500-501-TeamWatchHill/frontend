import React from 'react';
import './tournament.css';
import Spacer from '../../../components/spacer/spacer';

const Tournament = () => {
    
return (
      <>
        <div className='tournament-about-title-section'>
          <h1 className='tournament-about-title'>Tournament</h1>
        </div>

        <div className='second-section'>
          <h3 className='text'>ABOUT</h3>
          <Spacer height='32px' />
          <p className='text'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce lobortis mollis varius. In a rhoncus ex. Vivamus mollis est quis molestie accumsan. Suspendisse gravida, dui non pharetra posuere, tortor ex scelerisque est, id fermentum ligula elit sit amet urna.</p>
        </div>

        <div className='second-section grey'>
          <h3 className='text'>RULES</h3>
          <Spacer height='32px' />
          <p className='text'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce lobortis mollis varius. In a rhoncus ex. Vivamus mollis est quis molestie accumsan. Suspendisse gravida, dui non pharetra posuere, tortor ex scelerisque est, id fermentum ligula elit sit amet urna.</p>
        </div>

        <div className='second-section'>
          <h3 className='text'>HOW TO WIN</h3>
          <Spacer height='32px' />
          <p className='text'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce lobortis mollis varius. In a rhoncus ex. Vivamus mollis est quis molestie accumsan. Suspendisse gravida, dui non pharetra posuere, tortor ex scelerisque est, id fermentum ligula elit sit amet urna.</p>
        </div>

        {/* TODO: Add footer here */}
      </>
  )
};
  
export default Tournament;