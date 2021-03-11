import React from 'react'
import { v1 as uuid } from 'uuid'

const CreateRoom = () => {
    
    function create = (props) => {
        const id = uuid()
        props.history.push(`/room/${id}`)
    }
    
    return (
        <div>
            <h1>Create Room</h1>

            <div className="container">
                <div className="room-form">
                    <form action="/room" method='post'>
                        <div className="room-name">
                            <label htmlFor="roomName">Room name</label>
                            <input type="text" name='roomName' id='roomName' />
                        </div>
                            <input type="checkbox" name='roomStatus' id='roomStatus' />
                            

                    </form>
                </div>
            </div>


        </div>
    )
}

export default CreateRoom;