import { motion } from "framer-motion";
import { Calendar, User, ArrowRight, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import AnimatedSection from "./AnimatedSection";
import blog1 from "@/assets/blog-1.jpg";
import blog2 from "@/assets/blog-2.jpg";
import blog3 from "@/assets/blog-3.jpg";

const blogPosts = [
  {
    id: 1,
    title: "Essential Tips for International Students Arriving in the UK",
    excerpt: "Everything you need to know before landing in the UK, from visa requirements to opening a bank account and finding accommodation.",
    image: blog1,
    category: "Student Guide",
    author: "Sarah Johnson",
    date: "Jan 25, 2026",
    readTime: "5 min read",
    featured: true,
  },
  {
    id: 2,
    title: "Top 10 Student Accommodations in London for 2026",
    excerpt: "Discover the best student housing options in London with our comprehensive guide to affordable and quality living spaces.",
    image: blog2,
    category: "Accommodation",
    author: "Michael Chen",
    date: "Jan 22, 2026",
    readTime: "7 min read",
    featured: false,
  },
  {
    id: 3,
    title: "Exploring the UK: Must-Visit Places for Students",
    excerpt: "From historic landmarks to vibrant cities, here are the top destinations every international student should explore.",
    image: blog3,
    category: "Travel",
    author: "Emma Williams",
    date: "Jan 18, 2026",
    readTime: "4 min read",
    featured: false,
  },
];

const BlogCard = ({ post, index, featured = false }: { post: typeof blogPosts[0]; index: number; featured?: boolean }) => {
  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={`group cursor-pointer ${featured ? "md:col-span-2 md:row-span-2" : ""}`}
    >
      <div className={`relative overflow-hidden rounded-2xl ${featured ? "h-full min-h-[500px]" : "h-[280px]"}`}>
        <motion.img
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.5 }}
          src={post.image}
          alt={post.title}
          className="w-full h-full object-cover"
        />
        <div className={`absolute inset-0 ${featured 
          ? "bg-gradient-to-t from-foreground/90 via-foreground/50 to-transparent" 
          : "bg-gradient-to-t from-foreground/80 to-transparent"
        }`} />
        
        {/* Category Badge */}
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1 bg-primary text-primary-foreground text-xs font-semibold rounded-full">
            {post.category}
          </span>
        </div>

        {/* Content */}
        <div className={`absolute bottom-0 left-0 right-0 p-6 text-background ${featured ? "p-8" : ""}`}>
          <div className="flex items-center gap-4 text-sm text-background/70 mb-3">
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              {post.date}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              {post.readTime}
            </span>
          </div>
          
          <h3 className={`font-serif font-bold mb-2 group-hover:text-primary transition-colors ${
            featured ? "text-2xl md:text-3xl" : "text-lg"
          }`}>
            {post.title}
          </h3>
          
          {featured && (
            <p className="text-background/80 text-sm mb-4 line-clamp-2">
              {post.excerpt}
            </p>
          )}
          
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-2 text-sm text-background/70">
              <User className="w-3.5 h-3.5" />
              {post.author}
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
    </motion.article>
  );
};

const Blog = () => {
  const featuredPost = blogPosts.find(post => post.featured);
  const regularPosts = blogPosts.filter(post => !post.featured);

  return (
    <section id="blog" className="section-padding bg-cream">
      <div className="container-custom">
        {/* Header */}
        <AnimatedSection className="text-center mb-12">
          <span className="text-primary font-medium text-sm tracking-wider uppercase">
            Our Blog
          </span>
          <h2 className="font-serif text-3xl md:text-5xl font-bold text-foreground mt-3 mb-4">
            Latest News & <span className="text-primary">Articles</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Stay updated with the latest tips, guides, and news for international students in the UK.
          </p>
        </AnimatedSection>

        {/* Blog Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Featured Post */}
          {featuredPost && (
            <BlogCard post={featuredPost} index={0} featured />
          )}
          
          {/* Regular Posts */}
          {regularPosts.map((post, index) => (
            <BlogCard key={post.id} post={post} index={index + 1} />
          ))}
        </div>

        {/* View All Button */}
        <AnimatedSection delay={0.3} className="text-center mt-12">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
            <Button variant="outline" size="lg" className="gap-2">
              View All Articles
              <ArrowRight className="w-4 h-4" />
            </Button>
          </motion.div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default Blog;
