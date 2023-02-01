import './App.css';
import Navbar from './components/navbar/navbar';

//importing all of the pages
import AardvarkGames from './pages/aardvarkgames/aardvarkgames';
import BoardGame from './pages/aardvarkgames/boardgame';
import TeamsAndUniversities from './pages/teamsanduniversities/teamsanduniversities';
import Tournament from './pages/tournament/tournament/tournament';
import Schedule from './pages/tournament/schedule';


const App = () => {
  return (
    <div>
      <Navbar />
      <div style={{ margin: 20 }}>
      <Routes>
        <Route path="/aardvarkgames" element={<AardvarkGames />} />
        {/* <Route exact path="/boardgame" element={<BoardGame />} /> */}
        <Route path="/teamsanduniversities" element={<TeamsAndUniversities />} />
        <Route exact path="/tournament" element={<Tournament />} />
        {/* <Route exact path="/schedule" element={<Schedule />} /> */}
      </Routes>
      </div>
    </div>
  );
};

export default App;
