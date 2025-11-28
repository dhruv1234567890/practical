import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import { useAuthContext } from "./context/AuthContext";

export default function App() {
  const { user, logout } = useAuthContext();
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-3 flex justify-between items-center">
          <Link to="/" className="font-semibold">
            Practical App
          </Link>
          <nav className="space-x-4">
            {!user && (
              <Link to="/signup" className="text-sm">
                Signup
              </Link>
            )}
            {!user && (
              <Link to="/login" className="text-sm">
                Login
              </Link>
            )}
            {user && window.location.pathname === "/" && (
              <Link to="/dashboard" className="text-sm text-blue-600">
                Dashboard
              </Link>
            )}
            {user && (
              <button onClick={logout} className="text-sm text-red-600">
                Logout
              </button>
            )}
          </nav>
        </div>
      </header>

      <main className="max-w-4xl mx-auto p-4">
        <Routes>
          <Route
            path="/"
            element={
              <div className="p-8 text-center">Welcome — use Signup/Login</div>
            }
          />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>
    </div>
  );
}
