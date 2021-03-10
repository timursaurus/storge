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

            </div>


        </div>
    )
}

export default CreateRoom;