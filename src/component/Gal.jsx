import React, { useState } from 'react';
import Modal from 'react-modal';
import './Gal.css'; // Ensure this CSS file exists and contains necessary styles
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import img1 from '../asset/IMG-20240502-WA0026.jpg';
import img2 from '../asset/IMG-20240502-WA0027.jpg';
import img3 from '../asset/IMG-20240502-WA0028.jpg';
import img4 from '../asset/IMG-20240502-WA0029.jpg';
import img5 from '../asset/IMG-20240502-WA0049.jpg';
import img6 from '../asset/IMG-20240502-WA0031.jpg';
import img7 from '../asset/IMG-20240502-WA0032.jpg';
import img8 from '../asset/IMG-20240502-WA0033.jpg';
import img9 from '../asset/IMG-20240502-WA0034.jpg';
import img10 from '../asset/IMG-20240502-WA0035.jpg';
import img11 from '../asset/IMG-20240502-WA0036.jpg';
import img12 from '../asset/IMG-20240502-WA0037.jpg';
import img13 from '../asset/IMG-20240502-WA0038.jpg';
import img14 from '../asset/IMG-20240502-WA0050.jpg';
import img15 from '../asset/IMG-20240502-WA0040.jpg';
import img16 from '../asset/IMG-20240502-WA0041.jpg';
import img17 from '../asset/IMG-20240502-WA0051.jpg';
import img18 from '../asset/IMG-20240502-WA0052.jpg';
import img19 from '../asset/IMG-20240502-WA0044.jpg';
import img20 from '../asset/IMG-20240502-WA0045.jpg';
import img21 from '../asset/IMG-20240502-WA0046.jpg';
import img22 from '../asset/IMG-20240502-WA0053.jpg';
import img23 from '../asset/IMG-20240502-WA0048.jpg';
import vid from '../asset/cover.mp4';
import deco from '../asset/line.png';
import Navbar from './navbar';

// Ensure the following line is correct if you want to set the app element for the modal
Modal.setAppElement('#root');

const images = [
  img1, img2, img3, img4, img5, img6, img7, img8, img9, img10,
  img11, img12, img13, img14, img15, img16, img17, img18, img19,
  img20, img21, img22, img23
];

const Gallery = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);

  const openModal = (index) => {
    setSelectedImageIndex(index);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedImageIndex(null);
  };

  const nextImage = () => {
    setSelectedImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevImage = () => {
    setSelectedImageIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="App">
      <div className="cover">
        <div className="coverColor">
          <Navbar />
          <div className="video-container">
            <video className="video" autoPlay loop muted>
              <source src={vid} type="video/mp4" />
            </video>
          </div>
        </div>
      </div>

      <div className="slider">
        <div>
          <h4>GALLERY</h4>
          <img className="deco" src={deco} alt="Decoration" />
        </div>
      </div>

      <div className="gallery container">
        {images.map((image, index) => (
          <div className="gallery-item" key={index}>
          <img
            key={index}
            src={image}
            alt={`Image ${index + 1}`}
            onClick={() => openModal(index)}
            style={{ padding: '10px' }}
          />
          </div>
        ))}
      </div>
      <div className="slider">
        <div>
          <img className="deco" src={deco} alt="Decoration" />
        </div>
      </div>
      {modalIsOpen && (
        <div className='modal-overlay' onClick={closeModal}>
          <div className='modal-content' onClick={(e) => e.stopPropagation()}>
            <div className='head'>
              <h2>Gallery</h2>
              <p className='x' onClick={closeModal}>X</p>
            </div>
            <div className='image-gallery'>
              <button className="prev-btn" onClick={prevImage}>
                <FontAwesomeIcon icon={faChevronLeft} />
              </button>
              <img src={images[selectedImageIndex]} alt={`Image ${selectedImageIndex + 1}`} />
              <button className="next-btn" onClick={nextImage}>
                <FontAwesomeIcon icon={faChevronRight} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;