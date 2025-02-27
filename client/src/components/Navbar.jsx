import React from 'react'
import { Link } from 'react-router-dom';
import headImg from '../assets/Rectangle 12.png'

export default function Navbar() {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light mb-0"  style={{backgroundImage:`url(${headImg})`, backgroundSize:'cover', backgroundPosition: 'center' ,minHeight: '150px' }}>
            <div className="container">
                <Link className="navbar-brand" to="/" style={{color: 'white', fontSize:'45px'}}>Artevivo</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item">
                            <Link className="nav-link" to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/register">Register</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/login">Login</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/dashboard/studentPage">Student Page</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/dashboard/teacherPage">Teacher Page</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/dashboard/pageBooks">Books</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}
