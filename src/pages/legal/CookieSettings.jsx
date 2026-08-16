import React, { useEffect, useState } from "react";
import {
  HiOutlineCheckCircle,
  HiOutlineShieldCheck,
  HiOutlineChartBar,
  HiOutlineSpeakerphone,
  HiOutlineAdjustments,
} from "react-icons/hi";
import LegalLayout from "./LegalLayout";

const COOKIE_STORAGE_KEY = "apexroot_cookie_preferences";

const defaultPreferences = {
  essential: true,
  analytics: false,
  marketing: false,
};

const CookieSettings = () => {
  const [preferences, setPreferences] = useState(defaultPreferences);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(COOKIE_STORAGE_KEY);

      if (stored) {
        const parsed = JSON.parse(stored);

        setPreferences({
          ...defaultPreferences,
          ...parsed,
          essential: true,
        });
      }
    } catch (error) {
      console.error("Unable to load cookie preferences:", error);
    }
  }, []);

  const updatePreference = (key) => {
    if (key === "essential") return;

    setPreferences((current) => ({
      ...current,
      [key]: !current[key],
    }));

    setSaved(false);
  };

  const savePreferences = () => {
    try {
      localStorage.setItem(
        COOKIE_STORAGE_KEY,
        JSON.stringify({
          ...preferences,
          essential: true,
        })
      );

      setSaved(true);

      setTimeout(() => {
        setSaved(false);
      }, 3000);
    } catch (error) {
      console.error("Unable to save cookie preferences:", error);
    }
  };

  const acceptAll = () => {
    const allEnabled = {
      essential: true,
      analytics: true,
      marketing: true,
    };

    setPreferences(allEnabled);

    localStorage.setItem(
      COOKIE_STORAGE_KEY,
      JSON.stringify(allEnabled)
    );

    setSaved(true);
  };

  const rejectOptional = () => {
    const essentialOnly = {
      essential: true,
      analytics: false,
      marketing: false,
    };

    setPreferences(essentialOnly);

    localStorage.setItem(
      COOKIE_STORAGE_KEY,
      JSON.stringify(essentialOnly)
    );

    setSaved(true);
  };

  const cookieTypes = [
    {
      key: "essential",
      icon: HiOutlineShieldCheck,
      title: "Essential Cookies",
      description:
        "These cookies are required for ApexRoot to function properly. They support authentication, security, account sessions, and core platform functionality.",
      alwaysOn: true,
    },
    {
      key: "analytics",
      icon: HiOutlineChartBar,
      title: "Analytics Cookies",
      description:
        "These cookies help us understand how visitors use ApexRoot so we can improve performance, navigation, and the overall user experience.",
      alwaysOn: false,
    },
    {
      key: "marketing",
      icon: HiOutlineSpeakerphone,
      title: "Marketing Cookies",
      description:
        "These cookies may be used to understand marketing performance and provide more relevant promotional experiences.",
      alwaysOn: false,
    },
  ];

  return (
    <LegalLayout
      title="Cookie Settings"
      description="Choose which optional cookies ApexRoot can use. Essential cookies remain active because they are necessary for the platform to work."
    >
      <div className="cookie-settings-page">
        {saved && (
          <div className="cookie-success">
            <HiOutlineCheckCircle />
            <span>Your cookie preferences have been saved.</span>
          </div>
        )}

        <div className="legal-intro-card">
          <div className="legal-intro-icon">
            <HiOutlineAdjustments />
          </div>

          <div>
            <strong>You are in control.</strong>

            <p>
              ApexRoot uses cookies and similar technologies to
              provide core functionality, understand platform usage,
              and improve your experience. You can choose which
              optional categories you want to enable.
            </p>
          </div>
        </div>

        <section>
          <span className="legal-section-number">01</span>
          <h2>What Are Cookies?</h2>

          <p>
            Cookies are small pieces of information stored on your
            device when you visit a website. They can help websites
            remember information about your visit and provide
            functionality across different pages.
          </p>

          <p>
            Similar technologies may also be used for security,
            analytics, preferences, and other platform functions.
          </p>
        </section>

        <section>
          <span className="legal-section-number">02</span>
          <h2>Manage Your Preferences</h2>

          <p className="cookie-settings-description">
            Select the cookie categories you would like ApexRoot to
            use.
          </p>

          <div className="cookie-preferences">
            {cookieTypes.map((cookie) => {
              const Icon = cookie.icon;
              const enabled = preferences[cookie.key];

              return (
                <div
                  className={`cookie-option ${
                    enabled ? "enabled" : ""
                  }`}
                  key={cookie.key}
                >
                  <div className="cookie-option-icon">
                    <Icon />
                  </div>

                  <div className="cookie-option-content">
                    <div className="cookie-option-heading">
                      <h3>{cookie.title}</h3>

                      {cookie.alwaysOn && (
                        <span className="cookie-required">
                          Always Active
                        </span>
                      )}
                    </div>

                    <p>{cookie.description}</p>
                  </div>

                  <button
                    type="button"
                    className={`cookie-toggle ${
                      enabled ? "on" : ""
                    } ${cookie.alwaysOn ? "disabled" : ""}`}
                    onClick={() =>
                      updatePreference(cookie.key)
                    }
                    aria-label={`Toggle ${cookie.title}`}
                    disabled={cookie.alwaysOn}
                  >
                    <span />
                  </button>
                </div>
              );
            })}
          </div>
        </section>

        <section>
          <span className="legal-section-number">03</span>
          <h2>Choose Your Preference</h2>

          <div className="cookie-action-card">
            <div>
              <h3>Cookie preferences</h3>

              <p>
                You can accept all cookies, reject optional cookies,
                or save the specific preferences selected above.
              </p>
            </div>

            <div className="cookie-actions">
              <button
                type="button"
                className="cookie-btn cookie-btn-primary"
                onClick={acceptAll}
              >
                Accept All
              </button>

              <button
                type="button"
                className="cookie-btn cookie-btn-secondary"
                onClick={rejectOptional}
              >
                Reject Optional
              </button>

              <button
                type="button"
                className="cookie-btn cookie-btn-outline"
                onClick={savePreferences}
              >
                Save Preferences
              </button>
            </div>
          </div>
        </section>

        <section>
          <span className="legal-section-number">04</span>
          <h2>Essential Cookies</h2>

          <p>
            Essential cookies are necessary for the platform to
            operate. They may support functions such as:
          </p>

          <ul>
            <li>Account authentication</li>
            <li>Session management</li>
            <li>Security protections</li>
            <li>Fraud prevention</li>
            <li>Saving required platform preferences</li>
            <li>Core navigation and functionality</li>
          </ul>

          <p>
            Because these cookies are necessary for core
            functionality, they cannot be disabled through this
            settings panel.
          </p>
        </section>

        <section>
          <span className="legal-section-number">05</span>
          <h2>Analytics Cookies</h2>

          <p>
            When enabled, analytics technologies may help ApexRoot
            understand general patterns such as which pages are
            visited, how users navigate the platform, and where
            improvements may be needed.
          </p>
        </section>

        <section>
          <span className="legal-section-number">06</span>
          <h2>Marketing Cookies</h2>

          <p>
            Marketing technologies may be used, where implemented, to
            measure promotional campaigns and understand how users
            interact with marketing content.
          </p>
        </section>

        <section>
          <span className="legal-section-number">07</span>
          <h2>Changing Your Preferences</h2>

          <p>
            You can return to this Cookie Settings page at any time
            to change your optional preferences.
          </p>

          <p>
            Your preferences are stored on your device and may need to
            be selected again if you clear your browser storage or
            access ApexRoot from another device or browser.
          </p>
        </section>

        <section>
          <span className="legal-section-number">08</span>
          <h2>Questions?</h2>

          <div className="legal-contact-card">
            <strong>ApexRoot</strong>
            <span>Privacy & Cookie Support</span>

            <a href="mailto:ceejayekky300@gmail.com">
              ceejayekky300@gmail.com
            </a>

            <span>+234 9113225710</span>
          </div>
        </section>
      </div>
    </LegalLayout>
  );
};

export default CookieSettings;