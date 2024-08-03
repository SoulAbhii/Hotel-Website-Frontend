import React from 'react';
import './footer.css';
import logo from '../asset/logo.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons';
import Copy from './copy';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <>
      <footer className="footer">
        <div className="container">
          <div className="row">
            <div className="col">
              <h3>About Us</h3>
              <img src={logo}></img>
              <p>Your Resort is a luxurious destination...</p>
            </div>
            <div className="col">
              <h3>Quick Links</h3>
              <ul>
                <li> <Link to="/home" >Home</Link></li>
                <li> <Link to="/about"> About us</Link></li>
                <li> <Link to="/room" >Rooms</Link></li>
                <li> <Link to="/home" >Activities</Link></li>
                <li> <Link to="/gallery" >Gallery</Link></li>
                <li> <Link to="/contact" >Contact US</Link></li>
                <li> <Link to="/book-now" >BOOK NOW</Link></li>
              </ul>
            </div>
            <div className="col">
              <h3>Contact Us</h3>
              <p>573, Mandakini Enclave, Gate No 1, next to Don Bosco School, Alaknanda, New Delhi</p>
              <p>Phone: +91 9811383188</p>
              <p>+91 9927963686</p>
              <p>Email: neoresortkanatal@gmail.com</p>
            </div>
            <div className="col">
              <h3>Follow Us</h3>
              <ul className="social-icons">
                <li><a href="#"><FontAwesomeIcon icon={faFacebook} /></a></li>
                <li><a href="#"><FontAwesomeIcon icon={faTwitter} /></a></li>
                <li><a href="#"><FontAwesomeIcon icon={faInstagram} /></a></li>
              </ul>
            </div>

          </div>
        </div>

      </footer>
      <Copy />
    </>
  );
}


