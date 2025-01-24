import React from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from './pages/auth/Login';
import Signup from './pages/auth/Signup';
import ClientDashboard from './pages/ClientDashboard';
import ClientPrograms from './pages/ClientPrograms';
import ClientMessages from './pages/ClientMessages';
import TrainerDashboard from './pages/TrainerDashboard';
import Trainers from './pages/Trainers';
import Clients from './pages/Clients';
import TrainerPrograms from './pages/TrainerPrograms';
import TrainerMessages from './pages/TrainerMessages';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Settings from './pages/Settings';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="client/dashboard" element={<ClientDashboard/>}/>
        <Route path="client/messages" element={<ClientMessages/>}/>
        <Route path="client/trainers" element={<Trainers/>}/>
        <Route path="client/programs" element={<ClientPrograms/>}/>
        <Route path="trainer/dashboard" element={<TrainerDashboard/>}/>
        <Route path="trainer/programs" element={<TrainerPrograms/>}/>
        <Route path="trainer/clients" element={<Clients/>}/>
        <Route path="trainer/messages" element={<TrainerMessages/>}/>
        <Route path="/settings" element={<Settings/>}/>
      </Routes>
    </Router>
  );
}

export default App;
