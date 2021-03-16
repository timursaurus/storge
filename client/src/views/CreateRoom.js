import React from 'react'
import { v1 as uuid } from 'uuid'
import { useHistory } from 'react-router-dom'

const CreateRoom = (props) => {
    
    let history = useHistory()
    
    function create() {
        const id = uuid();
        console.log(id)
        console.log(props)
        // props.history.push(`/room/${id}`)
        history.push('/room/lol')
    }
    
    return (
        <div>
            <h1>Create Room</h1>

            <div className="container">
                <div className="room-form">
                    {/* <form action="/room" method='post'>
                        <div className="room-name">
                            <label htmlFor="roomName">Room name</label>
                            <input type="text" name='roomName' id='roomName' />
                        </div>
                            <input type="checkbox" name='roomStatus' id='roomStatus' />
                            

                    </form> */}
                    <button onClick={create} >Create Room</button>
                </div>
            </div>


        </div>
    )
}

export default CreateRoom;