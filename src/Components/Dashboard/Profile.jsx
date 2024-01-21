import React from "react";
import { useAuth } from "../../contexts/AuthContexts";

export default function Profile() {
  
  const { currentUser } = useAuth();  
  
  return (
    <div>
      <div className="profile-page">
        <div className="profile-header">
          <img
            src="./src/Assets/avatar_placeholder.png" 
            alt="User Profile"
            className="profile-avatar"
          />
          <div className="user-info">
            <h2>Name</h2> {/* Replace with the user's name */}
            <p>{currentUser && currentUser.email}</p>
          </div>
        </div>
        <div className="additional-info">
          <h3>Additional Information</h3>
          <div>Gender:</div>
          <div>Age:</div>
          {/* Add more information as needed */}
        </div>
      </div>
    </div>
  );
}
