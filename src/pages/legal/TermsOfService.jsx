import React from "react";
import { HiOutlineInformationCircle } from "react-icons/hi";
import LegalLayout from "./LegalLayout";

const TermsOfService = () => {
  return (
    <LegalLayout
      title="Terms of Service"
      description="These terms establish the rules and responsibilities that apply when you access or use the ApexRoot real estate platform."
    >
      <div className="legal-document">
        <div className="legal-intro-card">
          <div className="legal-intro-icon">
            <HiOutlineInformationCircle />
          </div>

          <div>
            <strong>Please read these terms carefully.</strong>

            <p>
              By accessing or using ApexRoot, you agree to comply with
              these Terms of Service. If you do not agree, you should
              not use the platform.
            </p>
          </div>
        </div>

        <section>
          <span className="legal-section-number">01</span>
          <h2>About ApexRoot</h2>

          <p>
            ApexRoot is a technology platform that facilitates the
            discovery, publication, and management of real estate
            listings.
          </p>

          <p>
            Unless expressly stated otherwise, ApexRoot is not a party
            to a property sale, purchase, lease, tenancy, or other
            transaction between users.
          </p>
        </section>

        <section>
          <span className="legal-section-number">02</span>
          <h2>Eligibility</h2>

          <p>
            You may use ApexRoot only if you are legally capable of
            entering into the agreements applicable to your use of the
            platform.
          </p>

          <p>
            If you use ApexRoot on behalf of another person or
            organization, you confirm that you have authority to do so.
          </p>
        </section>

        <section>
          <span className="legal-section-number">03</span>
          <h2>Your Account</h2>

          <p>
            Certain ApexRoot features may require an account. You are
            responsible for:
          </p>

          <ul>
            <li>Providing accurate registration information.</li>
            <li>Keeping your login credentials confidential.</li>
            <li>Maintaining the security of your account.</li>
            <li>Updating information when it becomes inaccurate.</li>
            <li>Reporting unauthorized account access promptly.</li>
          </ul>

          <p>
            You are responsible for activity occurring through your
            account unless caused by circumstances outside your
            reasonable control.
          </p>
        </section>

        <section>
          <span className="legal-section-number">04</span>
          <h2>Property Listings</h2>

          <p>
            Users who publish property listings are responsible for
            ensuring that their listings are truthful, current, and
            lawful.
          </p>

          <p>Listings should not contain:</p>

          <ul>
            <li>False or misleading property information.</li>
            <li>Fraudulent offers.</li>
            <li>Property you do not have authority to advertise.</li>
            <li>Misleading photographs or manipulated information.</li>
            <li>Illegal or discriminatory content.</li>
            <li>Personal information belonging to another person.</li>
            <li>Spam or unrelated promotional content.</li>
          </ul>
        </section>

        <section>
          <span className="legal-section-number">05</span>
          <h2>Property Verification</h2>

          <div className="legal-warning">
            <strong>Important:</strong>
            <span>
              Unless a listing is explicitly marked as verified by
              ApexRoot, users should not assume that ApexRoot has
              independently verified ownership, title, physical
              condition, pricing, availability, or legal status of
              the property.
            </span>
          </div>

          <p>
            Users should conduct appropriate independent due diligence
            before making financial commitments or entering into a
            property transaction.
          </p>
        </section>

        <section>
          <span className="legal-section-number">06</span>
          <h2>Transactions Between Users</h2>

          <p>
            Property transactions may involve substantial financial and
            legal commitments. Users are responsible for independently
            evaluating the property, the other party, documentation,
            ownership, pricing, and contractual terms.
          </p>

          <p>
            ApexRoot does not guarantee that a transaction will be
            completed or that a property will meet a user's
            expectations.
          </p>
        </section>

        <section>
          <span className="legal-section-number">07</span>
          <h2>Payments</h2>

          <p>
            Where ApexRoot provides payment functionality, payments
            may be processed through third-party payment providers.
          </p>

          <p>
            Additional payment terms may apply to specific products or
            services.
          </p>

          <p>
            Users must provide accurate payment information and must
            not use payment methods without authorization.
          </p>
        </section>

        <section>
          <span className="legal-section-number">08</span>
          <h2>Prohibited Activities</h2>

          <p>You agree not to:</p>

          <ul>
            <li>Use ApexRoot for fraudulent purposes.</li>
            <li>Impersonate another person or organization.</li>
            <li>Create fake property listings.</li>
            <li>Attempt to gain unauthorized access to accounts.</li>
            <li>Interfere with platform security.</li>
            <li>Upload malicious code or harmful files.</li>
            <li>Scrape or copy platform content without permission.</li>
            <li>Use automated systems in a way that harms the service.</li>
            <li>Abuse messaging or communication functionality.</li>
            <li>Use ApexRoot for unlawful activities.</li>
          </ul>
        </section>

        <section>
          <span className="legal-section-number">09</span>
          <h2>Content You Submit</h2>

          <p>
            You retain ownership of content you submit to ApexRoot,
            subject to the rights necessary for us to operate the
            platform.
          </p>

          <p>
            By submitting property photographs, descriptions, logos,
            or other content, you grant ApexRoot a non-exclusive,
            worldwide, royalty-free license to host, display, store,
            reproduce, and technically modify that content as
            reasonably necessary to provide and promote the service.
          </p>

          <p>
            You represent that you have the necessary rights to submit
            the content.
          </p>
        </section>

        <section>
          <span className="legal-section-number">10</span>
          <h2>Intellectual Property</h2>

          <p>
            ApexRoot's branding, software, interface, design, graphics,
            text, logos, and other original platform materials are
            protected by applicable intellectual property laws.
          </p>

          <p>
            Except where expressly permitted, you may not reproduce,
            modify, distribute, sell, or commercially exploit ApexRoot
            platform materials without authorization.
          </p>
        </section>

        <section>
          <span className="legal-section-number">11</span>
          <h2>Third-Party Services</h2>

          <p>
            ApexRoot may integrate with third-party services for
            hosting, payments, authentication, analytics, maps,
            communication, storage, or other functionality.
          </p>

          <p>
            Your use of those services may also be subject to their
            respective terms and policies.
          </p>
        </section>

        <section>
          <span className="legal-section-number">12</span>
          <h2>Platform Availability</h2>

          <p>
            We aim to keep ApexRoot available and reliable, but we do
            not guarantee uninterrupted or error-free operation.
          </p>

          <p>
            Services may occasionally be unavailable due to
            maintenance, technical failures, security incidents,
            third-party services, or circumstances beyond our
            reasonable control.
          </p>
        </section>

        <section>
          <span className="legal-section-number">13</span>
          <h2>Suspension and Termination</h2>

          <p>
            ApexRoot may suspend, restrict, or terminate an account or
            listing where reasonably necessary to:
          </p>

          <ul>
            <li>Protect users or the platform.</li>
            <li>Investigate suspected fraud or abuse.</li>
            <li>Enforce these Terms.</li>
            <li>Comply with legal requirements.</li>
            <li>Address security or operational concerns.</li>
          </ul>

          <p>
            Users may also stop using ApexRoot or request account
            closure where the relevant functionality permits.
          </p>
        </section>

        <section>
          <span className="legal-section-number">14</span>
          <h2>Disclaimers</h2>

          <p>
            ApexRoot provides a technology platform and does not
            guarantee the accuracy, completeness, legality, ownership,
            availability, condition, or suitability of every property
            listing.
          </p>

          <p>
            Property information is generally provided by users,
            agents, owners, or other third parties.
          </p>

          <p>
            Users should independently verify important information
            before entering into a transaction.
          </p>
        </section>

        <section>
          <span className="legal-section-number">15</span>
          <h2>Limitation of Liability</h2>

          <p>
            To the maximum extent permitted by applicable law,
            ApexRoot will not be responsible for losses arising from
            transactions, communications, listings, representations,
            or conduct between users that occur independently of
            ApexRoot's direct services.
          </p>

          <p>
            Nothing in these Terms is intended to exclude liability
            that cannot lawfully be excluded or limited.
          </p>
        </section>

        <section>
          <span className="legal-section-number">16</span>
          <h2>Indemnification</h2>

          <p>
            To the extent permitted by law, you agree to be responsible
            for claims, losses, liabilities, and reasonable expenses
            arising from your unlawful use of ApexRoot, violation of
            these Terms, or infringement of another person's rights.
          </p>
        </section>

        <section>
          <span className="legal-section-number">17</span>
          <h2>Changes to These Terms</h2>

          <p>
            We may update these Terms when our services, business
            practices, or legal requirements change.
          </p>

          <p>
            Continued use of ApexRoot after updated Terms become
            effective constitutes acceptance of the updated Terms,
            where permitted by law.
          </p>
        </section>

        <section>
          <span className="legal-section-number">18</span>
          <h2>Governing Law</h2>

          <p>
            These Terms shall be interpreted in accordance with the
            applicable laws of the Federal Republic of Nigeria, subject
            to any mandatory legal protections that apply to you.
          </p>

          <p>
            Any dispute-resolution provisions applicable to a specific
            ApexRoot service or transaction may supplement these Terms.
          </p>
        </section>

        <section>
          <span className="legal-section-number">19</span>
          <h2>Contact Us</h2>

          <div className="legal-contact-card">
            <strong>ApexRoot</strong>
            <span>Legal & Support</span>

            <a href="mailto:ceejayekky300@gmail.com">
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

export default TermsOfService;