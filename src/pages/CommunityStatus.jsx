import React, { useEffect, useState } from "react";
import axios from "axios";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts";
import { FaGlobeAmericas, FaCheckDouble, FaHandHoldingHeart, FaUsers } from "react-icons/fa";
import { motion } from "framer-motion";

const CommunityStatus = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("https://clean-and-connect-server.vercel.app/community-stats")
      .then((res) => {
        setStats(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Stats fetch error:", err);
        setLoading(false);
      });
  }, []);

  const COLORS = ["var(--color-primary)", "var(--color-secondary)", "var(--color-accent)", "#93c5fd", "#5eead4"];

  const summaryData = stats ? [
    { label: "Total Reports", value: stats.totalIssues, icon: <FaGlobeAmericas />, color: "text-primary" },
    { label: "Resolved Issues", value: stats.resolvedIssues, icon: <FaCheckDouble />, color: "text-secondary" },
    { label: "Total Donations", value: `$${stats.totalFundsRaised}`, icon: <FaHandHoldingHeart />, color: "text-accent" },
    { label: "Total Contributors", value: stats.totalContributions, icon: <FaUsers />, color: "text-info" },
  ] : [];

  return (
    <div className="min-h-screen bg-base-200 py-12 px-4 font-sans">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <motion.h1 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-black text-base-content mb-4 tracking-tight"
          >
            Community Impact Hub
          </motion.h1>
          <p className="text-base-content/70 font-medium">Real-time transparency of our collective efforts to clean and connect.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {loading ? (
            [...Array(4)].map((_, i) => (
              <div key={i} className="stats shadow bg-base-100 p-4 rounded-2xl">
                <div className="flex justify-between items-center w-full">
                  <div className="space-y-3 flex-1">
                    <div className="skeleton h-3 w-20"></div>
                    <div className="skeleton h-8 w-24"></div>
                    <div className="skeleton h-3 w-28"></div>
                  </div>
                  <div className="skeleton w-12 h-12 rounded-2xl shrink-0"></div>
                </div>
              </div>
            ))
          ) : (
            summaryData.map((item, index) => (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                key={index} 
                className="stats shadow bg-base-100 rounded-2xl group hover:border-primary/30 border border-transparent transition-all"
              >
                <div className="stat">
                  <div className={`stat-figure ${item.color} text-3xl group-hover:scale-110 transition-transform`}>{item.icon}</div>
                  <div className="stat-title font-bold uppercase text-[10px] tracking-widest opacity-60">{item.label}</div>
                  <div className={`stat-value ${item.color} tracking-tighter`}>{item.value}</div>
                  <div className="stat-desc font-bold text-success/70">Active Community</div>
                </div>
              </motion.div>
            ))
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="card bg-base-100 shadow-xl p-8 border border-base-300 rounded-[2rem]">
            {loading ? (
              <div className="space-y-6">
                <div className="skeleton h-6 w-48"></div>
                <div className="skeleton h-80 w-full rounded-[1.5rem]"></div>
                <div className="flex justify-center gap-4">
                   <div className="skeleton h-3 w-16"></div>
                   <div className="skeleton h-3 w-16"></div>
                   <div className="skeleton h-3 w-16"></div>
                </div>
              </div>
            ) : (
              <>
                <h3 className="text-xl font-black text-primary mb-8 tracking-tight">Issues by Category</h3>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={stats.categoryStats}
                        innerRadius={80}
                        outerRadius={100}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {stats.categoryStats.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip 
                        contentStyle={{ borderRadius: "16px", border: "none", boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.1)", fontWeight: "bold" }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="flex flex-wrap justify-center gap-6 mt-6">
                   {stats.categoryStats.map((s, i) => (
                     <div key={i} className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest opacity-70">
                       <div className="w-2.5 h-2.5 rounded-full shadow-sm" style={{backgroundColor: COLORS[i % COLORS.length]}}></div>
                       <span>{s.name}</span>
                     </div>
                   ))}
                </div>
              </>
            )}
          </div>

          <div className="card bg-base-100 shadow-xl p-8 border border-base-300 rounded-[2rem]">
            {loading ? (
               <div className="space-y-6">
                <div className="skeleton h-6 w-48"></div>
                <div className="skeleton h-80 w-full rounded-[1.5rem]"></div>
                <div className="skeleton h-4 w-3/4 mx-auto"></div>
              </div>
            ) : (
              <>
                <h3 className="text-xl font-black text-secondary mb-8 tracking-tight">Resolution Ratio</h3>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={[
                      { name: "Reported", count: stats.totalIssues },
                      { name: "Resolved", count: stats.resolvedIssues }
                    ]}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.05} />
                      <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontWeight: 'bold', fontSize: 12}} />
                      <YAxis axisLine={false} tickLine={false} tick={{fontWeight: 'bold', fontSize: 12}} />
                      <Tooltip cursor={{fill: 'var(--b2)', opacity: 0.4}} contentStyle={{borderRadius: '12px', border: 'none'}} />
                      <Bar dataKey="count" radius={[10, 10, 0, 0]} barSize={60}>
                        <Cell fill="var(--color-primary)" />
                        <Cell fill="var(--color-secondary)" />
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <p className="mt-6 text-center text-xs font-bold text-base-content/40 italic tracking-wide">
                    Our goal is to reach 100% resolution. Every contribution counts.
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommunityStatus;