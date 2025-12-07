import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { Calendar, Download } from "lucide-react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const MyContribution = () => {
  const { user } = useContext(AuthContext);
  const [contributions, setContributions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.email) {
      fetchContributions();
    }
  }, [user]);

  const fetchContributions = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/my-contributions/${user.email}`
      );
      setContributions(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    const doc = new jsPDF();
    const totalDonated = contributions.reduce(
      (total, item) => total + item.amount,
      0
    );
    const date = new Date().toLocaleDateString();

    doc.setFontSize(18);
    doc.text("Clean & Connect Contribution Report", 14, 20);
    doc.setFontSize(12);
    doc.text(`Generated on: ${date}`, 14, 27);
    doc.text(`Contributor: ${user?.displayName || "N/A"}`, 14, 34);
    doc.text(`Email: ${user?.email || "N/A"}`, 14, 41);

    doc.setFontSize(14);
    doc.setTextColor(40, 40, 40);
    doc.text(`Total Contributions: $${totalDonated}`, 14, 55);

    const tableColumn = ["Issue Title", "Amount ($)", "Date", "Message"];
    const tableRows = [];

    contributions.forEach((contrib) => {
      const contributionData = [
        contrib.issueTitle,
        contrib.amount,
        new Date(contrib.date).toLocaleDateString(),
        contrib.message || "-",
      ];
      tableRows.push(contributionData);
    });

    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 65,
      theme: "grid",
      styles: { fontSize: 10 },
    });

    doc.save(`CleanConnect_Report_${user?.displayName || "User"}_${date}.pdf`);
  };

  if (loading)
    return (
      <div className="min-h-screen flex justify-center items-center">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );

  return (
    <div className="min-h-screen bg-base-200 py-10 px-4">
      <div className="container mx-auto max-w-5xl">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <div>
            <h2 className="text-3xl font-bold text-base-content">
              My Contributions
            </h2>
            <p className="text-gray-500 mt-1">
              Thank you for making a difference.
            </p>
          </div>

          <div className="flex items-center gap-4">
            <div className="stats shadow bg-primary text-primary-content">
              <div className="stat">
               
                <div className="stat-title text-primary-content opacity-80">
                  Total Donated
                </div>
                <div className="stat-value text-3xl">
                  $
                  {contributions.reduce(
                    (total, item) => total + item.amount,
                    0
                  )}
                </div>
              </div>
            </div>

            {contributions.length > 0 && (
              <button
                className="btn btn-secondary btn-outline hover:btn-secondary bg-base-100"
                onClick={handleDownload}
              >
                <Download size={20} />
                Download Report
              </button>
            )}
          </div>
        </div>

        {contributions.length === 0 ? (
          <div className="text-center py-20 bg-base-100 rounded-2xl shadow-sm">
            <h3 className="text-2xl font-bold text-gray-500">
              No contributions found.
            </h3>
            <p className="text-gray-400 mt-2">
              You haven't donated to any campaigns yet.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto bg-base-100 rounded-2xl shadow-xl">
            <table className="table table-zebra w-full">
              <thead>
                <tr className="bg-base-200 text-base font-bold">
                  <th>Issue Title</th>
                  <th>Amount</th>
                  <th>Date</th>
                  <th>Message</th>
                </tr>
              </thead>
              <tbody>
                {contributions.map((contrib, index) => (
                  <tr key={index} className="hover">
                    <td>
                      <div className="font-bold text-lg">
                        {contrib.issueTitle || "Unknown Issue"}
                      </div>
                      <div className="text-xs text-gray-500">
                        ID: {contrib.issueId}
                      </div>
                    </td>
                    <td>
                      <div className="badge badge-lg badge-outline border-primary text-primary font-bold">
                        ${contrib.amount}
                      </div>
                    </td>
                    <td>
                      <div className="flex items-center gap-2 text-sm opacity-70">
                        <Calendar size={14} />
                        {contrib.date
                          ? new Date(contrib.date).toLocaleDateString()
                          : "N/A"}
                      </div>
                    </td>
                    <td className="max-w-xs truncate italic opacity-70">
                      {contrib.message || "-"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyContribution;
