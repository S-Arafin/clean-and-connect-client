import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { toast, ToastContainer } from "react-toastify";
import { motion, AnimatePresence } from "framer-motion";
import {
  MapPin,
  Calendar,
  User,
  CheckCircle,
  Heart,
  Share2,
  Info,
  Clock,
  DollarSign,
} from "lucide-react";
import DetailsSkeleton from "../components/DetailsSkeleton";

const IssueDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useContext(AuthContext);
  const [issue, setIssue] = useState(null);
  const [contributors, setContributors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const issueRes = await axios.get(
          `https://clean-and-connect-server.vercel.app/issues/${id}`
        );
        setIssue(issueRes.data);
        const contribRes = await axios.get(
          `https://clean-and-connect-server.vercel.app/contributions/${id}`
        );
        setContributors(contribRes.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  const handleStatusChange = async (e) => {
    const newStatus = e.target.value;
    const updatedIssue = { ...issue, status: newStatus };
    try {
      const res = await axios.patch(
        `https://clean-and-connect-server.vercel.app/issues/${id}`,
        updatedIssue
      );
      if (res.data.modifiedCount > 0) {
        setIssue(updatedIssue);
        toast.success(`Status updated to ${newStatus}`);
      }
    } catch (error) {
      toast.error("Failed to update status");
    }
  };

  const handleDonateTrigger = () => {
    if (!user) {
      toast.info("Please login to contribute to this cause.");
      navigate("/auth/login", { state: { from: location } });
    } else {
      document.getElementById("donation_modal").showModal();
    }
  };

  const handleDonate = async (e) => {
    e.preventDefault();
    const form = e.target;
    const amount = parseInt(form.amount.value);
    const message = form.message.value;

    const contributionData = {
      issueId: id,
      issueTitle: issue.issueTitle || issue.title,
      userEmail: user.email,
      userName: user.displayName,
      userPhoto: user.photoURL,
      amount: amount,
      date: new Date(),
      message: message,
    };

    try {
      const res = await axios.post(
        "https://clean-and-connect-server.vercel.app/contributions",
        contributionData
      );
      if (res.data.insertedId) {
        toast.success("Contribution successful! Thank you.");
        const newContributors = [...contributors, contributionData];
        setContributors(newContributors);
        const totalRaised = newContributors.reduce(
          (sum, item) => sum + item.amount,
          0
        );
        if (totalRaised >= issue.amount) {
          setIssue({ ...issue, status: "Resolved" });
        }
        document.getElementById("donation_modal").close();
        form.reset();
      }
    } catch (error) {
      toast.error("Donation failed. Please try again.");
    }
  };

  if (loading) return <DetailsSkeleton />;

  const currentRaised = contributors.reduce(
    (sum, item) => sum + item.amount,
    0
  );
  const progressPercent =
    issue.amount > 0 ? Math.min((currentRaised / issue.amount) * 100, 100) : 0;
  const remaining = Math.max(issue.amount - currentRaised, 0);

  return (
    <div className="min-h-screen bg-base-200/50 py-10 px-4 font-sans">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4"
        >
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="badge badge-primary badge-outline font-bold uppercase tracking-widest text-[10px] px-3">
                {issue.category}
              </span>
              <span
                className={`badge badge-sm font-bold ${
                  issue.status === "Resolved"
                    ? "badge-success"
                    : "badge-warning"
                }`}
              >
                {issue.status}
              </span>
            </div>
            <h1 className="text-4xl font-black text-base-content tracking-tight">
              {issue.issueTitle || issue.title}
            </h1>
          </div>
          <button
            onClick={() => toast.info("Link copied to clipboard!")}
            className="btn btn-circle btn-ghost bg-base-100 shadow-sm"
          >
            <Share2 size={20} />
          </button>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="card bg-base-100 shadow-2xl overflow-hidden rounded-[2rem] border border-base-300"
            >
              <figure className="h-[400px] relative">
                <img
                  src={issue.image}
                  alt="Issue"
                  className="w-full h-full object-cover transition-transform hover:scale-105 duration-700"
                />
                <div className="absolute bottom-6 left-6 flex gap-3">
                  <div className="glass px-4 py-2 rounded-2xl flex items-center gap-2 text-white font-bold shadow-lg">
                    <MapPin size={16} /> {issue.location}
                  </div>
                </div>
              </figure>

              <div className="card-body p-8 md:p-10">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 border-b border-base-200 pb-8">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
                      <Calendar size={24} />
                    </div>
                    <div>
                      <p className="text-[10px] uppercase font-bold opacity-50">
                        Reported On
                      </p>
                      <p className="font-bold text-sm">
                        {issue.date?.split("T")[0]}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-secondary/10 text-secondary flex items-center justify-center">
                      <User size={24} />
                    </div>
                    <div>
                      <p className="text-[10px] uppercase font-bold opacity-50">
                        Reporter
                      </p>
                      <p className="font-bold text-sm">{issue.name}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-accent/10 text-accent flex items-center justify-center">
                      <Clock size={24} />
                    </div>
                    <div>
                      <p className="text-[10px] uppercase font-bold opacity-50">
                        Status
                      </p>
                      <p className="font-bold text-sm">{issue.status}</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-xl font-black flex items-center gap-2 text-base-content">
                    <Info className="text-primary" /> Issue Description
                  </h3>
                  <p className="text-base-content/70 leading-relaxed text-lg whitespace-pre-wrap">
                    {issue.description}
                  </p>
                </div>

                {user?.email === issue.email && (
                  <div className="mt-10 p-6 bg-base-200 rounded-[1.5rem] border border-base-300 flex flex-col md:flex-row justify-between items-center gap-4">
                    <div>
                      <h4 className="font-bold text-lg">Update Status</h4>
                      <p className="text-sm opacity-60">
                        As the reporter, you can mark progress.
                      </p>
                    </div>
                    <select
                      className="select select-bordered select-primary w-full max-w-xs font-bold"
                      value={issue.status}
                      onChange={handleStatusChange}
                    >
                      <option value="Open">Open</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Resolved">Resolved</option>
                    </select>
                  </div>
                )}
              </div>
            </motion.div>

            <div className="card bg-base-100 shadow-xl rounded-[2rem] p-8 md:p-10 border border-base-300">
              <h3 className="text-2xl font-black mb-8 flex items-center gap-3">
                <CheckCircle className="text-success" /> Community Backers{" "}
                <span className="badge badge-ghost">{contributors.length}</span>
              </h3>
              {contributors.length === 0 ? (
                <div className="text-center py-10 opacity-50 italic">
                  No contributions yet. Be the hero this community needs!
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <AnimatePresence>
                    {contributors.map((contrib, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex items-center justify-between p-4 bg-base-200 rounded-2xl border border-base-300/50"
                      >
                        <div className="flex items-center gap-4">
                          <img
                            src={contrib.userPhoto}
                            className="w-10 h-10 rounded-xl object-cover ring-2 ring-primary/20"
                            alt="Avatar"
                          />
                          <div>
                            <p className="font-bold text-sm">
                              {contrib.userName}
                            </p>
                            <p className="text-[10px] opacity-50 italic truncate max-w-[120px]">
                              {contrib.message || "Rooting for this!"}
                            </p>
                          </div>
                        </div>
                        <div className="font-black text-primary">
                          ${contrib.amount}
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              )}
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              <div className="card bg-base-100 shadow-2xl p-8 rounded-[2rem] border-t-8 border-primary relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-5">
                  <DollarSign size={80} />
                </div>
                <h3 className="text-2xl font-black mb-6">Funding Goal</h3>

                <div className="space-y-6">
                  <div className="flex justify-between items-end">
                    <div>
                      <p className="text-3xl font-black text-primary">
                        ${currentRaised}
                      </p>
                      <p className="text-[10px] font-bold opacity-50 uppercase">
                        Raised
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-xl font-bold">${issue.amount}</p>
                      <p className="text-[10px] font-bold opacity-50 uppercase">
                        Target
                      </p>
                    </div>
                  </div>

                  <div className="w-full h-4 bg-base-200 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${progressPercent}%` }}
                      transition={{ duration: 1.5 }}
                      className="h-full bg-gradient-to-r from-primary to-accent"
                    />
                  </div>

                  <div className="flex justify-between text-xs font-bold">
                    <span className="text-primary">
                      {progressPercent.toFixed(0)}% Complete
                    </span>
                    <span className="opacity-50 text-secondary">
                      ${remaining} Left to go
                    </span>
                  </div>

                  <button
                    onClick={handleDonateTrigger}
                    disabled={issue.status === "Resolved"}
                    className="btn btn-primary btn-block btn-lg rounded-2xl shadow-xl shadow-primary/20 text-primary-content font-black tracking-tight flex items-center gap-2 group"
                  >
                    {issue.status === "Resolved" ? (
                      "Fully Funded"
                    ) : (
                      <>
                        <Heart
                          size={20}
                          className="group-hover:scale-125 transition-transform"
                        />{" "}
                        Donate Now
                      </>
                    )}
                  </button>
                </div>
              </div>

              <div className="card bg-gradient-to-br from-secondary to-accent p-8 rounded-[2rem] text-secondary-content shadow-xl">
                <h4 className="font-black text-lg mb-2">Our Promise</h4>
                <p className="text-sm opacity-90 leading-relaxed">
                  Every dollar contributed is tracked transparently. Once the
                  goal is met, C&C ensures to resolve the issue.
                </p>
              </div>
            </div>
          </div>
        </div>

        <dialog
          id="donation_modal"
          className="modal modal-bottom sm:modal-middle"
        >
          <div className="modal-box bg-base-100 rounded-[2rem] p-8 border border-base-300">
            <h3 className="font-black text-2xl mb-2">Help the Cause</h3>
            <p className="text-sm opacity-60 mb-8">
              Enter your details to finalize your contribution.
            </p>
            <form onSubmit={handleDonate} className="space-y-6">
              <div className="form-control">
                <label className="label-text font-bold mb-2 ml-1">
                  Donation Amount ($)
                </label>
                <input
                  type="number"
                  name="amount"
                  placeholder="e.g. 50"
                  className="input input-bordered h-14 rounded-2xl bg-base-200 border-none focus:ring-2 focus:ring-primary/50"
                  required
                  min="1"
                />
              </div>
              <div className="form-control">
                <label className="label-text font-bold mb-2 ml-1">
                  Supportive Message
                </label>
                <textarea
                  name="message"
                  placeholder="Optional message of encouragement..."
                  className="textarea textarea-bordered rounded-2xl bg-base-200 border-none h-24 focus:ring-2 focus:ring-primary/50"
                />
              </div>
              <div className="modal-action mt-8">
                <button
                  type="submit"
                  className="btn btn-primary flex-1 h-14 rounded-2xl text-primary-content font-bold"
                >
                  Confirm Contribution
                </button>
                <form method="dialog">
                  <button className="btn btn-ghost h-14 rounded-2xl">
                    Cancel
                  </button>
                </form>
              </div>
            </form>
          </div>
        </dialog>
      </div>
      <ToastContainer
        position="bottom-right"
        theme="colored"
        autoClose={3000}
      />
    </div>
  );
};

export default IssueDetails;
