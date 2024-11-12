import React, { useState, useEffect } from "react";
import Sidebar from "../Layout/sidebar";
import axios from "axios";

const SelfRecord = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await axios.get(
          "http://localhost:5100/api/v4/transaction/get-transactions/672b0bfb64c96bb93365eadb",
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
                `http://localhost:5100/api/v2/transactionBooks/get-book/${transaction.bookId}`,
                {
                  headers: {
                    Authorization: `Bearer ${token}`,
                  },
                }
              );

              const clientResponse = await axios.get(
                `http://localhost:5100/api/v3/client/get-client/${transaction.clientUserId}`,
                {
                  headers: {
                    Authorization: `Bearer ${token}`,
                  },
                }
              );

              const lastTransaction = transaction.outstandingBalance;

              return {
                bookName: bookResponse.data.book.bookname,
                clientName: clientResponse.data.data.name,
                clientMobile: clientResponse.data.data.mobile,
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
  }, []);

  return (
    <div className="d-flex">
      <Sidebar />
      <div className="container">
        <h1>Self Record Page</h1>
        {loading ? (
          <p>Loading transactions...</p>
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th>Book Name</th>
                <th>Client Name</th>
                <th>Client Mobile</th>
                <th>Outstanding Balance</th>
                <th>Reminder</th>
              </tr>
            </thead>
            <tbody>
              {transactions.length > 0 ? (
                transactions.map((transaction, index) => (
                  <tr key={index}>
                    <td>{transaction.bookName}</td>
                    <td>{transaction.clientName}</td>
                    <td>{transaction.clientMobile}</td>
                    <td>{transaction.outstandingBalance}</td>
                    <td>
                      <a
                        href={`https://api.whatsapp.com/send/?phone=%2B91${transaction.clientMobile}&text=Hello%20${transaction.clientName}%2C%20we%20hope%20you%20are%20doing%20well.%20This%20is%20a%20friendly%20reminder%20that%20you%20have%20an%20outstanding%20balance%20of%20${transaction.outstandingBalance}.%20Please%20let%20us%20know%20if%20you%20have%20any%20questions.&type=phone_number&app_absent=0`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {/* WhatsApp icon using Font Awesome */}
                        <i
                          className="fab fa-whatsapp"
                          style={{ color: "#25D366", fontSize: "1.5em" }}
                        ></i>
                        {/* Fallback to image icon if Font Awesome fails */}
                        <img
                          src="https://upload.wikimedia.org/wikipedia/commons/5/5e/WhatsApp_icon.png"
                          alt="WhatsApp"
                          style={{ width: "24px", height: "24px" }}
                        />
                      </a>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5">No transactions found</td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default SelfRecord;
