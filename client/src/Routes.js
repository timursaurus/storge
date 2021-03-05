import React from 'react'
import {Switch, Route, Redirect } from 'react-router-dom'
import Room from './views/Room'
import CreateRoom from './views/CreateRoom'
import Profile from './views/Profile'
import Auth from './views/Auth'
import Home from './views/Home'

export const useRoutes = isLoggedIn => {
    if (isLoggedIn) {
        return(
            <Switch>
                <Route path='/room/:id'>
                    <Room />
                </Route>
                <Route path='/create' exact>
                    <CreateRoom />
                </Route>
                <Route path='/user/:id' exact>
                    <Profile />
                </Route>
                <Route path='/' exact>
                    <Home />
                </Route>
            </Switch>
        )
    }
    return (
        <Switch>
            <Route path='/login' exact>
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