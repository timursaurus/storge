import React from 'react'
import useRoutes from './Routes'
import {BrowserRouter as Router} from 'react-router-dom'

function App() {
  const Routes = useRoutes(true)
  
  return (
    <Router>
      <div className="App">
        <div className='container'>{Routes}</div>
      </div>
    </Router>
  )
}

export default App;
