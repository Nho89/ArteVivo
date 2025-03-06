import React from 'react';
import { Link } from 'react-router-dom';
import './navbar.css';

export default function Navbar() {
  return (
    <div className='nav-container'> 
    <div className="nav-links-container">
          <Link className="source-link" to="/">Artevivo</Link>
          <Link className="source-link" to="/">Home</Link>
          <Link className="source-link" to="/register">Register</Link>
          <Link className="source-link" to="/login">Login</Link>
          <Link className="source-link" to="/dashboard/studentPage">Student Page</Link>
          <Link className="source-link" to="/dashboard/teacherPage">Teacher Page</Link>
       
          <Link className="source-link" to="/dashboard/pageBooks">Books</Link>
     </div>   
  </div>
  );
}
