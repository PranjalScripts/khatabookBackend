import React, { useState, useEffect, useRef } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import axios from "axios";
import Sidebar from "../Layout/sidebar";
import { toast } from "react-toastify";
import Header from "./Header";

// Register Chart.js components
ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

// Cache object to store API responses
const cache = {
  books: { data: null, expiry: null },
  clients: { data: null, expiry: null },
};

const Dashboard = () => {
  const [bookData, setBookData] = useState({
    labels: [],
    datasets: [
      {
        label: "Books Created",
        data: [],
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  });

  const [clientData, setClientData] = useState({
    labels: [],
    datasets: [
      {
        label: "Clients Created",
        data: [],
        backgroundColor: "rgb(106,170,125)",
        borderColor: "rgb(49, 81, 30)",
        borderWidth: 1,
      },
    ],
  });

  const API_BOOKS_URL =
    "http://localhost:5100/api/v2/transactionBooks/getAll-books";
  const API_CLIENTS_URL = "http://localhost:5100/api/v3/client/getAll-clients";
  const isFetched = useRef(false); // Prevent multiple API calls on the same render

  // Helper function to group data by date in ISO format
  const groupByDate = (items, dateKey) => {
    const grouped = {};
    items.forEach((item) => {
      const isoDate = new Date(item[dateKey]).toISOString().split("T")[0]; // Get ISO date (YYYY-MM-DD)
      grouped[isoDate] = (grouped[isoDate] || 0) + 1;
    });
    return grouped;
  };

  // Fetch books with caching
  const fetchBooks = async () => {
    const now = Date.now();
    if (cache.books.data && cache.books.expiry > now) {
      return cache.books.data;
    }

    try {
      const booksResponse = await axios.get(API_BOOKS_URL, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });

      const books = booksResponse.data?.books || [];
      const groupedBooks = groupByDate(books, "createdAt");

      // Cache the result with 5-minute expiry
      cache.books = {
        data: groupedBooks,
        expiry: now + 5 * 60 * 1000, // 5 minutes in milliseconds
      };

      return groupedBooks;
    } catch (error) {
      toast.error("Error fetching books");
      console.error("Error fetching books:", error);
      return {};
    }
  };

  // Fetch clients with caching
  const fetchClients = async () => {
    const now = Date.now();
    if (cache.clients.data && cache.clients.expiry > now) {
      return cache.clients.data;
    }

    try {
      const clientsResponse = await axios.get(API_CLIENTS_URL, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });

      const clients = clientsResponse.data?.data || [];
      const groupedClients = groupByDate(clients, "createdAt");

      // Cache the result with 5-minute expiry
      cache.clients = {
        data: groupedClients,
        expiry: now + 5 * 60 * 1000, // 5 minutes in milliseconds
      };

      return groupedClients;
    } catch (error) {
      toast.error("Error fetching clients");
      console.error("Error fetching clients:", error);
      return {};
    }
  };

  // Fetch and update chart data
  const fetchData = async () => {
    if (isFetched.current) return;
    isFetched.current = true;

    try {
      const booksByDate = await fetchBooks();
      const clientsByDate = await fetchClients();

      const sortedBookDates = Object.keys(booksByDate).sort();
      const sortedClientDates = Object.keys(clientsByDate).sort();

      setBookData((prevState) => ({
        ...prevState,
        labels: sortedBookDates,
        datasets: [
          {
            ...prevState.datasets[0],
            data: sortedBookDates.map((date) => booksByDate[date] || 0),
          },
        ],
      }));

      setClientData((prevState) => ({
        ...prevState,
        labels: sortedClientDates,
        datasets: [
          {
            ...prevState.datasets[0],
            data: sortedClientDates.map((date) => clientsByDate[date] || 0),
          },
        ],
      }));
    } catch (error) {
      toast.error("Error fetching data");
      console.error("Error fetching books or clients:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="d-flex">
      <Sidebar />
      <div className="container mt-4">
        <div
          className="charts-container"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {/* Books Chart - Left Side */}
          <div
            className="chart-container"
            style={{
              width: "45%",
              height: "400px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <h3>Books Created Over Time</h3>
            <Bar
              data={bookData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: { position: "top" },
                },
                scales: {
                  y: {
                    beginAtZero: true,
                    ticks: {
                      stepSize: 1,
                    },
                  },
                },
                animation: {
                  duration: 1000,
                  easing: "easeInOutQuad",
                },
              }}
              width={400}
              height={300}
            />

            <h3>Count Of Books & Clients</h3>
            <Header />
          </div>

          {/* Clients Chart - Right Side */}
          <div
            className="chart-container"
            style={{
              width: "45%",
              height: "400px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <h3>Clients Created Over Time</h3>
            <Bar
              data={clientData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: { position: "top" },
                },
                scales: {
                  y: {
                    beginAtZero: true,
                    ticks: {
                      stepSize: 1,
                    },
                  },
                },
                animation: {
                  duration: 1000,
                  easing: "easeInOutQuad",
                },
              }}
              width={400}
              height={300}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
