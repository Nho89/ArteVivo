import React from 'react'
import './Footer.css' 
import logo from '../assets/img/logo.png'
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <div className="footer-container">
      <div className='container_left'>
        <img src={logo} alt="logo" />
        <p>©2025 ArteVivo. All rights reserved. Privacy Policy.</p>
      </div>
      <div className="footer-links">
        <ul>
          <li><a className='link_footer' href="">Nosotros</a></li>
          <li><a className='link_footer' href="./">Cursos</a></li>
          <li><Link className="link_footer" to="/registerTeacher">Quiero ser profesor</Link></li>
          <li><Link className="link_footer" to="/register">Quiero aprender</Link></li>
        </ul>
        <ul>
          <li><Link className="link_footer" to="/dashboard/pageBooks">Libros</Link></li>
          <li><Link className='link_footer' to="/login">Mi espacio</Link></li>
          <li><a className='link_footer' href="https://github.com/Nho89/ArteVivo.git">Github</a></li>
        </ul>
      </div>
    </div>
  )
}

export default Footer