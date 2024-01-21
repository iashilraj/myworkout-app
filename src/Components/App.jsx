import React from 'react'
import Signup from './AuthComponents/Signup'
import { Container } from 'react-bootstrap'
import { AuthProvider } from '../contexts/AuthContexts'
import {BrowserRouter as Router, Routes, Route  } from 'react-router-dom'
import Dashboard from './Dashboard/Dashboard'
import Login from './AuthComponents/Login'
import PrivateRoute from '../utils/PrivateRoute'
import ForgotPassword from './AuthComponents/ForgotPassword'

const App= () => {
  return (
          <Router>
            <AuthProvider>  
              <Routes>
                <Route element={<PrivateRoute />}>
                  <Route path="/" element={<Dashboard />} exact/>
                  <Route path="/profile" element={<Dashboard />}/>
                </Route>
                <Route path="/signup" element={<Signup />} />
                <Route path="/login" element={<Login />} />
                <Route path="/forgot-password" element={<ForgotPassword />}/>
              </Routes>                                        
            </AuthProvider>
          </Router>
  )
}

export default App