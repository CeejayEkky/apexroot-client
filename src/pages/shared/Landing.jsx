import React, { useEffect, useState } from "react";
import { landingPageStyles as s } from "../../assets/dummyStyles.js";
import Navbar from "../../components/common/Navbar.jsx";
import {
  HiCurrencyDollar,
  HiHome,
  HiLightningBolt,
  HiLocationMarker,
  HiMail,
  HiOfficeBuilding,
  HiPhone,
  HiSearch,
  HiShieldCheck,
  HiVideoCamera,
} from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";
import axios from "axios";
import ar from "../../assets/icologo.png";
import { RiTwitterXLine } from "react-icons/ri";
import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import API_URL from "../../config.js";
import banner from "../../assets/bannerImage.png";
import PropertyCard from "../../components/common/PropertyCard.jsx";

const Landing = () => {
  const navigate = useNavigate();
  const { user, token } = useAuth();
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [propertyType, setPropertyType] = useState("Select Type");
  const [proptyCount, setProptyCount] = useState({
    flat: 0,
    villa: 0,
    penthouse: 0,
    commercial: 0,
  });

  const [wishlistedIds, setWishlistIds] = useState([]);

  const fetchWishlist = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/wishlist`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setWishlistIds(
        res.data
          .filter((item) => item.property)
          .map((item) => String(item.property._id)),
      );
    } catch (error) {
      console.error("Failed to fetch wishlist", error);
    }
  };

  const handleToggleWishlist = async (propertyId) => {
    try {
      const isWishlisted = wishlistedIds.includes(propertyId);
      if (isWishlisted) {
        await axios.delete(`${API_URL}/api/wishlist/${propertyId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setWishlistIds((prev) => prev.filter((id) => id !== propertyId));
      } else {
        await axios.post(
          `${API_URL}/api/wishlist/${propertyId}`,
          {},
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        );
        setWishlistIds((prev) => [...prev, propertyId]);
      }
    } catch (error) {
      console.error("Failed to toggle wishlist", error);
    }
  };

  const fetchCounts = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/property/counts`);
      if (res.data.success) {
        setProptyCount(res.data.counts);
      }
    } catch (error) {
      console.error("Failed to fetch property counts", error);
    }
  };

  const fetchProperties = async (search = "") => {
    try {
      setLoading(true);
      const res = await axios.get(`${API_URL}/api/property?city=${search}`);

      setProperties(res.data.properties || res.data || []);
      setError(null);
    } catch (error) {
      console.log(error);
      console.log(error.response);
      console.log(error.response?.data);
      setError("Failed to load properties. Please try again");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (searchTerm) params.append("city", searchTerm);
    if (propertyType !== "Select Type") params.append("type", propertyType);
    navigate(`/properties?${params.toString()}`);
  };

  const categories = [
    {
      name: "Modern Flats",
      count: proptyCount.flat || 0,
      icon: <HiOfficeBuilding size={32} />,
      type: "flat",
    },
    {
      name: "Luxury Villas",
      count: proptyCount.villa || 0,
      icon: <HiHome size={32} />,
      type: "villa",
    },
    {
      name: "Penthouse",
      count: proptyCount.penthouse || 0,
      icon: <HiOfficeBuilding size={32} />,
      type: "penthouse",
    },
    {
      name: "Commercial",
      count: proptyCount.commercial || 0,
      icon: <HiOfficeBuilding size={32} />,
      type: "commercial",
    },
  ];

  const features = [
    {
      title: "Verified Trust",
      desc: "Every listing is strictly audited for ownership, condition, and legality.",
      icon: <HiShieldCheck size={24} />,
    },
    {
      title: "Smart Search",
      desc: "Our AI-driven algorithms help you find the best matches based on preferences.",
      icon: <HiLightningBolt size={24} />,
    },
    {
      title: "Best Value",
      desc: "Direct-from-owner listings and zero-commission options to ensure competitive prices.",
      icon: <HiCurrencyDollar size={24} />,
    },
    {
      title: "Virtual Tours",
      desc: "High-definition 3D tours allow you to experience the property from home.",
      icon: <HiVideoCamera size={24} />,
    },
  ];

  useEffect(() => {
    fetchProperties();
    fetchCounts();
    if (user) {
      fetchWishlist();
    }
  }, [user]);

  return (
    <div className={s.bgMain}>
      <Navbar />

      <section className={s.heroSection}>
        <div className={s.heroContent}>
          <span className={s.badge}>
            Buy • Sell • Rent • Manage with Confidence
          </span>
          <h1 className={s.heroTitle}>
            Smarter <span className={s.textGradient}>Real Estate</span> Starts
            Here
          </h1>
          <p className={s.heroSubtitle}>
            {/* ApexRoot is a modern property platform that brings buyers, sellers,
            landlords, tenants, and agents together in one seamless experience.
            Discover verified listings, manage properties effortlessly, and make
            every real estate decision with confidence. */}
            Whether you're buying, selling, renting, or managing properties,
            ApexRoot provides the tools and trusted marketplace to help you move
            forward with confidence.
          </p>

          <form onSubmit={handleSearch} className={s.searchForm}>
            <div className={s.searchField}>
              <div className={s.textPrimary}>
                <HiLocationMarker size={26} />
              </div>
              <div className={s.flexCol}>
                <label className={s.labelSmall}>Location</label>
                <input
                  type="text"
                  placeholder="Where are you looking?"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className={s.inputTransparent}
                />
              </div>
            </div>

            <div className={s.searchDivider}></div>
            <div className={s.searchField}>
              <div className={s.textPrimary}>
                <HiHome size={26} />
              </div>
              <div className={s.flexCol}>
                <label className={s.labelSmall}>Property Type</label>
                <select
                  value={propertyType}
                  onChange={(e) => setPropertyType(e.target.value)}
                  className={`${s.inputTransparent} cursor-pointer`}
                >
                  <option value="Select Type">Select Type</option>
                  <option value="flat">Flat/Apartment</option>
                  <option value="villa">Villa/House</option>
                  <option value="penthouse">Penthouse</option>
                  <option value="commercial">Commercial</option>
                </select>
              </div>
            </div>

            <button type="submit" className={s.searchButton}>
              <HiSearch size={22} /> Search
            </button>
          </form>

          <div className={s.statsContainer}>
            <div className={s.statItemFlex}>
              <h3 className={s.statNumber}>3k+</h3>
              <p className={s.statLabel}>Ready Properties</p>
            </div>
            <div className={s.statItemBorder}>
              <h3 className={s.statNumber}>17k+</h3>
              <p className={s.statLabel}>Agent Network</p>
            </div>
            <div className={s.statItemBorder}>
              <h3 className={s.statNumber}>4.9/5</h3>
              <p className={s.statLabel}>User Rating</p>
            </div>
          </div>
        </div>

        <div className={s.heroImageContainer}>
          <div className={s.imageWrapper}>
            <img src={banner} alt="bannerImage" className={s.heroImage} />

            <div className={s.verifiedBadge}>
              <div className={s.badgeIconWrapper}>
                <HiShieldCheck size={24} className="text-primary" />
              </div>
              <div>
                <h4 className={s.badgeTitle}>Verified Listing</h4>
                <p className={s.badgeText}>Inspected by our team experts</p>
              </div>
              <span className={s.preApproved}>Pre-Approved</span>
            </div>
          </div>
        </div>
      </section>

      <section className={s.categorySection}>
        <div className={s.container}>
          <div className={s.categoryHeader}>
            <div className={s.categoryHeaderText}>
              <h2 className={s.categoryTitle}>Browse by Category</h2>
              <p className={s.categoryDesc}>
                Discover exclusive collections of properties suited to your
                particular needs and lifestyle.
              </p>
            </div>
          </div>

          <div className={s.categoryGrid}>
            {categories.map((cat, idx) => (
              <div
                key={idx}
                className={s.categoryCard}
                onClick={() => navigate(`/properties?type=${cat.type}`)}
              >
                <div className={s.categoryIconWrapper}>{cat.icon}</div>
                <h3 className={s.categoryName}>{cat.name}</h3>
                <p className={s.categoryCount}>
                  {cat.count.toLocaleString()} Properties
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={s.featuredSection}>
        <div className={s.featuresContainer}>
          <div className={s.featuresContent}>
            <h2 className={s.featuresHeading}>
              Why ApexRoot <br />
              is the one way{" "}
              <span className={s.textGradient}>Preferred Choice</span> to Real
              Estate !!!
            </h2>
            <p className={s.featuresSubtext}>
              It was reinvented with the property search experience from the
              ground up. By focusing on transparency, technological precision,
              and user-centric design, we help you find not just a house, but a
              home.
            </p>

            <ul className={s.featuresListItems}>
              {[
                "Direct connection with certified agents",
                "Real-time market valuation data",
                "Secure document management system",
                "24/7 Premium customer support",
              ].map((item, idx) => (
                <li key={idx} className={s.listItem}>
                  <HiLightningBolt className="text-primary" /> {item}
                </li>
              ))}
            </ul>
            <a href="#process" className={s.learnMoreLink}>
              Learn more about our process &nbsp; ▷▷
            </a>
          </div>
          <div className={s.featuresList}>
            {features.map((f, idx) => (
              <div
                key={idx}
                className={s.featureCard}
                style={{ animationDelay: `${idx * 0.1}s` }}
              >
                <div className={s.featureIconWrapper}>{f.icon}</div>
                <h3 className={s.featureTitle}>{f.title}</h3>
                <p className={s.featureDesc}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="process" className={s.processSection}>
        <div className={s.container}>
          <div className={s.processHeader}>
            <span className={s.processBadge}>How It Works</span>
            <h2 className={s.processTitle}>
              Our Exquisite <span className={s.textGradient}>Process</span>
            </h2>
            <p className={s.processSubtitle}>
              We've simplified the journey of finding your dream home into three
              clear, stress-free steps.
            </p>
          </div>
          <div className={s.processGrid}>
            {[
              {
                step: "01",
                title: "Smart Search",
                desc: "Leverage our AI-driven Smart Search algorithms to find the best property matches tailored to your specific preferences.",
                icon: <HiLightningBolt size={32} />,
              },
              {
                step: "02",
                title: "Virtual Tours",
                desc: "Experience your future home from anywhere with our high-definition 3D virtual tours and immersive walkthroughs.",
                icon: <HiVideoCamera size={32} />,
              },
              {
                step: "03",
                title: "Verified Trust",
                desc: "Every listing is strictly audited for ownership and condition, ensuring your peace of mind and a secure transaction.",
                icon: <HiShieldCheck size={32} />,
              },
            ].map((p, idx) => (
              <div key={idx} className={s.processCard}>
                <div className={s.stepNumber}>{p.step}</div>
                <div className={s.processIconWrapper}>{p.icon}</div>
                <h3 className={s.processCardTitle}>{p.title}</h3>
                <p className={s.processCardDesc}>{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={s.featuredSection}>
        <div className={s.container}>
          <div className={s.featuredHeader}>
            <span className={s.featuredBadge}>Specially For You</span>
            <h2 className={s.featureTitle}>Featured Collections</h2>
            <p className={s.featuredSubtitle}>
              Explore high-value properties curted by our experts for their
              exceptional design, location and investment potential.
            </p>
          </div>

          {loading ? (
            <div className={s.loadingContainer}>
              <div className={s.loader}></div>
            </div>
          ) : error ? (
            <div className={s.errorContainer}>
              <p>{error}</p>
            </div>
          ) : (
            <div className={s.propertiesGrid}>
              {properties
                .filter((p) => p)
                .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                .slice(0, 6)
                .map((property) => (
                  <PropertyCard
                    key={property._id}
                    property={property}
                    isWishlisted={wishlistedIds.includes(String(property._id))}
                    onToggleWishlist={handleToggleWishlist}
                  />
                ))}
            </div>
          )}

          <div className={s.discoverButtonContainer}>
            <button
              onClick={() => navigate("/properties")}
              className={s.discoverButton}
            >
              Explore More Properties
            </button>
          </div>
        </div>
      </section>

      <footer className={s.footer}>
        <div className={s.container}>
          <div className={s.footerMainGrid}>
            <div className={s.footerBrand}>
              <div className={s.brandLogo}>
                <div className={s.brandIcon}>
                  <img src={ar} alt="brandIcon" />
                </div>
              </div>
              <p className={s.brandDesc}>
                The most trusted platform for buying, selling and renting
                premium real estate globally. We make property hunting seamless.
              </p>

              <div className={s.socialIcons}>
                {[FaFacebookF, RiTwitterXLine, FaInstagram, FaLinkedinIn].map(
                  (Icon, idx) => (
                    <a href="#" key={idx} className={s.socialIcon}>
                      <Icon size={26} />
                    </a>
                  ),
                )}
              </div>
            </div>

            <div>
              <h4 className={s.footerHeading}>Company</h4>
              <ul className={s.footerLinks}>
                <li>
                  <a href="/" className={s.footerLink}>
                    Home
                  </a>
                </li>
                <li>
                  <a href="/properties" className={s.footerLink}>
                    Property
                  </a>
                </li>
                <li>
                  <a href="/wishlist" className={s.footerLink}>
                    Wishlist
                  </a>
                </li>
                <li>
                  <a href="/contact" className={s.footerLink}>
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 3: Contact Info */}
            <div>
              <h4 className={s.footerHeading}>Support</h4>
              <ul className={s.footerLinks}>
                <li className={s.contactInfo}>
                  <HiMail className="text-primary text-xl" />{" "}
                  contact@apexroot.com
                </li>
                <li className={s.contactInfo}>
                  <HiPhone className="text-primary text-xl" /> +234 1234567890
                </li>
                <li className={s.contactInfoStart}>
                  <HiLocationMarker
                    className={`text-primary ${s.contactIcon}`}
                  />
                  123 Estate Street, Nigeria
                </li>
              </ul>
            </div>

            <div>
              <h4 className={s.footerHeading}>Newsletter</h4>
              <p className={s.newsletterDesc}>
                Subscribe to get the latest listings and market insights
                directly in your inbox.
              </p>
              <div className={s.newsletterInputWrapper}>
                <input
                  type="email"
                  placeholder="Enter Your Email"
                  className={s.newsletterInput}
                />
                <button className={s.newsletterButton}>Join</button>
              </div>
            </div>
          </div>

          <div className={s.bottomBar}>
            <div className={s.bottomBarFlex}>
              <p>
                &copy; {new Date().getFullYear()} ApexRoot. All rights reserved.
              </p>
              <div className={s.footerLegalLinks}>
                <a href="#" className={s.footerLink}>
                  Privacy Policy
                </a>
                <a href="#" className={s.footerLink}>
                  Terms of Service
                </a>
                <a href="#" className={s.footerLink}>
                  Cookies Settings
                </a>
              </div>
            </div>

            <div className={s.designCredit}>
              <img src={ar} alt="Logo" className={s.designLogo} />
              <span className="text-text-muted">Designed By</span>

              <a href="http://jayport2.vercel.app/" target="_blank" className={s.designLink}>
                Divinedestiny Chijioke Ekwom 
              </a> | &nbsp;2026
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
