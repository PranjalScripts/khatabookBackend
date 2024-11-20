// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
// import axios from "axios";
// import {
//   BarChart3,
//   Shield,
//   Zap,
//   Clock,
//   ChevronRight,
//   Receipt,
//   PieChart,
// } from "lucide-react";
// import "./Landing.css";
// import { useAuth } from "../../context/AuthContext";
// import { FaEyeSlash, FaEye } from "react-icons/fa";
// function Landing() {
//   const navigate = useNavigate();
//   const [showLoginModal, setShowLoginModal] = useState(false);
//   const [identifier, setIdentifier] = useState("");
//   const [password, setPassword] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const { login } = useAuth();

//   const handleLoginClick = () => {
//     setShowLoginModal(true); // Trigger the modal to show
//   };

//   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//   const phoneRegex = /^[0-9]{10}$/; // Assumes a 10-digit phone number

//   const handleLogin = async (e) => {
//     e.preventDefault();

//     if (!emailRegex.test(identifier) && !phoneRegex.test(identifier)) {
//       toast.warn("Please enter a valid email or 10-digit phone number.");
//       return;
//     }

//     const loginPayload = emailRegex.test(identifier)
//       ? { email: identifier, password }
//       : { phone: identifier, password };

//     try {
//       const response = await axios.post(
//         `${process.env.REACT_APP_URL}/api/v1/auth/login`,
//         loginPayload
//       );
//       console.log("response", response);
//       const { user, token } = response.data;
//       login(user); // Pass the user data to context for login
//       localStorage.setItem("token", token);
//       console.log("user id", user.id);
//       localStorage.setItem("userId", user.id);
//       toast.success("Login successful");
//       navigate("/dashboard");
//     } catch (error) {
//       toast.error(error.response?.data?.message || "Login failed");
//     }
//   };
//   return (
//     <div className="bg-light min-vh-100 d-flex flex-column">
//       {/* Navbar */}
//       <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm fixed-top">
//         <div className="container">
//           <a className="navbar-brand d-flex align-items-center" href="#">
//             <img
//               src="https://i.ibb.co/bdhQrFG/pizeonflyfull.png"
//               alt="pizeonflyfull"
//               height="35px"
//             />
//           </a>
//           <button
//             className="navbar-toggler"
//             type="button"
//             data-bs-toggle="collapse"
//             data-bs-target="#navbarNav"
//             aria-controls="navbarNav"
//             aria-expanded="false"
//             aria-label="Toggle navigation"
//           >
//             <span className="navbar-toggler-icon"></span>
//           </button>
//           <div className="collapse navbar-collapse" id="navbarNav">
//             <ul className="navbar-nav ms-auto">
//               <li className="nav-item">
//                 <a className="nav-link" href="#features">
//                   Features
//                 </a>
//               </li>
//               <li className="nav-item">
//                 <a className="nav-link" href="#pricing">
//                   Pricing
//                 </a>
//               </li>
//               <li className="nav-item">
//                 <a className="nav-link" href="#testimonials">
//                   Testimonials
//                 </a>
//               </li>
//               <li className="nav-item ms-3">
//                 <button
//                   onClick={() => setShowLoginModal(true)}
//                   className="btn btn-outline-primary"
//                 >
//                   Login
//                 </button>
//               </li>
//             </ul>
//           </div>
//         </div>
//       </nav>

//       {/* Hero Section */}
//       <section className="py-5 mt-5 text-center">
//         <div className="container">
//           <h1 className="display-4 fw-bold text-dark">
//             Smart Expense Management{" "}
//             <span className="text-primary">System</span>
//           </h1>
//           <p className="lead text-muted mb-4">
//             Transform your business expense tracking with insights, real-time
//             reporting, and automated reconciliation.
//           </p>
//           <div className="d-flex justify-content-center gap-3">
//             <button
//               onClick={() => setShowLoginModal(true)}
//               className="btn btn-primary d-flex align-items-center"
//             >
//               Get Started <ChevronRight className="ms-2" />
//             </button>
//             <button className="btn btn-outline-primary">Watch Demo</button>
//           </div>
//           <img
//             src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80"
//             alt="Dashboard Preview"
//             className="img-fluid rounded shadow mt-4"
//           />
//         </div>
//       </section>

