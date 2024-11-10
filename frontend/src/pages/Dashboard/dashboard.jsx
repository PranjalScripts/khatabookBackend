import React, { useState, useEffect } from "react";
import Sidebar from "../Layout/sidebar";

const Dashboard = () => {
  //eslint-disable-next-line
  const [userDetails, setUserDetails] = useState(null);

  useEffect(() => {
    // Fetch user details from local storage
    const storedUser = localStorage.getItem("userDetails");
    if (storedUser) {
      setUserDetails(JSON.parse(storedUser));
    }
  }, []);

  //eslint-disable-next-line
  const handleLogout = () => {
    localStorage.removeItem("userDetails"); // Clear user details from storage
    setUserDetails(null);
    window.location.href = "/login"; // Redirect to login page
  };

  return (
    <div className="d-flex">
      <Sidebar />

       <h2>This is dashboard page</h2>

     
         </div>
  );
};

export default Dashboard;
