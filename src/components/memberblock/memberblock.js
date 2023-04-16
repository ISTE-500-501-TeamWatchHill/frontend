import React from 'react'
import globalStyles from '../../pages/pages.module.css';
import styles from './memberblock.module.css';
import image from '../placeholder.png';

const MemberBlock = (props) => {   
    if (!props.member._id) {
        throw new Error ("ERROR: No member id.");
    }

    if (!props.member.firstName) {
        throw new Error ("ERROR: No member name.");
    }

    if (!props.member.lastName) {
        throw new Error ("ERROR: No member name.");
    }

    return (
          <>
            <div className={styles.block}>
                <div className={styles.flexBlock}>
                    <img className={styles.img} src={image} alt="Placeholder"/>

                    <div>
                        <div className={globalStyles.text}>{props.member.firstName} {props.member.lastName}</div>
                    </div>
                </div>
            </div>
          </>
    );
};
  
export default MemberBlock;