// import React from 'react';
// import { 
//   BarChart3, 
//   Shield, 
//   Zap, 
//   Clock, 
//   ChevronRight, 
//   Receipt, 
//   PieChart,
//   Users,
//   Bird
// } from 'lucide-react';
// import { useNavigate } from 'react-router-dom';

// function Landing() {
//     const navigate = useNavigate();
//   return (
//     <div className="bg-light min-vh-100 d-flex flex-column">
//       {/* Navigation */}
//       <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm fixed-top">
//         <div className="container">
//           <a className="navbar-brand d-flex align-items-center" href="#">
//             <Bird className="text-primary" size={32} />
//             <span className="ms-2 fw-bold text-dark">PizeonFly</span>
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
//                 <a className="nav-link" href="#features">Features</a>
//               </li>
//               <li className="nav-item">
//                 <a className="nav-link" href="#pricing">Pricing</a>
//               </li>
//               <li className="nav-item">
//                 <a className="nav-link" href="#testimonials">Testimonials</a>
//               </li>
//               <li className="nav-item ms-3">
//                 <button onClick={()=>{navigate('/login')}} className="btn btn-outline-primary">Login</button>
//               </li>
//               {/* <li className="nav-item ms-2">
//                 <a className="btn btn-primary text-white" href="#free-trial">Start Free Trial</a>
//               </li> */}
//             </ul>
//           </div>
//         </div>
//       </nav>

//       {/* Hero Section */}
//       <section className="py-5 mt-5 text-center">
//         <div className="container">
//           <h1 className="display-4 fw-bold text-dark">
//             Smart Expense Management <span className="text-primary">System</span>
//           </h1>
//           <p className="lead text-muted mb-4">
//             Transform your business expense tracking with insights, real-time reporting, and automated reconciliation.
//           </p>
//           <div className="d-flex justify-content-center gap-3">
//             <button onClick={()=>{navigate('/login')}} className="btn btn-primary d-flex align-items-center">
//               Get Started<ChevronRight className="ms-2" />
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

//   {/* Features Section */}
//   <section className="py-5 bg-light" id="features">
//     <div className="container text-center">
//       <h2 className="fw-bold mb-5">Everything you need to manage expenses</h2>
//       <div className="row">
//         {[
//           {
//             icon: <BarChart3 className="text-primary" size={24} />,
//             title: "Real-time Analytics",
//             description: "Get instant insights into your spending patterns with powerful analytics tools."
//           },
//           {
//             icon: <Receipt className="text-primary" size={24} />,
//             title: "Smart Receipt Scanning",
//             description: "Automatically extract data from receipts using our advanced OCR technology."
//           },
//           {
//             icon: <PieChart className="text-primary" size={24} />,
//             title: "Budget Tracking",
//             description: "Set and monitor budgets with automatic alerts and spending forecasts."
//           },
//           {
//             icon: <Shield className="text-primary" size={24} />,
//             title: "Secure & Compliant",
//             description: "Bank-grade security with automatic backup and encryption."
//           },
//           {
//             icon: <Zap className="text-primary" size={24} />,
//             title: "Automated Processing",
//             description: "Save time with automated expense categorization and reporting."
//           },
//           {
//             icon: <Clock className="text-primary" size={24} />,
//             title: "24/7 Support",
//             description: "Round-the-clock support to help you manage your expenses better."
//           }
//         ].map((feature, index) => (
//           <div key={index} className="col-lg-4 mb-4">
//             <div className="card border-0 shadow-sm">
//               <div className="card-body">
//                 <div className="mb-3">{feature.icon}</div>
//                 <h5 className="card-title fw-bold">{feature.title}</h5>
//                 <p className="card-text">{feature.description}</p>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   </section>

//   {/* Social Proof */}
//   <section className="py-5 text-center">
//     <div className="container">
//       <h2 className="fw-bold mb-4">Trusted by 100+ businesses</h2>
//       <div className="d-flex justify-content-center gap-3 flex-wrap text-muted">
//         {['Microsoft', 'Adobe', 'Shopify', 'Spotify', 'Slack'].map((company) => (
//           <span key={company} className="fw-semibold">{company}</span>
//         ))}
//       </div>
//     </div>
//   </section>

