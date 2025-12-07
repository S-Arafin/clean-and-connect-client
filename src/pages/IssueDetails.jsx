import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { toast, ToastContainer } from "react-toastify";
import { MapPin, Calendar, User, CheckCircle } from "lucide-react";

const IssueDetails = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const [issue, setIssue] = useState(null);
  const [contributors, setContributors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const issueRes = await axios.get(`http://localhost:3000/issues/${id}`);
        setIssue(issueRes.data);

        const contribRes = await axios.get(
          `http://localhost:3000/contributions/${id}`
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
        `http://localhost:3000/issues/${id}`,
        updatedIssue
      );
      if (res.data.modifiedCount > 0) {
        setIssue(updatedIssue);
        toast.success(`Status updated to ${newStatus}`);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to update status");
    }
  };

  const handleDonate = async (e) => {
    e.preventDefault();
    const form = e.target;
    const amount = parseInt(form.amount.value);
    const message = form.message.value;

    const contributionData = {
      issueId: id,
      issueTitle: issue.title,
      userEmail: user.email,
      userName: user.displayName,
      userPhoto: user.photoURL,
      amount: amount,
      date: new Date(),
      message: message,
    };

    try {
      const res = await axios.post(
        "http://localhost:3000/contributions",
        contributionData
      );
      if (res.data.insertedId) {
        toast.success("Thank you for your contribution!");
        setContributors([...contributors, contributionData]);
        document.getElementById("donation_modal").close();
        form.reset();
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to process contribution");
    }
  };

  if (loading)
    return (
      <div className="min-h-screen flex justify-center items-center">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );

  return (
    <div className="min-h-screen bg-base-200 py-12 px-4">
      <div className="container mx-auto max-w-5xl">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="card bg-base-100 shadow-xl overflow-hidden">
              <figure className="h-64 w-full">
                <img
                  src={issue.image}
                  alt={issue.title}
                  className="w-full h-full object-cover"
                />
              </figure>
              <div className="card-body">
                <div className="flex justify-between items-start">
                  <h2 className="card-title text-3xl font-bold">
                    {issue.title}
                  </h2>
                  <div
                    className={`badge badge-lg font-bold ${
                      issue.status === "Resolved"
                        ? "badge-success"
                        : "badge-warning"
                    }`}
                  >
                    {issue.status}
                  </div>
                </div>

                <div className="flex flex-wrap gap-4 text-sm text-gray-500 my-4">
                  <span className="flex items-center gap-1">
                    <MapPin size={16} /> {issue.location}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar size={16} /> {issue.date?.split("T")[0]}
                  </span>
                  <span className="flex items-center gap-1">
                    <User size={16} /> Reported by: {issue.name}
                  </span>
                </div>

                <div className="divider"></div>

                <h3 className="font-bold text-lg mb-2">Description</h3>
                <p className="text-gray-600 leading-relaxed whitespace-pre-wrap">
                  {issue.description}
                </p>

                {user?.email === issue.email && (
                  <div className="mt-6 p-4 bg-base-200 rounded-lg border border-base-300 flex justify-around">
                    <label className="label font-bold">
                      Manage Status (Admin/Owner Action)
                    </label>
                    <select
                      className="select select-bordered w-full max-w-xs font-semibold focus:none mx-3"
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
            </div>

            <div className="card bg-base-100 shadow-xl p-6">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <CheckCircle className="text-primary" /> Contributors
              </h3>
              {contributors.length === 0 ? (
                <p className="text-gray-500 py-4 text-center">
                  No contributions yet. Be the first!
                </p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="table table-zebra">
                    <thead>
                      <tr className="bg-base-200">
                        <th>User</th>
                        <th>Amount</th>
                        <th>Message</th>
                      </tr>
                    </thead>
                    <tbody>
                      {contributors.map((contrib, idx) => (
                        <tr key={idx}>
                          <td>
                            <div className="flex items-center gap-3">
                              <div className="avatar">
                                <div className="mask mask-squircle w-10 h-10">
                                  <img src={contrib.userPhoto} alt="User" />
                                </div>
                              </div>
                              <div className="font-bold">
                                {contrib.userName}
                              </div>
                            </div>
                          </td>
                          <td className="font-bold text-primary">
                            ${contrib.amount}
                          </td>
                          <td className="text-gray-500 italic text-sm">
                            {contrib.message ? `"${contrib.message}"` : "-"}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>

          <div className="lg:col-span-1 space-y-6">
            <div className="card bg-base-100 shadow-xl p-8 text-center sticky top-10 border border-base-300">
              <h3 className="text-2xl font-bold mb-2">Support this Cause</h3>
              <p className="text-gray-500 mb-8">
                Your contribution directly helps fix this issue faster.
              </p>

              <button
                className="btn btn-primary w-full btn-lg shadow-lg hover:scale-105 transition-transform"
                onClick={() =>
                  document.getElementById("donation_modal").showModal()
                }
                disabled={issue.status === "Resolved"}
              >
                {issue.status === "Resolved" ? "Issue Resolved" : "Donate Now"}
              </button>
            </div>
          </div>
        </div>

        <dialog
          id="donation_modal"
          className="modal modal-bottom sm:modal-middle"
        >
          <div className="modal-box bg-base-100">
            <form method="dialog">
              <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                ✕
              </button>
            </form>

            <h3 className="font-bold text-xl mb-6">Contribution Details</h3>

            <form onSubmit={handleDonate} className="space-y-4">
              <div className="form-control">
                <label className="label font-semibold">Amount</label>
                <input
                  type="number"
                  name="amount"
                  placeholder="Enter amount"
                  className="input input-bordered w-full"
                  required
                  min="1"
                />
              </div>

              <div className="form-control">
                <label className="label font-semibold">Message</label>
                <input
                  type="text"
                  name="message"
                  placeholder="Enter your message"
                  className="input input-bordered w-full"
                />
              </div>

              <div className="modal-action">
                <button type="submit" className="btn btn-primary w-full">
                  Confirm
                </button>
              </div>
            </form>
          </div>
          <form method="dialog" className="modal-backdrop">
            <button>close</button>
          </form>
        </dialog>
      </div>
      <ToastContainer />
    </div>
  );
};

export default IssueDetails;
