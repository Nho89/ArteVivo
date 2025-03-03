import React from 'react'
import { Link } from 'react-router-dom';

export default function Navbar() {
    return (
        <nav className="navbar navbar-expand-lg" style={{padding:"0" , backgroundColor:"rgb(253, 230, 222)"}}>
        <div className="container" style={{ backgroundColor: "#333333", margin: "0 30px 0 30px" , padding:"10"}}>
            <div className="navbar-nav d-flex justify-content-center" style={{ width: '100%', flexDirection: 'row' }}>
                <Link className="nav-link" to="/" style={{ color: "rgb(253, 230, 222)", fontSize: "10px", padding: '0 10px' }}>Home</Link>
                <Link className="nav-link" to="/register" style={{ color: "rgb(253, 230, 222)", fontSize: "10px", padding: '0 10px' }}>Register</Link>
                <Link className="nav-link" to="/login" style={{ color: "rgb(253, 230, 222)", fontSize: "10px", padding: '0 10px' }}>Login</Link>
                <Link className="nav-link" to="/dashboard/studentPage" style={{ color: "rgb(253, 230, 222)", fontSize: "10px", padding: '0 10px' }}>Student Page</Link>
                <Link className="nav-link" to="/dashboard/teacherPage" style={{ color: "rgb(253, 230, 222)", fontSize: "10px", padding: '0 10px' }}>Teacher Page</Link>
                <Link className="nav-link" to="/dashboard/pageBooks" style={{ color: "rgb(253, 230, 222)", fontSize: "10px", padding: '0 10px' }}>Books</Link>
            </div>
        </div>
    </nav>
    
    
    
    );
}

