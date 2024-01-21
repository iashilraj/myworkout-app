import React, { useState } from "react";
import { useLocation  } from "react-router-dom";
import Header from "./Header";
import ContentArea from "./ContentArea";
import Footer from "./Footer";
import Profile from "./Profile";

export default function Dashboard() {
  const location = useLocation();
  const isProfilePath = location.pathname === "/profile";



  return (
    // <div>
    //   Dashboard <br/>
    //   {currentUser && currentUser.email}
    //   <button onClick={handleLogout}>Log Out</button>
    // </div>
      <div className="dashboard">
        <Header />
        <div className="container">
          {isProfilePath ? <Profile/>:<ContentArea/>}
        </div>
        <Footer />
      </div>
  );
}