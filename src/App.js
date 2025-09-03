// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import TeacherDashboard from './components/TDashboard';
import StudentDashboard from './components/SDashboard';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path='/tdashboard' element={<TeacherDashboard/>} />
        <Route path='/sdashboard' element={<StudentDashboard/>} />


      </Routes>
    </Router>
  );
}

export default App;
