// AppLayout.jsx
import React, { useState } from "react";
import { Outlet } from "react-router-dom"; // For nested routes
import Sidebar from "./sidebar"; // Adjust path as needed

const AppLayout = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");

  const handleLogin = (user) => {
    setUsername(user.username);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername("");
  };

  return (
    <div className="d-flex">
      <Sidebar
        username={username}
        isLoggedIn={isLoggedIn}
        onLogout={handleLogout}
      />
      <main className="flex-grow-1">
        <Outlet context={{ handleLogin }} /> {/* Pass handleLogin as context */}
      </main>
    </div>
  );
};

export default AppLayout;
