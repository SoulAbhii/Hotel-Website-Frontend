// components/RoomSelection.js
import React, { useState } from 'react';

function RoomSelection({ rooms, updateReservation }) {
    const [selectedRooms, setSelectedRooms] = useState([]);

    const handleRoomChange = (room, quantity) => {
        const updatedRooms = selectedRooms.filter(r => r._id !== room._id);
        if (quantity > 0) {
            updatedRooms.push({ ...room, quantity });
        }
        setSelectedRooms(updatedRooms);
        updateReservation(updatedRooms);
    };

    return (
        <div className="room-selection">
            {rooms.map(room => (
                <div key={room._id} className="room-card">
                    <h3>{room.name}</h3>
                    <img src={room.imageurl[0]} alt={room.name} style={{ width: '200px', height: 'auto' }} />
                    <p>Type: {room.type}</p>
                    <p>Price: ₹{room.rentperday} per night</p>
                    <p>Max Occupancy: {room.maxcount} adults</p>
                    <p>{room.discription}</p>
                    <select onChange={(e) => handleRoomChange(room, parseInt(e.target.value))}>
                        {[0, 1, 2, 3, 4].map(num => (
                            <option key={num} value={num}>{num}</option>
                        ))}
                    </select>
                </div>
            ))}
        </div>
    );
}

export default RoomSelection;