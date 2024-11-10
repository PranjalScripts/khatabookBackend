import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Sidebar from "../Layout/sidebar";
import ProfileUpdate from "../../components/auth/ProfileUpdate/prorfileupdate";
import { toast } from "react-toastify";

  const GetUserProfile = () => {
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      toast.warn("Please log in to access your profile");
      navigate("/login"); // Redirect to login if not authenticated
      return;
    }

    const fetchUserProfile = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5100/api/v1/auth/get-profile",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setUserProfile(response.data.user);
      } catch (error) {
        console.error("Error fetching user profile", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [navigate]);

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  return (
    <div className="d-flex">
      <Sidebar />
      <div className="container mt-5">
        <h2 className="text-center mb-4">User Profile</h2>
        {userProfile ? (
          <div className="card shadow p-3 mb-5 bg-white rounded">
            <div className="card-body">
              <h5 className="card-title">{userProfile.name}</h5>
              <p className="card-text">
                <strong>Email:</strong> {userProfile.email}
              </p>
              <p className="card-text">
                <strong>Phone:</strong> {userProfile.phone}
              </p>
              <button
                className="btn btn-primary mt-3"
                onClick={() => setShowModal(true)}
              >
                Update Profile
              </button>
            </div>
          </div>
        ) : (
          <div className="alert alert-danger">Failed to load profile data.</div>
        )}

        {/* Profile Update Modal */}
        {showModal && (
          <div className="modal show d-block" tabIndex="-1">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Update Profile</h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setShowModal(false)}
                  ></button>
                </div>
                <div className="modal-body">
                  <ProfileUpdate onClose={() => setShowModal(false)} />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default GetUserProfile;