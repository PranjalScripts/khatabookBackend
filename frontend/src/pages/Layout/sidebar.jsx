import React, { useState } from "react";
import { Navbar, Nav, Button } from "react-bootstrap";
import {
  FaChevronRight,
  FaChevronLeft,
  FaTachometerAlt,
  FaFileAlt,
  FaUsers,
  FaSignOutAlt,
  FaSignInAlt,
  FaBook,
  FaIdCard,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "./Sidebar.css";

const Sidebar = () => {
  const { isLoggedIn, username, logout } = useAuth() || {}; // Ensure safe destructuring
  const [isOpen, setIsOpen] = useState(true); // Initialize toggle state
  const navigate = useNavigate();

  // Toggle the sidebar state
  const toggleSidebar = () => {
    setIsOpen((prevState) => !prevState); // Correctly updates state based on previous value
  };

  return (
    <div className={`d-flex ${isOpen ? "sidebar-open" : "sidebar-closed"}`}>
      <Navbar
        bg="dark"
        variant="dark"
        className="flex-column vh-100 p-3 sidebar"
      >
        <Button
          variant="outline-light"
          className="mb-4 toggle-button"
          onClick={toggleSidebar} // Ensure toggleSidebar is assigned directly
          aria-expanded={isOpen}
        >
          {isOpen ? <FaChevronLeft /> : <FaChevronRight />}
        </Button>

        <Nav className="flex-column">
          <Nav.Link href="/dashboard" className="sidebar-link">
            <FaTachometerAlt className="icon" /> {isOpen && "Dashboard"}
          </Nav.Link>
          <Nav.Link href="/selfrecord" className="sidebar-link">
            <FaFileAlt className="icon" /> {isOpen && "Self Record"}
          </Nav.Link>
          <Nav.Link href="/book" className="sidebar-link">
            <FaBook className="icon" /> {isOpen && "Book"}
          </Nav.Link>
          <Nav.Link href="/users" className="sidebar-link">
            <FaUsers className="icon" /> {isOpen && "Client Users"}
          </Nav.Link>
          {isLoggedIn && (
            <Nav.Link href="/profile" className="sidebar-link">
              <FaIdCard className="icon" /> {isOpen && "Your Profile"}
            </Nav.Link>
          )}
        </Nav>

        <Nav className="mt-auto">
          {isLoggedIn && logout ? (
            <Button variant="outline-light" onClick={logout}>
              <FaSignOutAlt className="icon" /> {isOpen && "Logout"}
            </Button>
          ) : (
            <Button variant="outline-light" onClick={() => navigate("/login")}>
              <FaSignInAlt className="icon" /> {isOpen && "Login"}
            </Button>
          )}
        </Nav>
      </Navbar>
    </div>
  );
};

export default Sidebar;
