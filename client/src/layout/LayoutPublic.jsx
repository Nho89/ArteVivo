import React from 'react';
import { Outlet, useLocation } from 'react-router-dom'; // Import useLocation hook
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const LayoutPublic = () => {
  const location = useLocation(); // Get the current location

  return (
    <>
      {/* Conditionally render the Navbar only if the current path is not '/' */}
      {location.pathname !== '/' && <Navbar />}
      
      {/* The Outlet will render the nested routes */}
      <Outlet />
      
      <Footer />
    </>
  );
};

export default LayoutPublic;
