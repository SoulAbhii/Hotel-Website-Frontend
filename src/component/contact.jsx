import React, { useState } from 'react';
import { TextField, Button, Grid, Typography, Paper, Box } from '@mui/material';
import { Phone, Email, LocationOn } from '@mui/icons-material';
import Navbar from './navbar';
import emailjs from 'emailjs-com';
import './ContactUs.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faInstagram } from '@fortawesome/free-brands-svg-icons';
import { faFacebook } from '@fortawesome/free-brands-svg-icons';

function Contact() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        emailjs.sendForm('service_aq2plmk', 'template_yasenld', e.target, 'yT9IihkPMYDl9ticr')
            .then((result) => {
                console.log(result.text);
                alert('Your message has been sent successfully!');
                setFormData({ user_name: '', user_email: '', message: '' });
            }, (error) => {
                console.log(error.text);
                alert('An error occurred while sending your message. Please try again later.');
            });
    };

    return (
        <div>
            <div className='con'>
                <Navbar />
                <div className="cont">
                    <h1>Contact Us</h1>
                </div>
            </div>
                
            <Grid container spacing={4} className="contact-container ">
                <Grid item xs={12} md={6}>
                    <Paper elevation={3} className="contact-form-container">
                        <Typography variant="h4" component="h2" gutterBottom>
                            Send Us a Message
                        </Typography>
                        <form className="contact-form" onSubmit={handleSubmit}>
                        <TextField
                                fullWidth
                                label="Your Name"
                                name="user_name"
                                value={formData.user_name}
                                onChange={handleChange}
                                margin="normal"
                                required
                            />
                            <TextField
                                fullWidth
                                label="Your Email"
                                name="user_email"
                                type="email"
                                value={formData.user_email}
                                onChange={handleChange}
                                margin="normal"
                                required
                            />
                            <TextField
                                fullWidth
                                label="Your Message"
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                margin="normal"
                                multiline
                                rows={4}
                                required
                            />
                            <Button variant="contained" color="warning" type="submit" style={{fontWeight:'600', fontSize:"16px"}}>
                                Send
                            </Button>
                        </form>
                    </Paper>
                </Grid>

                <Grid item xs={12} md={6}>
                    <Paper elevation={3} className="contact-info-container">
                    
                            <Typography variant="h4" component="h2" gutterBottom className='info'>
                                Contact Information
                            </Typography>
                            <Box display="flex" mb={2}>
                                <Phone style={{ marginRight: '10px' }} />
                                <Typography variant="body1"  className='body1'>
                                    <strong>Phone:</strong> +919927963686 , +919811383188
                                </Typography>
                            </Box>
                            <Box display="flex" mb={2}>
                                <Email style={{ marginRight: '10px' }} />
                                <Typography variant="body1"  className='body1'>
                                    <strong>Email:</strong> neoresortkanatal@gmail.com
                                </Typography>
                            </Box>
                            <Box display="flex"  alignItems="flex-start">
                                <LocationOn  />
                                <Typography variant="body1" className='body1'>
                                    <strong>Address:</strong> 573, Mandakini Enclave, Gate No 1, next to Don Bosco School, Alaknanda, New Delhi
                                </Typography>
                            </Box>
                          
            <ul className="social-icons" style={{marginTop:"30px",  display:'flex', columnGap:"20px"}}>
              <li><a href="#"><FontAwesomeIcon icon={faFacebook} size="2x" color='black' /></a></li>
              <li><a href="#"><FontAwesomeIcon icon={faTwitter} size="2x" color='black'/></a></li>
              <li><a href="#"><FontAwesomeIcon icon={faInstagram} size="2x" color='black' /></a></li>
            </ul>
       
                    </Paper>
                </Grid>
            </Grid>
        </div>
    );
}

export default Contact;
