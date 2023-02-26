import React from 'react';
import globalStyles from '../../pages.module.css';
import styles from './boardgame.module.css';
import "@fontsource/mulish";

import Header from '../../../components/header/header';
import Spacer from '../../../components/spacer/spacer';


const BoardGame = () => {
  return (
    <>
      <Header 
        name="A New World"
      />

      <div className={`${globalStyles.body_margin} ${globalStyles.margin8_top_bottom}`}>
        <h3 className={`${globalStyles.text} ${globalStyles.sub_header_spacer}`}>ABOUT</h3>

        <p className={`${globalStyles.text} ${globalStyles.wide_p} ${globalStyles.sub_text_spacer}`}>Aardvark Games announces our newest board game adventure, A New World.</p>

        <p className={`${globalStyles.text} ${globalStyles.wide_p} ${globalStyles.sub_text_spacer}`}>A New World requires a team of 2-5 players who will work together to score as many points as possible after being dropped into a new, unpopulated world. The habitats will vary and the team will not know in advance where they will land.</p>

        <p className={`${globalStyles.text} ${globalStyles.wide_p} ${globalStyles.sub_text_spacer}`}>Environments could be a desert planet, an underwater location, a water world with scattered islands, an ice covered mountain range, or a jungle full of predatory animals and dangerous plant life. (Advance News! Expansion Pack 1 is in the design phase with additional worlds and resources!)</p>

        <p className={`${globalStyles.text} ${globalStyles.wide_p}`}>The game is best played in a head-to-head competition with a second team seeking to survive in its own New World, but competing for the same resources. However, with the modifications described for solo team play, it is possible to enjoy striving to beat your own prior scores.</p>
      </div>

      <div className={`${globalStyles.body_margin} ${globalStyles.margin8_top_bottom}`}>
        <h3 className={`${globalStyles.text} ${globalStyles.sub_header_spacer}`}>ROLES</h3>

        <p className={`${globalStyles.text} ${globalStyles.wide_p} ${globalStyles.sub_text_spacer}`}>Every team must designate the roles for each player prior to beginning play. If a team has fewer than five players, team members may assume more than one role.</p>

        <table className={`${globalStyles.margin8_bottom} ${styles.table}`}>
          <tbody>
            <tr className={`${styles.table_row} ${styles.grey}`}>
              <td className={styles.cell}>EXPEDITION LEADER</td>
              <td className={styles.cell}>This team member will make decisions on when and how action cards are played. They facilitate the team's joint strategic planning and manage the expedition budget.</td>
            </tr>
            <tr className={styles.table_row}>
              <td className={styles.cell}>RESOURCE SPECIALIST</td>
              <td className={styles.cell}>This team member is responsible for obtaining the resources required for survival on arrival and the establishment of a base on the new world.</td>
            </tr>
            <tr className={`${styles.table_row} ${styles.grey}`}>
              <td className={styles.cell}>SCIENTIST</td>
              <td className={styles.cell}>This team member collects knowledge cards that allow the team an advantage in knowing how to overcome obstacles and which actions are most likely to succeed.</td>
            </tr>
            <tr className={styles.table_row}>
              <td className={styles.cell}>TECHNICIAN</td>
              <td className={styles.cell}>This team member uses tool and technology cards to create the team base and repair machines and weapons as needed.</td>
            </tr>
            <tr className={`${styles.table_row} ${styles.grey}`}>
              <td className={styles.cell}>WEAPONS SPECIALIST</td>
              <td className={styles.cell}>This team member leads the team defense strategies and works to gain points to raise each team member's skill level on the weapon classes best suited to the current habitat.</td>
            </tr>
          </tbody>
        </table>

        <p className={`${globalStyles.text} ${globalStyles.wide_p} ${globalStyles.margin8_bottom}`}>This game is appropriate for ages 13 and over. Play time runs 60-90 minutes.</p>
      </div>
    </>
  )
};
  
export default BoardGame;