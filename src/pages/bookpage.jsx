import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './Book.css';

const BookPage = () => {
    const [rooms, setRooms] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedRoomTypes, setSelectedRoomTypes] = useState({});
    const [adults, setAdults] = useState({});
    const [children, setChildren] = useState({});
    const [checkInDate, setCheckInDate] = useState(null);
    const [checkOutDate, setCheckOutDate] = useState(null);
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');

    useEffect(() => {
        const fetchRooms = async () => {
            try {
                const { data } = await axios.get('/api/rooms');
                setRooms(data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching rooms:', error);
                setLoading(false);
            }
        };

        fetchRooms();
    }, []);

    const showNotification = (message, type) => {
        Swal.fire({
            icon: type === 'error' ? 'error' : 'success',
            title: message,
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true
        });
    };

    const handleDateChange = (date, isCheckIn) => {
        const currentDate = new Date();
    
        if (isCheckIn) {
         
                setCheckInDate(date);
                setCheckOutDate(null)
        } else {
            if (date < checkInDate) {
                showNotification('Check-out date must be after check-in date.', 'error');
            } else {
                setCheckOutDate(date);
            }
        }
    };

    const handleRoomTypeToggle = (roomType) => {
        setSelectedRoomTypes((prevSelectedRoomTypes) => {
            const updatedSelectedRoomTypes = { ...prevSelectedRoomTypes };
            
            if (updatedSelectedRoomTypes[roomType]) {
                // If the room is already selected, deselect it and reset the associated values
                delete updatedSelectedRoomTypes[roomType];
                setAdults((prevAdults) => {
                    const updatedAdults = { ...prevAdults };
                    delete updatedAdults[roomType];
                    return updatedAdults;
                });
                setChildren((prevChildren) => {
                    const updatedChildren = { ...prevChildren };
                    delete updatedChildren[roomType];
                    return updatedChildren;
                });
            } else {
                // Otherwise, select the room and set default values (like 1 room selected)
                updatedSelectedRoomTypes[roomType] = 1;
    
                // Set default values for adults and children
                setAdults((prev) => ({
                    ...prev,
                    [roomType]: rooms.find((room) => room.type === roomType)?.adult || 1,
                }));
                setChildren((prev) => ({
                    ...prev,
                    [roomType]: rooms.find((room) => room.type === roomType)?.child || 0,
                }));
            }
    
            return updatedSelectedRoomTypes;
        });
    };
    

    const handleRoomChange = (type, value) => {
        const newValue = parseInt(value) > 0 ? parseInt(value) : 1;
        setSelectedRoomTypes((prev) => ({
            ...prev,
            [type]: newValue,
        }));
    };

    const handleAdultsChange = (type, value) => {
        const maxAdults = rooms.find((room) => room.type === type)?.adult || 1;
        const newValue = parseInt(value) <= maxAdults ? parseInt(value) : maxAdults;
        setAdults((prev) => ({
            ...prev,
            [type]: newValue,
        }));
    };

    const handleChildrenChange = (type, value) => {
        const maxChildren = rooms.find((room) => room.type === type)?.child || 0;
        const newValue = parseInt(value) <= maxChildren ? parseInt(value) : maxChildren;
        setChildren((prev) => ({
            ...prev,
            [type]: newValue,
        }));
    };

    const handlePayment = async () => {
        if (!checkInDate || !checkOutDate || !email || !name || !phone) {
            showNotification('Please fill in all fields.', 'error');
            return;
        }

        if (!validateEmail(email)) {
            showNotification('Please enter a valid email address.', 'error');
            return;
        }

        if (!validatePhone(phone)) {
            showNotification('Please enter a valid phone number.', 'error');
            return;
        }

        const selectedRoomTypeKeys = Object.keys(selectedRoomTypes).filter(key => selectedRoomTypes[key]);
        if (selectedRoomTypeKeys.length === 0) {
            showNotification('Please select at least one room type.', 'error');
            return;
        }

        const bookingDetails = {
            selectedRoomTypes,
            adults,
            children,
            checkInDate: checkInDate.toISOString(),
            checkOutDate: checkOutDate.toISOString(),
            email,
            name,
            phone,
            amount: totalCost
        };

        try {
            const response = await axios.post('/api/book', bookingDetails);
            const { id, currency, amount } = response.data;

            const options = {
                key: 'rzp_test_2yCKwCvsmmVI09',
                amount: amount,
                currency: currency,
                name: 'Neo Resort',
                description: 'Room Booking',
                order_id: id,
                handler: async function (response) {
                    try {
                        const verificationResponse = await axios.post('/api/verify', {
                            razorpay_order_id: response.razorpay_order_id,
                            razorpay_payment_id: response.razorpay_payment_id,
                            razorpay_signature: response.razorpay_signature,
                            bookingDetails
                        });

                        if (verificationResponse.data.message === 'Payment verified successfully') {
                            showNotification('Booking successful! Please check your email.', 'success');
                            // Clear form after successful booking
                            resetForm();
                        } else {
                            showNotification('Payment verification failed. Please try again.', 'error');
                        }
                    } catch (error) {
                        console.error('Error verifying payment:', error);
                        showNotification('Payment verification failed. Please try again.', 'error');
                    }
                },
                prefill: {
                    name,
                    email,
                    contact: phone
                },
                theme: {
                    color: '#F37254'
                }
            };

            const rzp = new window.Razorpay(options);
            rzp.open();
        } catch (error) {
            console.error('Error initiating payment:', error);
            showNotification('Booking failed. Please try again later.', 'error');
        }
    };


    const resetForm = () => {
        setCheckInDate(null);
        setCheckOutDate(null);
        setSelectedRoomTypes({});
        setAdults({});
        setChildren({});
        setEmail('');
        setName('');
        setPhone('');
    };

    const validateEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

    const validatePhone = (phone) => {
        const regex = /^[0-9]{10}$/;
        return regex.test(phone);
    };

    const totalCost = Object.keys(selectedRoomTypes).reduce((acc, type) => {
        if (selectedRoomTypes[type]) {
            const roomDetails = rooms.find((room) => room.type === type);
                const numRooms = selectedRoomTypes[type];
                const rentPerDay = roomDetails.rentperday;
                const days = checkOutDate && checkInDate ? Math.max((new Date(checkOutDate) - new Date(checkInDate)) / (1000 * 60 * 60 * 24), 0)+1 : 1;
               return acc+ rentPerDay * numRooms * days;
        }
        return acc;
    }, 0);

    if (loading) {
        return <p>Loading rooms...</p>;
    }

    return (
        <div className="book-page">
            <header className="page-header">
                <h2 className="page-title" style={{ color: 'orange', fontSize: '28px' }}>Room Booking</h2>
            </header>
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <div className="card">
                            <div className="card-body">
                                <h4 className="card-title text-danger b-2">Date Selection</h4>
                                <div className="form-group">
                                    <label className='me-3'>Check-In Date</label>
                                    <DatePicker
                                        selected={checkInDate}
                                        onChange={(date) => handleDateChange(date, true)}
                                        minDate={new Date()}
                                        className="form-control"
                                        dateFormat="yyyy-MM-dd"
                                        placeholderText="Select Check-In Date"
                                    />
                                </div>
                                <div className="form-group">
                                    <label className='me-3'>Check-Out Date</label>
                                    <DatePicker
                                        selected={checkOutDate}
                                        onChange={(date) => handleDateChange(date, false)}
                                        minDate={checkInDate || new Date()} // Ensures check-out date is after check-in date
                                        className="form-control"
                                        dateFormat="yyyy-MM-dd"
                                        placeholderText="Select Check-Out Date"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6">
                        {rooms.map((room, index) => (
                            <div key={room.type} className={`card ${index % 2 === 0 ? 'card-even' : 'card-odd'}`}>
                                <div className="card-body">
                                    <h4 className="card-title">{room.type}</h4>
                                    <p>{room.description}</p>
                                    <p>Rent per day: ₹{room.rentperday}</p>
                                    <p>Max Adults: {room.adult}</p>
                                    <p>Max Children: {room.child}</p>
                                    <div className="form-check">
                                    <input
                                     type="checkbox"
                                      className="form-check-input"
                                      id={`roomType-${room.type}`}
                                      checked={selectedRoomTypes[room.type]}
                                      onChange={() => handleRoomTypeToggle(room.type)}
                                       />
                                        <label className="form-check-label" htmlFor={`roomType-${room.type}`}>
                                            Select {room.type}
                                        </label>
                                    </div>
                                    {selectedRoomTypes[room.type] && (
                                        <>
                                            <div className="form-group">
                                                <label htmlFor={`numRooms-${room.type}`}>Number of Rooms:</label>
                                                <input
                                                    type="number"
                                                    className="form-control"
                                                    id={`numRooms-${room.type}`}
                                                    value={selectedRoomTypes[room.type]}
                                                    onChange={(e) => handleRoomChange(room.type, e.target.value)}
                                                    min="1"
                                                    max="5"
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor={`numAdults-${room.type}`}>Number of Adults:</label>
                                                <input
                                                    type="number"
                                                    className="form-control"
                                                    id={`numAdults-${room.type}`}
                                                    value={adults[room.type] || ''}
                                                    onChange={(e) => handleAdultsChange(room.type, e.target.value)}
                                                    min="1"
                                                    max={room.adult}
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor={`numChildren-${room.type}`}>Number of Children:</label>
                                                <input
                                                    type="number"
                                                    className="form-control"
                                                    id={`numChildren-${room.type}`}
                                                    value={children[room.type] || ''}
                                                    onChange={(e) => handleChildrenChange(room.type, e.target.value)}
                                                    min="0"
                                                    max={room.child}
                                                />
                                            </div>
                                        </>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="col-md-6">
                        <div className="card">
                            <div className="card-body">
                                <h4 className="card-title text-danger b-2">User Details</h4>
                                <div className="form-group">
                                    <label htmlFor="email">Email</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        id="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="name">Name</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="name"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="phone">Phone</label>
                                    <input
                                        type="tel"
                                        className="form-control"
                                        id="phone"
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="card mt-4">
    <div className="card-body">
        <h4 className="card-title">Booking Summary</h4>
        <ul>
            {Object.keys(selectedRoomTypes).map((type) => {
                const roomDetails = rooms.find((room) => room.type === type);
                const numRooms = selectedRoomTypes[type];
                const rentPerDay = roomDetails.rentperday;
                const days = checkOutDate && checkInDate ? Math.max((new Date(checkOutDate) - new Date(checkInDate)) / (1000 * 60 * 60 * 24), 0)+1 : 1;
                const totalRoomCost = rentPerDay * numRooms * days;

                return (
                    <li key={type} className="mb-3">
                        <strong>{type}:</strong>
                        <p>Rooms: {numRooms}</p>
                        <p>Rent per Day: ₹{rentPerDay}</p>
                        <p>Number of Days: {days}</p>
                        <p><strong>Total Cost for this Room: ₹{totalRoomCost}</strong></p>
                    </li>
                );
            })}
        </ul>
        <p><strong>Grand Total: ₹{Object.keys(selectedRoomTypes).reduce((acc, type) => {
            const roomDetails = rooms.find((room) => room.type === type);
            const numRooms = selectedRoomTypes[type];
            const rentPerDay = roomDetails.rentperday;
            const days = checkOutDate && checkInDate ? Math.max((new Date(checkOutDate) - new Date(checkInDate)) / (1000 * 60 * 60 * 24), 0)+1 : 1;
            return acc + (rentPerDay * numRooms * days);
        }, 0)}</strong></p>
        <button className="btn btn-primary mt-3" onClick={handlePayment}>Book Now</button>
    </div>
</div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookPage;