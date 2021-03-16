import React, { useState, useEffect } from 'react'
import RoomList from './RoomList'
import axios from 'axios'

function Rooms() {

    const [rooms, setRooms] = useState([])

    async function getRooms() {
        const roomsRes = await axios.get('http://localhost:5000/room')
        setRooms(roomsRes.data)
    }

    useEffect(() => {
         getRooms()
    }, [])

    return (
        <div>
            <RoomList getRooms={getRooms} />
            <RoomList rooms={rooms} />
        </div>
    )
}

export default Rooms