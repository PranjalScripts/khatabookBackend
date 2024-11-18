import React from 'react'
import Sidebar from '../Layout/sidebar'
import axios from "axios";
import { useEffect, useState } from "react";

const CollaborativeBook = () => {
  const [transactions, setTransactions] = useState([]);
  const [error, setError] = useState("");
  
   useEffect(() => {
   const fetchTransactions = async () => {
     try {
       const token = localStorage.getItem("token"); // Retrieve the token
       const response = await axios.get(
         "http://localhost:5100/api/transactions",
         {
           headers: { Authorization: `Bearer ${token}` },
         }
       );
       setTransactions(response.data);
     } catch (err) {
       setError(err.response?.data?.message || "An error occurred");
     }
   };

   fetchTransactions();
   }, []);
   if (error) return <div>Error: {error}</div>;
 if (!transactions.length) return <div>No transactions available.</div>;
  
  return (
    <div className='d-flex'>
      <Sidebar />
       
      <div>
        <h2>Your Transactions</h2>
        <ul>
          {transactions.map((transaction) => (
            <li key={transaction._id}>
              <p>
                <strong>Transaction:</strong> {transaction.transactionType} -{" "}
                {transaction.bookId?.bookname}
              </p>
              <p>
                <strong>By:</strong> {transaction.userId?.name} (
                {transaction.userId?.email})
              </p>
              <p>
                <strong>Amount:</strong>{" "}
                {transaction.transactionHistory?.[0]?.amount}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default CollaborativeBook


 


 
 




 
