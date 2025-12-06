import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Typewriter } from "react-simple-typewriter";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const Banner = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const user = null; 

  const slides = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1611284446314-60a58ac0deb9?q=80&w=2070&auto=format&fit=crop",
      subtitle: "The Problem",
      title: "We are drowning in",
      typewriterWords: ["Plastic Waste", "Toxic Trash", "Pollution", "Neglect"],
      description: "Over 2 billion tons of garbage is generated annually. Our landfills are overflowing, and our oceans are suffering. The crisis is visible, urgent, and demands attention.",
      color: "text-red-500",
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1593113598332-cd288d649433?q=80&w=2070&auto=format&fit=crop",
      subtitle: "The Solution",
      title: "Join hands for",
      typewriterWords: ["Community Cleanups", "Active Change", "Teamwork", "A Cleaner Future"],
      description: "Real change starts locally. Join thousands of volunteers coming together to reclaim our streets, parks, and beaches from waste.",
      color: "text-blue-500",
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=2070&auto=format&fit=crop",
      subtitle: "The Future",
      title: "Let's build a",
      typewriterWords: ["Sustainable World", "Green Planet", "Circular Economy", "Better Tomorrow"],
      description: "Sustainability isn't just a buzzword; it's survival. Adopt eco-friendly habits, recycle smarter, and help us build a world that lasts.",
      color: "text-green-500",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 6000);
    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <div className="relative w-full h-[650px] overflow-hidden bg-base-300 font-sans">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2 }}
          className="absolute inset-0 w-full h-full"
        >
          <div className="absolute inset-0 bg-black/60 z-10" />
          <img
            src={slides[currentSlide].image}
            alt="Slide Background"
            className="w-full h-full object-cover"
          />
        </motion.div>
      </AnimatePresence>

      <div className="relative z-20 h-full container mx-auto px-4 flex flex-col justify-center items-center text-center">
        <AnimatePresence mode="wait">
          <div key={currentSlide} className="max-w-3xl space-y-6">
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex items-center justify-center gap-2"
            >
              <span className="px-3 py-1 rounded-full text-sm font-bold uppercase tracking-wider bg-white/10 backdrop-blur-md border border-white/20 text-white">
                {slides[currentSlide].subtitle}
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-4xl md:text-6xl font-extrabold text-white leading-tight"
            >
              {slides[currentSlide].title} <br />
              <span className={slides[currentSlide].color || "text-accent"}>
                <Typewriter
                  words={slides[currentSlide].typewriterWords}
                  loop={true}
                  cursor
                  cursorStyle="_"
                  typeSpeed={70}
                  deleteSpeed={50}
                  delaySpeed={1000}
                />
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="text-lg md:text-xl text-gray-200 leading-relaxed"
            >
              {slides[currentSlide].description}
            </motion.p>

            {!user && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.7 }}
                className="pt-4"
              >
                <Link to="auth/login">
                  <button className="btn btn-lg bg-white text-black hover:bg-gray-200 border-none rounded-full px-8 shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.5)] transition-all duration-300 group">
                    Get Started
                    <ArrowRight className="inline-block ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </Link>
              </motion.div>
            )}

          </div>
        </AnimatePresence>
      </div>

      <div className="absolute bottom-8 left-0 right-0 z-30 flex justify-center gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-3 rounded-full transition-all duration-300 ${
              currentSlide === index ? "w-10 bg-accent" : "w-3 bg-white/50 hover:bg-white"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-base-100 to-transparent z-10"></div>
    </div>
  );
};

export default Banner;