import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../Layout/sidebar";
import { Button, Table, Modal, Form } from "react-bootstrap"; // Bootstrap components
import { jwtDecode } from "jwt-decode"; // Correct import for jwt-decode

const ClientUsers = () => {
  const [clientUsers, setClientUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentClientUser, setCurrentClientUser] = useState(null);
  const [formData, setFormData] = useState({ name: "", mobile: "", email: "" });
  const [userId, setUserId] = useState(""); // Store the logged-in user's ID

  // Fetch client users with JWT token in Authorization header
  useEffect(() => {
    const token = localStorage.getItem("token"); // Assuming token is stored in localStorage
    if (token) {
      const decodedToken = jwtDecode(token); // Decode the token to get the user ID
      setUserId(decodedToken.userId); // Set the user ID from the decoded token

      // Fetch client users using the user ID and token
      axios
        .get("http://localhost:5100/api/v3/client/get-client", {
          headers: {
            Authorization: `Bearer ${token}`, // Send the token in the Authorization header
          },
        })
        .then((response) => {
          setClientUsers(response.data);
        })
        .catch((error) => {
          console.error("There was an error fetching the client users:", error);
        });
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token"); // Get token from localStorage

    const dataToSubmit = {
      ...formData,
      userId, // Automatically add the userId from the logged-in user
    };

    if (editMode) {
      axios
        .put(
          `http://localhost:5100/api/v3/client/update-client/${currentClientUser._id}`,
          dataToSubmit,
          {
            headers: {
              Authorization: `Bearer ${token}`, // Send token for authentication
            },
          }
        )
        .then((response) => {
          setClientUsers(
            clientUsers.map((user) =>
              user._id === currentClientUser._id ? response.data : user
            )
          );
          setShowModal(false);
        })
        .catch((error) => {
          console.error("There was an error updating the client user:", error);
        });
    } else {
      axios
        .post("http://localhost:5100/api/v3/client/create-client", dataToSubmit, {
          headers: {
            Authorization: `Bearer ${token}`, // Send token for authentication
          },
        })
        .then((response) => {
          setClientUsers([...clientUsers, response.data]);
          setShowModal(false);
        })
        .catch((error) => {
          console.error("There was an error creating the client user:", error);
        });
    }
  };

  const handleDelete = (id) => {
    const token = localStorage.getItem("token"); // Get token from localStorage
    axios
      .delete(`http://localhost:5100/api/v3/client/delete-client/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`, // Send token for authentication
        },
      })
      .then(() => {
        setClientUsers(clientUsers.filter((user) => user._id !== id));
      })
      .catch((error) => {
        console.error("There was an error deleting the client user:", error);
      });
  };

  // Function to open the modal for editing a client user
  const openEditModal = (user) => {
    setEditMode(true);
    setCurrentClientUser(user); // Set the current user to be edited
    setFormData({
      name: user.name,
      mobile: user.mobile,
      email: user.email,
    });
    setShowModal(true);
  };

  return (
    <div className="d-flex">
      <Sidebar />
      <div className="container">
        <h1>Client Users</h1>
        <Button variant="primary" onClick={() => setShowModal(true)}>
          Add New Client User
        </Button>

        <Table striped bordered hover className="mt-3">
          <thead>
            <tr>
              <th>Name</th>
              <th>Mobile</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {clientUsers.map((user) => (
              <tr key={user._id}>
                <td>{user.name}</td>
                <td>{user.mobile}</td>
                <td>{user.email}</td>
                <td>
                  <Button variant="warning" onClick={() => openEditModal(user)}>
                    Edit
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() => handleDelete(user._id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>

        {/* Modal for Create/Update */}
        <Modal show={showModal} onHide={() => setShowModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>
              {editMode ? "Edit Client User" : "Create Client User"}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="name">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>
              <Form.Group controlId="mobile">
                <Form.Label>Mobile</Form.Label>
                <Form.Control
                  type="text"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>
              <Form.Group controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>
              <Button variant="primary" type="submit">
                {editMode ? "Update" : "Create"}
              </Button>
            </Form>
          </Modal.Body>
        </Modal>
      </div>
    </div>
  );
};

export default ClientUsers;
