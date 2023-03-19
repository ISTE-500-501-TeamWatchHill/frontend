import React from 'react';
import globalStyles from '../../pages.module.css';
import styles from './aardvarkgames.module.css';
import "@fontsource/mulish";

const AardvarkGames = () => {
    
  return (
    <>
      <div className={`${globalStyles.h1_title_section} ${styles.background}`}>
          <h1 className={globalStyles.h1_title}>Aardvark Games</h1>
      </div>
      
      <div className={`${globalStyles.body_margin} ${globalStyles.margin8_top_bottom}`}>
      <h3 className={`${globalStyles.headline_text}`}>About Aardvark Games</h3>

        <p className={`${globalStyles.green_bar} ${globalStyles.sub_header_spacer}`}>__</p>

        <p className={`${globalStyles.text} ${globalStyles.wide_p} ${globalStyles.sub_text_spacer}`}>Aardvark Games is a tabletop game publisher dedicated to entertaining game players worldwide with products designed to engage and challenge. Our best known games include Meeple City, Beyond the Galaxy, Continental Conquest, Between the Seas and now, A New World.</p>

        <p className={`${globalStyles.text} ${globalStyles.wide_p}`}>Whether you are new to gaming, an experienced game player, a member of a gaming group or someone who prefers to play solo, we seek to make games that will delight and keep you coming back for more!</p>
      </div>
    </>
  )
};
  
export default AardvarkGames;