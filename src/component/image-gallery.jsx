import React, { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import sliderImage from "../asset/slider1.webp";
import sliderSecond from "../asset/slider2.webp";
import sliderThird from "../asset/slider3.webp";
import sliderForth from '../asset/slider4.webp';
import sliderFifth from '../asset/slider5.webp';
import sliderSix from '../asset/slider6.webp';


import "./Slider.css"; // Import custom CSS file for styling

function Slider() {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  return (
    <div className="slider-container">
      <h1 className="slider-heading">Welcome to Neo Resort</h1>
      <p className="slider-description">
        Are you a hill station lover? Visited Kanatal? Well, if not, you are
        definitely missing something significant. Kanatal is a small village
        and hill station situated in the state of Uttarakhand, India. It is well
        known for its hilltop experience, located at an altitude of 8500 feet,
        and offers panoramic sights of the Himalayan range. Moreover, if you
        want to enhance your staying experience, then Neo Resort is the best
        option you can opt for.
      </p>
      <div className='wrapper'>
      <Carousel data-bs-theme="dark" activeIndex={index} onSelect={handleSelect}>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={sliderImage}s
            alt="First slide"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={sliderSecond}
            alt="Second slide"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={sliderThird}
            alt="Third slide"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={sliderForth}
            alt="Third forth"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={sliderFifth}
            alt="Third fifth"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={sliderSix}
            alt="Third six"
          />
        </Carousel.Item>
      </Carousel>
      </div>

    </div>
  );
}

export default Slider;
