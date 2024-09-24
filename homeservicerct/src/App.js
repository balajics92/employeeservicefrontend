import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import ServiceEmployeeRegistration from './components/ServiceEmployeeRegistration';
import ServiceEmployeeData from './components/ServiceEmployeeData';
import Header from './components/Header';
import './App.css';

function App() {
  const location = useLocation();
  const navigate = useNavigate();

  const noNavbarRoutes = ['/serviceemployeereg', '/serviceemployeedata'];

  const showNavbar = !noNavbarRoutes.includes(location.pathname);

  const backToHome = () => {
    navigate('/');
  };

  return (
    <div className='App'>
      <Header
        title={
          showNavbar ? (
            'Welcome to Home Service Application'
          ) : (
            <button onClick={backToHome}>Back to Home</button>
          )
        }
      />

      {showNavbar && (
        <nav>
          <h3>
            <Link to='/serviceemployeereg'>Service Employee Registration</Link>
          </h3>

          <h3>
            <Link to='/serviceemployeedata'>Service Employee Bookings</Link>
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
