// src/pages/NewsPage.tsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Calendar, User, ArrowRight, Clock } from "lucide-react";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AnimatedSection from "@/components/AnimatedSection";
import aboutImage from "@/assets/about-image.jpg";

import { apiFetch } from "@/lib/api";

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
      className={`group bg-card rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 ${
        featured ? "md:col-span-2 md:grid md:grid-cols-2" : ""
      }`}
      whileHover={{ y: -5 }}
    >
      <Link to={`/news/${post.slug}`} className="block">
        <div className={`relative overflow-hidden ${featured ? "h-full min-h-[300px]" : "aspect-[16/10]"}`}>
          <img
            src={image}
            alt={post.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <span className="absolute top-4 left-4 bg-primary text-primary-foreground text-xs font-semibold px-3 py-1 rounded-full">
            {category}
          </span>
        </div>
      </Link>

      <div className={`p-6 ${featured ? "flex flex-col justify-center" : ""}`}>
        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
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
            className={`font-serif font-bold text-foreground mb-3 group-hover:text-primary transition-colors ${
              featured ? "text-2xl md:text-3xl" : "text-xl"
            }`}
          >
            {post.title}
          </h3>
        </Link>

        <p className="text-muted-foreground leading-relaxed mb-4 line-clamp-3">
          {post.excerpt || "—"}
        </p>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
              <User className="w-4 h-4 text-primary" />
            </div>
            <span className="text-sm font-medium">{author}</span>
          </div>

          <Link
            to={`/news/${post.slug}`}
            className="flex items-center gap-1 text-primary font-medium text-sm hover:gap-2 transition-all"
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
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20">
        {/* Hero */}
        <div className="relative h-64 md:h-80 overflow-hidden">
          <img src={aboutImage} alt="News" className="w-full h-full object-cover grayscale" />
          <div className="absolute inset-0 bg-foreground/60" />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-background mb-4">
              News & Blog
            </h1>
            <div className="flex items-center gap-2 text-background/80 text-sm">
              <Link to="/" className="hover:text-primary transition-colors">Home</Link>
              <span>/</span>
              <span className="text-primary">News</span>
            </div>
          </div>
        </div>

        <div className="section-padding">
          <div className="container-custom">
            {loading ? (
              <p className="text-muted-foreground">Loading posts...</p>
            ) : err ? (
              <p className="text-red-600">{err}</p>
            ) : (
              <>
                {featuredPost && (
                  <AnimatedSection className="mb-12">
                    <h2 className="font-serif text-2xl font-bold mb-6">Featured Article</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                      <BlogCard post={featuredPost} featured />
                    </div>
                  </AnimatedSection>
                )}

                <AnimatedSection delay={0.1}>
                  <h2 className="font-serif text-2xl font-bold mb-6">Latest Articles</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                    {regularPosts.map((post, index) => (
                      <AnimatedSection key={post.id} delay={index * 0.1}>
                        <BlogCard post={post} />
                      </AnimatedSection>
                    ))}
                  </div>

                  {items.length === 0 && (
                    <div className="text-center py-16">
                      <p className="text-muted-foreground text-lg">No blog posts yet.</p>
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
