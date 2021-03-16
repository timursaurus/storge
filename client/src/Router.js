import React, { useContext } from 'react'
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import Signin from './components/auth/Signin'
import Signup from './components/auth/Signup'
import Navbar from './components/layout/Navbar'
import Rooms from './components/rooms/Rooms'
import AuthContext from './context/AuthContext'


function Router() {

    const { loggedIn } = useContext(AuthContext)

    return (
        <BrowserRouter>
            <Navbar />
            <Switch>
                <Route exact path='/'>
                    <div>Home</div>
                </Route>
                { loggedIn === false && (
                    <>
                        <Route path='/signup'>
                            <Signup />
                        </Route>
                        <Route path='/signin'>
                            <Signin />
                        </Route>
                    </>
                )}
                { loggedIn === true && (
                    <>
                        <Route path='/room'>
                            <Rooms />
                        </Route>
                    </>
                )}
                
                
            </Switch>

        </BrowserRouter>
    )
}

export default Router