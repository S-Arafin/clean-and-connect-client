import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar,
  Download,
  DollarSign,
  Heart,
  History,
  TrendingUp,
  HandCoins,
} from "lucide-react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import TableSkeleton from "../components/TableSkeleton";

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
        `https://clean-and-connect-server.vercel.app/my-contributions/${user.email}`
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

    doc.save(`C&C_Report_${user?.displayName || "User"}.pdf`);
  };

  if (loading) return <TableSkeleton />;

  const totalAmount = contributions.reduce(
    (total, item) => total + item.amount,
    0
  );

  return (
    <div className="min-h-screen bg-base-200/50 py-12 px-4 relative overflow-hidden font-sans">
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
        transition={{ duration: 10, repeat: Infinity }}
        className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[100px] -z-10"
      />
      <motion.div
        animate={{ scale: [1, 1.3, 1], opacity: [0.1, 0.15, 0.1] }}
        transition={{ duration: 12, repeat: Infinity }}
        className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-secondary/20 rounded-full blur-[100px] -z-10"
      />

      <div className="container mx-auto max-w-6xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6"
        >
          <div>
            <h2 className="text-4xl font-black text-base-content tracking-tight mb-2">
              My Contributions
            </h2>
            <p className="text-base-content/50 font-medium italic">
              Review your history of community support.
            </p>
          </div>

          {contributions.length > 0 && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn btn-secondary rounded-2xl px-8 shadow-lg shadow-secondary/20 gap-3 text-secondary-content border-none"
              onClick={handleDownload}
            >
              <Download size={20} /> Download PDF Report
            </motion.button>
          )}
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {[
            {
              label: "Total Donated",
              value: `$${totalAmount}`,
              icon: DollarSign,
              color: "text-primary",
              bg: "bg-primary/10",
            },
            {
              label: "Active Contributions",
              value: contributions.length,
              icon: HandCoins,
              color: "text-secondary",
              bg: "bg-secondary/10",
            },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              className="bg-base-100 p-8 rounded-[2.5rem] shadow-xl border border-base-300 flex items-center gap-6 group hover:border-primary/30 transition-all"
            >
              <div
                className={`w-16 h-16 rounded-[1.5rem] ${stat.bg} ${stat.color} flex items-center justify-center transition-transform group-hover:rotate-12`}
              >
                <stat.icon size={32} />
              </div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.2em] opacity-40 mb-1">
                  {stat.label}
                </p>
                <p className="text-4xl font-black tracking-tight">
                  {stat.value}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {contributions.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-24 bg-base-100 rounded-[3rem] shadow-2xl border border-base-300"
          >
            <div className="w-24 h-24 bg-base-200 rounded-full flex items-center justify-center mx-auto mb-6">
              <TrendingUp size={48} className="text-base-content/10" />
            </div>
            <h3 className="text-2xl font-black text-base-content/60">
              No financial history
            </h3>
            <p className="text-base-content/40 mt-2 mb-8 max-w-sm mx-auto">
              Your contributions will appear here once you support an open
              issue.
            </p>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-base-100 rounded-[2.5rem] shadow-2xl border border-base-300 overflow-hidden"
          >
            <div className="p-8 border-b border-base-200 bg-base-200/20 flex items-center gap-3">
              <History className="text-primary" size={20} />
              <h3 className="font-black text-lg tracking-tight">
                Donation Log
              </h3>
            </div>

            <div className="overflow-x-auto">
              <table className="table w-full">
                <thead>
                  <tr className="bg-base-100 text-base-content/50 border-b border-base-200">
                    <th className="py-6 pl-10 text-[10px] uppercase font-black tracking-widest">
                      Issue Title
                    </th>
                    <th className="py-6 text-[10px] uppercase font-black tracking-widest">
                      Amount
                    </th>
                    <th className="py-6 text-[10px] uppercase font-black tracking-widest">
                      Date
                    </th>
                    <th className="py-6 pr-10 text-[10px] uppercase font-black tracking-widest">
                      Message
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-base-100">
                  <AnimatePresence>
                    {contributions.map((contrib, index) => (
                      <motion.tr
                        key={index}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="hover:bg-base-200/30 transition-colors group"
                      >
                        <td className="py-6 pl-10">
                          <div className="flex flex-col">
                            <span className="font-black text-base-content group-hover:text-primary transition-colors">
                              {contrib.issueTitle || "Restoration Project"}
                            </span>
                            <span className="text-[10px] font-bold opacity-40 uppercase tracking-tighter mt-1">
                              Ref: {contrib.issueId?.slice(-8)}
                            </span>
                          </div>
                        </td>
                        <td className="py-6">
                          <div className="badge badge-lg bg-success/10 text-success border-none font-black px-4 py-4 rounded-xl">
                            ${contrib.amount}
                          </div>
                        </td>
                        <td className="py-6">
                          <div className="flex items-center gap-2 text-xs font-bold opacity-60">
                            <Calendar size={14} className="text-secondary" />
                            {contrib.date
                              ? new Date(contrib.date).toLocaleDateString()
                              : "N/A"}
                          </div>
                        </td>
                        <td className="py-6 pr-10">
                          <p className="text-xs font-medium text-base-content/70 italic max-w-xs truncate">
                            {contrib.message
                              ? `"${contrib.message}"`
                              : "Supported locally."}
                          </p>
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
    </div>
  );
};

export default MyContribution;
