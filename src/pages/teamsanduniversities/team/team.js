import React from 'react'
import image from '../../../components/placeholder.png';
import { useParams } from "react-router-dom";
import globalStyles from '../../pages.module.css';
import styles from './team.module.css';
import Button from '../../../components/button/button';
import Header from '../../../components/header/header';
import MemberBlock from '../../../components/memberblock/memberblock';


//Hard coded for now- will grab from database
const members = [ 
  { id: 1533, name: "John Smith", image: image },
  { id: 2354, name: "Jane Doe", image: image },
  { id: 3876, name: "Cindy Lou", image: image },
  { id: 4767, name: "Mary", image: image },
];

const Team = (props) => {   

  // TEMP HARDCODED
  const teamID = "1"; // acting as a substitute for a user's team ID
  let teamNamePrefix = "Team ";
  let teamName = "Temp Name"; // acting as a substitute for a team's name

  let { id } = useParams();

  // edit team name
  function teamNameEditOnSubmit (e) {
    /**
     * TODO: check for default value, check string not empty
     *       strip value, check for bad input...
     */
    e.preventDefault();
    alert(e.target.teamName.value);
  }

  function teamProfilePictureEditOnSubmit (e) {
    /**
     * TODO: check for image size, check for no image
     *       check image type, ...
     */
    e.preventDefault();
    alert("Submit clicked");
  }
  
  function teamRosterEditOnSubmit (e) {
    // TODO
    e.preventDefault();
  }

  return (
        <>
          <Header 
            name={teamNamePrefix + teamName}
          />

        <div className={`${globalStyles.grid_page} ${globalStyles.body_margin} ${globalStyles.margin8_top_bottom}`}>
          <h3 className={`${globalStyles.text} ${styles.university}`}>Dynamic University Name TODO</h3>

          <div className={globalStyles.grid}>
              {/* Team Members */}
              {
                  // eslint-disable-next-line
                  members.map((member) => {
                      return (
                          <MemberBlock member={member} />
                      )
                  })
              }
          </div>

          { teamID == id &&
            <div className={styles.editButtonRow}>
              <Button name='Edit Team Name' />
              <Button name='Edit Team Profile Picture' />
              <Button name='Edit Roster' />
            </div>
          }

          <hr/>
          <form className={styles.editTeamNameForm} onSubmit={teamNameEditOnSubmit}>
            <h5>Has prefix "Team " (with space)</h5>
            <input defaultValue={teamName} name='teamName' placeholder='Team Name'/><br/>
            <Button name='Cancel' />
            <Button type='submit' name='Save' />
          </form>
          
          <hr/>
          <form className={styles.editTeamProfilePicture} onSubmit={teamProfilePictureEditOnSubmit}>
            <h5>Change profile picture (or default will be provided)</h5>
            <input type="file" name="teamProfilePicture" accept="image/*" /><br/>
            <Button name='Cancel' />
            <Button type='submit' name='Save' />
            <br/>
            {/* TODO: Add confirm button */}
            <Button type='submit' name='Delete Exisiting Photo' /> 
          </form>


          <hr/>
          <h5>Current Roster</h5>
          {
            // eslint-disable-next-line
            members.map(member => {
              return (
                <>
                  <div>{member.name}</div><Button name='Remove' onClick={function () { alert(`Removing user ${member.name}`); } } /><br />
                </>
              )
            })
          }
          <form className={styles.editTeamRosterForm} onSubmit={teamRosterEditOnSubmit}>
            <h5>Add to Roster by Email</h5>
            <input type='email' placeholder='Email'/>
            <Button type='submit' name='Request user join roster' />
          </form>

        </div>
      </>
  )
};
  
export default Team;