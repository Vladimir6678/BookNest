import { Navigate, Outlet } from "react-router";
import UserContext from "../context/UserContext.jsx";
import { useContext } from "react";

export default function PrivateGuard() { 
    const { user } = useContext(UserContext); 

    if (!user || !user.accessToken) {
        
        return <Navigate to="/login" replace />;
    }

   
    return <Outlet />;
}