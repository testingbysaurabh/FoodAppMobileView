
import { Navigate, Outlet } from "react-router-dom";
import { readTokenFromLocalStorage } from "../Utils/auth"

const ProtectedRoutes = () => {
    const token = readTokenFromLocalStorage();

    if (!token) {
        // not logged in
        return <Navigate to="/" replace />;
    }

    return <Outlet />;
};

export default ProtectedRoutes;
