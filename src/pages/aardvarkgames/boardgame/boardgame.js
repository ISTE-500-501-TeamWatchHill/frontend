import React from 'react';
import globalStyles from '../../pages.module.css';
import styles from './boardgame.module.css';
import "@fontsource/mulish";

import Header from '../../../components/header/header';
// import Spacer from '../../../components/spacer/spacer';


const BoardGame = () => {
  return (
    <>
    <div className={globalStyles.boardgamebackground}>
      <Header 
        name="A New World"
      />

      <div className={`${globalStyles.thintext_margin} ${globalStyles.margin8_top} ${globalStyles.center_text}`}>
          <h3 className={globalStyles.headline_text}>About</h3>

          <p className={`${globalStyles.green_bar} ${globalStyles.sub_header_spacer}`}>____</p>

          <p className={`${globalStyles.text} ${globalStyles.p} ${globalStyles.sub_text_spacer}`}>Aardvark Games announces our newest board game adventure, A New World. A New World requires a team of 2-5 players who will work together to score as many points as possible after being dropped into a new, unpopulated world. The habitats will vary and the team will not know in advance where they will land.</p>
          <p className={`${globalStyles.text} ${globalStyles.p} ${globalStyles.sub_text_spacer}`}>Environments could be a desert planet, an underwater location, a water world with scattered islands, an ice covered mountain range, or a jungle full of predatory animals and dangerous plant life. (Advance News! Expansion Pack 1 is in the design phase with additional worlds and resources!)</p>
          <p className={`${globalStyles.text} ${globalStyles.p} ${globalStyles.margin20_bottom}`}>The game is best played in a head-to-head competition with a second team seeking to survive in its own New World, but competing for the same resources. However, with the modifications described for solo team play, it is possible to enjoy striving to beat your own prior scores.</p>

      
          <h3 className={globalStyles.headline_text}>Roles</h3>

          <p className={`${globalStyles.green_bar} ${globalStyles.sub_header_spacer}`}>____</p>

          <p className={`${globalStyles.p} ${globalStyles.text} ${globalStyles.margin8_bottom}`}>Every team must designate the roles for each player prior to beginning play. If a team has fewer than five players, team members may assume more than one role.</p>

          <div className={`${styles.green_box_role} ${globalStyles.margin8_top} ${globalStyles.margin4_bottom}`}>
              <p className={styles.role}>EXPEDITION LEADER</p>
              <p className={`${globalStyles.sub_text} ${styles.left_text}`}>This team member will make decisions on when and how action cards are played. They facilitate the team's joint strategic planning and manage the expedition budget.</p>
          </div>

          <div className={`${styles.green_box_role} ${globalStyles.margin4_bottom}`}>
              <p className={styles.role}>RESOURCE SPECIALIST</p>
              <p className={`${globalStyles.sub_text} ${styles.left_text}`}>This team member is responsible for obtaining the resources required for survival on arrival and the establishment of a base on the new world.</p>
          </div>

          <div className={`${styles.green_box_role} ${globalStyles.margin4_bottom}`}>
              <p className={styles.role}>SCIENTIST</p>
              <p className={`${globalStyles.sub_text} ${styles.left_text}`}>This team member collects knowledge cards that allow the team an advantage in knowing how to overcome obstacles and which actions are most likely to succeed.</p>
          </div>

          <div className={`${styles.green_box_role} ${globalStyles.margin4_bottom}`}>
              <p className={styles.role}>TECHNICIAN</p>
              <p className={`${globalStyles.sub_text} ${styles.left_text}`}>This team member uses tool and technology cards to create the team base and repair machines and weapons as needed.</p>
          </div>

          <div className={styles.green_box_role}>
              <p className={styles.role}>WEAPONS SPECIALIST</p>
              <p className={`${globalStyles.sub_text} ${styles.left_text}`}>This team member leads the team defense strategies and works to gain points to raise each team member's skill level on the weapon classes best suited to the current habitat.</p>
          </div>

          <p className={`${globalStyles.text} ${globalStyles.p} ${globalStyles.margin8_top}`}>This game is appropriate for ages 13 and over. Play time runs 60-90 minutes.</p>
      </div>
    </div>
    <div className={globalStyles.green_block}></div>
    </>
  )
};
  
export default BoardGame;