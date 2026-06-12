import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Calendar, User, ArrowRight, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import AnimatedSection from "./AnimatedSection";
import { Link } from "react-router-dom";

import { fetchPublicBlogs, BlogPost } from "@/lib/blog";

// fallback images — London editorial via Unsplash
const blog1 = "https://images.unsplash.com/photo-1532444143931-9f60a76242e7?fm=jpg&q=80&w=800&auto=format&fit=crop";
const blog2 = "https://images.unsplash.com/photo-1514557718210-26e452f8fab0?fm=jpg&q=80&w=800&auto=format&fit=crop";
const blog3 = "https://images.unsplash.com/photo-1480449649358-ee14c6ee0b17?fm=jpg&q=80&w=800&auto=format&fit=crop";

const fallbackImages = [blog1, blog2, blog3];

function formatDate(v?: string | null) {
  if (!v) return "";
  const d = new Date(v);
  if (isNaN(d.getTime())) return "";
  return d.toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" });
}

// simple read time: from excerpt/content length
function calcReadTime(post: BlogPost) {
  const text = `${post.excerpt || ""} ${post.content || ""}`.trim();
  if (!text) return "3 min read";
  const words = text.split(/\s+/).length;
  const mins = Math.max(2, Math.round(words / 200));
  return `${mins} min read`;
}

const BlogCard = ({
  post,
  index,
  featured = false,
  image,
}: {
  post: BlogPost;
  index: number;
  featured?: boolean;
  image: string;
}) => {
  const dateText = formatDate(post.published_at) || "—";
  const author = post.author_name || "Liable Team";
  const category = post.category || "Updates";
  const readTime = post.read_time_mins ? `${post.read_time_mins} min read` : calcReadTime(post);

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={`group cursor-pointer ${featured ? "md:col-span-2 md:row-span-2" : ""}`}
    >
      {/* ✅ go to blog detail by slug */}
      <Link to={`/news/${post.slug}`} className="block">
        <div className={`relative overflow-hidden rounded-2xl ${featured ? "h-full min-h-[500px]" : "h-[280px]"}`}>
          <motion.img
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.5 }}
            src={post.cover_image_url || image}
            alt={post.title}
            className="w-full h-full object-cover"
          />
          <div
            className={`absolute inset-0 ${
              featured
                ? "bg-gradient-to-t from-foreground/90 via-foreground/50 to-transparent"
                : "bg-gradient-to-t from-foreground/80 to-transparent"
            }`}
          />

          {/* Category Badge */}
          <div className="absolute top-4 left-4">
            <span className="px-3 py-1 bg-primary text-primary-foreground text-xs font-semibold rounded-full">
              {category}
            </span>
          </div>

          {/* Content */}
          <div className={`absolute bottom-0 left-0 right-0 p-6 text-background ${featured ? "p-8" : ""}`}>
            <div className="flex items-center gap-4 text-sm text-background/70 mb-3">
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" />
                {dateText}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                {readTime}
              </span>
            </div>

            <h3
              className={`font-serif font-bold mb-2 group-hover:text-primary transition-colors ${
                featured ? "text-2xl md:text-3xl" : "text-lg"
              }`}
            >
              {post.title}
            </h3>

            {featured && (
              <p className="text-background/80 text-sm mb-4 line-clamp-2">
                {post.excerpt || "Read the latest updates and guides."}
              </p>
            )}

            <div className="flex items-center justify-between">
              <span className="flex items-center gap-2 text-sm text-background/70">
                <User className="w-3.5 h-3.5" />
                {author}
              </span>
              <motion.span
                className="text-primary flex items-center gap-1 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity"
                whileHover={{ x: 5 }}
              >
                Read More <ArrowRight className="w-4 h-4" />
              </motion.span>
            </div>
          </div>
        </div>
      </Link>
    </motion.article>
  );
};

const Blog = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    let alive = true;
    (async () => {
      setLoading(true);
      setErr(null);
      try {
        const data = await fetchPublicBlogs();
        if (!alive) return;
        setPosts(data);
      } catch (e: any) {
        if (!alive) return;
        setErr(e?.message || "Failed to load blog posts");
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => {
      alive = false;
    };
  }, []);

  // ✅ pick featured = first post, rest as normal
  const featuredPost = posts[0];
  const regularPosts = posts.slice(1, 3); // show next 2 (like your old UI)

  const featuredImage = fallbackImages[0];
  const regularImages = [fallbackImages[1], fallbackImages[2]];

  return (
    <section id="blog" className="section-padding bg-cream">
      <div className="container-custom">
        <AnimatedSection className="text-center mb-12">
          <span className="text-primary font-medium text-sm tracking-wider uppercase">Our Blog</span>
          <h2 className="font-serif text-3xl md:text-5xl font-bold text-foreground mt-3 mb-4">
            Latest News & <span className="text-primary">Articles</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Stay updated with the latest tips, guides, and news for international students in the UK.
          </p>

          {loading && <p className="mt-4 text-muted-foreground">Loading posts…</p>}
          {err && <p className="mt-4 text-red-600">{err}</p>}
        </AnimatedSection>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredPost && <BlogCard post={featuredPost} index={0} featured image={featuredImage} />}

          {regularPosts.map((post, index) => (
            <BlogCard
              key={post.id}
              post={post}
              index={index + 1}
              image={regularImages[index % regularImages.length]}
            />
          ))}
        </div>

        <AnimatedSection delay={0.3} className="text-center mt-12">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
            <Link to="/news">
              <Button variant="outline" size="lg" className="gap-2">
                View All Articles
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </motion.div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default Blog;
