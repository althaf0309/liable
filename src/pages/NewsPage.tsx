import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Calendar, User, ArrowRight, Clock } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AnimatedSection from "@/components/AnimatedSection";
import aboutImage from "@/assets/about-image.jpg";
import blog1 from "@/assets/blog-1.jpg";
import blog2 from "@/assets/blog-2.jpg";
import blog3 from "@/assets/blog-3.jpg";
import property1 from "@/assets/property-1.jpg";
import property2 from "@/assets/property-2.jpg";
import property3 from "@/assets/property-3.jpg";

const blogPosts = [
  {
    id: 1,
    title: "Ultimate Guide to Student Accommodation in London",
    excerpt: "Everything you need to know about finding the perfect student housing in London. From budgeting tips to neighborhood guides, we cover it all.",
    image: blog1,
    category: "Student Guide",
    author: "Sarah Johnson",
    date: "January 25, 2026",
    readTime: "8 min read",
    featured: true,
  },
  {
    id: 2,
    title: "Top 10 Neighborhoods for Young Professionals",
    excerpt: "Discover the best areas in London for young professionals looking for the perfect work-life balance.",
    image: blog2,
    category: "Lifestyle",
    author: "Michael Chen",
    date: "January 20, 2026",
    readTime: "6 min read",
    featured: false,
  },
  {
    id: 3,
    title: "How to Navigate UK Rental Agreements",
    excerpt: "Understanding your rights and responsibilities as a tenant in the UK. A comprehensive guide to rental contracts.",
    image: blog3,
    category: "Legal Advice",
    author: "Emma Williams",
    date: "January 15, 2026",
    readTime: "10 min read",
    featured: false,
  },
  {
    id: 4,
    title: "Money-Saving Tips for International Students",
    excerpt: "Practical advice on managing your finances while studying abroad in the UK.",
    image: property1,
    category: "Finance",
    author: "David Kumar",
    date: "January 10, 2026",
    readTime: "7 min read",
    featured: false,
  },
  {
    id: 5,
    title: "Landlord's Guide to Property Management",
    excerpt: "Best practices for landlords to maintain properties and keep tenants happy.",
    image: property2,
    category: "Landlord Tips",
    author: "Rebecca Taylor",
    date: "January 5, 2026",
    readTime: "9 min read",
    featured: false,
  },
  {
    id: 6,
    title: "Preparing for University: A Complete Checklist",
    excerpt: "Everything you need before moving into your student accommodation.",
    image: property3,
    category: "Student Guide",
    author: "James Wilson",
    date: "December 28, 2025",
    readTime: "5 min read",
    featured: false,
  },
];

const BlogCard = ({ post, featured = false }: { post: typeof blogPosts[0]; featured?: boolean }) => {
  return (
    <motion.div
      className={`group bg-card rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 ${
        featured ? "md:col-span-2 md:grid md:grid-cols-2" : ""
      }`}
      whileHover={{ y: -5 }}
    >
      <Link to={`/news/${post.id}`} className="block">
        <div className={`relative overflow-hidden ${featured ? "h-full min-h-[300px]" : "aspect-[16/10]"}`}>
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <span className="absolute top-4 left-4 bg-primary text-primary-foreground text-xs font-semibold px-3 py-1 rounded-full">
            {post.category}
          </span>
        </div>
      </Link>
      <div className={`p-6 ${featured ? "flex flex-col justify-center" : ""}`}>
        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
          <span className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            {post.date}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            {post.readTime}
          </span>
        </div>
        <Link to={`/news/${post.id}`}>
          <h3 className={`font-serif font-bold text-foreground mb-3 group-hover:text-primary transition-colors ${
            featured ? "text-2xl md:text-3xl" : "text-xl"
          }`}>
            {post.title}
          </h3>
        </Link>
        <p className="text-muted-foreground leading-relaxed mb-4 line-clamp-3">
          {post.excerpt}
        </p>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
              <User className="w-4 h-4 text-primary" />
            </div>
            <span className="text-sm font-medium">{post.author}</span>
          </div>
          <Link
            to={`/news/${post.id}`}
            className="flex items-center gap-1 text-primary font-medium text-sm hover:gap-2 transition-all"
          >
            Read More <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

const NewsPage = () => {
  const featuredPost = blogPosts.find((post) => post.featured);
  const regularPosts = blogPosts.filter((post) => !post.featured);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20">
        {/* Hero Banner */}
        <div className="relative h-64 md:h-80 overflow-hidden">
          <img
            src={aboutImage}
            alt="News"
            className="w-full h-full object-cover grayscale"
          />
          <div className="absolute inset-0 bg-foreground/60" />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-background mb-4">
              News & Blog
            </h1>
            <div className="flex items-center gap-2 text-background/80 text-sm">
              <Link to="/" className="hover:text-primary transition-colors">
                Home
              </Link>
              <span>/</span>
              <span className="text-primary">News</span>
            </div>
          </div>
        </div>

        {/* Blog Posts */}
        <div className="section-padding">
          <div className="container-custom">
            {/* Featured Post */}
            {featuredPost && (
              <AnimatedSection className="mb-12">
                <h2 className="font-serif text-2xl font-bold mb-6">Featured Article</h2>
                <BlogCard post={featuredPost} featured />
              </AnimatedSection>
            )}

            {/* Regular Posts Grid */}
            <AnimatedSection delay={0.1}>
              <h2 className="font-serif text-2xl font-bold mb-6">Latest Articles</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {regularPosts.map((post, index) => (
                  <AnimatedSection key={post.id} delay={index * 0.1}>
                    <BlogCard post={post} />
                  </AnimatedSection>
                ))}
              </div>
            </AnimatedSection>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default NewsPage;
