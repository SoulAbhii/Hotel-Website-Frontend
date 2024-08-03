import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminDashboard = ({ token }) => {
    const [bookings, setBookings] = useState([]);
    const [rooms, setRooms] = useState([]);
    const [filter, setFilter] = useState('all'); // 'all', 'past', 'current'
    const [form, setForm] = useState({ type: '', rentperday: '', adult: '', child: '', description: '' });

    const API_URL = 'http://localhost:5000';

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch all bookings
                const { data: bookingsData } = await axios.get(`${API_URL}/api/book`, {
                    headers: { 'x-auth-token': token }
                });
                // Fetch all rooms
                const { data: roomsData } = await axios.get(`${API_URL}/api/rooms`, {
                    headers: { 'x-auth-token': token }
                });

                // Filter bookings based on the selected filter
                const today = new Date();
                const filteredBookings = bookingsData.filter(booking => {
                    const checkOutDate = new Date(booking.checkOutDate);
                    if (filter === 'past') {
                        return checkOutDate < today;
                    } else if (filter === 'current') {
                        return checkOutDate >= today && new Date(booking.checkInDate) <= today;
                    } else {
                        return true;
                    }
                });

                setBookings(filteredBookings);
                setRooms(roomsData);
            } catch (error) {
                console.error('Error fetching data:', error.response ? error.response.data : error.message);
            }
        };

        fetchData();
    }, [token, filter]);

    const handleDeleteBooking = async (id) => {
        try {
            await axios.delete(`${API_URL}/api/book/${id}`, {
                headers: { 'x-auth-token': token }
            });
            setBookings(bookings.filter(booking => booking._id !== id));
        } catch (error) {
            console.error('Error deleting booking:', error.response ? error.response.data : error.message);
        }
    };

    const handleDeleteRoom = async (id) => {
        try {
            await axios.delete(`${API_URL}/api/rooms/${id}`, {
                headers: { 'x-auth-token': token }
            });
            setRooms(rooms.filter(room => room._id !== id));
        } catch (error) {
            console.error('Error deleting room:', error.response ? error.response.data : error.message);
        }
    };

    const handleAddRoom = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post(`${API_URL}/api/rooms`, form, {
                headers: { 'x-auth-token': token }
            });
            setRooms([...rooms, data]);
            setForm({ type: '', rentperday: '', adult: '', child: '', description: '' }); // Clear form
        } catch (error) {
            console.error('Error adding room:', error.response ? error.response.data : error.message);
        }
    };

    const handleUpdateRoom = async (id) => {
        try {
            const { data } = await axios.put(`${API_URL}/api/rooms/${id}`, form, {
                headers: { 'x-auth-token': token }
            });
            setRooms(rooms.map(r => r._id === id ? data : r));
        } catch (error) {
            console.error('Error updating room:', error.response ? error.response.data : error.message);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prevForm => ({
            ...prevForm,
            [name]: value
        }));
    };

    return (
        <div>
            <h1>Admin Dashboard</h1>

            <h2>Bookings</h2>
            <select value={filter} onChange={(e) => setFilter(e.target.value)}>
                <option value="all">All Bookings</option>
                <option value="past">Past Bookings</option>
                <option value="current">Current Bookings</option>
            </select>
            <ul>
                {bookings.map((booking) => (
                    <li key={booking._id}>
                        {booking.name} - {booking.email}
                        <button onClick={() => handleDeleteBooking(booking._id)}>Delete</button>
                    </li>
                ))}
            </ul>

            <h2>Rooms</h2>
            <ul>
                {rooms.map((room) => (
                    <li key={room._id}>
                        {room.type} - {room.rentperday}
                        <button onClick={() => handleDeleteRoom(room._id)}>Delete</button>
                        <button onClick={() => handleUpdateRoom(room._id)}>Update</button>
                    </li>
                ))}
            </ul>

            <h2>Add Room</h2>
            <form onSubmit={handleAddRoom}>
                <input
                    name="type"
                    placeholder="Type"
                    value={form.type}
                    onChange={handleChange}
                    required
                />
                <input
                    name="rentperday"
                    placeholder="Rent per day"
                    value={form.rentperday}
                    onChange={handleChange}
                    required
                />
                <input
                    name="adult"
                    placeholder="Adults"
                    value={form.adult}
                    onChange={handleChange}
                    required
                />
                <input
                    name="child"
                    placeholder="Children"
                    value={form.child}
                    onChange={handleChange}
                    required
                />
                <input
                    name="description"
                    placeholder="Description"
                    value={form.description}
                    onChange={handleChange}
                    required
                />
                <button type="submit">Add Room</button>
            </form>
        </div>
    );
};

export default AdminDashboard;
