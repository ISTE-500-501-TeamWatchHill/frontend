import React from 'react';
// import styles from './boardgame.module.css';
import globalStyles from '../../pages.module.css';
import "@fontsource/mulish";
import Spacer from '../../../components/spacer/spacer';


const BoardGame = () => {
  return (
    <>
      <div className={globalStyles.h1_title_section}>
        <h1 className={globalStyles.h1_title}>Board Game</h1>
      </div>

      <div className={globalStyles.wide_subsection}>
        <h3 className={globalStyles.text}>ABOUT</h3>
        <Spacer height='32px' />
        <p className={`${globalStyles.text} ${globalStyles.wide_p}`}>Aardvark Games announces our newest board game adventure, A New World.</p>
        <Spacer height='32px' />
        <p className={`${globalStyles.text} ${globalStyles.wide_p}`}>A New World requires a team of 2-5 players who will work together to score as many points as possible after being dropped into a new, unpopulated world. The habitats will vary and the team will not know in advance where they will land.</p>
        <Spacer height='32px' />
        <p className={`${globalStyles.text} ${globalStyles.wide_p}`}>Environments could be a desert planet, an underwater location, a water world with scattered islands, an ice covered mountain range, or a jungle full of predatory animals and dangerous plant life. (Advance News! Expansion Pack 1 is in the design phase with additional worlds and resources!)</p>
        <Spacer height='32px' />
        <p className={`${globalStyles.text} ${globalStyles.wide_p}`}>The game is best played in a head-to-head competition with a second team seeking to survive in its own New World, but competing for the same resources. However, with the modifications described for solo team play, it is possible to enjoy striving to beat your own prior scores.</p>
      </div>

      <div className={globalStyles.wide_subsection}>
        <h3 className={globalStyles.text}>ROLES</h3>
        <Spacer height='32px' />
        <p className={`${globalStyles.text} ${globalStyles.wide_p}`}>Every team must designate the roles for each player prior to beginning play. If a team has fewer than five players, team members may assume more than one role.</p>
        {/* TODO: Table */}
        <Spacer height='32px' />
        <p className={`${globalStyles.text} ${globalStyles.wide_p}`}><strong>TODO: Table of roles here</strong></p>
        <Spacer height='32px' />
        <p className={`${globalStyles.text} ${globalStyles.wide_p}`}>This game is appropriate for ages 13 and over. Play time runs 60-90 minutes.</p>
      </div>
    </>
  )
};
  
export default BoardGame;