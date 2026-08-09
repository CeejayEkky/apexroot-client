import React, { useEffect, useState } from "react";
import { myPropertiesStyles as s } from "../../assets/dummyStyles";
import { useAuth } from "../../context/AuthContext";
import { Link } from "react-router-dom";
import API_URL from "../../config";
import axios from "axios";
import {
  HiOutlineCheckCircle,
  HiOutlineLibrary,
  HiOutlinePencilAlt,
  HiOutlineTrash,
} from "react-icons/hi";
import PropertyCard from "../../components/common/PropertyCard";

const MyProperties = () => {
  const [properties, setProperties] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const { token } = useAuth();

  const fetchMyProperties = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const res = await axios.get(`${API_URL}/api/property/my`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const props = Array.isArray(res.data)
        ? res.data
        : res.data.properties || [];
      setProperties(props);
      setLoading(false);
    } catch (error) {
      setError("Failed to load your properties");
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchMyProperties();
    }
  }, [token]);

  const handleDel = async (id) => {
    if (!window.confirm("Are you sure you want to delete this? ")) return;
    try {
      await axios.delete(`${API_URL}/api/property/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProperties((prev) => prev.filter((p) => p._id !== id));
    } catch (error) {
      alert(error.response?.data?.message || "Failed to delete property!");
    }
  };

  const updStats = async (id, newStatus) => {
    try {
      await axios.patch(
        `${API_URL}/api/property/${id}/status`,
        {
          status: newStatus,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      setProperties((prev) =>
        prev.map((p) => (p._id === id ? { ...p, status: newStatus } : p)),
      );
    } catch (error) {
      alert(error.response?.data?.message || "Failed to update status!");
    }
  };

  const getAvailableStats = (p) => {
    return "sale";
  };

  if (loading)
    return (
      <div className={s.loaderFullPage}>
        <div className={s.loader}></div>
      </div>
    );

  return (
    <div className={s.fadeIn}>
      <div className={s.fadeIn}>
        <div className={s.header}>
          <div>
            <h1 className={s.heading}>My Listings</h1>
            <p className={s.subheading}>
              Manage your listed properties and their status.
            </p>
          </div>

          <Link to="/add-property" className={s.addButton}>
            Add New Listing
          </Link>
        </div>

        <div className={s.content}>
          {!Array.isArray(properties) || properties.length === 0 ? (
            <div className={s.emptyCard}>
              <div className={s.emptyIconWrapper}>
                <HiOutlineLibrary size={40} color="#94a3b8" />
              </div>
              <h2 className={s.emptyTitle}>No properties found</h2>
              <p className={s.emptyText}>
                Start your journey by adding your first property listing.
              </p>
              <Link to="/add-property" className={s.emptyButton}>
                Add Your First Listing
              </Link>
            </div>
          ) : (
            <div className={s.grid}>
              {properties.map((p) => (
                <PropertyCard
                  key={p._id}
                  property={p}
                  renderActions={() => (
                    <>
                      <div className={s.actionContainer}>
                        <div className={s.selectWrapper}>
                          <select
                            value={p.status === "sale" ? "available" : p.status}
                            onChange={(e) => {
                              const val = e.target.value;
                              if (val === "available") {
                                updStats(p._id, getAvailableStats(p));
                              } else {
                                updStats(p._id, val);
                              }
                            }}
                            onClick={(e) => e.stopPropagation()}
                            onMouseDown={(e) => e.stopPropagation()}
                            className={`${s.select} ${p.status === "sold" ? s.selectSold : s.selectAvailable}`}
                          >
                            <option value="available">Available</option>
                            <option value="sold">Sold</option>
                          </select>
                          <div className={s.selectIcon}>
                            <HiOutlineCheckCircle size={14} />
                          </div>
                        </div>

                        <Link to={`/edit-property/${p._id}`}
                        onClick={(e) => e.stopPropagation()}>
                          <HiOutlinePencilAlt />
                        </Link>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDel(p._id);
                          }}
                        >
                          <HiOutlineTrash />
                        </button>
                      </div>
                    </>
                  )}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyProperties;
