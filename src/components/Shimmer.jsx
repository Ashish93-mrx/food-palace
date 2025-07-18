export const Shimmer = () => {
  return (
    <div className="m-4 p-4 w-[260px] rounded-2xl bg-gray-100">
      <div className="w-full h-40 rounded-xl shimmer-bg"></div>

      <div className="mt-4 space-y-2">
        <div className="h-4 rounded w-3/4 shimmer-bg"></div>
        <div className="h-3 rounded w-5/6 shimmer-bg"></div>

        <div className="flex justify-between items-center mt-4">
          <div className="h-4 rounded w-1/3 shimmer-bg"></div>
          <div className="h-4 rounded w-1/4 shimmer-bg"></div>
        </div>

        <div className="h-3 rounded w-1/2 mt-4 shimmer-bg"></div>
      </div>
    </div>
  );
};

//    default Shimmer;

export const UserClassShimmer = () => {
  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-xl shadow-lg flex flex-col items-center space-y-4 animate-pulse">
      <div className="w-32 h-32 bg-gray-300 rounded-full" />

      <div className="w-2/3 h-5 bg-gray-300 rounded" />
      <div className="w-1/3 h-4 bg-gray-300 rounded" />
      <div className="w-1/2 h-4 bg-gray-300 rounded" />
      <div className="w-1/2 h-4 bg-orange-200 rounded mt-2" />
    </div>
  );
};
export const MenuShimmer = () => {
  return (
    <div className="max-w-2xl mx-auto mt-6 space-y-4">
      <div className="rounded-lg shadow-md px-4 bg-white flex gap-2">
        <div className="w-[10rem] h-[10rem] shimmer-bg rounded mb-2"></div>
        <span>
          <div className="w-[8rem] h-6 shimmer-bg rounded"></div>
          <div className="w-[6rem] h-2 shimmer-bg rounded mt-3"></div>
          <div className="w-[4rem] h-3 shimmer-bg rounded mt-3"></div>
        </span>
      </div>
      {Array(4)
        .fill(0)
        .map((_, index) => (
          <div key={index} className="rounded-lg shadow-md p-4 bg-white">
            <div className="w-3/4 h-4 shimmer-bg rounded mb-2"></div>
            <div className="w-1/2 h-1 shimmer-bg rounded"></div>
          </div>
        ))}
    </div>
  );
};