//   {/* CTA Section */}
//   <section className="py-5 bg-primary text-white text-center">
//     <div className="container">
//       <h2 className="fw-bold mb-4">Ready to transform your expense management?</h2>
//       <p className="lead mb-4">Join thousands of businesses that trust PizeonFly for their expense management needs.</p>
//       {/* <a className="btn btn-light text-primary" href="#start-trial">Start Your Free Trial</a> */}
//     </div>
//   </section>

//   {/* Footer */}
//   <footer className="bg-dark text-light py-4 mt-auto">
//     <div className="container">
//       <div className="row">
//         <div className="col-md-3">
//           <div className="d-flex align-items-center mb-3">
//             <Bird className="text-primary" size={32} />
//             <span className="ms-2 fw-bold text-white">PizeonFly</span>
//           </div>
//           <p>Making expense management effortless for modern businesses.</p>
//         </div>
//         <div className="col-md-3">
//           <h5 className="fw-bold">Product</h5>
//           <ul className="list-unstyled">
//             <li><a href="#" className="text-light">Features</a></li>
//             <li><a href="#" className="text-light">Pricing</a></li>
//             <li><a href="#" className="text-light">Enterprise</a></li>
//           </ul>
//         </div>
//         <div className="col-md-3">
//           <h5 className="fw-bold">Company</h5>
//           <ul className="list-unstyled">
//             <li><a href="#" className="text-light">About</a></li>
//             <li><a href="#" className="text-light">Blog</a></li>
//             <li><a href="#" className="text-light">Careers</a></li>
//           </ul>
//         </div>
//         <div className="col-md-3">
//           <h5 className="fw-bold">Legal</h5>
//           <ul className="list-unstyled">
//             <li><a href="#" className="text-light">Privacy</a></li>
//             <li><a href="#" className="text-light">Terms</a></li>
//             <li><a href="#" className="text-light">Security</a></li>
//           </ul>
//         </div>
//       </div>
//       <div className="text-center mt-3">
//         <p className="text-muted">© 2024 PizeonFly. All rights reserved.</p>
//       </div>
//     </div>
//   </footer>
//     </div>
//   );
// }

// export default Landing;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import {
  BarChart3,
  Shield,
  Zap,
  Clock,
  ChevronRight,
  Receipt,
  PieChart,
  Users,
  Bird
} from 'lucide-react';
import './Landing.css'

