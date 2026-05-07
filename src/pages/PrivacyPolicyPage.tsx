import Header from "@/components/Header";
import Footer from "@/components/Footer";

const PrivacyPolicyPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 pb-16">
        <div className="container-custom max-w-4xl">
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">
            Privacy Policy
          </h1>
          <p className="text-muted-foreground mb-10">
            Last updated: February 11, 2026
          </p>

          <section className="space-y-6 text-muted-foreground leading-relaxed">
            <p>
              This Privacy Policy explains how Liable Group Services Ltd collects,
              uses, and protects your personal data when you use our website and
              services.
            </p>

            <h2 className="font-serif text-2xl font-bold text-foreground">
              1. Information We Collect
            </h2>
            <p>
              We may collect contact details (such as name, email address, and phone
              number), enquiry details, and technical data such as IP address,
              browser type, and usage information.
            </p>

            <h2 className="font-serif text-2xl font-bold text-foreground">
              2. How We Use Information
            </h2>
            <p>
              We use collected data to respond to enquiries, manage bookings and
              tenancy-related services, improve website experience, and comply with
              legal obligations.
            </p>

            <h2 className="font-serif text-2xl font-bold text-foreground">
              3. Data Sharing
            </h2>
            <p>
              We do not sell personal data. Information may be shared with trusted
              service providers and partners where necessary to deliver services, or
              where required by law.
            </p>

            <h2 className="font-serif text-2xl font-bold text-foreground">
              4. Data Security
            </h2>
            <p>
              We implement appropriate technical and organizational safeguards to
              protect personal data from unauthorized access, misuse, or disclosure.
            </p>

            <h2 className="font-serif text-2xl font-bold text-foreground">
              5. Your Rights
            </h2>
            <p>
              Depending on applicable law, you may have rights to access, correct, or
              request deletion of your personal data. You can contact us to exercise
              these rights.
            </p>

            <h2 className="font-serif text-2xl font-bold text-foreground">
              6. Contact
            </h2>
            <p>
              For privacy-related questions, contact us at
              <a className="text-primary ml-1" href="mailto:studlet@lgsltd.uk">
                studlet@lgsltd.uk
              </a>
              .
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PrivacyPolicyPage;
