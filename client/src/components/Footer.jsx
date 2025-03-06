import React from 'react'
import logoImg from "../assets/logowhite.png"
import { Link } from 'react-router-dom';
import "./footer.css"

const Footer = () => {
  return (
    <div className="footer-container">

        <div className="logo-container flex-item">
          <img src={logoImg} alt="logo artevivo" width="30" />
          <p className="logo-caption">©2025 ArteVivo.  <span className='logo-span' style={{color: "rgb(244, 174, 112)"}}>All rights reserved.</span>Privacy Policy.</p>
        </div>

        <div className='flex-item'>
                <Link className="resource-link" to="/dashboard/studentPage">Nosotros</Link>
                <Link className="resource-link" to="/dashboard/teacherPage">Cursos</Link>
                <Link className="resource-link" to="/dashboard/pageBooks">Quiero ser Profesor</Link>
        </div>

      <div className='flex-item'>
       <Link className="resource-link" to="/dashboard/teacherPage">Libros</Link>
       <Link className="resource-link" to="/dashboard/pageBooks">Mis spacio</Link>
      </div>

      
        
    </div>
  )
}

export default Footer