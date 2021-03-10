import React, {useState} from 'react';
import {useHttp} from '../views/AuthHttp'


const Login = () => {
    
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
            const data = await request('/signin', 'POST', {...form})
            console.log('DATA', data)
        } catch (e) {}
    }

    // const signinHandler = async () => {
    //     try {
    //       const data = await request('/api/auth/login', 'POST', {...form})
    //       auth.login(data.token, data.userId)
    //     } catch (e) {}
    //   }
    
    return (
        <div>
            <h1>Sign in to Storge</h1>
            <div className='container'>
                <div className='auth-form'>
                    <div className='auth-field'>
                        <label htmlFor='username'>Username</label>
                        <input id='username' type='text' name='username' onChange={changeHandler} ></input>
                        
                    </div>
                    <div className='auth-field'>
                        <label htmlFor='password'>Password</label>
                        <input id='password' type='password' name='password' onChange={changeHandler} ></input>
                        
                    </div>
                    <div>
                        <button onClick={authHandler} disabled={loading} >Sign in</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login