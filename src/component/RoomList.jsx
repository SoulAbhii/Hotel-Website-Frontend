// components/ReservationSummary.js
import React from 'react';

function ReservationSummary({ checkIn, checkOut, selectedRooms, totalPrice }) {
    const nights = Math.ceil((checkOut - checkIn) / (1000 * 60 * 60 * 24));

    return (
        <div className="reservation-summary">
            <h2>Reservation Summary</h2>
            <p>Check-in: {checkIn.toDateString()}</p>
            <p>Check-out: {checkOut.toDateString()}</p>
            <p>Nights: {nights}</p>
            <h3>Rooms:</h3>
            {selectedRooms.map(room => (
                <p key={room._id}>{room.name}: ₹{room.rentperday}</p>
            ))}
            <h3>Total Price: ₹{totalPrice}</h3>
        </div>
    );
}

export default ReservationSummary;