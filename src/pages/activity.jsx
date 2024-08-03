import React from 'react';
import './Acti.css';
import Navbar from '../component/navbar';
import Footer from '../component/footer';
import tra from '../asset/Trekking.jpg';
import nature from '../asset/Nature Stay.jpg';
import valley from '../asset/Valley Crossing.jpg';
import sight from '../asset/yellow.jpg'
import repel from '../asset/Rappelling.jpg'
import hill from '../asset/HILLTOP EXPERIENCE.jpg'
const activities = [
  {
    heading: "Trekking",
    img:tra,
    description: "Embrace the adventurous spirit with a trek through the Kodia Jungle, located just a short distance from Neo-Resort. This 5-6 km trek is free of cost and offers a chance to witness the wild beauty of the Himalayas. The serene views of surrounding hills and valleys provide a natural relaxation for the eyes and mind."
  },
  {
    heading: "Nature Stay",
    img:nature,
    description: "Experience the purity of nature with a stay at our cottages in Kanatal. Surrounded by the pristine beauty of the hills, our cottages offer the best nature-to-stay experience. Enjoy the tranquility and rejuvenate your senses in an environment designed to connect you with the natural world."
  },
  {
    heading: "Valley Crossing",
    img: valley,
    description: "Test your courage and physical fitness with an exhilarating valley crossing near Neo-Resort. This popular activity is conducted under professional guidance, ensuring safety for all participants. Whether you are an experienced adventurer or a first-timer, you can choose a distance that suits your comfort level and enjoy the thrill of crossing a valley."
  },
  {
    heading: "Sightseeing",
    img : sight,
    description: "Neo-Resort is strategically located in the center of the Himalayan ranges, offering breathtaking views from every corner. Whether you explore during the day or night, you will be captivated by the stunning vistas of the hills. Our location is one of our unique selling points, ensuring that every moment of your stay is filled with scenic beauty."
  },
  {
    heading: "Rappelling",
    img: repel,
    description: "Add an extra layer of adventure to your stay with rock climbing and rappelling. The nearby activity areas are easily accessible from our cottages, allowing you to incorporate these thrilling experiences into your itinerary with ease. Challenge yourself and create unforgettable memories with these exciting activities."
  },
  {
    heading: "Hilltop Experience",
    img: hill,
    description: "Situated at an altitude of 8500 feet, Neo-Resort offers a unique hilltop experience. Enjoy unparalleled views and the invigorating mountain air right from the comfort of your cottage. This high-altitude stay is perfect for those looking to immerse themselves in the majesty of the Himalayas without having to trek to remote locations."
  }
];
function Activity({ heading, img, description }) {
    return (
      <div className="activity">
        <img src={img} alt={heading} className="activity-image"/>
        <div className="activity-content">
          <h2>{heading}</h2>
          <p>{description}</p>
        </div>
      </div>
    );
  }
  
  function ActivitiesPage() {
    return (
      <div className="activities-page">
        <h1>Activities at Neo-Resort</h1>
        {activities.map((activity, index) => (
          <Activity key={index} heading={activity.heading} img={activity.img} description={activity.description} />
        ))}
      </div>
    );
  }
  
  function Activities() {
    return (
      <div className="Act">
        <header className="Acti">
          <Navbar />
          <div className='ActCon'>
            <h1>Welcome to Neo-Resort</h1>
          </div>
        </header>
        <ActivitiesPage />
        <Footer />
      </div>
    );
  }
  
  export default Activities;