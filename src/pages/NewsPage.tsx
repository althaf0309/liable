// src/pages/NewsPage.tsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Calendar, User, ArrowRight, Clock } from "lucide-react";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AnimatedSection from "@/components/AnimatedSection";
import GlassGlobe from "@/components/GlassGlobe";
import { apiFetch } from "@/lib/api";

const DARK = "hsl(222,52%,2%)";

type BlogPost = {
  id: string;
  slug: string;
  title: string;
  excerpt?: string;
  published_at?: string | null;
  read_time?: string;       // optional if backend sends
  author_name?: string;     // optional if backend sends
  cover_image_url?: string; // optional if backend sends
  category?: string;        // optional if backend sends
};

function formatDate(dt?: string | null) {
  if (!dt) return "";
  try {
    return new Date(dt).toLocaleDateString(undefined, {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  } catch {
    return dt;
  }
}

const BlogCard = ({ post, featured = false }: { post: BlogPost; featured?: boolean }) => {
  const image = post.cover_image_url || "https://via.placeholder.com/1200x800?text=Blog";
  const author = post.author_name || "Liable Team";
  const readTime = post.read_time || "5 min read";
  const category = post.category || "Blog";

  return (
    <motion.div
      className={`group rounded-2xl overflow-hidden transition-all duration-300 ${
        featured ? "md:col-span-2 md:grid md:grid-cols-2" : ""
      }`}
      style={{ background: "rgba(255,255,255,0.03)", backdropFilter: "blur(16px)", border: "1px solid rgba(255,255,255,0.08)" }}
      whileHover={{ y: -5 }}
    >
      <Link to={`/news/${post.slug}`} className="block">
        <div className={`relative overflow-hidden ${featured ? "h-full min-h-[300px]" : "aspect-[16/10]"}`}>
          <img
            src={image}
            alt={post.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <span className="absolute top-4 left-4 text-xs font-semibold px-3 py-1 rounded-full" style={{ background: "rgba(197,160,89,0.2)", color: "#E8C77E", border: "1px solid rgba(197,160,89,0.3)" }}>
            {category}
          </span>
        </div>
      </Link>

      <div className={`p-6 ${featured ? "flex flex-col justify-center" : ""}`}>
        <div className="flex items-center gap-4 text-sm mb-3" style={{ color: "rgba(245,242,237,0.5)" }}>
          <span className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            {formatDate(post.published_at)}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            {readTime}
          </span>
        </div>

        <Link to={`/news/${post.slug}`}>
          <h3
            className={`font-serif font-bold mb-3 transition-colors ${
              featured ? "text-2xl md:text-3xl" : "text-xl"
            }`}
            style={{ color: "#F5F2ED" }}
          >
            {post.title}
          </h3>
        </Link>

        <p className="leading-relaxed mb-4 line-clamp-3" style={{ color: "rgba(245,242,237,0.5)" }}>
          {post.excerpt || "—"}
        </p>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: "rgba(197,160,89,0.12)" }}>
              <User className="w-4 h-4" style={{ color: "#E8C77E" }} />
            </div>
            <span className="text-sm font-medium" style={{ color: "rgba(245,242,237,0.7)" }}>{author}</span>
          </div>

          <Link
            to={`/news/${post.slug}`}
            className="flex items-center gap-1 font-medium text-sm hover:gap-2 transition-all"
            style={{ color: "#E8C77E" }}
          >
            Read More <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default function NewsPage() {
  const [items, setItems] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    let alive = true;
    (async () => {
      setLoading(true);
      setErr(null);
      try {
        const data = await apiFetch("/api/core/blog/public/");
        if (!alive) return;
        setItems(Array.isArray(data) ? data : []);
      } catch (e: any) {
        if (!alive) return;
        setErr(e?.message || "Failed to load blog posts");
        setItems([]);
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => {
      alive = false;
    };
  }, []);

  const featuredPost = items[0] || null;     // simplest: first as featured
  const regularPosts = items.slice(1);

  return (
    <div className="min-h-screen" style={{ background: DARK }}>
      <Header />
      <main className="pt-24">
        {/* Hero */}
        <section className="relative overflow-hidden" style={{ background: DARK }}>
          <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 60% 60% at 72% 50%, rgba(197,160,89,0.07) 0%, transparent 65%)" }} />
          <div className="absolute bottom-0 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(197,160,89,0.4), transparent)" }} />
          <div className="container-custom relative z-10 px-4">
            <div className="grid lg:grid-cols-2 gap-6 items-center min-h-[44vh] py-16">
              <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
                <span className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.22em] uppercase rounded-full px-4 py-1.5 mb-5" style={{ color: "#E8C77E", background: "rgba(197,160,89,0.08)", border: "1px solid rgba(197,160,89,0.18)" }}>
                  <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "#E8C77E" }} />
                  News &amp; Insights
                </span>
                <h1 className="font-serif font-bold leading-tight mb-4" style={{ fontSize: "clamp(2.4rem,5vw,4rem)", color: "#F5F2ED" }}>
                  Stories from the{" "}
                  <span style={{ background: "linear-gradient(135deg,#C5A059,#E8C77E,#C5A059)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Liable network</span>
                </h1>
                <p className="text-base leading-relaxed max-w-md" style={{ color: "rgba(245,242,237,0.55)" }}>
                  Updates, guidance, and insight on student housing, the platform, and life in the UK.
                </p>
              </motion.div>
              <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1, delay: 0.2 }} className="relative h-[280px] sm:h-[360px] order-first lg:order-last">
                <GlassGlobe />
              </motion.div>
            </div>
          </div>
        </section>

        <div className="section-padding">
          <div className="container-custom">
            {loading ? (
              <p style={{ color: "rgba(245,242,237,0.5)" }}>Loading posts...</p>
            ) : err ? (
              <p className="text-red-400">{err}</p>
            ) : (
              <>
                {featuredPost && (
                  <AnimatedSection className="mb-12">
                    <h2 className="font-serif text-2xl font-bold mb-6" style={{ color: "#F5F2ED" }}>Featured Article</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                      <BlogCard post={featuredPost} featured />
                    </div>
                  </AnimatedSection>
                )}

                <AnimatedSection delay={0.1}>
                  <h2 className="font-serif text-2xl font-bold mb-6" style={{ color: "#F5F2ED" }}>Latest Articles</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                    {regularPosts.map((post, index) => (
                      <AnimatedSection key={post.id} delay={index * 0.1}>
                        <BlogCard post={post} />
                      </AnimatedSection>
                    ))}
                  </div>

                  {items.length === 0 && (
                    <div className="text-center py-16">
                      <p className="text-lg" style={{ color: "rgba(245,242,237,0.5)" }}>No blog posts yet.</p>
                    </div>
                  )}
                </AnimatedSection>
              </>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
