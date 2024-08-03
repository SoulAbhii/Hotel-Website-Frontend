import React from 'react';
import './HotelAmenities.css';
import { FaBed, FaWifi, FaParking, FaSwimmingPool, FaUtensils, FaSpa, FaBicycle } from 'react-icons/fa'; // FontAwesome icons
import { MdHotTub, MdFitnessCenter } from 'react-icons/md'; // Material Design icons

const HotelAmenities = () => {
  return (
    <div className="amenities-container">
      <h2 className="amenities-heading">Hotel Amenities</h2>
      <ul className="amenities-list container">
        <li className="icon"><FaBed  /></li>
        <li className="icon"><FaWifi /></li>
        <li className="icon"><FaParking /></li>
        <li className="icon"><FaSwimmingPool /></li>
        <li className="icon"><FaUtensils /></li>
        <li className="icon"><FaSpa /></li>
        <li className="icon"><FaBicycle /></li>
        <li className="icon"><MdHotTub /></li>
        <li className="icon"><MdFitnessCenter /></li>
      </ul>
    </div>
  );
}

export default HotelAmenities;
