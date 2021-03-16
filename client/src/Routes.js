import React from 'react'
import {Switch, Route, Redirect } from 'react-router-dom'
import Room from './views/Room'
import CreateRoom from './views/CreateRoom'
import Profile from './views/Profile'
import Auth from './views/Auth'
import Home from './views/Home'
// import Signup from './components/Signup'
// import Login from './components/Login'

export const useRoutes = isLoggedIn => {
    if (isLoggedIn) {
        return(
            <Switch>
                <Route path='/room/:roomId' component={Room} />
                    
                <Route path='/create' exact>
                    <CreateRoom />
                </Route>
                <Route path='/user/:id' exact>
                    <Profile />
                </Route>
                {/* <Route path='/' exact>
                    <Home />
                </Route> */}
            </Switch> 
        )               
    }
    return (
        <Switch>
            <Route path='/auth' exact>
                <Auth />
            </Route>
            <Route path='/' exact>
                    <Home />
            </Route>
            <Redirect to='/' />
            
        </Switch>
    )
}

export default useRoutes