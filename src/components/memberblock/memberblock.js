import React from 'react'
import styles from './memberblock.module.css';
import globalStyles from '../../pages/pages.module.css';
import image from '../placeholder.png';

const MemberBlock = (props) => {   
    if (!props.member.id) {
        throw new Error ("ERROR: No member id.");
    }

    if (!props.member.name) {
        throw new Error ("ERROR: No member name.");
    }

    if (!props.member.image) {
        throw new Error ("ERROR: No member image.");
    }

    return (
          <>
            <div className={styles.block}>
                <div className={styles.flex}>
                    <img className={styles.img} src={image} alt="Placeholder"/>

                    <div>
                        <a className={globalStyles.text}>{props.member.name}</a>
                    </div>
                </div>
            </div>
          </>
    )
};
  
export default MemberBlock;