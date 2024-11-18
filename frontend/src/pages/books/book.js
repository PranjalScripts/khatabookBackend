import React, { useEffect, useState } from "react";
import Sidebar from "../Layout/sidebar";
import axios from "axios";
import { FaTh, FaList } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./BookPage.css"; // Import CSS for styling

const BookPage = () => {
  const [books, setBooks] = useState([]);
  const [bookName, setBookName] = useState("");
  const [editingBook, setEditingBook] = useState(null);
  const [viewMode, setViewMode] = useState("list");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(viewMode === "list" ? 5 : 9);
  const [searchTerm, setSearchTerm] = useState(""); // State for search term

  useEffect(() => {
    fetchBooks();
    // eslint-disable-next-line
  }, []);

  const getAuthToken = () => {
    return localStorage.getItem("token");
  };

  const fetchBooks = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_URL}/api/v2/transactionBooks/getAll-books`,
        {
          headers: {
            Authorization: `Bearer ${getAuthToken()}`,
          },
        }
      );
      setBooks(response.data.books);
    } catch (error) {
      toast.error("Failed to get books.");
      console.error("Error fetching books", error);
    }
  };

  const handleCreateBook = async () => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_URL}/api/v2/transactionBooks/create-books`,
        { bookname: bookName },
        {
          headers: {
            Authorization: `Bearer ${getAuthToken()}`,
          },
        }
      );
      setBooks([...books, response.data.book]);
      setBookName("");
      toast.success("Book added successfully!");
    } catch (error) {
      console.error("Error creating book", error);
      toast.error("Failed to add book.");
    }
  };

  const handleUpdateBook = async () => {
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_URL}/api/v2/transactionBooks/update-book/${editingBook._id}`,
        { bookname: bookName },
        {
          headers: {
            Authorization: `Bearer ${getAuthToken()}`,
          },
        }
      );
      setBooks(
        books.map((book) =>
          book._id === editingBook._id ? response.data.book : book
        )
      );
      setEditingBook(null);
      setBookName("");
      toast.success("Book updated successfully!");
    } catch (error) {
      console.error("Error updating book", error);
      toast.error("Failed to update book.");
    }
  };

  const handleDeleteBook = async (bookId) => {
    try {
      await axios.delete(
        `${process.env.REACT_APP_URL}/api/v2/transactionBooks/delete-book/${bookId}`,
        {
          headers: {
            Authorization: `Bearer ${getAuthToken()}`,
          },
        }
      );
      setBooks(books.filter((book) => book._id !== bookId));
      toast.success("Book deleted successfully!");
    } catch (error) {
      console.error("Error deleting book", error);
      toast.error("Failed to delete book.");
    }
  };

  // Pagination logic
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const filteredBooks = books.filter((book) =>
    book.bookname.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const paginatedBooks = filteredBooks.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const totalPages = Math.ceil(filteredBooks.length / pageSize);

  return (
    <div className="d-flex" style={{ "padding-left": "8rem" }}>
      <Sidebar />
      <div className="container my-4">
        <h2 className="text-center mb-4">Manage Books</h2>

        <div className="card p-3 mb-4">
          <h5>{editingBook ? "Edit Book" : "Add Book"}</h5>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              placeholder="Book Name"
              value={bookName}
              onChange={(e) => setBookName(e.target.value)}
            />
          </div>
          <button
            className="btn btn-primary mt-2"
            onClick={editingBook ? handleUpdateBook : handleCreateBook}
          >
            {editingBook ? "Update Book" : "Add Book"}
          </button>
        </div>

        {/* Search Input */}
        <div className="form-group mb-4">
          <input
            type="text"
            className="form-control"
            placeholder="Search by book name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* View toggle buttons with tooltips */}
        <div className="text-center my-3">
          <span className="icon-tooltip">
            <FaTh
              className={`mx-2 ${viewMode === "grid" ? "text-primary" : ""}`}
              style={{ cursor: "pointer" }}
              onClick={() => {
                setViewMode("grid");
                setPageSize(9);
                setCurrentPage(1);
              }}
            />
            <span className="tooltip-text">Grid View</span>
          </span>
          <span className="icon-tooltip">
            <FaList
              className={`mx-2 ${viewMode === "list" ? "text-primary" : ""}`}
              style={{ cursor: "pointer" }}
              onClick={() => {
                setViewMode("list");
                setPageSize(5);
                setCurrentPage(1);
              }}
            />
            <span className="tooltip-text">List View</span>
          </span>
        </div>

        {/* Conditionally render books based on selected view */}
        {viewMode === "list" ? (
          <div>
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Book Name</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginatedBooks.map((book, index) => (
                  <tr key={book._id}>
                    <td>{(currentPage - 1) * pageSize + index + 1}</td>
                    <td>{book.bookname}</td>
                    <td>
                      <button
                        className="btn btn-secondary mx-1"
                        onClick={() => {
                          setEditingBook(book);
                          setBookName(book.bookname);
                        }}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-danger mx-1"
                        onClick={() => handleDeleteBook(book._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Pagination controls for list view */}
            <div className="pagination-controls">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                Previous
              </button>
              <span>{`${currentPage} of ${totalPages}`}</span>
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </div>
          </div>
        ) : (
          <div className="row">
            {paginatedBooks.map((book, index) => (
              <div className="col-md-4 mb-3" key={book._id}>
                <div className="card h-100">
                  <div className="card-body">
                    <h5 className="card-title">
                      {index + 1}. {book.bookname}
                    </h5>
                    <button
                      className="btn btn-secondary mx-1"
                      onClick={() => {
                        setEditingBook(book);
                        setBookName(book.bookname);
                      }}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-danger mx-1"
                      onClick={() => handleDeleteBook(book._id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Pagination controls for grid view */}
        {viewMode === "grid" && (
          <div className="pagination-controls">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <span>{`${currentPage} of ${totalPages}`}</span>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        )}
      </div>
      <ToastContainer />
    </div>
  );
};

export default BookPage;
