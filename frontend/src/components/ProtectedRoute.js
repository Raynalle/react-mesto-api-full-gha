import React from "react";
import { Navigate } from "react-router-dom";

function ProtectedRoute ({component: Component, ...props}) {
    return props.isLogged ? <Component {...props} /> : <Navigate to = "sing-in" />
}

export default ProtectedRoute;