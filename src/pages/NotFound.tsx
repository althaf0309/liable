import { useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const heroImage = "https://images.unsplash.com/photo-1640035012100-faf53d817838?fm=jpg&q=80&w=1920&auto=format&fit=crop";

const NotFound = () => {
  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route");
  }, []);

  return (
    <div
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-foreground"
      style={{
        backgroundImage: `linear-gradient(135deg, rgba(7,14,30,0.85), rgba(9,23,55,0.8)), url(${heroImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Floating shapes */}
      <motion.div
        className="absolute -left-32 -top-24 h-72 w-72 rounded-full bg-primary/30 blur-3xl"
        animate={{ x: [0, 20, 0], y: [0, 10, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -right-24 top-1/4 h-64 w-64 rounded-full bg-primary/20 blur-3xl"
        animate={{ x: [0, -15, 0], y: [0, -12, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 max-w-2xl text-center px-6 md:px-8"
      >
        <motion.div
          initial={{ scale: 0.95 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-background/80 text-primary shadow-2xl shadow-primary/30 backdrop-blur"
        >
          <motion.span
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-4xl font-extrabold"
          >
            404
          </motion.span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="font-serif text-4xl md:text-5xl font-bold text-background"
        >
          Page Not Found
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="mt-4 text-lg text-background/80"
        >
          The page you’re looking for doesn’t exist or has moved. Let’s get you back on track.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row"
        >
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/30 transition-transform duration-200 hover:-translate-y-0.5 hover:bg-primary/90"
          >
            Go Home
          </Link>
          <Link
            to="/properties"
            className="inline-flex items-center justify-center rounded-full border border-background/40 px-6 py-3 text-sm font-semibold text-background transition-transform duration-200 hover:-translate-y-0.5 hover:border-background hover:text-background"
          >
            Browse Properties
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default NotFound;
