import { motion } from "framer-motion";

const CardSkeleton = () => {
  return (
    <div className="card bg-base-100 shadow-xl border border-base-300 overflow-hidden">
      <div className="skeleton h-52 w-full rounded-none"></div>
      <div className="card-body p-6 space-y-4">
        <div className="skeleton h-6 w-3/4"></div>
        <div className="skeleton h-4 w-full"></div>
        <div className="skeleton h-4 w-5/6"></div>
        <div className="card-actions justify-end mt-4">
          <div className="skeleton h-10 w-24 rounded-xl"></div>
        </div>
      </div>
    </div>
  );
};

export default CardSkeleton;