import React from "react";
import { Navigate } from "react-router-dom";

const PublicRoute = ({ children }) => {

    const loggedInUserId =
        localStorage.getItem("loggedInUserId");

    if (loggedInUserId) {
        return <Navigate to="/todo" replace />;
    }

    return children;
};

export default PublicRoute;