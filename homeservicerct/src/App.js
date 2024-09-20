// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useLocation } from 'react-router-dom';
import ServiceEmployeeRegistration from './components/ServiceEmployeeRegistration';
import ServiceEmployeeData from './components/ServiceEmployeeData';
import Header from './components/Header';
import './App.css';

function App() {
  const location = useLocation();

  // Define routes where the navbar should be hidden
  const noNavbarRoutes = ['/serviceemployeereg', '/serviceemployeedata']; // Add more routes if needed

  const showNavbar = !noNavbarRoutes.includes(location.pathname);

  return (
    <div className='App'>
      <Header title={showNavbar ? 'Welcome to Home Service Application' : ''} />

      {showNavbar && (
        <nav>
          <h3>
            <Link to='/serviceemployeereg'>Service Employee Registration</Link>
          </h3>

          <h3>
            <Link to='/serviceemployeedata'>Service Employee Data</Link>
          </h3>
        </nav>
      )}

      <Routes>
        <Route path='/serviceemployeereg' element={<ServiceEmployeeRegistration />} />
        <Route path='/serviceemployeedata' element={<ServiceEmployeeData />} />
      </Routes>
    </div>
  );
}

const WrapperApp = () => (
  <Router>
    <App />
  </Router>
);

export default WrapperApp;
