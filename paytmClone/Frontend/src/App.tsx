import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Dashboard from "./pages/Dashboard";
import SendMoney from "./pages/SendMoney";
import axios from "axios";
import { useState, useEffect } from "react"; // Import useState and useEffect

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(true); // Use state for auth status

    useEffect(() => {
        const checkAuth = async () => {
            const token = localStorage.getItem("token");
            if (token) {
                // Only make the request if a token exists
                try {
                    const response = await axios.get(
                        "http://localhost:3000/api/v1/user/me",
                        {
                            headers: {
                                authorization: `Bearer ${token}`,
                            },
                        }
                    );
                    setIsAuthenticated(response.data.message === "Token valid");
                } catch (error) {
                    console.error("Authentication error:", error);
                    localStorage.removeItem("token"); // Clear invalid token
                    setIsAuthenticated(false);
                }
            } else {
                setIsAuthenticated(false); // No token, not authenticated
            }
        };

        checkAuth(); // Call the auth check on mount
    }, []); // Empty dependency array ensures this runs only once on mount

    // Conditional rendering based on authentication status
    if (isAuthenticated === null) {
        return <div>Loading...</div>; // Or a loading indicator
    }

    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path="/"
                    element={
                        isAuthenticated ? (
                            <Navigate to="/dashboard" />
                        ) : (
                            <Navigate to="/signin" />
                        )
                    }
                />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/signin" element={<SignIn />} />
                <Route
                    path="/dashboard"
                    element={
                        isAuthenticated ? (
                            <Dashboard />
                        ) : (
                            <Navigate to="/signin" />
                        )
                    }
                />
                <Route
                    path="/send"
                    element={
                        isAuthenticated ? (
                            <SendMoney />
                        ) : (
                            <Navigate to="/signin" />
                        )
                    }
                />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