//       {/* Features Section */}
//       <section className="py-5 bg-light" id="features">
//         <div className="container text-center">
//           <h2 className="fw-bold mb-5">
//             Everything you need to manage expenses
//           </h2>
//           <div className="row">
//             {[
//               {
//                 icon: <BarChart3 className="text-primary" size={24} />,
//                 title: "Real-time Analytics",
//                 description:
//                   "Get instant insights into your spending patterns with powerful analytics tools.",
//               },
//               {
//                 icon: <Receipt className="text-primary" size={24} />,
//                 title: "Smart Receipt Scanning",
//                 description:
//                   "Automatically extract data from receipts using our advanced OCR technology.",
//               },
//               {
//                 icon: <PieChart className="text-primary" size={24} />,
//                 title: "Budget Tracking",
//                 description:
//                   "Set and monitor budgets with automatic alerts and spending forecasts.",
//               },
//               {
//                 icon: <Shield className="text-primary" size={24} />,
//                 title: "Secure & Compliant",
//                 description:
//                   "Bank-grade security with automatic backup and encryption.",
//               },
//               {
//                 icon: <Zap className="text-primary" size={24} />,
//                 title: "Automated Processing",
//                 description:
//                   "Save time with automated expense categorization and reporting.",
//               },
//               {
//                 icon: <Clock className="text-primary" size={24} />,
//                 title: "24/7 Support",
//                 description:
//                   "Round-the-clock support to help you manage your expenses better.",
//               },
//             ].map((feature, index) => (
//               <div key={index} className="col-lg-4 mb-4">
//                 <div className="card border-0 shadow-sm">
//                   <div className="card-body">
//                     <div className="mb-3">{feature.icon}</div>
//                     <h5 className="card-title fw-bold">{feature.title}</h5>
//                     <p className="card-text">{feature.description}</p>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* CTA Section */}
//       <section className="py-5 bg-primary text-white text-center">
//         <div className="container">
//           <h2 className="fw-bold mb-4">
//             Ready to transform your expense management?
//           </h2>
//           <p className="lead mb-4">
//             Join thousands of businesses that trust PizeonFly for their expense
//             management needs.
//           </p>
//         </div>
//       </section>

//       <footer className="bg-dark text-light py-4 mt-auto">
//         <div className="container">
//           <div className="row">
//             <div className="col-md-3">
//               <div className="d-flex align-items-center mb-3">
//                 <span className="ms-2 fw-bold text-white">PizeonFly</span>
//               </div>
//               <p>Making expense management effortless for modern businesses.</p>
//             </div>
//             <div className="col-md-3">
//               <h5 className="fw-bold">Product</h5>
//               <ul className="list-unstyled">
//                 <li>
//                   <a href="#" className="text-light">
//                     Features
//                   </a>
//                 </li>
//                 <li>
//                   <a href="#" className="text-light">
//                     Pricing
//                   </a>
//                 </li>
//                 <li>
//                   <a href="#" className="text-light">
//                     Enterprise
//                   </a>
//                 </li>
//               </ul>
//             </div>
//             <div className="col-md-3">
//               <h5 className="fw-bold">Company</h5>
//               <ul className="list-unstyled">
//                 <li>
//                   <a href="#" className="text-light">
//                     About
//                   </a>
//                 </li>
//                 <li>
//                   <a href="#" className="text-light">
//                     Blog
//                   </a>
//                 </li>
//                 <li>
//                   <a href="#" className="text-light">
//                     Careers
//                   </a>
//                 </li>
//               </ul>
//             </div>
//             <div className="col-md-3">
//               <h5 className="fw-bold">Legal</h5>
//               <ul className="list-unstyled">
//                 <li>
//                   <a href="#" className="text-light">
//                     Privacy
//                   </a>
//                 </li>
//                 <li>
//                   <a href="#" className="text-light">
//                     Terms
//                   </a>
//                 </li>
//                 <li>
//                   <a href="#" className="text-light">
//                     Security
//                   </a>
//                 </li>
//               </ul>
//             </div>
//           </div>
//           <div className="text-center mt-3">
//             <p className="text-muted">© 2024 PizeonFly. All rights reserved.</p>
//           </div>
//         </div>
//       </footer>

