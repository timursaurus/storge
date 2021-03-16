import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import AuthContext from '../../context/AuthContext'
import Signout from '../auth/Signout'

function Navbar() {

    const { loggedIn } = useContext(AuthContext)

    return(
        <div>
            <Link to='/' >Home</Link>
            {loggedIn === false && (
                    <>
                        <Link to='/signin' >Sign in</Link>
                        <Link to='/signup' >Sign up</Link>
                    </>
                )}
            {loggedIn === true (
                <>
                    <Link to='/room' >Rooms</Link>
                    <Signout />
                </>
            )}
            
        </div>
    )
}

export default Navbar