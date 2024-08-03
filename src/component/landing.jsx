import React from 'react';
import './landing.css';
import Navbar from './navbar';
export default function Landing() {
    return (
        <div className='landing'>
            <Navbar />
            <div className="content slideUp">
                <h1>Welcome to Neo Resort</h1>
                <p>Explore the beauty of nature with us!</p>
            </div>
        </div>
    );
}
