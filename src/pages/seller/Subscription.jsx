import React, { useState } from "react";
import axios from "axios";
import {
  HiCheckCircle,
  HiCreditCard,
  HiX,
} from "react-icons/hi";
import { useAuth } from "../../context/AuthContext";
import API_URL from "../../config";
import { useNavigate } from "react-router-dom";

const Subscription = () => {
  const { token, user } = useAuth();
  const navigate = useNavigate();

  const [loadingPlan, setLoadingPlan] = useState(null);
  const [error, setError] = useState("");

  const currentPlan = user?.subscription?.plan || "free";

  const handleSubscribe = async (plan) => {
    try {
      setLoadingPlan(plan);
      setError("");

      const response = await axios.post(
        `${API_URL}/api/subscription/initialize`,
        {
          plan,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const { authorizationUrl } = response.data;

      if (!authorizationUrl) {
        throw new Error(
          "Paystack authorization URL was not returned."
        );
      }

      window.location.href = authorizationUrl;
    } catch (error) {
      console.error(
        "Subscription initialization error:",
        error
      );

      setError(
        error.response?.data?.message ||
          error.message ||
          "Unable to start subscription payment."
      );

      setLoadingPlan(null);
    }
  };

  const continueWithFree = () => {
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-12">
      <div className="mx-auto max-w-7xl">

        {/* HEADER */}
        <div className="mb-12 text-center">

          <div className="mb-4 flex justify-end">
            <button
              onClick={continueWithFree}
              className="flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-600 shadow-sm transition hover:bg-slate-100"
            >
              <HiX size={18} />
              Close
            </button>
          </div>

          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-amber-600">
            ApexRoot Seller
          </p>

          <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl">
            Choose Your Seller Plan
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-slate-600">
            Start for free and upgrade whenever you need
            more property listings.
          </p>

          {currentPlan === "free" && (
            <div className="mx-auto mt-6 max-w-md rounded-xl border border-slate-200 bg-white p-4 text-sm text-slate-600 shadow-sm">
              You are currently using the{" "}
              <strong>Free Plan</strong>.
            </div>
          )}

          {user?.subscription?.status === "active" && (
            <div className="mx-auto mt-6 max-w-md rounded-xl border border-green-200 bg-green-50 p-4 text-sm text-green-700">
              Your{" "}
              <strong className="capitalize">
                {currentPlan}
              </strong>{" "}
              subscription is currently active.
            </div>
          )}

          {error && (
            <div className="mx-auto mt-6 max-w-md rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-600">
              {error}
            </div>
          )}
        </div>

        {/* PLANS */}
        <div className="grid gap-8 lg:grid-cols-3">

          {/* FREE */}
          <div className="relative rounded-2xl border border-slate-200 bg-white p-8 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">

            {currentPlan === "free" && (
              <div className="absolute right-6 top-6 rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-600">
                CURRENT PLAN
              </div>
            )}

            <div className="mb-6">
              <h2 className="text-2xl font-bold text-slate-900">
                Free
              </h2>

              <p className="mt-2 text-slate-500">
                Start selling without paying anything.
              </p>
            </div>

            <div className="mb-8">
              <span className="text-4xl font-bold text-slate-900">
                ₦0
              </span>

              <span className="ml-2 text-slate-500">
                forever
              </span>
            </div>

            <div className="mb-8 space-y-4">
              <Feature text="Create up to 4 properties" />
              <Feature text="Manage your properties" />
              <Feature text="Access seller dashboard" />
              <Feature text="Manage inquiries" />
            </div>

            <button
              onClick={continueWithFree}
              className="flex w-full items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-6 py-3 font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              <HiX size={20} />
              Continue with Free
            </button>
          </div>

          {/* MONTHLY */}
          <div className="relative rounded-2xl border border-slate-200 bg-white p-8 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">

            {currentPlan === "monthly" && (
              <div className="absolute right-6 top-6 rounded-full bg-green-100 px-3 py-1 text-xs font-bold text-green-700">
                CURRENT PLAN
              </div>
            )}

            <div className="mb-6">
              <h2 className="text-2xl font-bold text-slate-900">
                Monthly
              </h2>

              <p className="mt-2 text-slate-500">
                Flexible monthly seller access.
              </p>
            </div>

            <div className="mb-8">
              <span className="text-4xl font-bold text-slate-900">
                ₦5,250
              </span>

              <span className="ml-2 text-slate-500">
                / month
              </span>
            </div>

            <div className="mb-8 space-y-4">
              <Feature text="Create up to 12 properties" />
              <Feature text="Manage your properties" />
              <Feature text="Access seller dashboard" />
              <Feature text="Manage inquiries" />
            </div>

            <button
              onClick={() => handleSubscribe("monthly")}
              disabled={
                loadingPlan !== null ||
                currentPlan === "monthly"
              }
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-amber-500 px-6 py-3 font-semibold text-white transition hover:bg-amber-600 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <HiCreditCard size={20} />

              {loadingPlan === "monthly"
                ? "Redirecting to Paystack..."
                : currentPlan === "monthly"
                ? "Current Plan"
                : "Subscribe Monthly"}
            </button>
          </div>

          {/* QUARTERLY */}
          <div className="relative rounded-2xl border-2 border-amber-400 bg-white p-8 shadow-md transition hover:-translate-y-1 hover:shadow-xl">

            <div className="absolute right-6 top-6 rounded-full bg-amber-100 px-3 py-1 text-xs font-bold text-amber-700">
              BEST VALUE
            </div>

            {currentPlan === "quarterly" && (
              <div className="absolute left-6 top-6 rounded-full bg-green-100 px-3 py-1 text-xs font-bold text-green-700">
                CURRENT PLAN
              </div>
            )}

            <div className="mb-6">
              <h2 className="text-2xl font-bold text-slate-900">
                Quarterly
              </h2>

              <p className="mt-2 text-slate-500">
                More listings with fewer payments.
              </p>
            </div>

            <div className="mb-8">
              <span className="text-4xl font-bold text-slate-900">
                ₦10,250
              </span>

              <span className="ml-2 text-slate-500">
                / 3 months
              </span>
            </div>

            <div className="mb-8 space-y-4">
              <Feature text="Create up to 30 properties" />
              <Feature text="Manage your properties" />
              <Feature text="Access seller dashboard" />
              <Feature text="Manage inquiries" />
            </div>

            <button
              onClick={() =>
                handleSubscribe("quarterly")
              }
              disabled={
                loadingPlan !== null ||
                currentPlan === "quarterly"
              }
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-slate-900 px-6 py-3 font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <HiCreditCard size={20} />

              {loadingPlan === "quarterly"
                ? "Redirecting to Paystack..."
                : currentPlan === "quarterly"
                ? "Current Plan"
                : "Subscribe Quarterly"}
            </button>
          </div>
        </div>

        {/* FOOTER */}
        <div className="mt-10 text-center">
          <button
            onClick={continueWithFree}
            className="text-sm font-medium text-slate-500 underline hover:text-slate-800"
          >
            Maybe later — take me to my dashboard
          </button>
        </div>
      </div>
    </div>
  );
};

const Feature = ({ text }) => {
  return (
    <div className="flex items-center gap-3 text-slate-700">
      <HiCheckCircle
        size={20}
        className="shrink-0 text-green-500"
      />
      <span>{text}</span>
    </div>
  );
};

export default Subscription;