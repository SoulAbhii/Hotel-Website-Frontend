import React from 'react';
import './HotelAmenities.css';
import { FaBed, FaWifi, FaParking, FaSwimmingPool, FaUtensils, FaSpa, FaBicycle } from 'react-icons/fa'; // FontAwesome icons
import { MdHotTub, MdFitnessCenter } from 'react-icons/md'; // Material Design icons
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";


const cardsData = [
  {
    id: 1,
    title: 'Delux Room ',
    text: 'A cozy and well-equipped room designed for a comfortable stay with essential amenities.',
    imgSrc: 'del3.webp',
  },
  {
    id: 2,
    title: 'Super Luxury Room ',
    text: 'An upgraded room offering more space and additional amenities for a luxurious experience.',
    imgSrc: 'family2.webp',
  },
  {
    id: 3,
    title: 'Luxury Room ',
    text: 'A high-end room offering the ultimate in comfort, elegance, and luxury.',
    imgSrc: '2.webp',
  },
  {
    id: 4,
    title: 'Family Luxury Room ',
    text: 'A well-appointed room designed to comfortably accommodate families.',
    imgSrc: 'fm3.webp',
  },
];





const HotelAmenities = () => {
  return (
    <div>
      <div className='ex-rooms'><h2>Explore Rooms</h2></div>
        <div className='pack-card'>
          <div className='pack-wrap'>
            <Row xs={1} md={2} className="g-4 h-10">
              {cardsData.map(card => (
                <Col key={card.id}>
                  <Card className='card-rooms'>
                    <Card.Img variant="top" className='ex-rooms-img' src={card.imgSrc} />
                    <Card.Body>
                      <Card.Title>{card.title}</Card.Title>
                      <Card.Text>{card.text}</Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </div>

        </div>
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


    </div>
  );
}

export default HotelAmenities;
