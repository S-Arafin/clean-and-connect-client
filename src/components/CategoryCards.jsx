import React from "react";

const CategoryCard = ({ icon, title, desc, color }) => {
  return (
    <div className="card bg-base-100 border border-base-200 hover:border-primary transition-all p-6 flex flex-col items-center text-center cursor-pointer group">
      <div
        className={`text-4xl mb-4 ${color} group-hover:scale-110 transition-transform`}
      >
        {icon}
      </div>
      <h3 className="font-bold text-lg">{title}</h3>
      <p className="text-sm text-gray-500 mt-2">{desc}</p>
    </div>
  );
};

export default CategoryCard;
