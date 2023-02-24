import React from 'react'
import './memberblock.css';
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
            <div class="block">
                <div class="flex">
                    <img src={image} alt="Placeholder"/>

                    <div>
                        <h2>{props.member.name}</h2>
                    </div>
                </div>
            </div>
          </>
    )
};
  
export default MemberBlock;