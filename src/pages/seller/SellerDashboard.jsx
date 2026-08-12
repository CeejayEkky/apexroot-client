import React, { useEffect, useState } from "react";
import { sellerDashboardStyles as s } from "../../assets/dummyStyles";
import { useAuth } from "../../context/AuthContext";
import axios from "axios";
import API_URL from "../../config";
import {
  HiOutlineBell,
  HiOutlineCheckCircle,
  HiOutlineDownload,
  HiOutlineEye,
  HiOutlineLibrary,
  HiOutlinePencilAlt,
  HiOutlineSearch,
  HiOutlineTrash,
  HiOutlineUserGroup,
  HiPlus,
} from "react-icons/hi";
import { Link } from "react-router-dom";
import PropertyCard from "../../components/common/PropertyCard";

const SellerDashboard = () => {
  const { logout, token, user, refreshUser } = useAuth();

  const [status, setStatus] = useState({
    totalProperties: 0,
    activeListings: 0,
    soldProperties: 0,
    totalInquiries: 0,
    totalViews: 0,
  });

  const [properties, setProperties] = useState([]);
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  /*
  |--------------------------------------------------------------------------
  | SUBSCRIPTION INFORMATION
  |--------------------------------------------------------------------------
  */

  const subscription = user?.subscription;

  const currentPlan = subscription?.plan || "free";

  const propertyLimit = subscription?.propertyLimit ?? 4;

  const propertyCount = status.totalProperties || properties.length || 0;

  const remainingProperties = Math.max(propertyLimit - propertyCount, 0);

  const subscriptionActive =
    subscription?.status === "active" &&
    subscription?.expiresAt &&
    new Date(subscription.expiresAt) > new Date();

  const subscriptionExpired =
    subscription?.status === "expired" ||
    subscription?.status === "cancelled" ||
    (subscription?.expiresAt && new Date(subscription.expiresAt) <= new Date());

  /*
  |--------------------------------------------------------------------------
  | FETCH DASHBOARD DATA
  |--------------------------------------------------------------------------
  */

  useEffect(() => {
    const fetchData = async () => {
      if (!token) return;

      try {
        setLoading(true);

        const results = await Promise.allSettled([
          axios.get(`${API_URL}/api/property/seller/dashboard`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }),

          axios.get(`${API_URL}/api/property/my`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }),

          axios.get(`${API_URL}/api/inquiry/seller`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }),
        ]);

        const [statusResult, propertiesResult, inquiriesResult] = results;

        // ==========================================
        // DASHBOARD STATS
        // ==========================================

        if (statusResult.status === "fulfilled") {
          console.log("DASHBOARD RESPONSE:", statusResult.value.data);

          const dashboardStatus =
            statusResult.value.data.status || statusResult.value.data;

          setStatus(dashboardStatus);
        } else {
          console.error("Dashboard stats failed:", statusResult.reason);
        }

        // ==========================================
        // PROPERTIES
        // ==========================================

        if (propertiesResult.status === "fulfilled") {
          console.log("MY PROPERTIES RESPONSE:", propertiesResult.value.data);

          const data = propertiesResult.value.data;

          const props = Array.isArray(data) ? data : data.properties || [];

          setProperties(props);
        } else {
          console.error("Properties failed:", propertiesResult.reason);
        }

        // ==========================================
        // INQUIRIES
        // ==========================================

        if (inquiriesResult.status === "fulfilled") {
          const data = inquiriesResult.value.data;

          setInquiries(
            Array.isArray(data.inquiries)
              ? data.inquiries.slice(0, 3)
              : Array.isArray(data)
                ? data.slice(0, 3)
                : [],
          );
        } else {
          console.warn("Inquiry request failed:", inquiriesResult.reason);

          // Don't break the dashboard because inquiries failed
          setInquiries([]);
        }
      } catch (error) {
        console.error("Unexpected dashboard error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [token]);

  /*
  |--------------------------------------------------------------------------
  | REFRESH USER SUBSCRIPTION DATA
  |--------------------------------------------------------------------------
  */

  useEffect(() => {
    if (token && refreshUser) {
      refreshUser();
    }
  }, [token]);

  /*
  |--------------------------------------------------------------------------
  | DELETE PROPERTY
  |--------------------------------------------------------------------------
  */

  const hndleDel = async (id) => {
    if (!window.confirm("Are you sure you want to delete this listing?")) {
      return;
    }

    try {
      await axios.delete(`${API_URL}/api/property/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setProperties(properties.filter((p) => p._id !== id));

      setStatus((prev) => ({
        ...prev,
        totalProperties: Math.max((prev.totalProperties || 0) - 1, 0),
      }));
    } catch (error) {
      console.error("Failed to delete property:", error);

      if (
        error.response?.status === 403 &&
        error.response?.data?.subscriptionRequired
      ) {
        return;
      }

      alert(error.response?.data?.message || "Failed to delete property.");
    }
  };

  /*
  |--------------------------------------------------------------------------
  | UPDATE PROPERTY STATUS
  |--------------------------------------------------------------------------
  */

  const handleStastsUpd = async (id, curStatus) => {
    const newStatus = curStatus === "sold" ? "sale" : "sold";

    try {
      await axios.patch(
        `${API_URL}/api/property/${id}/status`,
        {
          status: newStatus,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setProperties(
        properties.map((p) =>
          p._id === id
            ? {
                ...p,
                status: newStatus,
              }
            : p,
        ),
      );
    } catch (error) {
      console.error("Failed to update status:", error);

      if (
        error.response?.status === 403 &&
        error.response?.data?.subscriptionRequired
      ) {
        return;
      }

      alert(error.response?.data?.message || "Failed to update status.");
    }
  };

  /*
  |--------------------------------------------------------------------------
  | EXPORT PROPERTIES
  |--------------------------------------------------------------------------
  */

  const handleExport = () => {
    const headers = ["Title", "Location", "Type", "Price", "Status", "Views"];

    const csvRows = properties.map((p) => [
      p.title,
      `${p.area}, ${p.city}`,
      p.propertyType,
      p.price,
      p.status,
      p.views || 0,
    ]);

    const csvContent = [headers, ...csvRows].map((e) => e.join(",")).join("\n");

    const blob = new Blob([csvContent], {
      type: "text/csv;charset=utf-8;",
    });

    const link = document.createElement("a");

    const url = URL.createObjectURL(blob);

    link.setAttribute("href", url);
    link.setAttribute("download", "property_listings.csv");

    link.style.visibility = "hidden";

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);

    URL.revokeObjectURL(url);
  };

  /*
  |--------------------------------------------------------------------------
  | LOADING
  |--------------------------------------------------------------------------
  */

  if (loading) {
    return (
      <div className="loader-full-page">
        <div className="loader"></div>
      </div>
    );
  }

  const statCards = [
    {
      title: "Total Views",
      value: status.totalViews?.toLocaleString() || "0",
      icon: HiOutlineEye,
      color: "#0d6e59",
    },

    {
      title: "Active Leads",
      value: status.totalInquiries?.toLocaleString() || "0",
      icon: HiOutlineUserGroup,
      color: "#0d6e59",
    },

    {
      title: "Live Listings",
      value: status.activeListings?.toLocaleString() || "0",
      icon: HiOutlineLibrary,
      color: "#0d6e59",
    },

    {
      title: "Properties Sold",
      value: status.soldProperties?.toLocaleString() || "0",
      icon: HiOutlineCheckCircle,
      color: "#0d6e59",
    },
  ];

  /*
  |--------------------------------------------------------------------------
  | FILTER PROPERTIES
  |--------------------------------------------------------------------------
  */

  const filteredProperties = Array.isArray(properties)
    ? properties
        .filter(
          (p) =>
            p.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            p.city?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            p.area?.toLowerCase().includes(searchTerm.toLowerCase()),
        )
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    : [];

  /*
  |--------------------------------------------------------------------------
  | DASHBOARD
  |--------------------------------------------------------------------------
  */

  return (
    <>
      {/* ========================================================= */}
      {/* HEADER */}
      {/* ========================================================= */}

      <header className={s.header}>
        <div className={s.headerLeft}>
          <h1 className={s.headerTitle}>Seller Dashboard</h1>

          <p className={s.headerSubtitle}>
            Manage your property portfolio and track performance.
          </p>
        </div>

        <div className={s.headerActions}>
          <button onClick={handleExport} className={s.exportButton}>
            <HiOutlineDownload size={20} />
            Export
          </button>

          <Link to="/add-property" className={s.addButton}>
            <HiPlus size={20} />
            Add New
          </Link>
        </div>
      </header>

      {/* ========================================================= */}
      {/* SUBSCRIPTION CARD */}
      {/* ========================================================= */}

      <div className="mb-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-amber-600">
              Seller Subscription
            </p>

            <h2 className="mt-1 text-2xl font-bold capitalize text-slate-900">
              {currentPlan}
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              {subscriptionActive
                ? "Your subscription is currently active."
                : subscriptionExpired
                  ? "Your subscription has expired."
                  : "Your account is currently using the free plan."}
            </p>
          </div>

          <div className="flex flex-col gap-2 text-left md:text-right">
            <p className="text-sm text-slate-500">Properties</p>

            <p className="text-2xl font-bold text-slate-900">
              {propertyCount}{" "}
              <span className="text-base font-medium text-slate-400">
                / {propertyLimit}
              </span>
            </p>

            <p className="text-sm text-slate-500">
              {remainingProperties > 0
                ? `${remainingProperties} ${
                    remainingProperties === 1 ? "property" : "properties"
                  } remaining`
                : "Property limit reached"}
            </p>
          </div>

          {!subscriptionActive && (
            <Link
              to="/subscription"
              className="inline-flex items-center justify-center rounded-xl bg-amber-500 px-5 py-3 font-semibold text-white transition hover:bg-amber-600"
            >
              {subscriptionExpired ? "Renew Subscription" : "Upgrade Plan"}
            </Link>
          )}
        </div>

        {/* PROPERTY USAGE BAR */}

        <div className="mt-6">
          <div className="mb-2 flex justify-between text-xs font-medium text-slate-500">
            <span>Property Usage</span>

            <span>
              {propertyCount} / {propertyLimit}
            </span>
          </div>

          <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100">
            <div
              className="h-full rounded-full bg-amber-500 transition-all duration-500"
              style={{
                width: `${Math.min(
                  (propertyCount / Math.max(propertyLimit, 1)) * 100,
                  100,
                )}%`,
              }}
            />
          </div>
        </div>

        {/* LIMIT WARNING */}

        {remainingProperties === 0 && subscriptionActive && (
          <div className="mt-5 rounded-xl border border-red-200 bg-red-50 p-4">
            <p className="font-semibold text-red-700">Property limit reached</p>

            <p className="mt-1 text-sm text-red-600">
              You have reached the maximum number of properties allowed on your
              current plan.
            </p>

            <Link
              to="/subscription"
              className="mt-3 inline-flex text-sm font-semibold text-red-700 underline"
            >
              Upgrade your subscription
            </Link>
          </div>
        )}
      </div>

      {/* ========================================================= */}
      {/* STATS */}
      {/* ========================================================= */}

      <div className={s.statsGrid}>
        {statCards.map((card, i) => (
          <div
            style={{
              "--card-color": card.color,
            }}
            key={i}
            className={s.statCard}
          >
            <div className={s.statIconWrapper}>
              <card.icon size={20} />
            </div>

            <div className={s.statTitle}>{card.title}</div>

            <div className={s.statValue}>{card.value}</div>
          </div>
        ))}
      </div>

      {/* ========================================================= */}
      {/* PROPERTY LISTINGS */}
      {/* ========================================================= */}

      <div className={s.listingsSection}>
        <div className={s.listingsHeader}>
          <div className={s.listingsTitle}>Property Listings</div>

          <div className={s.searchWrapper}>
            <HiOutlineSearch className={s.searchIcon} />

            <input
              type="text"
              className={s.searchInput}
              value={searchTerm}
              placeholder="Search Listings..."
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {filteredProperties.length === 0 ? (
          <div className={s.emptyListings}>
            {searchTerm
              ? `No properties found matching --${searchTerm}`
              : "No properties found."}
          </div>
        ) : (
          <>
            <div className={s.propertiesGrid}>
              {filteredProperties.slice(0, 3).map((p) => (
                <PropertyCard
                  key={p._id}
                  property={p}
                  renderActions={() => (
                    <div className={s.propertyActions}>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();

                          handleStastsUpd(p._id, p.status);
                        }}
                        className={s.statusButton(p.status)}
                        title={
                          p.status === "sold"
                            ? "Mark as Available"
                            : "Mark as Sold"
                        }
                      >
                        <HiOutlineCheckCircle size={14} />

                        {p.status === "sold" ? "Sold" : "Available"}
                      </button>

                      <Link
                        to={`/edit-property/${p._id}`}
                        className={s.editButton}
                      >
                        <HiOutlinePencilAlt size={14} />
                        Edit
                      </Link>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();

                          hndleDel(p._id);
                        }}
                        className={s.deleteButton}
                      >
                        <HiOutlineTrash size={14} />
                        Delete
                      </button>
                    </div>
                  )}
                />
              ))}
            </div>

            {filteredProperties.length > 3 && (
              <div className={s.showMoreWrapper}>
                <Link to="/my-properties" className={s.showMoreButton}>
                  Show More Listings
                  <HiOutlinePencilAlt
                    size={18}
                    style={{
                      transform: "rotate(90deg)",
                    }}
                  />
                </Link>
              </div>
            )}
          </>
        )}
      </div>

      {/* ========================================================= */}
      {/* WIDGETS */}
      {/* ========================================================= */}

      <div className={s.widgetsGrid}>
        {/* INQUIRIES */}

        <div className={s.inquiriesWidget}>
          <h2 className={s.widgetTitle}>Recent Lead Inquiries</h2>

          <p className={s.widgetSubtitle}>
            New messages from potential buyers.
          </p>

          <div className={s.inquiriesList}>
            {inquiries.map((inq, i) => (
              <div key={i} className={s.inquiryItem}>
                <div className={s.inquiryLeft}>
                  <div className={s.inquiryIcon}>
                    <HiOutlineBell size={18} color="var(--primary)" />
                  </div>

                  <div>
                    <div className={s.inquiryName}>
                      {inq.buyer?.name || "Potential Buyer"}
                    </div>

                    <div className={s.inquiryProperty}>
                      {inq.property?.title?.length > 30
                        ? `${inq.property.title.slice(0, 30)}...`
                        : inq.property?.title}
                    </div>
                  </div>
                </div>

                <div className={s.inquiryRight}>
                  <div className={s.inquiryDate}>
                    {new Date(inq.createdAt).toLocaleDateString()}
                  </div>

                  <span className={s.inquiryStatus(inq.status)}>
                    {inq.status === "read" ? "Read" : "New"}
                  </span>
                </div>
              </div>
            ))}

            {inquiries.length === 0 && (
              <p className={s.noInquiries}>No recent inquiries</p>
            )}
          </div>
        </div>

        {/* QUICK TIPS */}

        <div className={s.tipsWidget}>
          <h2 className={s.widgetTitle}>Quick Tips</h2>

          <div className={s.tipsList}>
            <div className={s.tipCardHighViews}>
              <h4 className={s.tipTitleHighViews}>
                <HiOutlineEye size={16} />
                High Views?
              </h4>

              <p className={s.tipTextHighViews}>
                Your listings are trending. Try adding video tours to increase
                interest.
              </p>
            </div>

            <div className={s.tipCardMarket}>
              <h4 className={s.tipTitleMarket}>Market Insight</h4>

              <p className={s.tipTextMarket}>
                Properties in your area are selling fast. Your prices are
                competitive.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SellerDashboard;
