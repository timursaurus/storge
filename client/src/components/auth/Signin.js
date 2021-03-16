import React, { useState, useContext, useHistory } from 'react'
import axios from 'axios'
import AuthContext from '../../context/AuthContext'

function Signin() {
    
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const { getLoggedIn } = useContext(AuthContext)
    const history = useHistory()

    async function signin(e) {
        e.preventDefault()

        try {
            const signinData = {
                email,
                password, 
            }

            // await axios.post('http://localhost:5000/auth/login', signinData, 
            // { withCredentials: true })

            await axios.post('http://localhost:5000/auth/login', signinData) 
            
            await getLoggedIn()
            history.push('/')

        } catch (err) {
            console.error(err)
        }
    }

    return (
        <div>
            <h1>Sign in</h1>
            <form onSubmit={signin}>

                
                <input type="email" placeholder='Email'
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                />
                <input type="password" placeholder='Password'
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                />
                
                <button type='submit'>Sign in</button>
            </form>
        </div>
    )
}

export default Signin
