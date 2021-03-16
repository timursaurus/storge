import React, { useState} from 'react'
import axios from 'axios'


function CreateRoom({getRooms}) {

    const [roomName, setRoomName] = useState('')

    async function create(e) {
        e.preventDefault()

        try {
            const roomData = {
                name: roomName,
            }
            await axios.post('http://localhost:5000/room', roomData)
            getRooms()
        } catch (err) {
            console.error(err)
        }
    }

    return (
        <div>
            <form onSubmit={create}>
                <input type="text" placeholder='Room name'
                onChange={(e) => {setRoomName(e.target.value)}}
                />
                <button type='submit'>Create room</button>
            </form>
        </div>
    )
}

export default CreateRoom