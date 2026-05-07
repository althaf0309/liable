import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Calendar, Clock, User } from "lucide-react";

import AnimatedSection from "@/components/AnimatedSection";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { apiFetch } from "@/lib/api";


type BlogPostDetail = {
  id: string;
  slug: string;
  title: string;
  excerpt?: string;
  content: string;
  published_at?: string | null;
  author_name?: string;
  read_time?: string;
  cover_image_url?: string;
  category?: string;
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


function toPlainText(html: string) {
  if (typeof window === "undefined") return html;
  const doc = new DOMParser().parseFromString(html, "text/html");
  return (doc.body.textContent || "").trim();
}


export default function BlogDetailsPage() {
  const { slug } = useParams();
  const [post, setPost] = useState<BlogPostDetail | null>(null);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) return;

    let alive = true;
    (async () => {
      setLoading(true);
      setErr(null);
      try {
        const data = await apiFetch(`/api/core/blog/public/${slug}/`);
        if (!alive) return;
        setPost(data);
      } catch (e: any) {
        if (!alive) return;
        setErr(e?.message || "Failed to load article");
        setPost(null);
      } finally {
        if (alive) setLoading(false);
      }
    })();

    return () => {
      alive = false;
    };
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-20 section-padding">
          <div className="container-custom">Loading...</div>
        </main>
        <Footer />
      </div>
    );
  }

  if (err || !post) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-20 section-padding">
          <div className="container-custom text-center">
            <h1 className="font-serif text-4xl font-bold mb-4">Article Not Found</h1>
            <p className="text-muted-foreground mb-8">{err || "The article doesn't exist."}</p>
            <Link to="/news">
              <Button>Back to News</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const hero = post.cover_image_url || "https://via.placeholder.com/1600x900?text=Blog";
  const author = post.author_name || "Liable Team";
  const readTime = post.read_time || "5 min read";
  const category = post.category || "Blog";
  const plainContent = toPlainText(post.content || "");

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20">
        <div className="relative h-[50vh] md:h-[60vh] overflow-hidden">
          <img src={hero} alt={post.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/40 to-transparent" />

          <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
            <div className="container-custom">
              <span className="inline-block bg-primary text-primary-foreground text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
                {category}
              </span>

              <h1 className="font-serif text-3xl md:text-5xl font-bold text-background mb-4 max-w-4xl">
                {post.title}
              </h1>

              <div className="flex flex-wrap items-center gap-4 md:gap-6 text-background/80">
                <span className="flex items-center gap-2">
                  <User className="w-5 h-5" />
                  {author}
                </span>
                <span className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  {formatDate(post.published_at)}
                </span>
                <span className="flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  {readTime}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="section-padding">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              <div className="lg:col-span-2">
                <AnimatedSection>
                  <Link
                    to="/news"
                    className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Back to News
                  </Link>

                  <article className="prose prose-lg max-w-none">
                    <div className="whitespace-pre-wrap text-muted-foreground">
                      {plainContent}
                    </div>
                  </article>
                </AnimatedSection>
              </div>

              <div className="lg:col-span-1">
                <AnimatedSection delay={0.2}>
                  <div className="sticky top-24">
                    <div className="bg-card rounded-2xl p-6 shadow-lg border border-border">
                      <h3 className="font-serif text-lg font-bold mb-4">About the Author</h3>
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                          <User className="w-8 h-8 text-primary" />
                        </div>
                        <div>
                          <p className="font-semibold">{author}</p>
                          <p className="text-sm text-muted-foreground">Content Writer</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </AnimatedSection>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
