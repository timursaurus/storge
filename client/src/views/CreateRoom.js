import React, { useState } from 'react'
import { v1 as uuid } from 'uuid'
import { useHistory } from 'react-router-dom'

const CreateRoom = () => {
    
    const [name, setName] = useState('Adik')
    const [room, setRoom] = useState('')
    const history = useHistory()
    
    const handleCreate = (e) => {
        setName()
        history.push(`/room/${room}`)
    }
    
    return (
        <div>
            <h1>Create Room</h1>

            <div className="container">
                <form onSubmit={handleCreate} >
                    <div className="room-form">
                        <label htmlFor="">Room name</label>{' '}
                        <input
                        id='roomNameInput'
                        placeholder='Room name'
                        onChange={(e) => setRoom(e.target.value)}
                        type="text"/>
                    </div>
                    <div className="room-config">
                        <button id='createRoom' type='submit'>
                            Create room and go live!
                        </button>
                    </div>
                </form>
            </div>


        </div>
    )
}

export default CreateRoom;