import { useParams, Link } from "react-router-dom";
import { Calendar, User, Clock, ArrowLeft, Facebook, Twitter, Linkedin, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AnimatedSection from "@/components/AnimatedSection";
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
    excerpt: "Everything you need to know about finding the perfect student housing in London.",
    image: blog1,
    category: "Student Guide",
    author: "Sarah Johnson",
    date: "January 25, 2026",
    readTime: "8 min read",
    content: `
      <p>Finding the right student accommodation in London can be a daunting task, especially for international students who are unfamiliar with the city. This comprehensive guide will walk you through everything you need to know to find your perfect home away from home.</p>

      <h2>Understanding Your Options</h2>
      <p>London offers a variety of accommodation options for students:</p>
      <ul>
        <li><strong>University Halls of Residence:</strong> These are typically the most convenient option for first-year students. They offer a built-in community and are usually located close to campus.</li>
        <li><strong>Private Student Housing:</strong> Purpose-built student accommodations (PBSAs) offer modern amenities and all-inclusive bills.</li>
        <li><strong>Shared Houses or Flats:</strong> Renting with other students can be more affordable and offers more independence.</li>
        <li><strong>Studio Apartments:</strong> For those who prefer their own space, studio apartments are available but tend to be more expensive.</li>
      </ul>

      <h2>Budgeting for Accommodation</h2>
      <p>London is one of the most expensive cities in the world for students. Here's what you can expect to pay:</p>
      <ul>
        <li>University Halls: £150-£300 per week</li>
        <li>Private Student Housing: £200-£400 per week</li>
        <li>Shared House/Flat: £100-£250 per week (excluding bills)</li>
        <li>Studio Apartment: £250-£500 per week</li>
      </ul>

      <h2>Best Areas for Students</h2>
      <p>The best area for you will depend on where your university is located. Here are some popular student neighborhoods:</p>
      <ul>
        <li><strong>Shoreditch:</strong> Trendy area with great nightlife, popular with arts and creative students.</li>
        <li><strong>Camden:</strong> Known for its markets and music scene, with good transport links.</li>
        <li><strong>King's Cross:</strong> Central location with excellent connections to multiple universities.</li>
        <li><strong>Greenwich:</strong> More affordable option with beautiful parks and historical sites.</li>
      </ul>

      <h2>Tips for Finding Accommodation</h2>
      <p>Here are our top tips for securing the best student accommodation:</p>
      <ol>
        <li>Start your search early – the best properties go quickly</li>
        <li>Visit properties in person if possible</li>
        <li>Read reviews from other students</li>
        <li>Check what's included in the rent (bills, WiFi, etc.)</li>
        <li>Understand your tenancy agreement before signing</li>
        <li>Take photos of the property before moving in</li>
      </ol>

      <h2>Conclusion</h2>
      <p>Finding the right accommodation is crucial to your university experience. Take your time, do your research, and don't be afraid to ask questions. At Liable Group Services, we're here to help make your transition to London as smooth as possible.</p>
    `,
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
    content: `
      <p>London is a city of diverse neighborhoods, each with its own unique character. For young professionals, choosing the right area to live can significantly impact your quality of life. Here are our top 10 recommendations.</p>

      <h2>1. Shoreditch</h2>
      <p>The heart of London's tech scene, Shoreditch offers trendy cafes, vibrant nightlife, and a creative atmosphere. Perfect for those working in tech or creative industries.</p>

      <h2>2. Canary Wharf</h2>
      <p>If you work in finance, Canary Wharf offers modern apartments, excellent amenities, and a short commute to the office.</p>

      <h2>3. Clapham</h2>
      <p>Known for its large common and bustling high street, Clapham attracts young professionals seeking a balance between city life and green spaces.</p>

      <h2>4. Brixton</h2>
      <p>A culturally diverse area with great food markets, live music venues, and a strong community feel.</p>

      <h2>5. Hackney</h2>
      <p>Trendy and artistic, Hackney offers Victorian architecture, hip cafes, and excellent weekend markets.</p>

      <h2>6. Stratford</h2>
      <p>Transformed by the 2012 Olympics, Stratford offers modern housing, excellent transport links, and the Westfield shopping center.</p>

      <h2>7. Greenwich</h2>
      <p>Historical charm meets modern living, with beautiful parks, waterfront views, and good value for money.</p>

      <h2>8. Battersea</h2>
      <p>Undergoing major regeneration, Battersea offers riverside living and is increasingly popular with young professionals.</p>

      <h2>9. Angel</h2>
      <p>Central location with great restaurants, antique shops, and easy access to the City.</p>

      <h2>10. Peckham</h2>
      <p>Up-and-coming area with affordable rents, rooftop bars, and a strong arts scene.</p>
    `,
  },
  {
    id: 3,
    title: "How to Navigate UK Rental Agreements",
    excerpt: "Understanding your rights and responsibilities as a tenant in the UK.",
    image: blog3,
    category: "Legal Advice",
    author: "Emma Williams",
    date: "January 15, 2026",
    readTime: "10 min read",
    content: `
      <p>Renting a property in the UK comes with legal rights and responsibilities for both tenants and landlords. Understanding these before signing a contract is essential.</p>

      <h2>Types of Tenancy Agreements</h2>
      <p>The most common type is an Assured Shorthold Tenancy (AST). This gives you the right to stay in the property for a fixed term, typically 6 or 12 months.</p>

      <h2>Your Rights as a Tenant</h2>
      <ul>
        <li>Live in a property that's safe and in good repair</li>
        <li>Have your deposit protected in a government-approved scheme</li>
        <li>Know who your landlord is</li>
        <li>Challenge excessively high charges</li>
        <li>Not be unfairly evicted</li>
      </ul>

      <h2>Your Responsibilities</h2>
      <ul>
        <li>Pay rent on time</li>
        <li>Pay bills as agreed in your tenancy</li>
        <li>Look after the property</li>
        <li>Report any repairs needed</li>
        <li>Give proper notice when leaving</li>
      </ul>

      <h2>Deposits</h2>
      <p>Your landlord must protect your deposit in a government-approved tenancy deposit scheme within 30 days of receiving it. You should receive information about which scheme is being used.</p>

      <h2>Ending Your Tenancy</h2>
      <p>To end your tenancy, you typically need to give notice in writing. The notice period depends on your agreement but is usually one or two months.</p>
    `,
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
    content: `
      <p>Studying in the UK as an international student can be expensive, but with careful planning, you can make your money go further.</p>

      <h2>Get a Student Bank Account</h2>
      <p>UK banks offer special accounts for students with benefits like interest-free overdrafts and no monthly fees.</p>

      <h2>Use Your Student Discounts</h2>
      <p>Your student ID can save you money on everything from food to transport. Get a 16-25 Railcard for 1/3 off train travel.</p>

      <h2>Cook at Home</h2>
      <p>Eating out in London is expensive. Learning to cook can save you hundreds of pounds per month.</p>

      <h2>Shop Smart</h2>
      <p>Use apps like Too Good To Go for discounted food, and shop at budget supermarkets like Aldi and Lidl.</p>

      <h2>Find Free Entertainment</h2>
      <p>London has many free museums, galleries, and parks. Take advantage of these for affordable days out.</p>
    `,
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
    content: `
      <p>Being a successful landlord requires more than just owning property. Good property management leads to happy tenants and better returns.</p>

      <h2>Maintain Your Property</h2>
      <p>Regular maintenance prevents small issues becoming expensive problems. Schedule annual inspections and respond quickly to repair requests.</p>

      <h2>Screen Tenants Carefully</h2>
      <p>Take time to reference check potential tenants. This includes credit checks, employment verification, and previous landlord references.</p>

      <h2>Communicate Clearly</h2>
      <p>Good communication with tenants prevents misunderstandings and builds positive relationships.</p>

      <h2>Know the Law</h2>
      <p>Stay up to date with landlord regulations, including gas safety certificates, EPC ratings, and deposit protection requirements.</p>

      <h2>Consider Professional Management</h2>
      <p>If managing property takes too much time, consider using a professional property management service like Liable Group Services.</p>
    `,
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
    content: `
      <p>Moving to university is exciting but can be overwhelming. Use this checklist to make sure you have everything you need.</p>

      <h2>Essential Documents</h2>
      <ul>
        <li>Passport and visa (if applicable)</li>
        <li>University acceptance letter</li>
        <li>Accommodation contract</li>
        <li>Bank statements</li>
        <li>Insurance documents</li>
      </ul>

      <h2>Bedroom Essentials</h2>
      <ul>
        <li>Bedding (duvet, pillows, sheets)</li>
        <li>Towels</li>
        <li>Clothes hangers</li>
        <li>Desk lamp</li>
        <li>Extension leads</li>
      </ul>

      <h2>Kitchen Items</h2>
      <ul>
        <li>Pots and pans</li>
        <li>Cutlery and utensils</li>
        <li>Plates and bowls</li>
        <li>Mugs and glasses</li>
        <li>Chopping board</li>
      </ul>

      <h2>Study Supplies</h2>
      <ul>
        <li>Laptop and charger</li>
        <li>Notebooks and stationery</li>
        <li>Backpack</li>
        <li>USB drives</li>
      </ul>
    `,
  },
];

