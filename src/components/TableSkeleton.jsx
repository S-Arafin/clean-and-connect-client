const TableSkeleton = () => {
  return (
    <div className="bg-base-100 rounded-[2.5rem] shadow-2xl border border-base-300 overflow-hidden p-8">
      <div className="space-y-4">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="flex items-center gap-4 border-b border-base-200 pb-4">
            <div className="skeleton w-16 h-16 rounded-2xl shrink-0"></div>
            <div className="flex-1 space-y-2">
              <div className="skeleton h-5 w-1/3"></div>
              <div className="skeleton h-3 w-1/4"></div>
            </div>
            <div className="skeleton h-8 w-20 rounded-lg"></div>
            <div className="skeleton h-10 w-10 rounded-full shrink-0"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TableSkeleton;