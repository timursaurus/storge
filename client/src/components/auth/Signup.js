import React, { useState, useContext, useHistory } from 'react'
import axios from 'axios'
import AuthContext from '../../context/AuthContext'

function Signup() {
    
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const { getLoggedIn } = useContext(AuthContext)
    const history = useHistory()

    async function signup(e) {
        e.preventDefault()

        try {
            const signupData = {
                email,
                password, 
                confirmPassword
            }

            await axios.post('http://localhost:5000/auth', signupData, 
            { withCredentials: true })

            await getLoggedIn()
            history.push('/')

        } catch (err) {
            console.error(err)
        }
    }

    return (
        <div>
            <h1>Sign up</h1>
            <form onSubmit={signup}>

                <input type="text" placeholder='Username'
                onChange={(e) => setUsername(e.target.value)}
                value={username}
                />
                <input type="email" placeholder='Email'
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                />
                <input type="password" placeholder='Password'
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                />
                <input type="password" placeholder='Confirm your passord'
                onChange={(e) => setConfirmPassword(e.target.value)}
                value={confirmPassword}
                />
                <button type='submit'>Sign up</button>
            </form>
        </div>
    )
}

export default Signup