const BlogDetailsPage = () => {
  const { id } = useParams();
  const post = blogPosts.find((p) => p.id === parseInt(id || "1"));

  if (!post) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-20 section-padding">
          <div className="container-custom text-center">
            <h1 className="font-serif text-4xl font-bold mb-4">Article Not Found</h1>
            <p className="text-muted-foreground mb-8">The article you're looking for doesn't exist.</p>
            <Link to="/news">
              <Button>Back to News</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const relatedPosts = blogPosts.filter((p) => p.id !== post.id).slice(0, 3);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20">
        {/* Hero Image */}
        <div className="relative h-[50vh] md:h-[60vh] overflow-hidden">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/40 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
            <div className="container-custom">
              <span className="inline-block bg-primary text-primary-foreground text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
                {post.category}
              </span>
              <h1 className="font-serif text-3xl md:text-5xl font-bold text-background mb-4 max-w-4xl">
                {post.title}
              </h1>
              <div className="flex flex-wrap items-center gap-4 md:gap-6 text-background/80">
                <span className="flex items-center gap-2">
                  <User className="w-5 h-5" />
                  {post.author}
                </span>
                <span className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  {post.date}
                </span>
                <span className="flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  {post.readTime}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="section-padding">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {/* Main Content */}
              <div className="lg:col-span-2">
                <AnimatedSection>
                  <Link
                    to="/news"
                    className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Back to News
                  </Link>
                  
                  <article
                    className="prose prose-lg max-w-none prose-headings:font-serif prose-headings:text-foreground prose-p:text-muted-foreground prose-li:text-muted-foreground prose-strong:text-foreground prose-a:text-primary"
                    dangerouslySetInnerHTML={{ __html: post.content }}
                  />

                  {/* Share */}
                  <div className="mt-12 pt-8 border-t border-border">
                    <h3 className="font-serif text-xl font-bold mb-4">Share this article</h3>
                    <div className="flex gap-3">
                      <Button variant="outline" size="icon" className="rounded-full">
                        <Facebook className="w-5 h-5" />
                      </Button>
                      <Button variant="outline" size="icon" className="rounded-full">
                        <Twitter className="w-5 h-5" />
                      </Button>
                      <Button variant="outline" size="icon" className="rounded-full">
                        <Linkedin className="w-5 h-5" />
                      </Button>
                      <Button variant="outline" size="icon" className="rounded-full">
                        <Share2 className="w-5 h-5" />
                      </Button>
                    </div>
                  </div>
                </AnimatedSection>
              </div>

              {/* Sidebar */}
              <div className="lg:col-span-1">
                <AnimatedSection delay={0.2}>
                  <div className="sticky top-24">
                    {/* Author Card */}
                    <div className="bg-card rounded-2xl p-6 shadow-lg border border-border mb-8">
                      <h3 className="font-serif text-lg font-bold mb-4">About the Author</h3>
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                          <User className="w-8 h-8 text-primary" />
                        </div>
                        <div>
                          <p className="font-semibold">{post.author}</p>
                          <p className="text-sm text-muted-foreground">Content Writer</p>
                        </div>
                      </div>
                    </div>

                    {/* Related Posts */}
                    <div className="bg-card rounded-2xl p-6 shadow-lg border border-border">
                      <h3 className="font-serif text-lg font-bold mb-4">Related Articles</h3>
                      <div className="space-y-4">
                        {relatedPosts.map((relatedPost) => (
                          <Link
                            key={relatedPost.id}
                            to={`/news/${relatedPost.id}`}
                            className="flex gap-4 group"
                          >
                            <img
                              src={relatedPost.image}
                              alt={relatedPost.title}
                              className="w-20 h-20 rounded-lg object-cover flex-shrink-0"
                            />
                            <div>
                              <h4 className="font-medium text-sm group-hover:text-primary transition-colors line-clamp-2">
                                {relatedPost.title}
                              </h4>
                              <p className="text-xs text-muted-foreground mt-1">{relatedPost.date}</p>
                            </div>
                          </Link>
                        ))}
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
};

export default BlogDetailsPage;
