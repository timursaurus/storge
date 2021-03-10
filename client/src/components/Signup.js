import React, {useState} from 'react';
import {useHttp} from '../views/AuthHttp'

const Signup = () => {
    const {loading, error, request} = useHttp()
    const [form, setForm] = useState({
        email: '',
        password: '',
        username: '',
    })
    
    const changeHandler = event => {
        setForm({ ...form, [event.target.name]: event.target.value})
    }

    const authHandler = async () => {
        try {
            const data = await request('/auth', 'POST', {...form})
            console.log('DATA', data)
        } catch (e) {}
    }
    
    return (
        <div>
            <h1>Sign up to Storge</h1>
            <div className='container'>
                <div className='auth-form'>
                    <div className='auth-field'>
                        <label htmlFor='username'>Username</label>
                        <input id='username' type='text' name='username' onChange={changeHandler} ></input>
                        
                    </div>
                    <div className='auth-field'>
                        <label htmlFor='email'>Email address</label>
                        <input id='email' type='email' name='email' onChange={changeHandler} ></input>
                        
                    </div>
                    <div className='auth-field'>
                        <label htmlFor='password'>Password</label>
                        <input id='password' type='password' name='password' onChange={changeHandler} ></input>
                        
                    </div>
                    <div>
                        <button onClick={authHandler} disabled={loading} >Sign up</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Signup;