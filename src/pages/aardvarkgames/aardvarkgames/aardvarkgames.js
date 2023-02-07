import React from 'react';
import './aardvarkgames.css';
import "@fontsource/mulish";
import Spacer from '../../../components/spacer/spacer';

const AardvarkGames = () => {
    
return (
      // <>
      //   <div className='title-section'>
      //     <h1 className="aardvarkgames-title">Aardvark Games</h1>
        
      //     <h3 className='about'>ABOUT</h3>
      //     <p className='info'>Aardvark Games is a tabletop game publisher dedicated to entertaining game players worldwide with products designed to engage and challenge. Our best known games include Meeple City, Beyond the Galaxy, Continental Conquest, Between the Seas and now, A New World. 
      //     Whether you are new to gaming, an experienced game player, a member of a gaming group or someone who prefers to play solo, we seek to make games that will delight and keep you coming back for more!</p>
      //   </div>
      // </>
      <>
        <div className='tournament-about-title-section'>
          <h1 className='tournament-about-title'>Aardvark Games</h1>
        </div>

        <div className='second-section'>
          <h3 className='text'>ABOUT</h3>
          <Spacer height='32px' />
          <p className='text'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce lobortis mollis varius. In a rhoncus ex. Vivamus mollis est quis molestie accumsan. Suspendisse gravida, dui non pharetra posuere, tortor ex scelerisque est, id fermentum ligula elit sit amet urna.</p>
        </div>

        <div className='second-section grey'>
          <h3 className='text'>PRODUCTS</h3>
          <Spacer height='32px' />
          <p className='text'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce lobortis mollis varius. In a rhoncus ex. Vivamus mollis est quis molestie accumsan. Suspendisse gravida, dui non pharetra posuere, tortor ex scelerisque est, id fermentum ligula elit sit amet urna.</p>
        </div>

        {/* TODO: Add footer here */}
      </>
  )
};
  
export default AardvarkGames;