function Landing() {
  const navigate = useNavigate();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5100/api/v1/auth/login', {
        email: identifier, // Assuming identifier is email for now
        password
      });

      const { token } = response.data;
      localStorage.setItem('token', token); // Store token in localStorage
      toast.success("Login successful!");
      setShowLoginModal(false); // Close modal
      navigate('/dashboard'); // Redirect to dashboard
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="bg-light min-vh-100 d-flex flex-column">
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm fixed-top">
        <div className="container">
          <a className="navbar-brand d-flex align-items-center" href="#">
            <Bird className="text-primary" size={32} />
            <span className="ms-2 fw-bold text-dark">PizeonFly</span>
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <a className="nav-link" href="#features">Features</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#pricing">Pricing</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#testimonials">Testimonials</a>
              </li>
              <li className="nav-item ms-3">
                <button onClick={() => setShowLoginModal(true)} className="btn btn-outline-primary">Login</button>
              </li>
            </ul>
          </div>
        </div>
      </nav>


      {/* Hero Section */}
      <section className="py-5 mt-5 text-center">
        <div className="container">
          <h1 className="display-4 fw-bold text-dark">
            Smart Expense Management <span className="text-primary">System</span>
          </h1>
          <p className="lead text-muted mb-4">
            Transform your business expense tracking with insights, real-time reporting, and automated reconciliation.
          </p>
          <div className="d-flex justify-content-center gap-3">
            <button onClick={() => setShowLoginModal(true)} className="btn btn-primary d-flex align-items-center">
              Get Started <ChevronRight className="ms-2" />
            </button>
            <button className="btn btn-outline-primary">Watch Demo</button>
          </div>
          <img
            src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80"
            alt="Dashboard Preview"
            className="img-fluid rounded shadow mt-4"
          />
        </div>
      </section>
      {/* Features Section */}
      <section className="py-5 bg-light" id="features">
        <div className="container text-center">
          <h2 className="fw-bold mb-5">Everything you need to manage expenses</h2>
          <div className="row">
            {[
              {
                icon: <BarChart3 className="text-primary" size={24} />,
                title: "Real-time Analytics",
                description: "Get instant insights into your spending patterns with powerful analytics tools."
              },
              {
                icon: <Receipt className="text-primary" size={24} />,
                title: "Smart Receipt Scanning",
                description: "Automatically extract data from receipts using our advanced OCR technology."
              },
              {
                icon: <PieChart className="text-primary" size={24} />,
                title: "Budget Tracking",
                description: "Set and monitor budgets with automatic alerts and spending forecasts."
              },
              {
                icon: <Shield className="text-primary" size={24} />,
                title: "Secure & Compliant",
                description: "Bank-grade security with automatic backup and encryption."
              },
              {
                icon: <Zap className="text-primary" size={24} />,
                title: "Automated Processing",
                description: "Save time with automated expense categorization and reporting."
              },
              {
                icon: <Clock className="text-primary" size={24} />,
                title: "24/7 Support",
                description: "Round-the-clock support to help you manage your expenses better."
              }
            ].map((feature, index) => (
              <div key={index} className="col-lg-4 mb-4">
                <div className="card border-0 shadow-sm">
                  <div className="card-body">
                    <div className="mb-3">{feature.icon}</div>
                    <h5 className="card-title fw-bold">{feature.title}</h5>
                    <p className="card-text">{feature.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-5 text-center">
        <div className="container">
          <h2 className="fw-bold mb-4">Trusted by 100+ businesses</h2>
          <div className="d-flex justify-content-center gap-3 flex-wrap text-muted">
            {['Microsoft', 'Adobe', 'Shopify', 'Spotify', 'Slack'].map((company) => (
              <span key={company} className="fw-semibold">{company}</span>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-5 bg-primary text-white text-center">
        <div className="container">
          <h2 className="fw-bold mb-4">Ready to transform your expense management?</h2>
          <p className="lead mb-4">Join thousands of businesses that trust PizeonFly for their expense management needs.</p>
          {/* <a className="btn btn-light text-primary" href="#start-trial">Start Your Free Trial</a> */}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-dark text-light py-4 mt-auto">
        <div className="container">
          <div className="row">
            <div className="col-md-3">
              <div className="d-flex align-items-center mb-3">
                <Bird className="text-primary" size={32} />
                <span className="ms-2 fw-bold text-white">PizeonFly</span>
              </div>
              <p>Making expense management effortless for modern businesses.</p>
            </div>
            <div className="col-md-3">
              <h5 className="fw-bold">Product</h5>
              <ul className="list-unstyled">
                <li><a href="#" className="text-light">Features</a></li>
                <li><a href="#" className="text-light">Pricing</a></li>
                <li><a href="#" className="text-light">Enterprise</a></li>
              </ul>
            </div>
            <div className="col-md-3">
              <h5 className="fw-bold">Company</h5>
              <ul className="list-unstyled">
                <li><a href="#" className="text-light">About</a></li>
                <li><a href="#" className="text-light">Blog</a></li>
                <li><a href="#" className="text-light">Careers</a></li>
              </ul>
            </div>
            <div className="col-md-3">
              <h5 className="fw-bold">Legal</h5>
              <ul className="list-unstyled">
                <li><a href="#" className="text-light">Privacy</a></li>
                <li><a href="#" className="text-light">Terms</a></li>
                <li><a href="#" className="text-light">Security</a></li>
              </ul>
            </div>
          </div>
          <div className="text-center mt-3">
            <p className="text-muted">© 2024 PizeonFly. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Login Modal */}
      {showLoginModal && (
        <div className="modal show d-block" tabIndex="-1" role="dialog" aria-labelledby="loginModalLabel" aria-hidden="true">
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content custom-modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="loginModalLabel">Login</h5>
                <button type="button" className="btn-close" onClick={() => setShowLoginModal(false)}></button>
              </div>
              <div className="modal-body">
                <form onSubmit={handleLogin}>
                  <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input
                      type="email"
                      value={identifier}
                      onChange={(e) => setIdentifier(e.target.value)}
                      required
                      className="form-control"
                      placeholder="Enter your email"
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Password</label>
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="form-control"
                      placeholder="Enter your password"
                    />
                  </div>
                  <button type="submit" className="btn btn-primary w-100">Login</button>
                </form>
              </div>
            </div>
          </div>
          <div className="modal-backdrop fade show" onClick={() => setShowLoginModal(false)}></div>
        </div>
      )}

    </div>
  );
}

export default Landing;
