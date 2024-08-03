import React, { useState, useEffect } from 'react';
import logo from '../asset/logo.png';
import './navbar.css';
import { Link, useLocation } from 'react-router-dom';

export default function Navbar() {
    const location = useLocation();
    const loc = location.pathname;
    const [isToggled, setIsToggled] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 1000);

    const handleResize = () => {
        setIsMobile(window.innerWidth < 992);
    };

    useEffect(() => {
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const handleToggle = () => {
        setIsToggled(!isToggled);
    };

    return (
        <nav className={`navbar navbar-expand-lg ${isMobile && isToggled ? 'bg-black' : ''}`}>
            <div className="container-fluid">
                <Link to="/home">
                    <img id='logo' src={logo} alt='LOGO' />
                </Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded={isToggled}
                    aria-label="Toggle navigation"
                    onClick={handleToggle}
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className={`collapse navbar-collapse justify-content-center ${isToggled ? 'show' : ''}`} id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link to="/home" className={`nav-link ${loc === '/home' || loc === '/' ? 'act' : ''}`}>Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/about" className={`nav-link ${loc === '/about' ? 'act' : ''}`}>About Us</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/room" className={`nav-link ${loc === '/room' ? 'act' : ''}`}>Rooms</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/activity" className={`nav-link ${loc === '/activity' ? 'act' : ''}`}>Activity</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/gallery" className={`nav-link ${loc === '/gallery' ? 'act' : ''}`}>Photo Gallery</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/contact" className={`nav-link ${loc === '/contact' ? 'act' : ''}`}>Contact Us</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/book-now" className={`nav-link ${loc === '/book-now' ? 'act' : ''}`}><button type="button" className="btn book">BOOK NOW</button></Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}
