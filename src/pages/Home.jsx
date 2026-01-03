import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import {
  FaRecycle,
  FaRoad,
  FaBuilding,
  FaExclamationTriangle,
  FaUsers,
  FaCheckCircle,
  FaLeaf,
  FaHandsHelping,
  FaTrophy,
  FaArrowRight,
} from "react-icons/fa";
import { TbCashRegister } from "react-icons/tb";
import { MdOutlineWarning } from "react-icons/md";
import { MapPin } from "lucide-react";
import { motion } from "framer-motion";
import Banner from "../components/Banner";
import CategoryCard from "../components/CategoryCards";
import { Link } from "react-router";
import ContactUs from "../components/ContactUs";
import { AuthContext } from "../context/AuthContext";
import CardSkeleton from "../components/CardSkeleton";

const Home = () => {
  const { user } = useContext(AuthContext);
  const [recentIssues, setRecentIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalIssues: 0,
    resolvedIssues: 0,
    totalFundsRaised: 0,
  });

  useEffect(() => {
    setLoading(true);
    const p1 = axios.get("https://clean-and-connect-server.vercel.app/issues-recent");
    const p2 = axios.get("https://clean-and-connect-server.vercel.app/community-stats");

    Promise.all([p1, p2])
      .then(([resIssues, resStats]) => {
        setRecentIssues(resIssues.data);
        setStats(resStats.data);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="font-sans">
      <Banner />

      <div className="py-16 bg-base-100 container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-2">Report by Category</h2>
          <p className="text-gray-500">
            Identify and report issues to help us take action.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <CategoryCard
            icon={<FaRecycle />}
            title="Garbage"
            desc="Overflowing bins, illegal dumping"
            color="text-green-500"
          />
          <CategoryCard
            icon={<FaBuilding />}
            title="Illegal Construction"
            desc="Unapproved structures, blocking paths"
            color="text-blue-500"
          />
          <CategoryCard
            icon={<FaExclamationTriangle />}
            title="Broken Property"
            desc="Damaged benches, streetlights"
            color="text-yellow-500"
          />
          <CategoryCard
            icon={<FaRoad />}
            title="Road Damage"
            desc="Potholes, broken footpaths"
            color="text-red-500"
          />
        </div>
      </div>

      <div className="py-16 bg-base-200">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-10">
            Recent Reports
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {loading
              ? [...Array(4)].map((_, idx) => <CardSkeleton key={idx} />)
              : recentIssues.map((issue, idx) => (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    key={issue._id}
                    className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-500 border border-base-300 rounded-[2rem] overflow-hidden group"
                  >
                    <figure className="h-52 overflow-hidden relative">
                      <img
                        src={issue.image}
                        alt={issue.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute top-4 right-4 badge badge-secondary font-black text-[10px] uppercase tracking-tighter shadow-lg px-4 py-3 border-none">
                        {issue.status || "Open"}
                      </div>
                    </figure>
                    <div className="card-body p-6">
                      <h3
                        className="card-title text-xl font-black line-clamp-1 text-base-content mb-1"
                        title={issue.issueTitle || issue.title}
                      >
                        {issue.issueTitle || issue.title}
                      </h3>

                      <p className="text-[10px] font-black uppercase tracking-widest text-primary mb-2">
                        {issue.category}
                      </p>

                      <div className="flex items-center gap-1.5 text-xs font-bold text-base-content/50 mb-4">
                        <MapPin size={14} className="text-secondary" />
                        <span className="truncate">{issue.location}</span>
                      </div>

                      <p className="text-sm text-base-content/60 line-clamp-2 mb-6 font-medium leading-relaxed">
                        {issue.description}
                      </p>

                      <div className="flex items-center justify-between mt-auto border-t pt-5 border-base-200">
                        <div className="flex flex-col">
                          <span className="text-[10px] font-black uppercase opacity-30 tracking-tighter">
                            Reported by
                          </span>
                          <span className="text-xs font-bold text-base-content truncate max-w-[100px]">
                            {issue.name || "Anonymous"}
                          </span>
                        </div>
                        <Link
                          to={`/issues/${issue._id}`}
                          className="btn btn-primary btn-sm rounded-xl px-5 font-black shadow-lg shadow-primary/20 text-primary-content border-none"
                        >
                          Details
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                ))}
          </div>

          <div className="text-center mt-10">
            <Link to="/issues" className="btn btn-primary btn-wide rounded-2xl shadow-lg shadow-primary/20">
              View All Issues
            </Link>
          </div>
        </div>
      </div>

      <ContactUs />

      <div className="py-20 bg-primary text-primary-content bg-gradient-to-r from-primary to-accent">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-12">Our Impact</h2>
          <p className="max-w-2xl mx-auto mb-12 opacity-90 text-lg leading-relaxed font-medium">
            "Small actions, big changes. Here is the measurable difference our
            community has made together through the CleanConnect platform."
          </p>
          <div className="flex flex-col md:flex-row justify-center gap-10 md:gap-32">
            <div className="flex flex-col items-center">
              {loading ? (
                <div className="skeleton w-16 h-16 rounded-full mb-4 opacity-20"></div>
              ) : (
                <FaUsers className="text-6xl mb-4 opacity-80" />
              )}
              <span className="text-5xl font-extrabold">
                {loading ? <div className="skeleton w-16 h-10"></div> : stats.totalUsers}
              </span>
              <span className="text-xl mt-2 uppercase tracking-wide opacity-80">
                Active Users
              </span>
            </div>
            <div className="flex flex-col items-center">
              {loading ? (
                <div className="skeleton w-16 h-16 rounded-full mb-4 opacity-20"></div>
              ) : (
                <MdOutlineWarning className="text-6xl mb-4 opacity-80" />
              )}
              <span className="text-5xl font-extrabold">
                {loading ? <div className="skeleton w-16 h-10"></div> : stats.totalIssues}
              </span>
              <span className="text-xl mt-2 uppercase tracking-wide opacity-80">
                Issues Reported
              </span>
            </div>
            <div className="flex flex-col items-center">
              {loading ? (
                <div className="skeleton w-16 h-16 rounded-full mb-4 opacity-20"></div>
              ) : (
                <FaCheckCircle className="text-6xl mb-4 opacity-80" />
              )}
              <span className="text-5xl font-extrabold">
                {loading ? <div className="skeleton w-16 h-10"></div> : stats.resolvedIssues || 0}
              </span>
              <span className="text-xl mt-2 uppercase tracking-wide opacity-80">
                Issues Resolved
              </span>
            </div>
            <div className="flex flex-col items-center">
              {loading ? (
                <div className="skeleton w-16 h-16 rounded-full mb-4 opacity-20"></div>
              ) : (
                <TbCashRegister className="text-6xl mb-4 opacity-80" />
              )}
              <span className="text-5xl font-extrabold">
                {loading ? <div className="skeleton w-16 h-10"></div> : stats.totalFundsRaised || 0}
              </span>
              <span className="text-xl mt-2 uppercase tracking-wide opacity-80">
                Total Fund Raised
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="py-24 bg-base-200">
        <div className="container mx-auto px-4">
          <div className="card lg:card-side bg-base-100 shadow-2xl overflow-hidden border border-base-300 rounded-[3rem]">
            <div className="lg:w-1/3 bg-gradient-to-br from-primary to-accent p-12 flex flex-col justify-center text-primary-content relative overflow-hidden">
              <FaLeaf className="text-9xl absolute -bottom-10 -right-10 opacity-20 rotate-12" />
              <h2 className="text-4xl font-extrabold mb-4 relative z-10 leading-tight">
                Ready to Make an Impact?
              </h2>
              <p className="text-lg opacity-90 relative z-10">
                Your journey from a concerned citizen to a local hero starts
                here.
              </p>
            </div>

            <div className="card-body lg:w-2/3 p-8 lg:p-16 justify-center">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
                <div className="flex flex-col gap-3">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center text-2xl">
                    <FaHandsHelping />
                  </div>
                  <h4 className="font-bold text-lg">Build Community</h4>
                  <p className="text-sm text-gray-500">
                    Meet neighbors who care about the environment as much as you do.
                  </p>
                </div>

                <div className="flex flex-col gap-3">
                  <div className="w-12 h-12 rounded-xl bg-secondary/10 text-secondary flex items-center justify-center text-2xl">
                    <FaLeaf />
                  </div>
                  <h4 className="font-bold text-lg">Eco Education</h4>
                  <p className="text-sm text-gray-500">
                    Learn professional waste management and urban gardening skills.
                  </p>
                </div>

                <div className="flex flex-col gap-3">
                  <div className="w-12 h-12 rounded-xl bg-accent/10 text-accent flex items-center justify-center text-2xl">
                    <FaTrophy />
                  </div>
                  <h4 className="font-bold text-lg">Get Rewarded</h4>
                  <p className="text-sm text-gray-500">
                    Earn "Impact Points" and badges to showcase your contributions.
                  </p>
                </div>
              </div>

              <div className="divider opacity-50"></div>

              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="text-center md:text-left">
                  <h3 className="text-2xl font-bold">
                    Sign up for the next weekly drive
                  </h3>
                  <p className="text-gray-500">
                    Next event: This Saturday, 9:00 AM
                  </p>
                </div>

                {!user ? (
                  <Link
                    to="/auth/login"
                    className="btn btn-primary btn-lg rounded-xl px-8 shadow-lg group hover:scale-105 transition-all text-primary-content border-none"
                  >
                    Become a Volunteer
                    <FaArrowRight className="group-hover:translate-x-2 transition-transform" />
                  </Link>
                ) : (
                  <Link
                    to="/dashboard"
                    className="btn btn-secondary btn-lg rounded-xl px-8 shadow-lg group hover:scale-105 transition-all border-none"
                  >
                    Go to Dashboard
                    <FaArrowRight className="group-hover:translate-x-2 transition-transform" />
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;