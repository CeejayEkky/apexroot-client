import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import { HiCheckCircle, HiXCircle } from "react-icons/hi";
import { useAuth } from "../../context/AuthContext";
import API_URL from "../../config";

const SubscriptionVerify = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { token, refreshUser } = useAuth();

  const [status, setStatus] = useState("verifying");
  const [message, setMessage] = useState(
    "Please wait while we confirm your payment..."
  );

  useEffect(() => {
    const verifyPayment = async () => {
      const reference = searchParams.get("reference");

      if (!reference) {
        setStatus("error");
        setMessage("No payment reference was found.");
        return;
      }

      if (!token) {
        setStatus("error");
        setMessage("Your session has expired. Please log in again.");
        return;
      }

      try {
        const response = await axios.post(
          `${API_URL}/api/subscription/verify`,
          {
            reference,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.data.success) {
          await refreshUser();
          
          setStatus("success");
          setMessage(
            response.data.message ||
              "Your subscription has been activated successfully."
          );

          setTimeout(() => {
            navigate("/dashboard");
          }, 2500);
        } else {
          setStatus("error");
          setMessage("Unable to activate your subscription.");
        }
      } catch (error) {
        console.error("Subscription verification error:", error);

        setStatus("error");
        setMessage(
          error.response?.data?.message ||
            "We could not verify your payment."
        );
      }
    };

    verifyPayment();
  }, [searchParams, token, navigate]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 text-center shadow-lg">
        {status === "verifying" && (
          <>
            <div className="mx-auto mb-6 h-14 w-14 animate-spin rounded-full border-4 border-slate-200 border-t-amber-500" />

            <h1 className="text-2xl font-bold text-slate-900">
              Verifying Payment
            </h1>

            <p className="mt-3 text-slate-600">
              {message}
            </p>
          </>
        )}

        {status === "success" && (
          <>
            <HiCheckCircle
              size={64}
              className="mx-auto mb-5 text-green-500"
            />

            <h1 className="text-2xl font-bold text-slate-900">
              Payment Successful
            </h1>

            <p className="mt-3 text-slate-600">
              {message}
            </p>

            <p className="mt-4 text-sm text-slate-500">
              Redirecting you to your seller dashboard...
            </p>
          </>
        )}

        {status === "error" && (
          <>
            <HiXCircle
              size={64}
              className="mx-auto mb-5 text-red-500"
            />

            <h1 className="text-2xl font-bold text-slate-900">
              Payment Verification Failed
            </h1>

            <p className="mt-3 text-red-600">
              {message}
            </p>

            <button
              onClick={() => navigate("/subscription")}
              className="mt-6 rounded-xl bg-amber-500 px-6 py-3 font-semibold text-white transition hover:bg-amber-600"
            >
              Return to Plans
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default SubscriptionVerify;