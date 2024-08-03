import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red, blue, green, purple } from '@mui/material/colors';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';

import './roomcard.css';

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function RecipeReviewCard() {
  const [expandedStates, setExpandedStates] = React.useState([false, false, false, false]);

  const handleExpandClick = (index) => {
    const newExpandedStates = expandedStates.map((expanded, i) =>
      i === index ? !expanded : expanded
    );
    setExpandedStates(newExpandedStates);
  };

  const cardsData = [
    {
      title: 'NeoResort',
      subheader: 'Deluxe Room - ₹3000',
      image: 'del3.webp',
      content: 'A cozy and well-equipped room designed for a comfortable stay with essential amenities.',
      avatarColor: red[500],
      typography: { variant: 'body1', color: 'text.primary' },
      expandedContent: `
        <div style="font-size: 16px; line-height: 1.5;">
          <p><strong>Room Price:</strong> ₹3000</p>
          <p><strong>Size:</strong> 180 square feet</p>
          <p><strong>View:</strong> Mountain View</p>
          <p><strong>Max Occupancy:</strong> 2 Adults, 1 Child</p>
          <p><strong>Extra Bed:</strong> ₹1000</p>
        </div>
      `
    },
    {
      title: 'NeoResort',
      subheader: 'Super Deluxe Room - ₹4000',
      image: 'family2.webp',
      content: 'An upgraded room offering more space and additional amenities for a luxurious experience.',
      avatarColor: blue[500],
      typography: { variant: 'body1', color: 'text.primary' },
      expandedContent: `
        <div style="font-size: 16px; line-height: 1.5;">
          <p><strong>Room Price:</strong> ₹4000</p>
          <p><strong>Size:</strong> 180 square feet</p>
          <p><strong>View:</strong> Mountain View</p>
          <p><strong>Balcony:</strong> No </p>
          <p><strong>Max Occupancy:</strong> 2 Adults, 2 Children</p>
        </div>
      `
    },
    {
      title: 'NeoResort',
      subheader: 'Luxury Room - ₹5000',
      image: '2.webp',
      content: 'A high-end room offering the ultimate in comfort, elegance, and luxury.',
      avatarColor: green[500],
      typography: { variant: 'body1', color: 'text.primary' },
      expandedContent: `
        <div style="font-size: 16px; line-height: 1.5;">
          <p><strong>Room Price:</strong> ₹5000</p>
          <p><strong>Size:</strong> 216 square feet</p>
          <p><strong>View:</strong> Mountain View and Valley View</p>
          <p><strong>Balcony:</strong> Yes</p>
          <p><strong>Max Occupancy:</strong> 2 Adults, 2 Children</p>
        </div>
      `
    },
    {
      title: 'NeoResort',
      subheader: 'Family Luxury Room - ₹7000' ,
      image: 'fm3.webp',
      content: 'A well-appointed room designed to comfortably accommodate families.',
      avatarColor: purple[500],
      typography: { variant: 'body1', color: 'text.primary' },
      expandedContent: `
        <div style="font-size: 16px; line-height: 1.5;">
          <p><strong>Room Price:</strong> ₹7000</p>
          <p><strong>Size:</strong> 300 square feet</p>
          <p><strong>View:</strong> Mountain View and Valley View</p>
          <p><strong>Balcony:</strong> Yes</p>
          <p><strong>Max Occupancy:</strong> 4 Adults, 2 Children</p>
        </div>
      `
    },
  ];

  return (
    <div className='cardWrapper'>
      <div className="cardWrap">
      {cardsData.map((card, index) => (
        <div key={index} className='cardContainer'>
          <Card sx={{ maxWidth: 350, minHeight:327}}>
            <CardHeader
              avatar={
                <Avatar sx={{ bgcolor: card.avatarColor }} aria-label="recipe">
                  {card.subheader.charAt(0)}
                </Avatar>
              }
              title={card.title}
              subheader={card.subheader}
            />
            <CardMedia
              component="img"
              height="194"
              image={card.image}
              alt={card.title}
            />
            <CardContent>
              <Typography variant={card.typography.variant} color={card.typography.color}>
                {card.content}
              </Typography>
            </CardContent>
            <CardActions disableSpacing>
              <ExpandMore
                expand={expandedStates[index]}
                onClick={() => handleExpandClick(index)}
                aria-expanded={expandedStates[index]}
                aria-label="show more"
              >
                <ExpandMoreIcon />
              </ExpandMore>
            </CardActions>
            <Collapse in={expandedStates[index]} timeout="auto" unmountOnExit>
              <CardContent>
                <Typography component="div" dangerouslySetInnerHTML={{ __html: card.expandedContent }} />
              </CardContent>
            </Collapse>
          </Card>
        </div>
        
      ))}
      </div>
    
    </div>
  );
}
