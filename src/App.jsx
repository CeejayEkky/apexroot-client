import React, { useEffect, useState } from "react";
import { Navigate, Outlet, Route, Routes, useLocation } from "react-router-dom";
import Landing from "./pages/shared/Landing";
import Properties from "./pages/shared/Properties";
import PropertyDetails from "./pages/shared/PropertyDetails";
import Register from "./pages/auth/Register";
import VerifyEmail from "./pages/auth/VerifyEmail";
import Login from "./pages/auth/Login";
import ForgotPassword from "./pages/auth/ForgotPassword";
import ResetPassword from "./pages/auth/ResetPassword";
import Profile from "./pages/shared/Profile";
import AdminLayout from "./components/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminUsers from "./pages/admin/AdminUsers";
import SellerRequests from "./pages/admin/SellerRequests";
import AdminProperties from "./pages/admin/AdminProperties";
import AdminInquiries from "./pages/admin/AdminInquiries";
import AdminContacts from "./pages/admin/AdminContacts";
import SellerLayout from "./components/SellerLayout";
import SellerDashboard from "./pages/seller/SellerDashboard";
import AddProperty from "./pages/seller/AddProperty";
import MyProperties from "./pages/seller/MyProperties";
import EditProperty from "./pages/seller/EditProperty";
import {
  ProtectedRoute,
  PublicRoute,
} from "./components/common/ProtectedRoute";
import { FaChevronUp } from "react-icons/fa";
import { useAuth } from "./context/AuthContext";
import MyInquiries from "./pages/buyer/MyInquiries";
import ChatMessages from "./pages/shared/ChatMessages";
import Contact from "./pages/shared/Contact";
import Wishlist from "./pages/buyer/Wishlist";
import Subscription from "./pages/seller/Subscription";
import SubscriptionVerify from "./pages/seller/SubscriptionVerify";
import SubscriptionDashboard from "./pages/seller/SubscriptionDashboard";

const ScrollToTopOnRouteChange = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname]);

  return null;
};

const ScrollTopBtn = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      onClick={handleClick}
      className={`fixed bottom-6 right-6 z-50 flex h-12 w-12 items-center justify-center rounded-full shadow-lg transition-all duration-300 ${visible ? "scale-100 opacity-100 bg-amber-500 text-white hover:bg-amber-400" : "pointer-events-none scale-0 opacity-0"}`}
    >
      <FaChevronUp size={22} />
    </button>
  );
};

const SellerLayoutWrap = () => {
  const { user } = useAuth();
  return user?.role === "seller" ? <SellerLayout /> : <Outlet />;
};

const App = () => {
  useEffect(() => {
    document.body.style.overflowX = "hidden";
    document.documentElement.style.overflowX = "hidden";

    return () => {
      document.body.style.overflowX = "";
      document.documentElement.style.overflowX = "";
    };
  }, []); // prevents horizontal overflow on the whole site

  return (
    <div className="min-h-screen w-full overflow-x-hidden">
      <ScrollToTopOnRouteChange />
      <ScrollTopBtn />

      <Routes>
        <Route element={<PublicRoute />}>
          <Route path="/register" element={<Register />} />
          <Route path="/verify-email" element={<VerifyEmail />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
        </Route>

        <Route path="/" element={<Landing />} />
        <Route path="/properties" element={<Properties />} />
        <Route path="/property/:id" element={<PropertyDetails />} />

        <Route
          element={
            <ProtectedRoute allowedRoles={["buyer", "seller", "admin"]} />
          }
        >
          <Route element={<SellerLayoutWrap />}>
            <Route path="/inquiries" element={<MyInquiries />} />
            <Route path="/chat-messages" element={<ChatMessages />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/profile" element={<Profile />} />
          </Route>

          <Route element={<ProtectedRoute allowedRoles={["seller"]} />}>
            <Route
              path="/subscription-dashboard"
              element={<SubscriptionDashboard />}
            />
            <Route
              path="/subscription/verify"
              element={<SubscriptionVerify />}
            />
            <Route path="/subscription" element={<Subscription />} />

            <Route
              element={
                <ProtectedRoute
                  allowedRoles={["seller"]}
                  requireSubscription={true}
                />
              }
            >
              <Route element={<SellerLayout />}>
                <Route path="/dashboard" element={<SellerDashboard />} />
                <Route path="/seller-dashboard" element={<SellerDashboard />} />
                <Route path="/add-property" element={<AddProperty />} />
                <Route path="/my-properties" element={<MyProperties />} />
                <Route path="/edit-property/:id" element={<EditProperty />} />
              </Route>
            </Route>
          </Route>
        </Route>

        <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
          <Route element={<AdminLayout />}>
            <Route path="/admin-dashboard" element={<AdminDashboard />} />
            <Route path="/admin/users" element={<AdminUsers />} />
            <Route path="/admin/seller-requests" element={<SellerRequests />} />
            <Route path="/admin/properties" element={<AdminProperties />} />
            <Route path="/admin/inquiries" element={<AdminInquiries />} />
            <Route path="/admin/contacts" element={<AdminContacts />} />
          </Route>
        </Route>

        <Route path="*" element={<Navigate to={"/"} replace />} />
      </Routes>
    </div>
  );
};

export default App;
