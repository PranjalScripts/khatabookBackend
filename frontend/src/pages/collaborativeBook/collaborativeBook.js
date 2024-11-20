import React, { useEffect, useState } from "react";
import Sidebar from "../Layout/sidebar";
import axios from "axios";

const CollaborativeBook = () => {
  const [transactions, setTransactions] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setError("User is not authenticated. Please log in.");
          setLoading(false);
          return;
        }

        const response = await axios.get(
          `${process.env.REACT_APP_URL}/api/transactions`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setTransactions(response.data);
      } catch (err) {
        setError(
          err.response?.data?.message ||
            "An error occurred while fetching transactions."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  if (loading)
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );

  if (error)
    return (
      <div className="alert alert-danger text-center mt-4" role="alert">
        {error}
      </div>
    );

  if (!transactions.length)
    return (
      <div className="alert alert-info text-center mt-4" role="alert">
        No transactions available.
      </div>
    );

  return (
    <div className="d-flex" style={{ "padding-left": "0" }}>
      <Sidebar />
      <div className="container mt-4">
        <h2 className="mb-4">Your Collabbed Transactions</h2>
        <div className="table-responsive">
          <table className="table table-bordered table-striped">
            <thead className="table-primary">
              <tr>
                <th>#</th>
                <th>Transaction Type</th>
                <th>Book Name</th>
                <th> By (UserName)</th>
                <th>Email</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((transaction, index) => (
                <tr key={transaction._id}>
                  <td>{index + 1}</td>
                  <td>
                    {transaction.transactionType === "you will get"
                      ? "you will give"
                      : "you will get"}
                  </td>
                  <td>{transaction.bookId?.bookname || "No book assigned"}</td>
                  <td>{transaction.userId?.name || "Unknown"}</td>
                  <td>{transaction.userId?.email || "No email"}</td>
                  <td
                    style={{
                      color:
                        transaction.outstandingBalance < 0 ? "green" : "red",
                      fontWeight: "bold",
                    }}
                  >
                    {Math.abs(transaction.outstandingBalance)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CollaborativeBook;
