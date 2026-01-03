import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { FaEdit, FaCheck, FaTimes, FaUserCircle, FaTrophy, FaCalendarAlt, FaEnvelope, FaChartLine, FaCheckCircle } from "react-icons/fa";
import { motion } from "framer-motion";
import CardSkeleton from "../components/CardSkeleton";
import DetailsSkeleton from "../components/DetailsSkeleton";

const Dashboard = () => {
  const { user, updateUser } = useContext(AuthContext);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState("");

  useEffect(() => {
    if (user?.email) {
      axios.get(`https://clean-and-connect-server.vercel.app/user-stats/${user.email}`)
        .then(res => {
          setData(res.data);
          setNewName(user?.displayName || "");
          setLoading(false);
        })
        .catch(err => {
          console.error(err);
          setLoading(false);
        });
    }
  }, [user.email, user.displayName]);

  const handleNameUpdate = async () => {
    try {
      await axios.patch(`https://clean-and-connect-server.vercel.app/users/${user.email}`, {
        name: newName
      });
      await updateUser({ displayName: newName });
      setIsEditing(false);
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return (
    <div className="p-4 md:p-8 bg-base-200 min-h-screen space-y-8">
      <div className="card bg-base-100 shadow-2xl overflow-hidden border border-base-300">
        <div className="h-32 skeleton rounded-none opacity-20"></div>
        <div className="px-8 pb-8">
          <div className="relative flex flex-col md:flex-row items-end -mt-12 gap-6">
            <div className="skeleton w-32 h-32 rounded-2xl ring-4 ring-base-100"></div>
            <div className="flex-1 space-y-3 pb-2">
              <div className="skeleton h-8 w-48"></div>
              <div className="skeleton h-4 w-64"></div>
            </div>
            <div className="flex gap-4 pb-2">
              <div className="skeleton h-16 w-24 rounded-xl"></div>
              <div className="skeleton h-16 w-24 rounded-xl"></div>
            </div>
          </div>
          <div className="divider my-8 opacity-10"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="skeleton h-24 w-full rounded-2xl"></div>
            <div className="skeleton h-24 w-full rounded-2xl"></div>
            <div className="skeleton h-24 w-full rounded-2xl"></div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <CardSkeleton />
        <CardSkeleton />
      </div>
    </div>
  );

  const COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#8b5cf6", "#ef4444"];

  const getStat = (name) => data?.stats?.find(s => s.name.includes(name))?.value || 0;
  
  const reportedCount = getStat("Reported");
  const resolvedCount = getStat("Resolved");
  const totalDonated = getStat("Donated");
  const resolutionRate = reportedCount > 0 ? Math.round((resolvedCount / reportedCount) * 100) : 0;

  return (
    <div className="p-4 md:p-8 bg-base-200 min-h-screen space-y-8 font-sans">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="card bg-base-100 shadow-2xl overflow-hidden border border-base-300 rounded-[2.5rem]"
      >
        <div className="h-32 bg-gradient-to-r from-primary to-accent opacity-80"></div>
        <div className="px-8 pb-8">
          <div className="relative flex flex-col md:flex-row items-end -mt-12 gap-6">
            <div className="avatar">
              <div className="w-32 h-32 rounded-2xl ring ring-base-100 ring-offset-base-100 shadow-xl bg-base-100 overflow-hidden">
                {user?.photoURL ? <img src={user.photoURL} alt="User" /> : <FaUserCircle className="w-full h-full text-base-300" />}
              </div>
            </div>
            
            <div className="flex-1 pb-2 text-center md:text-left">
              <div className="flex flex-col md:flex-row items-center gap-3">
                {isEditing ? (
                  <div className="join">
                    <input 
                      type="text" 
                      className="input input-bordered join-item input-primary font-bold" 
                      value={newName} 
                      onChange={(e) => setNewName(e.target.value)}
                    />
                    <button onClick={handleNameUpdate} className="btn btn-success join-item text-white"><FaCheck /></button>
                    <button onClick={() => setIsEditing(false)} className="btn btn-error join-item text-white"><FaTimes /></button>
                  </div>
                ) : (
                  <>
                    <h2 className="text-3xl font-black text-base-content tracking-tight">{user?.displayName || "Anonymous User"}</h2>
                    <button onClick={() => setIsEditing(true)} className="btn btn-ghost btn-circle btn-sm text-primary">
                      <FaEdit />
                    </button>
                  </>
                )}
              </div>
              <div className="flex flex-wrap justify-center md:justify-start gap-4 mt-2 text-sm text-base-content/70 font-bold">
                <span className="flex items-center gap-1"><FaEnvelope className="text-primary" /> {user?.email}</span>
                <span className="badge badge-primary badge-outline font-black">Verified Volunteer</span>
              </div>
            </div>

            <div className="flex gap-4 pb-2 justify-center">
              <div className="text-center bg-base-300 p-3 rounded-xl min-w-[100px] border border-base-300">
                <div className="text-xs uppercase font-bold text-base-content opacity-60">Success</div>
                <div className="text-2xl font-black text-secondary">{resolutionRate}%</div>
              </div>
              <div className="text-center bg-base-300 p-3 rounded-xl min-w-[100px] border border-base-300">
                <div className="text-xs uppercase font-bold text-base-content opacity-60">Impact</div>
                <div className="text-2xl font-black text-primary">{reportedCount}</div>
              </div>
            </div>
          </div>

          <div className="divider my-8 opacity-20"></div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center gap-4 p-4 bg-primary/10 rounded-2xl border border-primary/5 group hover:bg-primary/20 transition-all">
              <div className="p-3 bg-primary rounded-xl text-white text-2xl group-hover:scale-110 transition-transform"><FaChartLine /></div>
              <div>
                <div className="text-sm text-base-content opacity-70 font-bold uppercase text-[10px] tracking-widest">Total Contributions</div>
                <div className="text-xl font-black text-base-content">${totalDonated}</div>
              </div>
            </div>
            <div className="flex items-center gap-4 p-4 bg-secondary/10 rounded-2xl border border-secondary/5 group hover:bg-secondary/20 transition-all">
              <div className="p-3 bg-secondary rounded-xl text-white text-2xl group-hover:scale-110 transition-transform"><FaCheckCircle /></div>
              <div>
                <div className="text-sm text-base-content opacity-70 font-bold uppercase text-[10px] tracking-widest">Issues Resolved</div>
                <div className="text-xl font-black text-base-content">{resolvedCount} Issues</div>
              </div>
            </div>
            <div className="flex items-center gap-4 p-4 bg-accent/10 rounded-2xl border border-accent/5 group hover:bg-accent/20 transition-all">
              <div className="p-3 bg-accent rounded-xl text-white text-2xl group-hover:scale-110 transition-transform"><FaTrophy /></div>
              <div>
                <div className="text-sm text-base-content opacity-70 font-bold uppercase text-[10px] tracking-widest">Community Rank</div>
                <div className="text-xl font-black text-base-content">Top Volunteer</div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="card bg-base-100 shadow-xl border border-base-300 rounded-[2rem]">
          <div className="card-body">
            <h3 className="card-title text-xl font-black mb-6 flex items-center gap-2 text-base-content">
              <div className="w-2 h-8 bg-secondary rounded-full"></div>
              Contribution History
            </h3>
            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data?.history || []}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#888888" opacity={0.1} />
                  <XAxis dataKey="date" fontSize={10} tickLine={false} axisLine={false} stroke="currentColor" tick={{fontWeight: 'bold'}} />
                  <YAxis fontSize={12} tickLine={false} axisLine={false} stroke="currentColor" tick={{fontWeight: 'bold'}} />
                  <Tooltip 
                    cursor={{fill: 'rgba(0,0,0,0.05)'}}
                    contentStyle={{ backgroundColor: "var(--color-base-100)", borderRadius: "12px", border: "none", boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1)", color: "var(--color-base-content)" }}
                  />
                  <Bar dataKey="amount" fill="#3b82f6" radius={[8, 8, 0, 0]} barSize={40} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="card bg-base-100 shadow-xl border border-base-300 rounded-[2rem]">
          <div className="card-body">
            <h3 className="card-title text-xl font-black mb-6 flex items-center gap-2 text-base-content">
              <div className="w-2 h-8 bg-primary rounded-full"></div>
              Impact Breakdown
            </h3>
            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={data?.stats || []}
                    innerRadius={70}
                    outerRadius={90}
                    paddingAngle={8}
                    dataKey="value"
                    stroke="none"
                  >
                    {(data?.stats || []).map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ borderRadius: "12px", border: "none", boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1)", backgroundColor: "white", fontWeight: "bold" }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex flex-wrap justify-center gap-6 mt-2">
               {(data?.stats || []).map((s, i) => (
                 <div key={i} className="flex items-center gap-2 text-[10px] font-black uppercase text-base-content opacity-70">
                   <div className="w-2.5 h-2.5 rounded-full shadow-sm" style={{backgroundColor: COLORS[i % COLORS.length]}}></div>
                   <span>{s.name}</span>
                 </div>
               ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;