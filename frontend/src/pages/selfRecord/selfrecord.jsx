import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../Layout/sidebar";
import axios from "axios";
import AddTransactions from "./addTransaction/addTransactions";
import "./selfRecord.css";

const SelfRecord = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddTransaction, setShowAddTransaction] = useState(false); // Modal visibility state
  const userId = localStorage.getItem("userId");
  const navigate = useNavigate(); // For navigation

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `${process.env.REACT_APP_URL}/api/v4/transaction/get-transactions/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.data.success) {
          const transactionData = await Promise.all(
            response.data.data.map(async (transaction) => {
              const bookResponse = await axios.get(
                `${process.env.REACT_APP_URL}/api/v2/transactionBooks/get-book/${transaction.bookId}`,
                {
                  headers: {
                    Authorization: `Bearer ${token}`,
                  },
                }
              );

              const clientResponse = await axios.get(
                `${process.env.REACT_APP_URL}/api/v3/client/get-client/${transaction.clientUserId}`,
                {
                  headers: {
                    Authorization: `Bearer ${token}`,
                  },
                }
              );

              const lastTransaction = transaction.outstandingBalance;

              return {
                transactionId: transaction._id, // Add transaction ID for details
                bookName: bookResponse.data.book.bookname,
                clientName: clientResponse.data.data.name,
                clientMobile: clientResponse.data.data.mobile,
                clientEmail: clientResponse.data.data.email,
                outstandingBalance: lastTransaction,
              };
            })
          );

          setTransactions(transactionData);
        } else {
          console.error("Error: Data fetch unsuccessful", response.data);
        }

        setLoading(false);
      } catch (error) {
        console.error("Error fetching transactions:", error);
        setLoading(false);
      }
    };

    fetchTransactions();
  }, [userId]);

  const handleAddTransactionClick = () => {
    setShowAddTransaction(true);
  };

  const closeAddTransactionModal = () => {
    setShowAddTransaction(false);
  };

  const formatAmount = (amount) => {
    const absoluteAmount = Math.abs(amount);
    const color = amount < 0 ? "red" : "green";
    return <span style={{ color }}>{absoluteAmount}</span>;
  };

  const handleSeeDetails = (transactionId) => {
    // Redirect to Transaction History page with transaction ID
    console.log("Navigating to Transaction ID:", transactionId); // Debug log

    navigate(`/transaction-history/${transactionId}`);
  };

  return (
    <div className="d-flex" style={{ paddingLeft: "0" }}>
      <Sidebar />
      <div className="container">
        <h1>Transactions Record Page</h1>
        <button
          onClick={handleAddTransactionClick}
          className="btn btn-primary mb-3"
        >
          Add Transaction
        </button>
        {loading ? (
          <p>Loading transactions...</p>
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th>Book Name</th>
                <th>Client Name</th>
                <th>Client Mobile</th>
                <th>Client Email</th>
                <th>Outstanding Balance</th>
                <th>Reminder</th>
                <th>Details</th>
              </tr>
            </thead>
            <tbody>
              {transactions.length > 0 ? (
                transactions.map((transaction, index) => (
                  <tr key={index}>
                    <td>{transaction.bookName}</td>
                    <td>{transaction.clientName}</td>
                    <td>{transaction.clientMobile}</td>
                    <td>{transaction.clientEmail}</td>

                    <td>{formatAmount(transaction.outstandingBalance)}</td>
                    <td>
                      <a
                        href={`https://api.whatsapp.com/send/?phone=%2B91${transaction.clientMobile}&text=Hello%20${transaction.clientName}%2C%20we%20hope%20you%20are%20doing%20well.%20This%20is%20a%20friendly%20reminder%20that%20you%20have%20an%20outstanding%20balance%20of%20${transaction.outstandingBalance}.%20Please%20let%20us%20know%20if%20you%20have%20any%20questions.&type=phone_number&app_absent=0`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <i
                          className="fab fa-whatsapp"
                          style={{ color: "#25D366", fontSize: "1.5em" }}
                        ></i>
                      </a>
                    </td>
                    <td>
                      <button
                        className="btn btn-info"
                        onClick={() =>
                          handleSeeDetails(transaction.transactionId)
                        }
                      >
                        See Details
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6">No transactions found</td>
                </tr>
              )}
            </tbody>
          </table>
        )}

        {/* AddTransactions Modal */}
        {showAddTransaction && (
          <div className="modal-overlay">
            <div className="modal-content">
              <AddTransactions />
              <button
                onClick={closeAddTransactionModal}
                className="btn btn-secondary"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SelfRecord;
