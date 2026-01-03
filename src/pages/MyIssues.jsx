import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router";
import { toast, ToastContainer } from "react-toastify";
import { motion, AnimatePresence } from "framer-motion";
import {
  Trash2,
  Edit3,
  MapPin,
  Calendar,
  AlertCircle,
  CheckCircle2,
  Clock,
  ChevronRight,
  Plus,
} from "lucide-react";
import Swal from "sweetalert2";
import TableSkeleton from "../components/TableSkeleton";

const MyIssues = () => {
  const { user } = useContext(AuthContext);
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.email) {
      fetchMyIssues();
    }
  }, [user]);

  const fetchMyIssues = async () => {
    try {
      const response = await axios.get(
        `https://clean-and-connect-server.vercel.app/my-issues/${user.email}`
      );
      setIssues(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This report will be permanently removed from the platform.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#EF4444",
      cancelButtonColor: "#6B7280",
      confirmButtonText: "Yes, delete it!",
      customClass: {
        popup: "rounded-[2rem]",
        confirmButton: "rounded-xl px-6 py-3",
        cancelButton: "rounded-xl px-6 py-3",
      },
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axios.delete(
            `https://clean-and-connect-server.vercel.app/issues/${id}`
          );
          if (res.data.deletedCount > 0) {
            setIssues(issues.filter((issue) => issue._id !== id));
            Swal.fire({
              title: "Deleted!",
              text: "Your report has been removed.",
              icon: "success",
              confirmButtonColor: "var(--p)",
            });
          }
        } catch (error) {
          toast.error("Failed to delete issue");
        }
      }
    });
  };

  if (loading) return <TableSkeleton />;

  const stats = {
    total: issues.length,
    resolved: issues.filter((i) => i.status === "Resolved").length,
    ongoing: issues.filter((i) => i.status !== "Resolved").length,
  };

  return (
    <div className="min-h-screen bg-base-200/50 py-12 px-4 relative overflow-hidden font-sans">
      <div className="absolute top-0 left-0 w-full h-64 bg-primary/5 -skew-y-6 transform origin-top-left" />

      <div className="container mx-auto max-w-6xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-6"
        >
          <div>
            <h2 className="text-4xl font-black text-base-content tracking-tight mb-2">
              My Reports
            </h2>
            <p className="text-base-content/50 font-medium">
              Tracking your contributions to a cleaner community.
            </p>
          </div>
          <Link
            to="/add-issue"
            className="btn btn-primary rounded-2xl px-6 shadow-lg shadow-primary/20 gap-2 text-primary-content"
          >
            <Plus size={20} /> Report New Issue
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
          {[
            {
              label: "Total Reported",
              value: stats.total,
              icon: AlertCircle,
              color: "text-primary",
              bg: "bg-primary/10",
            },
            {
              label: "Issues Resolved",
              value: stats.resolved,
              icon: CheckCircle2,
              color: "text-success",
              bg: "bg-success/10",
            },
            {
              label: "Action Pending",
              value: stats.ongoing,
              icon: Clock,
              color: "text-warning",
              bg: "bg-warning/10",
            },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-base-100 p-6 rounded-[2rem] shadow-xl border border-base-300 flex items-center gap-5"
            >
              <div
                className={`w-14 h-14 rounded-2xl ${stat.bg} ${stat.color} flex items-center justify-center`}
              >
                <stat.icon size={28} />
              </div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest opacity-40">
                  {stat.label}
                </p>
                <p className="text-3xl font-black">{stat.value}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {issues.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-24 bg-base-100 rounded-[3rem] shadow-2xl border border-base-300"
          >
            <div className="w-24 h-24 bg-base-200 rounded-full flex items-center justify-center mx-auto mb-6">
              <AlertCircle size={48} className="text-base-content/20" />
            </div>
            <h3 className="text-2xl font-black text-base-content/60">
              No issues reported yet
            </h3>
            <p className="text-base-content/40 mt-2 mb-8">
              Your dashboard is empty. Start by reporting a problem in your
              area.
            </p>
            <Link
              to="/add-issue"
              className="btn btn-primary btn-wide rounded-2xl text-primary-content"
            >
              Report First Issue
            </Link>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-base-100 rounded-[2.5rem] shadow-2xl border border-base-300 overflow-hidden"
          >
            <div className="overflow-x-auto">
              <table className="table w-full">
                <thead>
                  <tr className="bg-base-200/50 border-b border-base-300">
                    <th className="py-6 pl-8 text-[10px] uppercase font-black tracking-widest opacity-50 text-base-content">
                      Issue Preview
                    </th>
                    <th className="py-6 text-[10px] uppercase font-black tracking-widest opacity-50 text-base-content">
                      Details
                    </th>
                    <th className="py-6 text-[10px] uppercase font-black tracking-widest opacity-50 text-base-content">
                      Progress
                    </th>
                    <th className="py-6 text-[10px] uppercase font-black tracking-widest opacity-50 text-base-content">
                      Date
                    </th>
                    <th className="py-6 pr-8 text-center text-[10px] uppercase font-black tracking-widest opacity-50 text-base-content">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-base-200">
                  <AnimatePresence>
                    {issues.map((issue, idx) => (
                      <motion.tr
                        key={issue._id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        transition={{ delay: idx * 0.05 }}
                        className="hover:bg-base-200/30 transition-colors group"
                      >
                        <td className="py-5 pl-8">
                          <div className="avatar">
                            <div className="mask mask-squircle w-16 h-16 shadow-lg">
                              <img
                                src={issue.image}
                                alt="Issue"
                                className="object-cover"
                              />
                            </div>
                          </div>
                        </td>
                        <td className="py-5">
                          <div className="max-w-[240px]">
                            <div className="font-black text-base-content leading-tight mb-1 truncate">
                              {issue.issueTitle || issue.title}
                            </div>
                            <div className="flex items-center gap-1.5 text-xs font-bold text-primary opacity-70">
                              <MapPin size={12} />
                              <span className="truncate">{issue.location}</span>
                            </div>
                          </div>
                        </td>
                        <td className="py-5">
                          <div
                            className={`badge badge-md font-black gap-2 px-4 py-3 rounded-xl border-none ${
                              issue.status === "Resolved"
                                ? "bg-success/10 text-success"
                                : "bg-warning/10 text-warning"
                            }`}
                          >
                            <div
                              className={`w-1.5 h-1.5 rounded-full animate-pulse ${
                                issue.status === "Resolved"
                                  ? "bg-success"
                                  : "bg-warning"
                              }`}
                            />
                            {issue.status}
                          </div>
                        </td>
                        <td className="py-5">
                          <div className="flex items-center gap-2 text-xs font-bold opacity-60">
                            <Calendar size={14} className="text-primary" />
                            {issue.date ? issue.date.split("T")[0] : "N/A"}
                          </div>
                        </td>
                        <td className="py-5 pr-8">
                          <div className="flex justify-center gap-3">
                            <Link
                              to={`/issues/${issue._id}`}
                              className="btn btn-square btn-ghost btn-md bg-base-200 hover:bg-primary hover:text-primary-content rounded-xl transition-all shadow-sm"
                              title="View and Edit"
                            >
                              <Edit3 size={18} />
                            </Link>
                            <button
                              onClick={() => handleDelete(issue._id)}
                              className="btn btn-square btn-ghost btn-md bg-base-200 hover:bg-error hover:text-error-content rounded-xl transition-all shadow-sm"
                              title="Delete Report"
                            >
                              <Trash2 size={18} />
                            </button>
                            <Link
                              to={`/issues/${issue._id}`}
                              className="btn btn-square btn-ghost btn-md bg-base-200 hover:bg-secondary hover:text-secondary-content rounded-xl transition-all shadow-sm"
                            >
                              <ChevronRight size={18} />
                            </Link>
                          </div>
                        </td>
                      </motion.tr>
                    ))}
                  </AnimatePresence>
                </tbody>
              </table>
            </div>
          </motion.div>
        )}
      </div>
      <ToastContainer
        position="bottom-right"
        theme="colored"
        autoClose={3000}
      />
    </div>
  );
};

export default MyIssues;
