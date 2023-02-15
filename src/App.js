import './App.css';
import React from "react";
import Navbar from './components/navbar/navbar';
import Footer from './components/footer/footer';

// We use Route in order to define the different routes of our application
import { Route, Routes } from "react-router-dom";

//importing all of the pages
import AardvarkGames from './pages/aardvarkgames/aardvarkgames/aardvarkgames';
import BoardGame from './pages/aardvarkgames/boardgame/boardgame';
import TeamsAndUniversities from './pages/teamsanduniversities/teamsanduniversities/teamsanduniversities';
import Tournament from './pages/tournament/tournament/tournament';
import Schedule from './pages/tournament/schedule/schedule';
import Team from './pages/teamsanduniversities/team/team';
import Home from './pages/home/home';
import Registration from './pages/registration/registration';


const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/aardvarkgames" element={<AardvarkGames />} />
        <Route exact path="/boardgame" element={<BoardGame />} />
        <Route path="/teamsanduniversities" element={<TeamsAndUniversities />} />
        <Route exact path="/tournament" element={<Tournament />} />
        <Route exact path="/schedule" element={<Schedule />} />
        <Route exact path="/team" element={<Team />} />
        <Route exact path="/" element={<Home />} />
        <Route exact path="/register" element={<Registration />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
