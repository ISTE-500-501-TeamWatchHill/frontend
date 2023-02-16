import React from 'react';
// import styles from './aardvarkgames.module.css';
import globalStyles from '../../pages.module.css';
import "@fontsource/mulish";
import Spacer from '../../../components/spacer/spacer';

const AardvarkGames = () => {
    
return (
      <>
        <div className={globalStyles.h1_title_section}>
          <h1 className={globalStyles.h1_title}>Aardvark Games</h1>
        </div>

        <div className={globalStyles.subsection}>
          <h3 className={globalStyles.text}>ABOUT</h3>
          <Spacer height='32px' />
          <p className={`${globalStyles.text} ${globalStyles.p}`}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce lobortis mollis varius. In a rhoncus ex. Vivamus mollis est quis molestie accumsan. Suspendisse gravida, dui non pharetra posuere, tortor ex scelerisque est, id fermentum ligula elit sit amet urna.</p>
        </div>

        <div className={`${globalStyles.subsection}`}>
          <h3 className={globalStyles.text}>PRODUCTS</h3>
          <Spacer height='32px' />
          <p className={`${globalStyles.text} ${globalStyles.p}`}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce lobortis mollis varius. In a rhoncus ex. Vivamus mollis est quis molestie accumsan. Suspendisse gravida, dui non pharetra posuere, tortor ex scelerisque est, id fermentum ligula elit sit amet urna.</p>
        </div>
      </>
  )
};
  
export default AardvarkGames;