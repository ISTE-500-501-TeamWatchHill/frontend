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

    //do we want to include email to contact to form teams or no? 

    // if (!props.member.image) {
    //     throw new Error ("ERROR: No member image.");
    // }

    return (
          <>
            <div className={styles.block}>
                <div className={styles.flexBlock}>
                    <img className={styles.img} src={image} alt="Placeholder"/>

                    <div>
                        <a href='/#' className={globalStyles.text}>{props.member.firstName} {props.member.lastName}</a>
                    </div>
                </div>
            </div>
          </>
    )
};
  
export default MemberBlock;