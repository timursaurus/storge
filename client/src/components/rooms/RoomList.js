import React from 'react'

function RoomList({rooms}) {
    
    function renderRooms() {
        return rooms.map((room, i) => {
            return <li key={i}>{room.name}</li>
        })
    }
    
    return (
        <div>
            <ul>
                <li>Room list</li>
            </ul>
        </div>
    ) 
}

export default RoomList