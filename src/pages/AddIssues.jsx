import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { toast, ToastContainer } from "react-toastify";

const AddIssue = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleAddIssue = async (e) => {
    e.preventDefault();
    setLoading(true);

    const form = e.target;
    const title = form.title.value;
    const location = form.location.value;
    const category = form.category.value;
    const description = form.description.value;
    const image = form.image.value;

    const issueData = {
      title,
      location,
      category,
      description,
      image,
      amount: 0,
      status: "Open",
      email: user?.email,
      name: user?.displayName,
      userPhoto: user?.photoURL,
      date: new Date().toISOString().split("T")[0],
    };

    try {
      const response = await axios.post(
        "http://localhost:3000/issues",
        issueData
      );

      if (response.data.insertedId) {
        toast.success("Issue Reported Successfully!");
        form.reset();
        setTimeout(() => {
          navigate("/issues");
        }, 1500);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to report issue. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-base-200 py-12 px-4">
      <div className="max-w-3xl mx-auto bg-base-100 rounded-2xl shadow-xl overflow-hidden">
        <div className="bg-primary p-8 text-primary-content text-center">
          <h2 className="text-3xl font-bold">Report an Issue</h2>
          <p className="opacity-90 mt-2">
            Help us make the city cleaner and safer.
          </p>
        </div>

        <form onSubmit={handleAddIssue} className="p-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="form-control">
              <label className="label font-medium">Issue Title</label>
              <input
                type="text"
                name="title"
                placeholder="e.g. Uncleaned roads"
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
                defaultValue=""
              >
                <option value="" disabled>
                  Select Category
                </option>
                <option value="Garbage">Garbage</option>
                <option value="Pothole">Road</option>
                <option value="Water">Water</option>
                <option value="Electricity">Electricity</option>
                <option value="Others">Others</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="form-control">
              <label className="label font-medium">Location</label>
              <input
                type="text"
                name="location"
                placeholder="e.g. Kuril Dhaka"
                className="input input-bordered w-full focus:input-primary"
                required
              />
            </div>
            <div className="form-control">
              <label className="label font-medium">Image URL</label>
              <input
                type="url"
                name="image"
                placeholder="https://..."
                className="input input-bordered w-full focus:input-primary"
                required
              />
            </div>
          </div>

          <div className="form-control">
            <label className="label font-medium">Description</label>
            <textarea
              name="description"
              className="textarea textarea-bordered h-32 focus:textarea-primary"
              placeholder="Describe the issue in detail..."
              required
            ></textarea>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-base-200 p-4 rounded-lg">
            <div className="form-control">
              <label className="label text-xs uppercase font-bold text-gray-500">
                Reporter Name
              </label>
              <input
                type="text"
                value={user?.displayName || "Unknown"}
                disabled
                className="input input-ghost w-full font-bold"
              />
            </div>
            <div className="form-control">
              <label className="label text-xs uppercase font-bold text-gray-500">
                Reporter Email
              </label>
              <input
                type="text"
                value={user?.email || "Unknown"}
                disabled
                className="input input-ghost w-full font-bold"
              />
            </div>
          </div>

          <div className="form-control mt-6">
            <button
              type="submit"
              className="btn btn-primary w-full text-lg"
              disabled={loading}
            >
              {loading ? (
                <span className="loading loading-spinner"></span>
              ) : (
                "Submit Report"
              )}
            </button>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default AddIssue;
