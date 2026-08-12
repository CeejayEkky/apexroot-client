import React, { useState } from "react";
import axios from "axios";
import { HiCheckCircle, HiCreditCard } from "react-icons/hi";
import { useAuth } from "../../context/AuthContext";
import API_URL from "../../config";

const Subscription = () => {
  const { token, user } = useAuth();
  const [loadingPlan, setLoadingPlan] = useState(null);
  const [error, setError] = useState("");

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
        },
      );

      const { authorizationUrl } = response.data;

      if (!authorizationUrl) {
        throw new Error("Paystack authorization URL was not returned.");
      }

      window.location.href = authorizationUrl;
    } catch (error) {
      console.error("Subscription initialization error:", error);

      setError(
        error.response?.data?.message ||
          error.message ||
          "Unable to start subscription payment.",
      );

      setLoadingPlan(null);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-12">
      <div className="mx-auto max-w-6xl">

        <div className="mb-12 text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-amber-600">
            ApexRoot Seller
          </p>

          <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl">
            Choose Your Seller Plan
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-slate-600">
            Upgrade your ApexRoot seller account to manage and publish
            property listings.
          </p>

          {user?.subscription?.status === "active" && (
            <div className="mx-auto mt-6 max-w-md rounded-lg border border-green-200 bg-green-50 p-4 text-sm text-green-700">
              Your current subscription is active.
            </div>
          )}

          {error && (
            <div className="mx-auto mt-6 max-w-md rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-600">
              {error}
            </div>
          )}
        </div>

        <div className="grid gap-8 md:grid-cols-2">

          {/* MONTHLY */}
          <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">

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
                ₦8,000
              </span>

              <span className="ml-2 text-slate-500">
                / month
              </span>
            </div>

            <div className="mb-8 space-y-4">

              <Feature text="Create property listings" />
              <Feature text="Manage your properties" />
              <Feature text="Access seller dashboard" />
              <Feature text="Manage inquiries" />

            </div>

            <button
              onClick={() => handleSubscribe("monthly")}
              disabled={loadingPlan !== null}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-amber-500 px-6 py-3 font-semibold text-white transition hover:bg-amber-600 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <HiCreditCard size={20} />

              {loadingPlan === "monthly"
                ? "Redirecting to Paystack..."
                : "Subscribe Monthly"}
            </button>

          </div>

          {/* QUARTERLY */}
          <div className="relative rounded-2xl border-2 border-amber-400 bg-white p-8 shadow-md transition hover:-translate-y-1 hover:shadow-xl">

            <div className="absolute right-6 top-6 rounded-full bg-amber-100 px-3 py-1 text-xs font-bold text-amber-700">
              BEST VALUE
            </div>

            <div className="mb-6">
              <h2 className="text-2xl font-bold text-slate-900">
                Quarterly
              </h2>

              <p className="mt-2 text-slate-500">
                Longer access with fewer payments.
              </p>
            </div>

            <div className="mb-8">
              <span className="text-4xl font-bold text-slate-900">
                ₦15,000
              </span>

              <span className="ml-2 text-slate-500">
                / 3 months
              </span>
            </div>

            <div className="mb-8 space-y-4">

              <Feature text="Create property listings" />
              <Feature text="Manage your properties" />
              <Feature text="Access seller dashboard" />
              <Feature text="Manage inquiries" />

            </div>

            <button
              onClick={() => handleSubscribe("quarterly")}
              disabled={loadingPlan !== null}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-slate-900 px-6 py-3 font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <HiCreditCard size={20} />

              {loadingPlan === "quarterly"
                ? "Redirecting to Paystack..."
                : "Subscribe Quarterly"}
            </button>

          </div>

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