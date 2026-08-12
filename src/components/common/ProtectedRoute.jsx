import React from 'react'
import { useAuth } from '../../context/AuthContext'
import { Navigate, Outlet } from 'react-router-dom'

const ProtectedRoute = ({ allowedRoles, requireSubscription = false }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex justify-center p-25">
        <div className="loader"></div>
      </div>
    );
  }

  const isGuestAllowed = allowedRoles?.includes(undefined);

  if (!user && !isGuestAllowed) {
    return <Navigate to="/login" replace />;
  }

  if (user && allowedRoles && !allowedRoles.includes(user.role)) {
    if (user.role === "admin") {
      return <Navigate to="/admin-dashboard" replace />;
    }

    if (user.role === "seller") {
      return <Navigate to="/dashboard" replace />;
    }

    return <Navigate to="/" replace />;
  }

  // Subscription protection
  if (
    requireSubscription &&
    user?.role === "seller" &&
    user?.subscription?.status !== "active"
  ) {
    return <Navigate to="/subscription" replace />;
  }

  return <Outlet />;
};


const PublicRoute = () => {
    const { user, loading } = useAuth();

    if (loading) {
        return (
            <div className="flex justify-center p-25">
                <div className="loader"></div>
            </div>
        )
    }

    if (user) {
        if (user.role === "admin") return <Navigate to="/admin-dashboard" replace />
        if (user.role === "seller") return <Navigate to="/dashboard" replace />
        return <Navigate to="/" replace />
    }

    return <Outlet />
}

export {ProtectedRoute, PublicRoute}