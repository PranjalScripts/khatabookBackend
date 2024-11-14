import React, { useState, useEffect } from "react";
import Sidebar from "../Layout/sidebar";
import axios from "axios";

const  AddTransactions = () => {
  const [clients, setClients] = useState([]);
  const [books, setBooks] = useState([]);
  const [transactionData, setTransactionData] = useState({
    bookId: "",
    userId: "", // Set to your desired user ID or fetch from logged-in user context
    clientUserId: "",
    transactionType: "you will get",
    amount: "",
    description: "",
  });
  const [message, setMessage] = useState("");

  const token = localStorage.getItem("token");

  const axiosInstance = axios.create({
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  useEffect(() => {
    // Fetch clients
    axiosInstance
      .get("http://localhost:5100/api/v3/client/getAll-clients")
      .then((response) => {
        if (
          response.data &&
          response.data.success &&
          Array.isArray(response.data.data)
        ) {
          setClients(response.data.data);
        } else {
          console.error(
            "Clients data is not in the expected format:",
            response.data
          );
        }
      })
      .catch((error) => console.error("Error fetching clients:", error));

    // Fetch books
    axiosInstance
      .get("http://localhost:5100/api/v2/transactionBooks/getAll-books")
      .then((response) => {
        // Ensure we're accessing the `books` array in the response
        if (Array.isArray(response.data.books)) {
          setBooks(response.data.books);
          console.log("Books data:", response.data.books); // For debugging
        } else {
          console.error(
            "Books data is not in the expected format:",
            response.data
          );
        }
      })
      .catch((error) => console.error("Error fetching books:", error));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setTransactionData({
      ...transactionData,
      [name]: name === "amount" ? parseFloat(value) || 0 : value, // Convert amount to a number
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axiosInstance
      .post(
        "http://localhost:5100/api/v4/transaction/create-transaction",
        transactionData
      )
      .then((response) => {
        setMessage(response.data.message);
        setTransactionData({
          bookId: "",
          userId: "",
          clientUserId: "",
          transactionType: "you will get",
          amount: "",
          description: "",
        });
      })
      .catch((error) => {
        setMessage(error.response?.data?.message || "An error occurred.");
        console.error("Transaction creation error:", error);
      });
  };

  return (
    <div className="d-flex">
      <Sidebar />

      <div className="container p-4">
        <h1>Self Record Page</h1>
        {message && <div className="alert alert-info">{message}</div>}

        <form onSubmit={handleSubmit} className="mt-4">
          <div className="mb-3">
            <label htmlFor="bookId" className="form-label">
              Book
            </label>
            <select
              className="form-select"
              id="bookId"
              name="bookId"
              value={transactionData.bookId}
              onChange={handleChange}
              required
            >
              <option value="">Select Book</option>
              {Array.isArray(books) &&
                books.map((book) => (
                  <option key={book._id} value={book._id}>
                    {book.bookname}
                  </option>
                ))}
            </select>
          </div>

          <div className="mb-3">
            <label htmlFor="clientUserId" className="form-label">
              Client
            </label>
            <select
              className="form-select"
              id="clientUserId"
              name="clientUserId"
              value={transactionData.clientUserId}
              onChange={handleChange}
              required
            >
              <option value="">Select Client</option>
              {Array.isArray(clients) &&
                clients.map((client) => (
                  <option key={client._id} value={client._id}>
                    {client.name}
                  </option>
                ))}
            </select>
          </div>

          <div className="mb-3">
            <label htmlFor="transactionType" className="form-label">
              Transaction Type
            </label>
            <select
              className="form-select"
              id="transactionType"
              name="transactionType"
              value={transactionData.transactionType}
              onChange={handleChange}
            >
              <option value="you will get">You Will Get</option>
              <option value="you will give">You Will Give</option>
            </select>
          </div>

          <div className="mb-3">
            <label htmlFor="amount" className="form-label">
              Amount
            </label>
            <input
              type="number"
              className="form-control"
              id="amount"
              name="amount"
              value={transactionData.amount}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="description" className="form-label">
              Description
            </label>
            <textarea
              className="form-control"
              id="description"
              name="description"
              value={transactionData.description}
              onChange={handleChange}
            ></textarea>
          </div>

          <button type="submit" className="btn btn-primary">
            Create Transaction
          </button>
        </form>
      </div>
    </div>
  );
};

export default  AddTransactions;
