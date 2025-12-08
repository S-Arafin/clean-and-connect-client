import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import { toast } from "react-toastify";
import { PlusCircle } from "lucide-react";
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
    <div className="min-h-screen bg-base-200 py-10 px-4">
      <div className="container mx-auto max-w-3xl">
        <div className="bg-base-100 p-8 md:p-12 rounded-2xl shadow-2xl border-t-4 border-primary">
          <div className="text-center mb-10">
            <h2 className="text-4xl font-extrabold text-base-content mb-2">
              Report a New Issue
            </h2>
            <p className="text-gray-500">
              Your report makes a difference. Fill out the details below.
            </p>
          </div>

          <form onSubmit={handleAddIssue}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="form-control">
                <label className="label font-medium">Issue Title</label>
                <input
                  type="text"
                  name="issueTitle"
                  placeholder="e.g., Massive garbage pileup"
                  className="input input-bordered w-full focus:input-primary"
                  required
                />
              </div>

              <div className="form-control">
                <label className="label font-medium">Category</label>
                <select
                  name="category"
                  className="select select-bordered w-full focus:select-primary"
                  required
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="form-control">
                <label className="label font-medium">Location</label>
                <input
                  type="text"
                  name="location"
                  placeholder="e.g., Sector 7, Park Avenue"
                  className="input input-bordered w-full focus:input-primary"
                  required
                />
              </div>

              <div className="form-control">
                <label className="label font-medium">
                  Estimated Budget ($)
                </label>
                <input
                  type="number"
                  name="amount"
                  placeholder="e.g., 500"
                  className="input input-bordered w-full focus:input-primary"
                  required
                  min="1"
                />
              </div>
            </div>
            <div className="form-control mb-6">
              <label className="label font-medium">Image URL</label>
              <input
                type="url"
                name="image"
                placeholder="Paste image link of the issue here"
                className="input input-bordered w-full focus:input-primary"
                required
              />
            </div>
            <div className="form-control mb-6">
              <label className="label font-medium">Description</label>
              <textarea
                name="description"
                placeholder="Describe the severity and scope of the issue..."
                className="textarea textarea-bordered h-32 w-full focus:textarea-primary"
                required
              ></textarea>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="form-control">
                <label className="label font-medium">Reported By (Name)</label>
                <input
                  type="text"
                  value={user?.displayName || "N/A"}
                  className="input input-bordered w-full bg-base-300 cursor-not-allowed"
                  readOnly
                />
              </div>
              <div className="form-control">
                <label className="label font-medium">Reporter Email</label>
                <input
                  type="email"
                  value={user?.email || "N/A"}
                  className="input input-bordered w-full bg-base-300 cursor-not-allowed"
                  readOnly
                />
              </div>
            </div>

            <button
              type="submit"
              className="btn btn-primary btn-block text-lg shadow-xl hover:scale-[1.01] transition-transform gap-2"
            >
              <PlusCircle size={24} />
              Submit Issue Report
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddIssues;
