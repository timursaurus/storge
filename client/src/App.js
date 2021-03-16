import React from 'react'
import Router from './Router'
import axios from 'axios'
import { AuthContextProvider } from './context/AuthContext'

axios.default.withCredetials = true

function App() {
  
  
  return (
    <AuthContextProvider>
      <Router />
    </AuthContextProvider>
  )
}

export default App;