//       {/* Login Modal */}
//       {showLoginModal && (
//         <div>
//           {/* Backdrop */}
//           <div
//             className="modal-backdrop fade show"
//             style={{
//               position: "fixed",
//               top: 0,
//               left: 0,
//               width: "100vw",
//               height: "100vh",
//               backgroundColor: "rgba(0, 0, 0, 0.5)",
//               zIndex: 1040,
//             }}
//             onClick={() => setShowLoginModal(false)} // Close modal on backdrop click
//           ></div>

//           {/* Modal Container */}
//           <div
//             className="d-flex justify-content-center align-items-center"
//             style={{
//               position: "fixed",
//               top: 0,
//               left: 0,
//               width: "100vw",
//               height: "100vh",
//               zIndex: 1050,
//             }}
//           >
//             <div
//               className="card p-4 shadow-lg rounded"
//               style={{
//                 maxWidth: "400px",
//                 width: "100%",
//                 borderColor: "#ced4da",
//                 backgroundColor: "#fff",
//               }}
//               onClick={(e) => e.stopPropagation()} // Prevent clicks inside modal from closing it
//             >
//               <h2 className="text-center mb-4" style={{ color: "#495057" }}>
//                 Login
//               </h2>
//               <form onSubmit={handleLogin}>
//                 <div className="mb-3">
//                   <label className="form-label">Email or Phone</label>
//                   <input
//                     type="text"
//                     value={identifier}
//                     onChange={(e) => setIdentifier(e.target.value)}
//                     required
//                     className="form-control"
//                     placeholder="Enter email or phone"
//                   />
//                 </div>
//                 <div className="mb-3 position-relative">
//                   <label className="form-label">Password</label>
//                   <input
//                     type={showPassword ? "text" : "password"}
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                     required
//                     className="form-control"
//                     placeholder="Enter password"
//                   />
//                   <button
//                     type="button"
//                     className="position-absolute border-0 bg-transparent"
//                     style={{
//                       top: "70%",
//                       right: "10px",
//                       transform: "translateY(-50%)",
//                       color: "#6c757d",
//                       cursor: "pointer",
//                     }}
//                     onClick={() => setShowPassword(!showPassword)}
//                   >
//                     {showPassword ? <FaEyeSlash /> : <FaEye />}
//                   </button>
//                 </div>
//                 <button type="submit" className="btn btn-primary w-100">
//                   Login
//                 </button>
//                 <p className="text-center mt-3">
//                   Don’t have an account?{" "}
//                   <a
//                     href="/signup"
//                     className="text-decoration-none"
//                     style={{ color: "#0d6efd" }}
//                   >
//                     Signup here
//                   </a>
//                 </p>
//               </form>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }
// export default Landing;



