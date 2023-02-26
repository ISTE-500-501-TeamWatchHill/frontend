import React from 'react';
import globalStyles from '../../pages.module.css';
import styles from './aardvarkgames.module.css';
import "@fontsource/mulish";

import Header from '../../../components/header/header';
import Spacer from '../../../components/spacer/spacer';

const AardvarkGames = () => {
    
return (
      <>
        <Header 
          name="Aardvark Games"
        />

        <div className={globalStyles.wide_subsection}>
          <h3 className={globalStyles.text}>ABOUT</h3>
          <Spacer height='32px' />
          <p className={`${globalStyles.text} ${globalStyles.wide_p}`}>Aardvark Games is a tabletop game publisher dedicated to entertaining game players worldwide with products designed to engage and challenge. Our best known games include Meeple City, Beyond the Galaxy, Continental Conquest, Between the Seas and now, A New World.</p>
          <Spacer height='32px' />
          <p className={`${globalStyles.text} ${globalStyles.wide_p}`}>Whether you are new to gaming, an experienced game player, a member of a gaming group or someone who prefers to play solo, we seek to make games that will delight and keep you coming back for more!</p>
        </div>

      </>
  )
};
  
export default AardvarkGames;