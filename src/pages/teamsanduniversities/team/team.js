import React from 'react'
import image from '../../../components/placeholder.png';
import { useParams } from 'react-router-dom';
import globalStyles from '../../pages.module.css';
import styles from './team.module.css';
import Header from '../../../components/header/header';
import MemberBlock from '../../../components/memberblock/memberblock';
import Cookies from 'universal-cookie';
// import { Navigate, useNavigate } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import Button from '../../../components/button/button';
import Spacer from '../../../components/spacer/spacer';


//Hard coded for now- will grab from database
const members = [ 
  { id: 1533, name: 'John Smith', image: image },
  { id: 2354, name: 'Jane Doe', image: image },
  { id: 3876, name: 'Cindy Lou', image: image },
  { id: 4767, name: 'Mary', image: image },
];

const Team = (props) => { 
  // Needed for all API calls
  // const BASE_URL = process.env.REACT_APP_BASE_URL;
  const cookies = new Cookies();
  const user = cookies.get('user');  

  let { id } = useParams();

  // TODO: Validate user input
  function createTeam(e) {
    e.preventDefault()
    
    // Team owner and univertsity should be derived on backend using token
    const team = {
      teamName: e.target.teamName.value,
      token: user.token,
    }

    // TODO: Post statement here once endpoint is set up

    console.log(team); // TODO: Remove
  }

  if (id === 'create') { // Creating a team
    return (
      <>
        {/* uncomment once page completed */}
        {!user && (
          <Navigate to='/login' replace={true} />
        )}

        <div className={styles.login_section}>
          <h1 className={styles.title}>Create a Team</h1>
          <Spacer height='40px' />
          <form className={styles.form} onSubmit={createTeam}>
              <input className={styles.inputText} type='text' id='teamName' name='teamName' placeholder='Team Name' required></input><br/>
              <Spacer height='18px' />
              <Button type='submit' name='Create Team' width='100%' />
              <Spacer height='40px' />
              <h4 className={styles.h4}>You will be set as the team owner by default, and only students from your university will be able to join your team through invites on your team's page or finding you on the <a className={styles.link} href="/teamsanduniversities" target="_blank">team search page.</a></h4>
              <Spacer height='9px' />
              <h4 className={styles.h4}><a className={styles.link} href="/boardgame" target="_blank">Read more about the rules</a></h4>
          </form>
        </div>
      </>
    )
  } else { // Viewing a team
    return (
          <>
          <div className={globalStyles.background}>
            <Header 
              name={`Team with ID: ${id}`}
            />

            <div className={`${globalStyles.grid_page} ${globalStyles.body_margin} ${globalStyles.margin8_top_bottom}`}>
              <h3 className={`${globalStyles.text} ${styles.university}`}> University Name</h3>

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
            </div>
          </div>
        </>
    )
  }
};
  
export default Team;