import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { LoadingSkeleton } from "../ui/LoadingSkeleton";

export function ProtectedRoute() {
    const { user, loading } = useAuth();

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center p-4">
                <LoadingSkeleton className="h-12 w-12 rounded-full" />
            </div>
        );
    }

    // If not authenticated, redirect to login
    if (!user) {
        return <Navigate to="/admin/login" replace />;
    }

    // If authenticated, render child routes (Outlet)
    return <Outlet />;
}
