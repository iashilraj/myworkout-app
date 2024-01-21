import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContexts'

export default function PrivateRoute({ }) {
const { currentUser } = useAuth();

  return (
    <div>
        {currentUser ? <Outlet /> : <Navigate to="/login"/>}
    </div>
  )
}
