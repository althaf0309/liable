import { Link } from "react-router-dom";
import { Activity, ArrowRight, Building2, EyeOff, FileCheck, Gauge, ShieldCheck } from "lucide-react";
import AnimatedSection from "./AnimatedSection";
import { Button } from "@/components/ui/button";

const items = [
  {
    title: "ISRA",
    subtitle: "Tenancy readiness",
    body: "A structured reliability assessment for students without relying only on traditional UK credit history.",
    icon: ShieldCheck,
  },
  {
    title: "PropMatch",
    subtitle: "Controlled allocation",
    body: "Matching is controlled by suitability, affordability, occupancy rules, and admin review.",
    icon: Building2,
  },
  {
    title: "THS",
    subtitle: "Live tenancy health",
    body: "An internal operational health indicator for rent behaviour, complaints, communication, and stability.",
    icon: Activity,
  },
  {
    title: "PTR",
    subtitle: "Portable reputation",
    body: "Successful tenancy completion creates a verified record students can carry into future applications.",
    icon: FileCheck,
  },
  {
    title: "PYO",
    subtitle: "Occupancy continuity",
    body: "Void-risk alerts help Liable act before properties become empty.",
    icon: Gauge,
  },
  {
    title: "Controlled Visibility",
    subtitle: "Privacy by role",
    body: "Students, landlords, and admins see different levels of data to reduce bias and protect privacy.",
    icon: EyeOff,
  },
];

export default function InnovationPreview() {
  return (
    <section className="section-padding bg-background">
      <div className="container-custom">
        <AnimatedSection className="max-w-3xl mb-12">
          <span className="text-primary font-medium text-sm tracking-wider uppercase">
            Platform Innovations
          </span>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mt-3">
            Built as infrastructure, not a property advert board
          </h2>
          <p className="text-muted-foreground mt-4 text-lg">
            Liable combines intake data, tenancy readiness, controlled allocation, live tenancy monitoring, and role-based visibility into one managed student housing workflow.
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {items.map((item) => (
            <div key={item.title} className="border border-border rounded-xl p-6 bg-card">
              <div className="w-11 h-11 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-4">
                <item.icon className="w-5 h-5" />
              </div>
              <p className="text-xs font-semibold uppercase tracking-wide text-primary">{item.title}</p>
              <h3 className="font-serif text-xl font-bold mt-1">{item.subtitle}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed mt-3">{item.body}</p>
            </div>
          ))}
        </div>

        <div className="mt-10">
          <Link to="/innovation">
            <Button className="gap-2">
              View Innovation Model <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
