import React, { useEffect, useRef } from "react";
import SimpleImageSlider from "react-simple-image-slider";
import TreeScene from "../asset/Tree_scene.jpg";
import Room1 from "../asset/Room3.jpg";
import Room2 from "../asset/Room4.jpg";
import Wash2 from "../asset/wash3.jpg";
import "./Slider.css"; // Import custom CSS file for styling

const images = [
  { url: TreeScene },
  { url: Room1 },
  { url: Room2 },
  { url: Wash2 }
];

const Slider = () => {
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
      <div className="slider-wrapper " style={{display: "flex",justifyContent:"center"}}>
        <SimpleImageSlider
          width={"70%"}
          height={"500px"}
          images={images}
          showBullets={true}
          showNavs={true}
          slideDuration={0.5} // Animation duration in seconds
          navSize={50} // Size of the navigation arrows
          navMargin={30} // Margin of the navigation arrows
        />
      </div>
    </div>
  );
};

export default Slider;

