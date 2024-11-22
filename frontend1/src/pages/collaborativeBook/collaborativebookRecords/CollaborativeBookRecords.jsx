import React, { useState, useEffect } from "react";
import axios from "axios";

const CollaborativeBookRecords = () => {
   
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

 
  useEffect(() => {
    const fetchRecords = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_URL}/api/transactions`, {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
          }
        );
        setRecords(response.data);  
      } catch (err) {
        setError("Failed to fetch records");
      } finally {
        setLoading(false);
      }
    };

    fetchRecords();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h2>Collaborative Book Records</h2>
      {records.length === 0 ? (
        <p>No records available.</p>
      ) : (
        records.map((record) => (
          <div key={record._id}>
            <h3>Book: {record.bookId.bookname}</h3>
            <p>User: {record.userId.name}</p>
            <p>Client: {record.clientUserId}</p>
            <p>Outstanding Balance: {record.outstandingBalance}</p>
            <h4>Transaction History:</h4>
            <ul>
              {record.transactionHistory.map((transaction) => (
                <li key={transaction._id}>
                  <p>Type: {transaction.transactionType}</p>
                  <p>Amount: {transaction.amount || "N/A"}</p>
                  <p>Description: {transaction.description || "N/A"}</p>
                  <p>
                    Date:{" "}
                    {new Date(transaction.transactionDate).toLocaleString()}
                  </p>
                  <p>Outstanding Balance: {transaction.outstandingBalance}</p>
                </li>
              ))}
            </ul>
          </div>
        ))
      )}
    </div>
  );
};

export default CollaborativeBookRecords;