import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import {
  BarChart3,
  Shield,
  Zap,
  Clock,
  ChevronRight,
  Receipt,
  PieChart,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { FaEyeSlash, FaEye } from "react-icons/fa";

function Landing() {
  const navigate = useNavigate();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuth();

  const handleLoginClick = () => {
    setShowLoginModal(true);
  };

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^[0-9]{10}$/;

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!emailRegex.test(identifier) && !phoneRegex.test(identifier)) {
      toast.warn("Please enter a valid email or 10-digit phone number.");
      return;
    }

    const loginPayload = emailRegex.test(identifier)
      ? { email: identifier, password }
      : { phone: identifier, password };

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_URL}/api/v1/auth/login`,
        loginPayload
      );
      const { user, token } = response.data;
      login(user);
      localStorage.setItem("token", token);
      localStorage.setItem("userId", user.id);
      toast.success("Login successful");
      navigate("/dashboard");
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      {/* Navbar */}
      <nav className="bg-white shadow fixed w-full z-10">
        <div className="container mx-auto flex justify-between items-center py-4">
          <a href="#" className="flex items-center">
            <img
              src="https://i.ibb.co/bdhQrFG/pizeonflyfull.png"
              alt="pizeonflyfull"
              className="h-8"
            />
          </a>
          <button
            className="text-gray-700 lg:hidden"
            aria-label="Toggle navigation"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>
          <div className="hidden lg:flex items-center space-x-6">
            <a href="#features" className="text-gray-700 hover:text-blue-500">
              Features
            </a>
            <a href="#pricing" className="text-gray-700 hover:text-blue-500">
              Pricing
            </a>
            <a
              href="#testimonials"
              className="text-gray-700 hover:text-blue-500"
            >
              Testimonials
            </a>
            <button
              onClick={() => setShowLoginModal(true)}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg"
            >
              Login
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="mt-16 py-10 text-center bg-gray-50">
        <div className="container mx-auto">
          <h1 className="text-4xl font-bold text-gray-800">
            Smart Expense Management{" "}
            <span className="text-blue-500">System</span>
          </h1>
          <p className="text-gray-600 mt-4">
            Transform your business expense tracking with insights, real-time
            reporting, and automated reconciliation.
          </p>
          <div className="flex justify-center gap-4 mt-6">
            <button
              onClick={() => setShowLoginModal(true)}
              className="px-6 py-2 bg-blue-500 text-white rounded-lg flex items-center"
            >
              Get Started <ChevronRight className="ml-2" />
            </button>
            <button className="px-6 py-2 border border-blue-500 text-blue-500 rounded-lg">
              Watch Demo
            </button>
          </div>
          <img
            src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80"
            alt="Dashboard Preview"
            className="rounded shadow-lg mt-8 mx-auto max-w-4xl"
          />
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-10 bg-gray-100">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center">
            Everything you need to manage expenses
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            {[
              {
                icon: <BarChart3 className="text-blue-500 w-6 h-6" />,
                title: "Real-time Analytics",
                description:
                  "Get instant insights into your spending patterns with powerful analytics tools.",
              },
              {
                icon: <Receipt className="text-blue-500 w-6 h-6" />,
                title: "Smart Receipt Scanning",
                description:
                  "Automatically extract data from receipts using our advanced OCR technology.",
              },
              {
                icon: <PieChart className="text-blue-500 w-6 h-6" />,
                title: "Budget Tracking",
                description:
                  "Set and monitor budgets with automatic alerts and spending forecasts.",
              },
              {
                icon: <Shield className="text-blue-500 w-6 h-6" />,
                title: "Secure & Compliant",
                description:
                  "Bank-grade security with automatic backup and encryption.",
              },
              {
                icon: <Zap className="text-blue-500 w-6 h-6" />,
                title: "Automated Processing",
                description:
                  "Save time with automated expense categorization and reporting.",
              },
              {
                icon: <Clock className="text-blue-500 w-6 h-6" />,
                title: "24/7 Support",
                description:
                  "Round-the-clock support to help you manage your expenses better.",
              },
            ].map((feature, index) => (
              <div key={index} className="bg-white rounded-lg p-6 shadow-lg">
                <div className="mb-3">{feature.icon}</div>
                <h5 className="font-bold text-lg">{feature.title}</h5>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-6">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-6">
          <div>
            <h4 className="font-bold">PizeonFly</h4>
            <p className="text-gray-400 mt-2">
              Making expense management effortless for modern businesses.
            </p>
          </div>
          {/* Additional footer sections here */}
        </div>
      </footer>

      {/* Login Modal */}
      {showLoginModal && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
          onClick={() => setShowLoginModal(false)}
        >
          <div
            className="bg-white rounded-lg p-6 shadow-lg max-w-md"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-lg font-bold mb-4">Login</h3>
            <form onSubmit={handleLogin}>
              {/* Login form fields */}
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Landing;
