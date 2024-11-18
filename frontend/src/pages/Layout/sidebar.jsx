import React from "react";
import { Navbar, Nav, Button } from "react-bootstrap";
import {
  FaTachometerAlt,
  FaFileAlt,
  FaUsers,
  FaSignOutAlt,
  FaSignInAlt,
  FaBook,
  FaIdCard,
  FaHandshake,
  FaHandHoldingUsd,
  FaReceipt,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "./Sidebar.css";

const Sidebar = () => {
  const { isLoggedIn, logout } = useAuth() || {}; // Ensure safe destructuring
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); // Call the logout function to clear the authentication state
    navigate("/"); // Redirect to Landing page after logging out
  };

  return (
    <div className="sidebar-container">
      <Navbar
        bg="dark"
        variant="dark"
        className="flex-column vh-100 p-2 sidebar"
      >
        <Nav className="flex-column">
          <Nav.Link
            href="/dashboard"
            className="sidebar-link"
            aria-label="Dashboard"
          >
            <FaTachometerAlt className="icon" /> <span>Dashboard</span>
          </Nav.Link>
          <Nav.Link
            href="/selfrecord"
            className="sidebar-link"
            aria-label="Self Record"
          >
            <FaFileAlt className="icon" /> <span>Self Record</span>
          </Nav.Link>
          <Nav.Link href="/book" className="sidebar-link" aria-label="Book">
            <FaBook className="icon" /> <span>Book</span>
          </Nav.Link>
          <Nav.Link
            href="/users"
            className="sidebar-link"
            aria-label="Client Users"
          >
            <FaUsers className="icon" /> <span>Client Users</span>
          </Nav.Link>
          <Nav.Link
            href="/collaborativebook"
            className="sidebar-link"
            aria-label="Collaborative Book"
          >
            <FaHandshake className="icon" /> <span>Collaborative Book</span>
          </Nav.Link>
          <Nav.Link href="/loans" className="sidebar-link" aria-label="Loans">
            <FaHandHoldingUsd className="icon" /> <span>Loans</span>
          </Nav.Link>
          <Nav.Link
            href="/invoice"
            className="sidebar-link"
            aria-label="Invoice"
          >
            <FaReceipt className="icon" /> <span>Invoice</span>
          </Nav.Link>

          {isLoggedIn && (
            <Nav.Link
              href="/profile"
              className="sidebar-link"
              aria-label="Your Profile"
            >
              <FaIdCard className="icon" /> <span>Your Profile</span>
            </Nav.Link>
          )}
        </Nav>

        <Nav className="mt-auto">
          {isLoggedIn ? (
            <Button variant="outline-light" onClick={handleLogout}>
              <FaSignOutAlt className="icon" /> <span>Logout</span>
            </Button>
          ) : (
            <Button variant="outline-light" onClick={() => navigate("/login")}>
              <FaSignInAlt className="icon" /> <span>Login</span>
            </Button>
          )}
        </Nav>
      </Navbar>
    </div>
  );
};

export default Sidebar;
