import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { useRoutes } from './routes'

function App() {
    const routes = useRoutes()

  return (
        <Router>
          <div className="container justify-content-center align-items-center position-relative">
            {routes}
          </div>
        </Router>
  )
}

export default App
