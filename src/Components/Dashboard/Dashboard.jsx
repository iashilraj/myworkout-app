import React, { useState } from 'react'
import { useAuth } from '../../contexts/AuthContexts';
import { useNavigate } from 'react-router-dom';
import PrivateRoute from '../../utils/PrivateRoute';

export default function Dashboard() {
const { currentUser, logout } = useAuth();
const [error, setError] = useState('')
const navigateTo = useNavigate();

const handleLogout = async () => {
    setError('')

    try {
        await logout()
        navigateTo('/login')
    }
    catch {
        setError("Failed to log out")
    }
  }

  return (
    <div>
      Dashboard <br/>
      {currentUser && currentUser.email}
      <button onClick={handleLogout}>Log Out</button>
    </div>
  )
}
