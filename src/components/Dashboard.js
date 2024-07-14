import React from 'react';
import { Link } from 'react-router-dom';
import '../css/dashboard.css'; 
import prime from '../images/prime-logo.png'

const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="navbar-container">
                <img className='prime-logo' src={prime} />
                <Link to="/home" className="navbar-logo">
                    Prime's World
                </Link>
                <ul className="nav-menu">
                    <li className="nav-item">
                        <Link to="/home" className="nav-links">
                            Home
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/simulate" className="nav-links">
                            Run prim
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/about" className="nav-links">
                            Algorithm
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/quiz" className="nav-links">
                            Take Quiz
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/contact" className="nav-links">
                            Meet Our Team
                        </Link>
                    </li>
                    
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
