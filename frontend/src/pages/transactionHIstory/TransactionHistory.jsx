import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const TransactionHistory = () => {
    const { transactionId } = useParams(); // Retrieve transactionId from URL
    console.log("Transaction ID from URL params:", transactionId);
  const [transactionData, setTransactionData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTransactionDetails = async () => {
      try {
          setLoading(true);
              const token = localStorage.getItem("token");

        const response = await axios.get(
          `http://localhost:5100/api/v4/transaction/get-transaction/${transactionId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          } 
        );
        if (response.data.success) {
          setTransactionData(response.data.data);
        } else {
          setError("Failed to fetch transaction details");
        }
      } catch (err) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    if (transactionId) {
      fetchTransactionDetails();
    }
  }, [transactionId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!transactionData) {
    return <div>No transaction details found.</div>;
  }

  return (
    <div>
      <h2>Transaction Details</h2>
      <p>
        <strong>Transaction ID:</strong> {transactionData._id}
      </p>
      <p>
        <strong>Book ID:</strong> {transactionData.bookId}
      </p>
      <p>
        <strong>User ID:</strong> {transactionData.userId}
      </p>
      <p>
        <strong>Client User ID:</strong> {transactionData.clientUserId}
      </p>
      <p>
        <strong>Outstanding Balance:</strong>{" "}
        {transactionData.outstandingBalance}
      </p>
      <h3>Transaction History</h3>
      <ul>
        {transactionData.transactionHistory.map((entry) => (
          <li key={entry._id} style={{ marginBottom: "10px" }}>
            <p>
              <strong>Type:</strong> {entry.transactionType}
            </p>
            {entry.amount && (
              <p>
                <strong>Amount:</strong> {entry.amount}
              </p>
            )}
            {entry.description && (
              <p>
                <strong>Description:</strong> {entry.description}
              </p>
            )}
            <p>
              <strong>Date:</strong>{" "}
              {new Date(entry.transactionDate).toLocaleString()}
            </p>
            <p>
              <strong>Outstanding Balance:</strong> {entry.outstandingBalance}
            </p>
          </li>
        ))}
      </ul>
      <p>
        <strong>Created At:</strong>{" "}
        {new Date(transactionData.createdAt).toLocaleString()}
      </p>
      <p>
        <strong>Updated At:</strong>{" "}
        {new Date(transactionData.updatedAt).toLocaleString()}
      </p>
    </div>
  );
};

export default TransactionHistory;
