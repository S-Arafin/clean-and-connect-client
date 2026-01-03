import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router";
import { Search, Filter, ChevronLeft, ChevronRight, MapPin } from "lucide-react";
import { motion } from "framer-motion";
import CardSkeleton from "../components/CardSkeleton";

const AllIssues = () => {
  const [issues, setIssues] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 12;

  useEffect(() => {
    const fetchIssues = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `https://clean-and-connect-server.vercel.app/issues?search=${search}&category=${category}&page=${currentPage}&limit=${itemsPerPage}`
        );
        
        if (Array.isArray(response.data)) {
          setIssues(response.data);
          setTotalPages(Math.ceil(response.data.length / itemsPerPage) || 1);
        } else {
          setIssues(response.data.issues);
          setTotalPages(response.data.totalPages);
        }
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
  }, [search, category, currentPage]);

  const categories = ["Garbage", "Potholes", "Illegal Construction", "Water Leak", "Road Damage", "Other"];

  return (
    <div className="min-h-screen bg-base-200 py-10 px-4 font-sans">
      <div className="container mx-auto">
        <div className="flex flex-col mb-10 gap-6">
          <h2 className="text-4xl font-black text-base-content text-center md:text-left tracking-tight">
            All Reported Issues
          </h2>

          <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
            <div className="flex flex-col md:flex-row w-full md:w-auto gap-4">
              <div className="relative w-full md:w-80 group">
                <input
                  type="text"
                  placeholder="Search by title..."
                  className="input input-bordered w-full pl-12 h-14 rounded-2xl focus:input-primary border-none shadow-sm bg-base-100 font-medium"
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                    setCurrentPage(1);
                  }}
                />
                <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-base-content/30 group-focus-within:text-primary transition-colors" />
              </div>

              <div className="relative w-full md:w-64 group">
                <select 
                  className="select select-bordered w-full pl-12 h-14 rounded-2xl focus:select-primary border-none shadow-sm bg-base-100 font-medium"
                  value={category}
                  onChange={(e) => {
                    setCategory(e.target.value);
                    setCurrentPage(1);
                  }}
                >
                  <option value="">All Categories</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
                <Filter className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-base-content/30 group-focus-within:text-primary transition-colors" />
              </div>
            </div>

            <div className="text-sm font-black text-base-content/40 uppercase tracking-[0.2em]">
              Page {currentPage} of {totalPages}
            </div>
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[...Array(8)].map((_, i) => (
              <CardSkeleton key={i} />
            ))}
          </div>
        ) : (
          <>
            {issues.length === 0 ? (
              <motion.div 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }}
                className="text-center py-32 bg-base-100 rounded-[3rem] shadow-xl border border-base-300"
              >
                <h3 className="text-2xl font-black text-base-content/40">
                  No issues found.
                </h3>
                <p className="text-base-content/30 mt-2 font-medium tracking-tight">Try changing your search or filter criteria.</p>
                <button 
                  onClick={() => {setSearch(""); setCategory("");}} 
                  className="btn btn-primary rounded-xl mt-8 px-10 shadow-lg shadow-primary/20 border-none text-primary-content"
                >
                  Clear All Filters
                </button>
              </motion.div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                  {issues.map((issue, idx) => (
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
                          title={issue.title}
                        >
                          {issue.title}
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

                <div className="flex justify-center mt-20">
                  <div className="join shadow-2xl rounded-2xl overflow-hidden border border-base-300">
                    <button 
                      className="join-item btn btn-lg bg-base-100 border-none hover:bg-primary hover:text-primary-content transition-all"
                      disabled={currentPage === 1}
                      onClick={() => setCurrentPage(prev => prev - 1)}
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    {[...Array(totalPages)].map((_, index) => (
                      <button
                        key={index + 1}
                        className={`join-item btn btn-lg border-none font-black ${currentPage === index + 1 ? 'btn-primary text-primary-content' : 'bg-base-100 hover:bg-base-200'}`}
                        onClick={() => setCurrentPage(index + 1)}
                      >
                        {index + 1}
                      </button>
                    ))}
                    <button 
                      className="join-item btn btn-lg bg-base-100 border-none hover:bg-primary hover:text-primary-content transition-all"
                      disabled={currentPage === totalPages}
                      onClick={() => setCurrentPage(prev => prev + 1)}
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default AllIssues;