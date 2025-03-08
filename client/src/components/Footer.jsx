import React from 'react'
import './Footer.css' 
import logo from '../assets/img/logo.png'
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <div className="footer-container">
      <div className="logo-container flex-item">
          <img src={logo} alt="logo artevivo" width="30" />
          <p className="logo-caption">©2025 ArteVivo.  <span className='logo-span' style={{color: "rgb(244, 174, 112)"}}>All rights reserved.</span>Privacy Policy.</p>
      </div>
      <div className='flex-right'>
        <div className='flex-item'>
        
          <Link className="resource-link" to="/">Nosotros</Link>
          <Link className="resource-link" to="/courses">Cursos</Link>
          <Link className="resource-link" to="/registerTeacher">Quiero ser Profesor</Link>
          <Link className="resource-link" to="/register">Quiero aprender</Link>
        </div>  
        <div className='flex-item'>
          <Link className="resource-link" to="/dashboard/pageBooks">Libros</Link>
          <Link className="resource-link" to="/login">Mi espacio</Link>
          <Link className="resource-link" href="https://github.com/Nho89/ArteVivo.git">Github</Link>
        
        </div>

      </div>
      
    </div>
  )
}

export default Footer