import Header from "@/components/Header";
import Footer from "@/components/Footer";

const TermsConditionsPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 pb-16">
        <div className="container-custom max-w-4xl">
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">
            Terms & Conditions
          </h1>
          <p className="text-muted-foreground mb-10">
            Last updated: February 11, 2026
          </p>

          <section className="space-y-6 text-muted-foreground leading-relaxed">
            <p>
              These Terms & Conditions govern your use of Liable Group Services Ltd
              website and related services. By accessing or using this website, you
              agree to comply with these terms.
            </p>

            <h2 className="font-serif text-2xl font-bold text-foreground">
              1. Use of Website
            </h2>
            <p>
              You agree to use this website only for lawful purposes and in a way
              that does not infringe the rights of, restrict, or inhibit anyone
              else&apos;s use and enjoyment of the website.
            </p>

            <h2 className="font-serif text-2xl font-bold text-foreground">
              2. Property Information
            </h2>
            <p>
              Property listings, pricing, and availability are provided for general
              information and may change without notice. We make reasonable efforts
              to keep content accurate, but cannot guarantee that all information is
              complete or current at all times.
            </p>

            <h2 className="font-serif text-2xl font-bold text-foreground">
              3. Bookings and Enquiries
            </h2>
            <p>
              Submitting an enquiry or booking request does not create a tenancy or
              contractual agreement until confirmed in writing by us.
            </p>

            <h2 className="font-serif text-2xl font-bold text-foreground">
              4. Intellectual Property
            </h2>
            <p>
              All content on this site, including text, graphics, logos, and media,
              is owned by or licensed to Liable Group Services Ltd and may not be
              copied, distributed, or reused without permission.
            </p>

            <h2 className="font-serif text-2xl font-bold text-foreground">
              5. Limitation of Liability
            </h2>
            <p>
              To the maximum extent permitted by law, we are not liable for any
              direct, indirect, incidental, or consequential loss arising from your
              use of this website or reliance on its content.
            </p>

            <h2 className="font-serif text-2xl font-bold text-foreground">
              6. Contact
            </h2>
            <p>
              If you have questions about these Terms & Conditions, contact us at
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

export default TermsConditionsPage;
