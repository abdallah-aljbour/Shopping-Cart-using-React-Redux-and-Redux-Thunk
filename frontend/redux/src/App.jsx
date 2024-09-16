import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  Navigate,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "./features/authSlice";
import RegisterPage from "./Component/RegisterPage";
import LoginPage from "./Component/LoginPage";
import HomePage from "./Component/HomePage";
import DashboardPage from "./Component/DashboardPage";
import AdminProductManagement from "./Component/AdminProductManagement";
import ProductList from "./Component/ProductList";
import Cart from "./Component/Cart";

import "./App.css";

function App() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  // Fetch user info from the backend (this could be done in a useEffect for real implementations)
  useEffect(() => {
    // Placeholder for fetching user data based on token, if necessary.
  }, [dispatch]);

  return (
    <Router>
      <div>
        <nav className="nav">
          <Link to="/">Home</Link>
          <Link to="/products">Products</Link>
          <Link to="/cart">Cart</Link>
          {user ? (
            <>
              {user.role === "Admin" && <Link to="/dashboard">Dashboard</Link>}
              {user.role === "Admin" && (
                <Link to="/admin/products">Manage Products</Link>
              )}
              <button onClick={() => dispatch(logout())}>Logout</button>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </>
          )}
        </nav>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/cart" element={<Cart />} />

          <Route
            path="/login"
            element={user ? <Navigate to="/" /> : <LoginPage />}
          />
          <Route
            path="/register"
            element={user ? <Navigate to="/" /> : <RegisterPage />}
          />
          <Route
            path="/dashboard"
            element={
              user?.role === "Admin" ? <DashboardPage /> : <Navigate to="/" />
            }
          />
          <Route
            path="/admin/products"
            element={
              user?.role === "Admin" ? (
                <AdminProductManagement />
              ) : (
                <Navigate to="/" />
              )
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
