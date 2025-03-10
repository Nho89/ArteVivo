import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

export default function Navbar() {
    return (
        <nav className="navbar navbar-expand-lg nav-container">
            <div className="container nav-links-container">
                <div className="navbar-brand">
                    <Link to="/"><img src="https://res.cloudinary.com/artevivo/image/upload/v1741366541/Brown_Black_Modern_Elegant_Letter_AV_Logo_1_1_ktuobs.png" alt="Logo" className="nav-logo" /></Link>
                </div>                
                <div className="navbar-nav d-flex justify-content-center w-100">
                    <Link className="nav-link" to="/">Home</Link>
                    <Link className="nav-link" to="/register">Registro estudiantes</Link>
                    <Link className="nav-link" to="/login">Login</Link>
                    <Link className="nav-link" to="/registerTeacher">Registro profesores</Link>
                    <Link className="nav-link" to="/dashboard/pageBooks">Libros</Link>
                </div>
            </div>
            
        </nav>
    
    
    
    );
}
