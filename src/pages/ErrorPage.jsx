import React, { useEffect } from "react";
import { Link, useRouteError } from "react-router-dom";
import { Home, AlertTriangle } from "lucide-react";
import { motion } from "framer-motion";

const ErrorPage = () => {
  const error = useRouteError();
  console.error(error);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "forest";
    document.documentElement.setAttribute("data-theme", savedTheme);
  }, []);

  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center p-4">
      <div className="text-center max-w-lg">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex justify-center mb-6"
        >
          <AlertTriangle className="w-24 h-24 text-warning" />
        </motion.div>

        <motion.h1
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-9xl font-extrabold text-primary"
        >
          404
        </motion.h1>

        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="text-3xl font-bold mt-4 mb-2 text-base-content"
        >
          Page Not Found
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="text-lg text-gray-500 mb-8"
        >
          Sorry, the page you are looking for doesn't exist or has been moved.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <Link
            to="/"
            className="btn btn-primary btn-lg gap-2 shadow-lg hover:scale-105 transition-transform"
          >
            <Home size={20} />
            Back to Home
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default ErrorPage;
