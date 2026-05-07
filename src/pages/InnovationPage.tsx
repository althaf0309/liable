import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { Activity, Building2, EyeOff, FileCheck, Gauge, GitBranch, LockKeyhole, ShieldCheck } from "lucide-react";

const innovations = [
  {
    title: "ISRA",
    name: "International Student Reliability Assessment",
    purpose: "Alternative tenancy readiness layer for international students who may not have UK credit history or UK guarantors.",
    positioning: "Liable evaluates tenancy readiness using operational indicators instead of relying only on traditional UK credit systems.",
    sees: ["Student: reliability tier, affordability range, improvement guidance", "Admin: score breakdown, risk indicators, completeness, behavioural signals", "Landlord: tier only, no personal scoring details"],
    icon: ShieldCheck,
  },
  {
    title: "PropMatch",
    name: "Controlled Allocation Engine",
    purpose: "Controlled matching between students and properties instead of public profile browsing.",
    positioning: "Properties are allocated through suitability, affordability, availability, occupancy rules, and tenancy stability.",
    sees: ["Hard filters: budget, availability, occupancy rules, tenancy suitability", "Soft factors: lifestyle compatibility, commute, property preferences", "Landlords cannot browse, filter, or rank student profiles"],
    icon: Building2,
  },
  {
    title: "THS",
    name: "Tenancy Health Score",
    purpose: "Live tenancy stability tracking during occupancy.",
    positioning: "Liable monitors tenancy health during occupancy to support stable housing and reduce avoidable tenancy breakdown.",
    sees: ["Tracks rent behaviour, complaints, communication, tenancy stability, property care, and occupancy continuity", "Presented as Healthy, Stable, or Needs Attention", "Internal tenancy operational health indicator"],
    icon: Activity,
  },
  {
    title: "PTR",
    name: "Portable Tenancy Reputation",
    purpose: "Creates verified tenancy history after successful tenancy completion.",
    positioning: "Students can build a portable tenancy reputation after successful occupancy.",
    sees: ["Tenancy completion status", "Payment consistency and tenancy duration", "Property care summary without sensitive personal details"],
    icon: FileCheck,
  },
  {
    title: "PYO",
    name: "Predictive Yield & Occupancy",
    purpose: "Highlights future void-risk periods before properties become empty.",
    positioning: "Liable monitors occupancy continuity and identifies vacancy risk windows early.",
    sees: ["Current proof: 60-day void-risk alert", "Future: seasonal intake intelligence", "Connects to 12-month occupancy continuity"],
    icon: Gauge,
  },
  {
    title: "Controlled Visibility",
    name: "Role-Based Information Model",
    purpose: "Different users see different levels of information.",
    positioning: "Role-based visibility protects student privacy and reduces open-selection bias.",
    sees: ["Student: own dashboard, support guidance, matched properties", "Landlord: assigned property, tenancy status, occupancy status, tier labels only", "Admin: operational controls, compliance tools, full workflow"],
    icon: EyeOff,
  },
];

const flows = [
  "Student Intake",
  "ISRA Assessment",
  "PropMatch",
  "Admin Review",
  "Allocation",
  "Tenancy Monitoring",
  "PTR Record",
];

export default function InnovationPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24">
        <section className="section-padding bg-navy text-background">
          <div className="container-custom max-w-5xl">
            <span className="text-primary font-medium text-sm tracking-wider uppercase">Liable Innovation Model</span>
            <h1 className="font-serif text-4xl md:text-6xl font-bold mt-4">
              Controlled student housing infrastructure
            </h1>
            <p className="text-background/80 text-lg md:text-xl mt-5 max-w-3xl">
              Liable is positioned as a managed operational platform for international student housing, controlled allocation, tenancy support, privacy, and occupancy continuity.
            </p>
          </div>
        </section>

        <section className="section-padding bg-cream">
          <div className="container-custom">
            <div className="max-w-3xl mb-10">
              <span className="text-primary font-medium text-sm tracking-wider uppercase">System Flow</span>
              <h2 className="font-serif text-4xl font-bold mt-3">How the controlled workflow operates</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-7 gap-3">
              {flows.map((step, index) => (
                <div key={step} className="bg-background rounded-xl p-4 border border-border">
                  <p className="text-primary font-bold text-sm">{String(index + 1).padStart(2, "0")}</p>
                  <p className="font-semibold mt-2">{step}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section-padding">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {innovations.map((item) => (
                <article key={item.title} className="border border-border rounded-xl p-6 bg-card">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center flex-shrink-0">
                      <item.icon className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-primary text-sm font-bold uppercase tracking-wide">{item.title}</p>
                      <h3 className="font-serif text-2xl font-bold mt-1">{item.name}</h3>
                    </div>
                  </div>
                  <p className="text-muted-foreground mt-5 leading-relaxed">{item.purpose}</p>
                  <div className="mt-5 rounded-lg bg-muted p-4">
                    <p className="text-sm font-semibold">Website positioning</p>
                    <p className="text-sm text-muted-foreground mt-1">{item.positioning}</p>
                  </div>
                  <ul className="mt-5 space-y-2">
                    {item.sees.map((line) => (
                      <li key={line} className="text-sm text-muted-foreground flex gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                        {line}
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section-padding bg-navy text-background">
          <div className="container-custom grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1">
              <span className="text-primary font-medium text-sm tracking-wider uppercase">Compliance-Led Infrastructure</span>
              <h2 className="font-serif text-4xl font-bold mt-3">Trust is built into the workflow</h2>
            </div>
            {[
              { title: "Controlled Documents", body: "Private document handling, authenticated access, and admin review.", icon: LockKeyhole },
              { title: "Operational Audit", body: "Admin activity is structured around audit-oriented platform controls.", icon: GitBranch },
              { title: "Managed Issue Flow", body: "Complaints use status tracking, evidence uploads, and controlled landlord visibility.", icon: FileCheck },
            ].map((item) => (
              <div key={item.title} className="bg-background/10 border border-background/15 rounded-xl p-6">
                <item.icon className="w-7 h-7 text-primary mb-4" />
                <h3 className="font-serif text-xl font-bold">{item.title}</h3>
                <p className="text-background/75 text-sm mt-2">{item.body}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
