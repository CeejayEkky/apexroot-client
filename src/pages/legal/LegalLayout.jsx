import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  HiOutlineShieldCheck,
  HiOutlineDocumentText,
  HiOutlineAdjustments,
  HiOutlineChevronRight,
  HiOutlineHome,
} from "react-icons/hi";
import "./legal.css";

const legalNavigation = [
  {
    label: "Privacy Policy",
    path: "/privacy-policy",
    icon: HiOutlineShieldCheck,
  },
  {
    label: "Terms of Service",
    path: "/terms-of-service",
    icon: HiOutlineDocumentText,
  },
  {
    label: "Cookie Settings",
    path: "/cookie-settings",
    icon: HiOutlineAdjustments,
  },
];

const LegalLayout = ({
  children,
  title,
  description,
  lastUpdated = "August 16, 2026",
}) => {
  const location = useLocation();

  return (
    <div className="legal-page">
      {/* Header */}
      <header className="legal-header">
        <div className="legal-container legal-header-inner">
          <Link to="/" className="legal-brand">
            <div className="legal-brand-icon">
              <HiOutlineHome />
            </div>

            <div>
              <span className="legal-brand-name">ApexRoot</span>
              <span className="legal-brand-tagline">
                Real estate, reimagined.
              </span>
            </div>
          </Link>

          <Link to="/" className="legal-back-home">
            <HiOutlineHome />
            Back to Home
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="legal-hero">
        <div className="legal-container">
          <div className="legal-breadcrumb">
            <Link to="/">Home</Link>
            <HiOutlineChevronRight />
            <span>{title}</span>
          </div>

          <div className="legal-hero-content">
            <div className="legal-hero-badge">
              <span className="legal-badge-dot" />
              ApexRoot Legal
            </div>

            <h1>{title}</h1>

            <p>{description}</p>

            <div className="legal-updated">
              Last updated: <strong>{lastUpdated}</strong>
            </div>
          </div>
        </div>
      </section>

      {/* Main */}
      <main className="legal-container legal-main">
        <aside className="legal-sidebar">
          <div className="legal-sidebar-card">
            <span className="legal-sidebar-label">Legal Center</span>

            <nav>
              {legalNavigation.map((item) => {
                const Icon = item.icon;
                const active = location.pathname === item.path;

                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`legal-nav-link ${
                      active ? "active" : ""
                    }`}
                  >
                    <Icon />
                    <span>{item.label}</span>
                    <HiOutlineChevronRight className="legal-nav-arrow" />
                  </Link>
                );
              })}
            </nav>
          </div>

          <div className="legal-help-card">
            <div className="legal-help-icon">
              <HiOutlineShieldCheck />
            </div>

            <h3>Need help?</h3>

            <p>
              If you have questions about ApexRoot's policies or how we
              handle your information, our support team is here to help.
            </p>

            <a href="mailto:contact@apexroot.com">
              contact@apexroot.com
            </a>
          </div>
        </aside>

        <article className="legal-content">{children}</article>
      </main>

      {/* Footer */}
      <footer className="legal-footer">
        <div className="legal-container">
          <div className="legal-footer-top">
            <div>
              <Link to="/" className="legal-footer-brand">
                <div className="legal-brand-icon">
                  <HiOutlineHome />
                </div>
                <span>ApexRoot</span>
              </Link>

              <p>
                A modern platform for discovering, listing, buying,
                selling, and renting property with confidence.
              </p>
            </div>

            <div className="legal-footer-links">
              <Link to="/privacy-policy">Privacy Policy</Link>
              <Link to="/terms-of-service">Terms of Service</Link>
              <Link to="/cookie-settings">Cookie Settings</Link>
            </div>
          </div>

          <div className="legal-footer-bottom">
            <span>© 2026 ApexRoot. All rights reserved.</span>

            <span>
              Designed & Developed by{" "}
              <strong>Divinedestiny Chijioke Ekwom</strong>
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LegalLayout;