import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Typography, Button, TextField, List, ListItem, ListItemText, Divider, Drawer, ListItemIcon, InputAdornment, IconButton, Box, Card, CardContent, AppBar, Toolbar, Tabs, Tab, Grid, Paper } from '@mui/material';
import Swal from 'sweetalert2';
import SearchIcon from '@mui/icons-material/Search';
import { format } from 'date-fns'; // Import date-fns for formatting dates
import EventNoteIcon from '@mui/icons-material/EventNote';
import HotelIcon from '@mui/icons-material/Hotel';

const drawerWidth = 240;

const AdminDashboard = ({ token }) => {
    const [bookings, setBookings] = useState([]);
    const [rooms, setRooms] = useState([]);
    const [form, setForm] = useState({ type: '', rentperday: '', area: '', adult: '', child: '', description: '' });
    const [activePage, setActivePage] = useState('bookings');
    const [searchBooking, setSearchBooking] = useState('');
    const [searchRoom, setSearchRoom] = useState('');
    const [tabValue, setTabValue] = useState(0);

    const API_URL = 'http://localhost:5000';

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data: bookingsData } = await axios.get(`${API_URL}/api/bookings`, {
                    headers: { 'x-auth-token': token },
                    params: { search: searchBooking }
                });
                const { data: roomsData } = await axios.get(`${API_URL}/api/rooms`, {
                    headers: { 'x-auth-token': token },
                    params: { search: searchRoom }
                });

                setBookings(bookingsData);
                setRooms(roomsData);
            } catch (error) {
                console.error('Error fetching data:', error.response ? error.response.data : error.message);
            }
        };

        fetchData();
    }, [token, searchBooking, searchRoom]);

    const handleSearchBookingChange = (e) => {
        setSearchBooking(e.target.value);
    };

    const handleSearchRoomChange = (e) => {
        setSearchRoom(e.target.value);
    };

    const handleDeleteBooking = async (id) => {
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, cancel!'
        });

        if (result.isConfirmed) {
            try {
                await axios.delete(`${API_URL}/api/bookings/${id}`, {
                    headers: { 'x-auth-token': token }
                });
                setBookings(bookings.filter(booking => booking._id !== id));
                Swal.fire('Deleted!', 'Booking has been deleted.', 'success');
            } catch (error) {
                Swal.fire('Error', 'Error deleting booking', 'error');
            }
        }
    };

    const handleDeleteRoom = async (id) => {
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, cancel!'
        });

        if (result.isConfirmed) {
            try {
                await axios.delete(`${API_URL}/api/rooms/${id}`, {
                    headers: { 'x-auth-token': token }
                });
                setRooms(rooms.filter(room => room._id !== id));
                Swal.fire('Deleted!', 'Room has been deleted.', 'success');
            } catch (error) {
                Swal.fire('Error', 'Error deleting room', 'error');
            }
        }
    };

    const handleAddRoom = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post(`${API_URL}/api/rooms`, form, {
                headers: { 'x-auth-token': token }
            });
            setRooms([...rooms, data]);
            setForm({ type: '', rentperday: '', area: '', adult: '', child: '', description: '' });
            Swal.fire('Success!', 'Room added successfully', 'success');
        } catch (error) {
            Swal.fire('Error', 'Error adding room', 'error');
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prevForm => ({
            ...prevForm,
            [name]: value
        }));
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return format(date, 'dd MMMM yyyy');
    };

    const now = new Date();

    const upcomingBookings = bookings.filter(booking => new Date(booking.checkInDate) > now);
    const currentBookings = bookings.filter(booking => new Date(booking.checkInDate) <= now && new Date(booking.checkOutDate) >= now);
    const pastBookings = bookings.filter(booking => new Date(booking.checkOutDate) < now);

    const renderPage = () => {
        switch (activePage) {
            case 'bookings':
                return (
                    <div>
                        <Typography variant="h5" gutterBottom>Bookings</Typography>
                        <TextField
                            label="Search Bookings"
                            variant="outlined"
                            fullWidth
                            value={searchBooking}
                            onChange={handleSearchBookingChange}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton edge="end">
                                            <SearchIcon />
                                        </IconButton>
                                    </InputAdornment>
                                )
                            }}
                            style={{ marginBottom: '20px' }}
                        />
                        <Box marginBottom={2}>
                            <AppBar position="static" style={{ backgroundColor: '#FFFFFF' }}>
                                <Toolbar>
                                    <Tabs value={tabValue} onChange={(e, newValue) => setTabValue(newValue)} style={{ color: '#000' }}>
                                        <Tab label="Upcoming" />
                                        <Tab label="Current" />
                                        <Tab label="Past" />
                                    </Tabs>
                                </Toolbar>
                            </AppBar>
                            <div>
                                {tabValue === 0 && (
                                    <Card variant="outlined" style={{ marginTop: '20px' }}>
    <CardContent>
        <Typography variant="h6" gutterBottom>Upcoming Bookings</Typography>
        {upcomingBookings.length === 0 ? (
            <Typography>No upcoming bookings</Typography>
        ) : (
            upcomingBookings.map(booking => (
                <Paper variant="outlined" style={{ padding: '10px', marginBottom: '10px' }} key={booking._id}>
                <Grid container key={booking._id} style={{ marginBottom: '10px' }}>
                    <Grid item xs={12} md={12}>
                        <Typography variant="body1" style={{ fontWeight: 'bold' }}>{booking.name}</Typography>
                    </Grid>
                    <Grid item xs={12} md={12}>
                        <Grid container spacing={2} alignItems="center">
                            <Grid item xs={12} sm={6} md={3}>
                                <Typography variant="body2">Check-in: {formatDate(booking.checkInDate)}</Typography>
                            </Grid>
                            <Grid item xs={12} sm={6} md={3}>
                                <Typography variant="body2">Check-out: {formatDate(booking.checkOutDate)}</Typography>
                            </Grid>
                            <Grid item xs={12} sm={6} md={3}>
                                <Typography variant="body2">Phone Number: {booking.phone}</Typography>
                            </Grid>
                            <Grid item xs={12} sm={6} md={3}>
                                <Typography variant="body2">Email: {booking.email}</Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} md={12} style={{ marginTop: '10px' }}>
                        <Button variant="outlined" color="secondary" onClick={() => handleDeleteBooking(booking._id)}>
                            Delete
                        </Button>
                    </Grid>
                </Grid>
                </Paper>
            ))
        )}
    </CardContent>
</Card>
                                )}
                                {tabValue === 1 && (
                                    <Card variant="outlined" style={{ marginTop: '20px' }}>
    <CardContent>
        <Typography variant="h6" gutterBottom>Current Bookings</Typography>
        {currentBookings.length === 0 ? (
            <Typography>No current bookings</Typography>
        ) : (
            currentBookings.map(booking => (
                <Paper variant="outlined" style={{ padding: '10px', marginBottom: '10px' }} key={booking._id}>
                <Grid container key={booking._id} style={{ marginBottom: '10px' }}>
                    <Grid item xs={12} md={12}>
                        <Typography variant="body1" style={{ fontWeight: 'bold' }}>{booking.name}</Typography>
                    </Grid>
                    <Grid item xs={12} md={12}>
                        <Grid container spacing={2} alignItems="center">
                            <Grid item xs={12} sm={6} md={3}>
                                <Typography variant="body2">Check-in: {formatDate(booking.checkInDate)}</Typography>
                            </Grid>
                            <Grid item xs={12} sm={6} md={3}>
                                <Typography variant="body2">Check-out: {formatDate(booking.checkOutDate)}</Typography>
                            </Grid>
                            <Grid item xs={12} sm={6} md={3}>
                                <Typography variant="body2">Phone Number: {booking.phone}</Typography>
                            </Grid>
                            <Grid item xs={12} sm={6} md={3}>
                                <Typography variant="body2">Email: {booking.email}</Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} md={12} style={{ marginTop: '10px' }}>
                        <Button variant="outlined" color="secondary" onClick={() => handleDeleteBooking(booking._id)}>
                            Delete
                        </Button>
                    </Grid>
                </Grid>
                </Paper>
            ))
        )}
    </CardContent>
</Card>

                                )}
                                {tabValue === 2 && (
                                    <Card variant="outlined" style={{ marginTop: '20px' }}>
    <CardContent>
        <Typography variant="h6" gutterBottom>Past Bookings</Typography>
        {pastBookings.length === 0 ? (
            <Typography>No past bookings</Typography>
        ) : (
            pastBookings.map(booking => (
                <Paper variant="outlined" style={{ padding: '10px', marginBottom: '10px' }} key={booking._id}>
                    <Grid container>
                        <Grid item xs={12} md={12}>
                            <Typography variant="body1" style={{ fontWeight: 'bold' }}>{booking.name}</Typography>
                        </Grid>
                        <Grid item xs={12} md={12}>
                            <Grid container spacing={2} alignItems="center">
                                <Grid item xs={12} sm={6} md={3}>
                                    <Typography variant="body2">Check-in: {formatDate(booking.checkInDate)}</Typography>
                                </Grid>
                                <Grid item xs={12} sm={6} md={3}>
                                    <Typography variant="body2">Check-out: {formatDate(booking.checkOutDate)}</Typography>
                                </Grid>
                                <Grid item xs={12} sm={6} md={3}>
                                    <Typography variant="body2">Phone Number: {booking.phone}</Typography>
                                </Grid>
                                <Grid item xs={12} sm={6} md={3}>
                                    <Typography variant="body2">Email: {booking.email}</Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12} md={12} style={{ marginTop: '10px' }}>
                            <Button variant="outlined" color="secondary" onClick={() => handleDeleteBooking(booking._id)}>
                                Delete
                            </Button>
                        </Grid>
                    </Grid>
                </Paper>
            ))
        )}
    </CardContent>
</Card>


                                )}
                            </div>
                        </Box>
                    </div>
                );
    
            case 'rooms':
                return (
                    <div>
                        <Typography variant="h5" gutterBottom>Rooms</Typography>
                        <TextField
                            label="Search Rooms"
                            variant="outlined"
                            fullWidth
                            value={searchRoom}
                            onChange={handleSearchRoomChange}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton edge="end">
                                            <SearchIcon />
                                        </IconButton>
                                    </InputAdornment>
                                )
                            }}
                            style={{ marginBottom: '20px' }}
                        />
                          <Box marginTop={2}>
                            {rooms.length === 0 ? (
                                <Typography>No rooms available</Typography>
                            ) : (
                                rooms.map(room => (
                                    <Card key={room._id} style={{ marginBottom: '20px' }}>
                                        <CardContent>
                                            <Typography variant="h6">{room.type}</Typography>
                                            <Typography>Rent Per Day: ₹{room.rentperday}</Typography>
                                            <Typography>Area: {room.area}</Typography>
                                            <Typography>Adults: {room.adult}</Typography>
                                            <Typography>Children: {room.child}</Typography>
                                            <Typography>Description: {room.description}</Typography>
                                            <Button variant="outlined" color="secondary" onClick={() => handleDeleteRoom(room._id)} style={{ marginTop: '10px' }}>
                                                Delete
                                            </Button>
                                        </CardContent>
                                    </Card>
                                ))
                            )}
                        </Box>
                        <Box marginBottom={2}>
                            <Typography variant="h6" gutterBottom>Add Room</Typography>
                            <form onSubmit={handleAddRoom}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} md={6}>
                                        <TextField
                                            name="type"
                                            label="Room Type"
                                            variant="outlined"
                                            fullWidth
                                            margin="normal"
                                            value={form.type}
                                            onChange={handleChange}
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <TextField
                                            name="rentperday"
                                            label="Rent Per Day"
                                            type="number"
                                            variant="outlined"
                                            fullWidth
                                            margin="normal"
                                            value={form.rentperday}
                                            onChange={handleChange}
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <TextField
                                            name="area"
                                            label="Area"
                                            variant="outlined"
                                            fullWidth
                                            margin="normal"
                                            value={form.area}
                                            onChange={handleChange}
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <TextField
                                            name="adult"
                                            label="Adults"
                                            type="number"
                                            variant="outlined"
                                            fullWidth
                                            margin="normal"
                                            value={form.adult}
                                            onChange={handleChange}
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <TextField
                                            name="child"
                                            label="Children"
                                            type="number"
                                            variant="outlined"
                                            fullWidth
                                            margin="normal"
                                            value={form.child}
                                            onChange={handleChange}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            name="description"
                                            label="Description"
                                            variant="outlined"
                                            fullWidth
                                            margin="normal"
                                            value={form.description}
                                            onChange={handleChange}
                                        />
                                    </Grid>
                                </Grid>
                                <Button type="submit" variant="contained" color="primary" style={{ marginTop: '20px' }}>
                                    Add Room
                                </Button>
                            </form>
                        </Box>
                      
                    </div>
                );
            default:
                return <Typography>Select a page</Typography>;
        }
    };

    return (
        <div style={{ display: 'flex' }}>
            <Drawer
                variant="permanent"
                style={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                    },
                }}
            >
                <Toolbar />
                <List>
                    <ListItem button onClick={() => setActivePage('bookings')}>
                        <ListItemIcon><EventNoteIcon /></ListItemIcon>
                        <ListItemText primary="Bookings" />
                    </ListItem>
                    <ListItem button onClick={() => setActivePage('rooms')}>
                        <ListItemIcon><HotelIcon /></ListItemIcon>
                        <ListItemText primary="Rooms" />
                    </ListItem>
                </List>
            </Drawer>
            <main style={{ flexGrow: 1, padding: '20px' }}>
                <AppBar position="static" style={{ marginBottom: '20px' }}>
                    <Toolbar>
                        <Typography variant="h6">Admin Dashboard</Typography>
                    </Toolbar>
                </AppBar>
                {renderPage()}
            </main>
        </div>
    );
};

export default AdminDashboard;
