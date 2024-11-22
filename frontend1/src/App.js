import React from 'react';
import './App.css';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Import Router and Routes
import Login from './components/auth/login/login';
import Signup from './components/auth/login/signup';
import Dashboard from './pages/Dashboard/dashboard';
import SelfRecord from './pages/selfRecord/selfrecord';
import Book from './pages/books/book';
import Users from './pages/clientUsers/clientUsers';
import Profile from "./pages/profile/userprofile"
import Landing from './components/LandingPage/Landing';
import Loans from './pages/loans/loan';
import Invoice from './pages/invoice/invoice';
import CollaborativeBook from './pages/collaborativeBook/collaborativeBook';
import PageNotFound from './pages/PageNotFound/PageNotFound';
import TransactionHistory from './pages/transactionHIstory/TransactionHistory';
import CollaborativeBookRecords from './pages/collaborativeBook/collaborativebookRecords/CollaborativeBookRecords'
 function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/users" element={<Users />} />
        <Route path="/selfrecord" element={<SelfRecord />} />
        <Route path="/book" element={<Book />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/loans" element={<Loans />} />
        <Route path="/invoice" element={<Invoice />} />
        <Route path="/collaborativebook" element={<CollaborativeBook />} />
        <Route
          path="/collaborative-records/:transactionId"
          element={<CollaborativeBookRecords />}
        />
        <Route
          path="/transaction-history/:transactionId"
          element={<TransactionHistory />}
        />

        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
    </Router>
  );
}

export default App;
