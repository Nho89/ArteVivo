import React from 'react'
import logoImg from "../assets/logowhite.png"
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <div style={{display: "flex" ,flexDirection:"row",justifyContent:"space-around",backgroundColor:"#333333", padding:"20px", color:"white"}}>

        <div style={{backgroundColor:"#333333", color:"white"}}>
          <img src={logoImg} alt="logo artevivo" width="30" />
          <p style={{color:"rgb(244, 174, 112)" , fontSize:"0.5em"}}>©2025 ArteVivo.  <span style={{color:"white"}}>All rights reserved.</span>Privacy Policy.</p>
        </div>

      <div>
      
                <Link className="nav-link" to="/dashboard/studentPage" style={{ color: "rgb(253, 230, 222)", fontSize: "10px", padding: '0 10px' }}>Nosotros</Link>
                <Link className="nav-link" to="/dashboard/teacherPage" style={{ color: "rgb(253, 230, 222)", fontSize: "10px", padding: '0 10px' }}>Cursos</Link>
                <Link className="nav-link" to="/dashboard/pageBooks" style={{ color: "rgb(253, 230, 222)", fontSize: "10px", padding: '0 10px' }}>Quiero ser Profesor</Link>
      </div>

      <div>
       <Link className="nav-link" to="/dashboard/teacherPage" style={{ color: "rgb(253, 230, 222)", fontSize: "10px", padding: '0 10px' }}>Libros</Link>
       <Link className="nav-link" to="/dashboard/pageBooks" style={{ color: "rgb(253, 230, 222)", fontSize: "10px", padding: '0 10px' }}>Mis spacio</Link>
      </div>

      
        
    </div>
  )
}

export default Footer