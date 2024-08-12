import React from 'react'
import './homeban.css'
import vidio from '../asset/bg.mp4';


export const HomeBan = () => {
  return (
    <div>
    <div className='home-ban'>
      <div className='ban-img'>
          <video
            width="100%" 
            height="auto"
            className="video" autoPlay loop muted
        >
          <source src={vidio} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
  

      </div>
      <div className='ban-detail'>
          <h2>Welcome to Our Luxury Hotel</h2>
          <p>Experience the ultimate comfort and elegance with our premium rooms and top-notch amenities.</p>
      </div>
    </div>
    </div>
  )
}
