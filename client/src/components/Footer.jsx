import React from 'react'
import './Footer.css' 
import logo from '../assets/img/logo.png'

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
          <li><a className='link_footer' href="./registerTeacher">Quiero ser profesor</a></li>
          <li><a className='link_footer' href="./register">Quiero aprender</a></li>
        </ul>
        <ul>
          <li><a className='link_footer' href="./pageBooks">Libros</a></li>
          <li><a className='link_footer' href="./login">Mi espacio</a></li>
          <li><a className='link_footer' href="https://github.com/Nho89/ArteVivo.git">Github</a></li>
        </ul>
      </div>
    </div>
  )
}

export default Footer