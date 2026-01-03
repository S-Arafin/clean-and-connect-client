const DetailsSkeleton = () => {
  return (
    <div className="container mx-auto max-w-6xl py-10 px-4">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="flex-1 space-y-6">
          <div className="skeleton h-96 w-full rounded-[2rem]"></div>
          <div className="skeleton h-10 w-1/2"></div>
          <div className="skeleton h-4 w-full"></div>
          <div className="skeleton h-4 w-full"></div>
          <div className="skeleton h-4 w-3/4"></div>
        </div>
        <div className="w-full md:w-1/3 space-y-6">
          <div className="skeleton h-64 w-full rounded-[2rem]"></div>
          <div className="skeleton h-32 w-full rounded-[2rem]"></div>
        </div>
      </div>
    </div>
  );
};

export default DetailsSkeleton;