import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {

    const loggedInUserId =
        localStorage.getItem("loggedInUserId");

    if (!loggedInUserId) {
        return <Navigate to="/login" replace />;
    }

    return children;
};

export default ProtectedRoute;