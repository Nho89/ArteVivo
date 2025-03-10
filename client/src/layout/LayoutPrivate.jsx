import React, { useContext, useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { useUserContext } from '../context/UserContext';

const LayoutPrivate = () => {
  const { userAuth } = useUserContext();
  const navigate = useNavigate();

   useEffect(() => {
    if (!userAuth) {
      navigate('/login');
    }
  }, [userAuth, navigate]);

  return (
    <div>
      <Navbar/>
      <Outlet/>
      <Footer/>
    </div>
  )
}

export default LayoutPrivate