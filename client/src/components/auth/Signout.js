import React, { useContext, useHistory } from 'react'
import axios from 'axios'
import AuthContext from '../../context/AuthContext'

function Signout() {

    const history = useHistory()
    
    const { getLoggedIn } = useContext(AuthContext)

    async function Signout() {
        await axios.get('http://localhost:5000/auth/logout')
        await getLoggedIn()
        history.push('/')
    }
    
    return (
        <div>
            <button onClick={Signout} >
                Sign out
            </button>
        </div>
    )
}

export default Signout