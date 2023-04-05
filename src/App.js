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
import CreateTeam from './pages/teamsanduniversities/create-team/create-team';
import Tournament from './pages/tournament/tournament/tournament';
import Schedule from './pages/tournament/schedule/schedule';
import Team from './pages/teamsanduniversities/team/team';
import University from './pages/teamsanduniversities/university/university';
import Home from './pages/home/home';
import Registration from './pages/registration/registration';
import Login from './pages/login/login';
import Profile from './pages/profile/profile';
import ManageTeams from './pages/admin/manageteamsanduniversities/manageteams/manageteams';
import ManageUniversities from './pages/admin/manageteamsanduniversities/manageuniversities/manageuniversities';
import ManageUsers from './pages/admin/manageusers/manageusers';


const App = () => {
  return (
    <div>
      <Navbar />
      <Routes> 
        {/* why sometimes path and other times exact path */}
        <Route path="/aardvarkgames" element={<AardvarkGames />} />
        <Route exact path="/boardgame" element={<BoardGame />} />
        <Route path="/teamsanduniversities" element={<TeamsAndUniversities />} />
        <Route exact path="/tournament" element={<Tournament />} />
        <Route exact path="/schedule" element={<Schedule />} />
        <Route path="/team/:id" element={<Team />} />
        <Route path="/team/create" element={<CreateTeam />} />
        <Route path="/university/:id" element={<University />} />
        <Route exact path="/" element={<Home />} />
        <Route exact path="/register" element={<Registration />} />
        <Route path="/login" element={<Login />} />
        <Route path="/user" element={<Profile />} />
        <Route path="/*" element={<Home />} />
        <Route path="/manageteams" element={<ManageTeams />} />
        <Route path="/manageuniversities" element={<ManageUniversities />} />
        <Route path="/manageusers" element={<ManageUsers />} />
      </Routes>
      <Footer />
    </div>
    );
};

export default App;
