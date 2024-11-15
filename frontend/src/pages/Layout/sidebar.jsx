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
  FaHandshake,
  FaHandHoldingUsd,
  FaFileInvoice,
  FaReceipt,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "./Sidebar.css";

const Sidebar = () => {
  const { isLoggedIn, logout } = useAuth() || {}; // Ensure safe destructuring
  const [isOpen, setIsOpen] = useState(true);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); // Call the logout function to clear the authentication state
    navigate("/"); // Redirect to Landing page after logging out
  };

  const toggleSidebar = () => setIsOpen((prevState) => !prevState);

  return (
    <div
      className={`d-flex sidebar ${isOpen ? "sidebar-open" : "sidebar-closed"}`}
    >
      <Navbar bg="dark" variant="dark" className="flex-column vh-100 p-3">
        <Button
          variant="outline-light"
          className="mb-4 toggle-button"
          onClick={toggleSidebar}
          aria-expanded={isOpen}
          aria-label="Toggle sidebar"
        >
          {isOpen ? <FaChevronLeft /> : <FaChevronRight />}
        </Button>

        <Nav className="flex-column">
          <Nav.Link
            href="/dashboard"
            className="sidebar-link"
            aria-label="Dashboard"
          >
            <FaTachometerAlt className="icon" /> {isOpen && "Dashboard"}
          </Nav.Link>
          <Nav.Link
            href="/selfrecord"
            className="sidebar-link"
            aria-label="Self Record"
          >
            <FaFileAlt className="icon" /> {isOpen && "Self Record"}
          </Nav.Link>
          <Nav.Link href="/book" className="sidebar-link" aria-label="Book">
            <FaBook className="icon" /> {isOpen && "Book"}
          </Nav.Link>
          <Nav.Link
            href="/users"
            className="sidebar-link"
            aria-label="Client Users"
          >
            <FaUsers className="icon" /> {isOpen && "Client Users"}
          </Nav.Link>
          <Nav.Link
            href="/collaborativebook"
            className="sidebar-link"
            aria-label="Book"
          >
            <FaHandshake className="icon" /> {isOpen && "Collaborative Book"}
          </Nav.Link>
          <Nav.Link href="/loans" className="sidebar-link" aria-label="Book">
            <FaHandHoldingUsd className="icon" /> {isOpen && "Loans"}
          </Nav.Link>
          <Nav.Link href="/invoice" className="sidebar-link" aria-label="Book">
            <FaReceipt className="icon" /> {isOpen && "Invoice"}
          </Nav.Link>

          {isLoggedIn && (
            <Nav.Link
              href="/profile"
              className="sidebar-link"
              aria-label="Your Profile"
            >
              <FaIdCard className="icon" /> {isOpen && "Your Profile"}
            </Nav.Link>
          )}
        </Nav>

        <Nav className="mt-auto">
          {isLoggedIn ? (
            <Button variant="outline-light" onClick={handleLogout}>
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