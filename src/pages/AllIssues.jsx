import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Search } from "lucide-react";

const AllIssues = () => {
  const [issues, setIssues] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchIssues = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `http://localhost:3000/issues?search=${search}`
        );
        setIssues(response.data);
      } catch (error) {
        console.error("Error fetching issues:", error);
      } finally {
        setLoading(false);
      }
    };

    const timeoutId = setTimeout(() => {
      fetchIssues();
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [search]);

  return (
    <div className="min-h-screen bg-base-200 py-10 px-4">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <h2 className="text-3xl font-bold text-base-content">
            All Reported Issues
          </h2>

          <div className="relative w-full md:w-96">
            <input
              type="text"
              placeholder="Search by title..."
              className="input input-bordered w-full pl-10 focus:input-primary"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center h-64 items-center">
            <span className="loading loading-spinner loading-lg text-primary"></span>
          </div>
        ) : (
          <>
            {issues.length === 0 ? (
              <div className="text-center py-20">
                <h3 className="text-2xl font-bold text-gray-500">
                  No issues found.
                </h3>
                <p className="text-gray-400">Try changing your search term.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {issues.map((issue) => (
                  <div
                    key={issue._id}
                    className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 border border-base-300"
                  >
                    <figure className="h-48 overflow-hidden relative">
                      <img
                        src={issue.image}
                        alt={issue.title}
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                      />
                      <div className="absolute top-3 right-3 badge badge-secondary font-bold shadow-md">
                        {issue.status || "Open"}
                      </div>
                    </figure>
                    <div className="card-body">
                      <div className="flex justify-between items-start">
                        <h3
                          className="card-title text-lg font-bold line-clamp-1"
                          title={issue.title}
                        >
                          {issue.title}
                        </h3>
                      </div>

                      <p className="text-sm text-gray-500 font-medium mb-1">
                        <span className="text-primary">{issue.category}</span> •{" "}
                        {issue.location}
                      </p>

                      <p className="text-sm text-gray-600 line-clamp-2 mb-4">
                        {issue.description}
                      </p>

                      <div className="card-actions justify-end items-center mt-auto border-t pt-4 border-base-200">
                        <div className="flex flex-col text-left mr-auto">
                          <span className="text-xs text-gray-400">
                            Reported by
                          </span>
                          <span className="text-xs font-bold">
                            {issue.name || "Anonymous"}
                          </span>
                        </div>
                        <Link
                          to={`/issues/${issue._id}`}
                          className="btn btn-primary btn-sm"
                        >
                          View Details
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default AllIssues;
