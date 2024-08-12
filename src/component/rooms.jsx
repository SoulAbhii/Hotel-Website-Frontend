import React from 'react';
import './TariffPackages.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone } from '@fortawesome/free-solid-svg-icons';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import Navbar from './navbar';
import RecipeReviewCard from './roomcard';

const TariffPackages = () => {
  return (
    <div className='container-section'>
   
      <div className="header-image">
      <Navbar/>
        <div className="text-overlay ">
          <h2>TARIFF & PACKAGES</h2>
          <button className="book-now">Book Now</button>
        </div>
      </div>
     <div className="section-div">
      <div className="section">
        <h2>Luxury in Every Detail</h2>
        <p>Unwind in our exquisitely designed rooms, crafted for your utmost comfort.</p>
      </div>
      <div className="contact-info">
        <p>CONTACT US FOR LATEST TARIFF & PACKAGES</p>
        <a href="/"><FontAwesomeIcon icon={faPhone} /> +91 9927963686</a>
        <a href="https://wa.me/9811383188"> <FontAwesomeIcon icon={faWhatsapp} className="fa-icon" /> +91 9811383188</a>
      </div>
      <div className="room-section">
        <h2>DELUXE ROOM</h2>
        <img src="./band.png" alt="Deluxe Room 1" />
        <img src="./del2.webp" alt="Deluxe Room 2" />
        <img src="./del3.webp" alt="Deluxe Room 3" />
      </div>
       <div className="room-section">
        <h2>SUPER DELUXE ROOM</h2>
        <img src="./bansd.png" alt="Deluxe Room 1" />
        <img src="./del3.webp" alt="Deluxe Room 2" />
        <img src="./2.webp" alt="Deluxe Room 3" />
      </div>
       <div className="room-section">
        <h2>LUXURY ROOM</h2>
        <img src="./banlu.png" alt="Deluxe Room 1" />
        <img src="./2.webp" alt="Deluxe Room 2" />
        <img src="./del.webp" alt="Deluxe Room 3" />
      </div>
       <div className="room-section">
        <h2>FAMILY LUXURY ROOM</h2>
        <img src="./banfm.png" alt="Deluxe Room 1" />
        <img src="./family2.webp" alt="Deluxe Room 2" />
        <img src="./fm3.webp" alt="Deluxe Room 3" />
      </div>
      <div className="section">
        <h2>Valley Vista Packages</h2>
        <p>"Immerse yourself in unparalleled comfort with our Valley Vista Packages,<br></br>
           offering breathtaking views of lush valleys and serene landscapes. <br></br>
           Experience luxury accommodation combined with the tranquility of nature,
          creating an unforgettable retreat for your mountain getaway."</p>
      </div>
    </div>      
      <RecipeReviewCard/>
    </div>
  );
};

export default TariffPackages;
