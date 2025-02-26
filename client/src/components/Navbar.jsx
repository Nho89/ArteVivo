import React from 'react'
import { Link } from 'react-router-dom';

export default function Navbar() {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light" style={{ borderBottom: '4px solid #A35401', boxShadow: '0 2px 5px rgba(139, 69, 19, 0.6)' }}>
            <div className="container">
                <Link className="navbar-brand" to="/">Artevivo</Link>
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
