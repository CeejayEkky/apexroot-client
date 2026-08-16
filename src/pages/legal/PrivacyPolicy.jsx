import React from "react";
import { HiOutlineInformationCircle } from "react-icons/hi";
import LegalLayout from "./LegalLayout";

const PrivacyPolicy = () => {
  return (
    <LegalLayout
      title="Privacy Policy"
      description="Your privacy matters to us. This policy explains how ApexRoot collects, uses, protects, and manages information when you use our platform."
    >
      <div className="legal-document">
        <div className="legal-intro-card">
          <div className="legal-intro-icon">
            <HiOutlineInformationCircle />
          </div>

          <div>
            <strong>Your privacy is important to ApexRoot.</strong>

            <p>
              This Privacy Policy explains how ApexRoot collects and
              processes information when you visit our website, create
              an account, browse property listings, communicate with
              other users, or otherwise use our services.
            </p>
          </div>
        </div>

        <section id="overview">
          <span className="legal-section-number">01</span>
          <h2>Overview</h2>

          <p>
            ApexRoot is a real estate technology platform designed to
            make property discovery, listing, buying, selling, and
            renting more convenient.
          </p>

          <p>
            By using ApexRoot, you acknowledge that you have read and
            understood this Privacy Policy. If you do not agree with
            this policy, please discontinue your use of the platform.
          </p>
        </section>

        <section id="information">
          <span className="legal-section-number">02</span>
          <h2>Information We Collect</h2>

          <p>
            Depending on how you use ApexRoot, we may collect the
            following categories of information:
          </p>

          <h3>Account Information</h3>

          <ul>
            <li>Full name</li>
            <li>Email address</li>
            <li>Phone number</li>
            <li>Account credentials</li>
            <li>Profile information</li>
            <li>Account type or role</li>
          </ul>

          <h3>Property Information</h3>

          <p>
            When you create or manage a property listing, we may
            collect information such as:
          </p>

          <ul>
            <li>Property address or location</li>
            <li>Property description</li>
            <li>Property type</li>
            <li>Price and rental information</li>
            <li>Property features and amenities</li>
            <li>Photographs and other uploaded media</li>
            <li>Availability information</li>
          </ul>

          <h3>Usage Information</h3>

          <p>
            We may automatically collect technical and usage
            information, including:
          </p>

          <ul>
            <li>IP address</li>
            <li>Browser type</li>
            <li>Device type</li>
            <li>Operating system</li>
            <li>Pages visited</li>
            <li>Approximate location information</li>
            <li>Date and time of activity</li>
            <li>Interactions with the platform</li>
          </ul>
        </section>

        <section id="use">
          <span className="legal-section-number">03</span>
          <h2>How We Use Your Information</h2>

          <p>
            We may use collected information to:
          </p>

          <ul>
            <li>Create and manage your ApexRoot account.</li>
            <li>Provide and improve our services.</li>
            <li>Display and manage property listings.</li>
            <li>Allow users to communicate regarding properties.</li>
            <li>Personalize your experience.</li>
            <li>Respond to support requests.</li>
            <li>Detect fraud, abuse, and suspicious activity.</li>
            <li>Maintain platform security.</li>
            <li>Analyze platform performance.</li>
            <li>Send important service-related communications.</li>
            <li>Send marketing communications where permitted.</li>
            <li>Comply with applicable legal obligations.</li>
          </ul>
        </section>

        <section id="sharing">
          <span className="legal-section-number">04</span>
          <h2>When We Share Information</h2>

          <p>
            ApexRoot does not sell your personal information as a
            commercial product.
          </p>

          <p>
            We may share information when reasonably necessary to
            operate our services, including with:
          </p>

          <ul>
            <li>
              Service providers that help us operate the platform.
            </li>
            <li>
              Hosting, storage, analytics, security, and infrastructure
              providers.
            </li>
            <li>
              Payment processors where payment functionality is used.
            </li>
            <li>
              Professional advisers where necessary.
            </li>
            <li>
              Government authorities where legally required.
            </li>
          </ul>

          <p>
            We require service providers that process information on
            our behalf to handle that information appropriately and
            consistently with applicable requirements.
          </p>
        </section>

        <section id="property">
          <span className="legal-section-number">05</span>
          <h2>Public Property Listings</h2>

          <p>
            Property information intentionally submitted for public
            listing may be visible to other ApexRoot users or visitors
            to the platform.
          </p>

          <p>
            Do not include sensitive personal information in a public
            property description, photograph, or other listing field.
          </p>

          <div className="legal-warning">
            <strong>Important:</strong>
            <span>
              Property owners and agents are responsible for ensuring
              that information they publish is accurate and that they
              have the necessary rights to publish the property,
              photographs, and related information.
            </span>
          </div>
        </section>

        <section id="security">
          <span className="legal-section-number">06</span>
          <h2>Data Security</h2>

          <p>
            We use reasonable technical and organizational safeguards
            designed to protect information against unauthorized
            access, alteration, disclosure, or destruction.
          </p>

          <p>
            However, no internet-based system can be guaranteed to be
            completely secure. You should use strong passwords and
            protect your account credentials.
          </p>
        </section>

        <section id="retention">
          <span className="legal-section-number">07</span>
          <h2>Data Retention</h2>

          <p>
            We retain information for as long as reasonably necessary
            to provide our services, maintain legitimate business
            records, resolve disputes, enforce agreements, prevent
            abuse, and comply with legal obligations.
          </p>

          <p>
            Retention periods may vary depending on the type and
            purpose of the information.
          </p>
        </section>

        <section id="rights">
          <span className="legal-section-number">08</span>
          <h2>Your Privacy Rights</h2>

          <p>
            Subject to applicable law, you may have rights regarding
            your personal information, including the ability to:
          </p>

          <ul>
            <li>Request access to personal information we hold.</li>
            <li>Request correction of inaccurate information.</li>
            <li>Request deletion where legally applicable.</li>
            <li>Object to or restrict certain processing.</li>
            <li>Withdraw consent where processing relies on consent.</li>
            <li>Manage certain communication preferences.</li>
          </ul>

          <p>
            To submit a privacy request, contact us at:
          </p>

          <a
            className="legal-email"
            href="mailto:ceejayekky300@gmail.com"
          >
            ceejayekky300@apexroot.com
          </a>
        </section>

        <section id="cookies">
          <span className="legal-section-number">09</span>
          <h2>Cookies & Similar Technologies</h2>

          <p>
            ApexRoot may use cookies and similar technologies to keep
            the platform functioning, remember preferences, understand
            usage, and improve our services.
          </p>

          <p>
            You can manage optional cookie preferences through our
            Cookie Settings page.
          </p>
        </section>

        <section id="children">
          <span className="legal-section-number">10</span>
          <h2>Children's Privacy</h2>

          <p>
            ApexRoot is intended for users who are legally capable of
            entering into agreements relating to the services they use.
            We do not knowingly collect personal information from
            children in violation of applicable law.
          </p>
        </section>

        <section id="changes">
          <span className="legal-section-number">11</span>
          <h2>Changes to This Policy</h2>

          <p>
            We may update this Privacy Policy from time to time to
            reflect changes to our services, technology, legal
            requirements, or business practices.
          </p>

          <p>
            When material changes are made, we may provide additional
            notice where appropriate. The updated policy will display
            a revised "Last updated" date.
          </p>
        </section>

        <section id="contact">
          <span className="legal-section-number">12</span>
          <h2>Contact ApexRoot</h2>

          <p>
            If you have questions, concerns, or requests relating to
            this Privacy Policy, contact:
          </p>

          <div className="legal-contact-card">
            <strong>ApexRoot</strong>
            <span>Privacy & Support</span>
            <a href="mailto:contact@apexroot.com">
              ceejayekky300@gmail.com
            </a>
            <span>+234 9113225710</span>
            <span>Lagos, Nigeria</span>
          </div>
        </section>
      </div>
    </LegalLayout>
  );
};

export default PrivacyPolicy;