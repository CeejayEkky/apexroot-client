import React from "react";
import { useAuth } from "../../context/AuthContext";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const ProtectedRoute = ({ allowedRoles, requireSubscription = false }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

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

  // 🔐 SELLER SUBSCRIPTION CHECK
  if (requireSubscription) {
    const subscription = user?.subscription;

    const hasActiveSubscription =
      user?.role === "seller" &&
      subscription?.status === "active" &&
      subscription?.expiresAt &&
      new Date(subscription.expiresAt) > new Date();

    if (!hasActiveSubscription) {
      return (
        <Navigate
          to="/subscription"
          replace
          state={{ from: location.pathname }}
        />
      );
    }
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
    );
  }

  if (user) {
    if (user.role === "admin") {
      return <Navigate to="/admin-dashboard" replace />;
    }

    if (user.role === "seller") {
      return <Navigate to="/dashboard" replace />;
    }

    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export { ProtectedRoute, PublicRoute };