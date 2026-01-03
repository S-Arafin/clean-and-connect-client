import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { motion } from "framer-motion";
import { 
  PlusCircle, 
  MapPin, 
  Tag, 
  DollarSign, 
  Image as ImageIcon, 
  AlignLeft, 
  User, 
  Mail, 
  AlertCircle,
  Leaf,
  CheckCircle
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const categories = [
  "Garbage",
  "Illegal Construction",
  "Broken Public Property",
  "Road Damage",
];

const AddIssues = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleAddIssue = async (e) => {
    e.preventDefault();
    const form = e.target;

    const issueTitle = form.issueTitle.value;
    const category = form.category.value;
    const location = form.location.value;
    const amount = parseInt(form.amount.value);
    const description = form.description.value;
    const image = form.image.value;

    if (amount < 1) {
      toast.error("Estimated Budget must be greater than 0.");
      return;
    }

    const issueData = {
      issueTitle,
      category,
      location,
      amount,
      description,
      image,
      status: "ongoing",
      date: new Date(),
      email: user?.email,
      name: user?.displayName,
    };

    try {
      const response = await axios.post(
        "https://clean-and-connect-server.vercel.app/issues",
        issueData
      );

      if (response.data.insertedId) {
        toast.success("Issue reported successfully!");
        form.reset();
        setTimeout(() => {
          navigate("/my-issues");
        }, 1500);
      } else {
        toast.error("Failed to report issue. Please try again.");
      }
    } catch (error) {
      console.error("Issue submission error:", error);
      toast.error("An error occurred. Check server connection.");
    }
  };

  return (
    <div className="min-h-screen bg-base-200 py-12 px-4 relative overflow-hidden font-sans">
      {/* Background Decorative Elements */}
      <motion.div animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }} className="absolute -top-20 -left-20 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
      <motion.div animate={{ rotate: -360 }} transition={{ duration: 25, repeat: Infinity, ease: "linear" }} className="absolute -bottom-20 -right-20 w-80 h-80 bg-secondary/5 rounded-full blur-3xl" />

      <div className="container mx-auto max-w-6xl">
        <motion.div 
          initial={{ opacity: 0, y: 30 }} 
          animate={{ opacity: 1, y: 0 }} 
          className="bg-base-100 rounded-[2.5rem] shadow-[0_20px_60px_rgba(0,0,0,0.08)] overflow-hidden flex flex-col lg:flex-row border border-base-300"
        >
          
          <div className="w-full lg:w-1/3 bg-gradient-to-br from-primary via-primary/90 to-accent p-10 text-primary-content flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-8">
                
                <h1 className="text-xl font-black tracking-tighter">C&C Reporter</h1>
              </div>
              <h2 className="text-4xl font-bold mb-6">Make Your Community Shine</h2>
              <p className="text-lg opacity-85 leading-relaxed mb-8">
                Your report provides the blueprint for local change. Help us identify where resources are needed most.
              </p>
              
              <div className="space-y-6">
                {[
                  { title: "Identify", desc: "Spot the environmental issue" },
                  { title: "Estimate", desc: "Suggest a repair budget" },
                  { title: "Crowdfund", desc: "Watch the community contribute" }
                ].map((step, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-xs font-bold border border-white/20">{i + 1}</div>
                    <div>
                      <h4 className="font-bold text-sm">{step.title}</h4>
                      <p className="text-xs opacity-70">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-12 p-6 bg-white/10 rounded-3xl border border-white/10 backdrop-blur-sm">
              <p className="text-xs font-bold uppercase tracking-widest opacity-60 mb-3">Verified Reporter</p>
              <div className="flex items-center gap-4">
                <img src={user?.photoURL || "https://i.ibb.co/5GzXkwq/user.png"} className="w-12 h-12 rounded-2xl object-cover ring-2 ring-white/20" alt="user" />
                <div className="overflow-hidden">
                  <p className="font-bold truncate">{user?.displayName}</p>
                  <p className="text-[10px] opacity-70 truncate">{user?.email}</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="w-full lg:w-2/3 p-8 md:p-14">
            <div className="mb-10">
              <h2 className="text-3xl font-black text-base-content tracking-tight mb-2">Report a New Issue</h2>
              <p className="text-sm text-base-content/50 font-medium italic">Accuracy in reporting leads to faster resolution.</p>
            </div>

            <form onSubmit={handleAddIssue} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="form-control">
                  <label className="label-text font-bold mb-2 ml-1 opacity-70 uppercase text-[10px] tracking-widest">Issue Title</label>
                  <div className="relative group">
                    <AlertCircle className="absolute left-4 top-1/2 -translate-y-1/2 text-base-content/30 group-focus-within:text-primary transition-colors" size={18} />
                    <input
                      type="text"
                      name="issueTitle"
                      placeholder="e.g., Pothole on Main St"
                      className="input input-bordered w-full pl-12 h-14 bg-base-200 border-none focus:ring-2 focus:ring-primary/50 transition-all rounded-2xl font-medium"
                      required
                    />
                  </div>
                </div>

                <div className="form-control">
                  <label className="label-text font-bold mb-2 ml-1 opacity-70 uppercase text-[10px] tracking-widest">Category</label>
                  <div className="relative group">
                    <Tag className="absolute left-4 top-1/2 -translate-y-1/2 text-base-content/30 group-focus-within:text-primary transition-colors" size={18} />
                    <select
                      name="category"
                      className="select select-bordered w-full pl-12 h-14 bg-base-200 border-none focus:ring-2 focus:ring-primary/50 transition-all rounded-2xl font-medium"
                      required
                    >
                      {categories.map((cat) => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="form-control">
                  <label className="label-text font-bold mb-2 ml-1 opacity-70 uppercase text-[10px] tracking-widest">Location</label>
                  <div className="relative group">
                    <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-base-content/30 group-focus-within:text-primary transition-colors" size={18} />
                    <input
                      type="text"
                      name="location"
                      placeholder="Street, City, Sector"
                      className="input input-bordered w-full pl-12 h-14 bg-base-200 border-none focus:ring-2 focus:ring-primary/50 transition-all rounded-2xl font-medium"
                      required
                    />
                  </div>
                </div>

                <div className="form-control">
                  <label className="label-text font-bold mb-2 ml-1 opacity-70 uppercase text-[10px] tracking-widest">Estimated Budget ($)</label>
                  <div className="relative group">
                    <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 text-base-content/30 group-focus-within:text-primary transition-colors" size={18} />
                    <input
                      type="number"
                      name="amount"
                      placeholder="e.g., 500"
                      className="input input-bordered w-full pl-12 h-14 bg-base-200 border-none focus:ring-2 focus:ring-primary/50 transition-all rounded-2xl font-medium"
                      required
                      min="1"
                    />
                  </div>
                </div>
              </div>

              <div className="form-control">
                <label className="label-text font-bold mb-2 ml-1 opacity-70 uppercase text-[10px] tracking-widest">Evidence Image URL</label>
                <div className="relative group">
                  <ImageIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-base-content/30 group-focus-within:text-primary transition-colors" size={18} />
                  <input
                    type="url"
                    name="image"
                    placeholder="https://image-hosting.com/your-issue-photo.jpg"
                    className="input input-bordered w-full pl-12 h-14 bg-base-200 border-none focus:ring-2 focus:ring-primary/50 transition-all rounded-2xl font-medium"
                    required
                  />
                </div>
              </div>

              <div className="form-control">
                <label className="label-text font-bold mb-2 ml-1 opacity-70 uppercase text-[10px] tracking-widest">Full Description</label>
                <div className="relative group">
                  <AlignLeft className="absolute left-4 top-6 text-base-content/30 group-focus-within:text-primary transition-colors" size={18} />
                  <textarea
                    name="description"
                    placeholder="Provide details about the issue, severity, and how it affects the community..."
                    className="textarea textarea-bordered w-full pl-12 min-h-[120px] bg-base-200 border-none focus:ring-2 focus:ring-primary/50 transition-all rounded-2xl font-medium p-4"
                    required
                  ></textarea>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                <div className="flex items-center gap-3 p-4 bg-base-200 rounded-2xl">
                  <User className="text-primary/40" size={18} />
                  <div>
                    <p className="text-[10px] font-bold opacity-40 uppercase tracking-tighter">Reporter Name</p>
                    <p className="text-xs font-bold">{user?.displayName || "N/A"}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 bg-base-200 rounded-2xl">
                  <Mail className="text-primary/40" size={18} />
                  <div>
                    <p className="text-[10px] font-bold opacity-40 uppercase tracking-tighter">Reporter Email</p>
                    <p className="text-xs font-bold">{user?.email || "N/A"}</p>
                  </div>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                type="submit"
                className="btn btn-primary w-full h-16 rounded-2xl text-lg font-black shadow-xl shadow-primary/20 border-none text-primary-content gap-2 mt-4"
              >
                <PlusCircle size={22} />
                Submit Issue Report
              </motion.button>
            </form>
          </div>
        </motion.div>
      </div>
      <ToastContainer position="bottom-right" theme="colored" autoClose={3000} />
    </div>
  );
};

export default AddIssues;