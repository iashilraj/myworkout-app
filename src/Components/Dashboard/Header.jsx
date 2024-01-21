import React, { useState } from 'react'
import './dashboard.css'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from "../../contexts/AuthContexts";

export default function Header() {
  const { logout } = useAuth();
  const [error, setError] = useState("");
  const navigateTo = useNavigate();

  const handleLogout = async () => {
    setError("");

    try {
        await logout();
        navigateTo("/login");
    } catch {
        setError("Failed to log out");
    }
  };

  return (
    <header className="header">
      <div className="profile-section">
        <Link to={"/profile"}>
        <img
          src="./src/Assets/user_icon.png"
          alt="User Profile"
          className="profile-icon"
        />
        </Link>
      </div>
      <Link to={"/"}>
      <img
          src="./src/Assets/app_logo.png"
          alt="App Logo"
          className="app-logo"
        />
      </Link>
      <div className="logout-section">
        <button onClick={handleLogout}>Logout</button>
      </div>
    </header>
  )
}