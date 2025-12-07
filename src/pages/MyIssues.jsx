import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { Trash2, Edit, MapPin, Calendar } from "lucide-react";
import Swal from "sweetalert2";

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
        `http://localhost:3000/my-issues/${user.email}`
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
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axios.delete(`http://localhost:3000/issues/${id}`);
          if (res.data.deletedCount > 0) {
            const remaining = issues.filter((issue) => issue._id !== id);
            setIssues(remaining);
            Swal.fire("Deleted!", "Your issue has been deleted.", "success");
          }
        } catch (error) {
          console.error(error);
          toast.error("Failed to delete issue");
        }
      }
    });
  };

  if (loading)
    return (
      <div className="min-h-screen flex justify-center items-center">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );

  return (
    <div className="min-h-screen bg-base-200 py-10 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-base-content">
            My Reported Issues
          </h2>
          <div className="badge badge-lg badge-primary">
            {issues.length} Items
          </div>
        </div>

        {issues.length === 0 ? (
          <div className="text-center py-20 bg-base-100 rounded-2xl shadow-sm">
            <h3 className="text-2xl font-bold text-gray-500">
              You haven't reported any issues yet.
            </h3>
            <Link to="/add-issue" className="btn btn-primary mt-4">
              Report Now
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto bg-base-100 rounded-2xl shadow-xl">
            <table className="table table-zebra w-full">
              <thead>
                <tr className="bg-base-200 text-base font-bold">
                  <th>Image</th>
                  <th>Title & Description</th>
                  <th>Status</th>
                  <th>Date</th>
                  <th className="text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {issues.map((issue) => (
                  <tr key={issue._id} className="hover">
                    <td>
                      <div className="avatar">
                        <div className="mask mask-squircle w-16 h-16">
                          <img src={issue.image} alt="Issue" />
                        </div>
                      </div>
                    </td>
                    <td className="max-w-xs">
                      <div className="font-bold text-lg">{issue.title}</div>
                      <div className="text-sm opacity-70 truncate flex items-center gap-1 mt-1">
                        <MapPin size={12} /> {issue.location}
                      </div>
                    </td>
                    <td>
                      <div
                        className={`badge font-bold ${
                          issue.status === "Resolved"
                            ? "badge-success"
                            : "badge-warning"
                        }`}
                      >
                        {issue.status}
                      </div>
                    </td>
                    <td>
                      <div className="flex items-center gap-2 text-sm opacity-70">
                        <Calendar size={14} />
                        {issue.date ? issue.date.split("T")[0] : "N/A"}
                      </div>
                    </td>
                    <th>
                      <div className="flex justify-center gap-2">
                        <Link
                          to={`/issues/${issue._id}`}
                          className="btn btn-ghost btn-circle text-info hover:bg-info/20"
                        >
                          <Edit size={20} />
                        </Link>
                        <button
                          onClick={() => handleDelete(issue._id)}
                          className="btn btn-ghost btn-circle text-error hover:bg-error/20"
                        >
                          <Trash2 size={20} />
                        </button>
                      </div>
                    </th>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      <ToastContainer />
    </div>
  );
};

export default MyIssues;
