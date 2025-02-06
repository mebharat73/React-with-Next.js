function LoadingCard() {
  return (
    <div className="bg-gray-50 p-5 rounded-xl shadow w-full h-80 dark:bg-gray-900 animate-pulse">
      <div className="w-full h-32 bg-gray-200 dark:bg-gray-800 mb-5"></div>
      <div className="w-1/5 h-4 bg-gray-200 dark:bg-gray-800 rounded mb-3"></div>
      <div className="w-2/3 h-5 bg-gray-200 dark:bg-gray-800"></div>
      <div className="w-full h-8 bg-gray-200 dark:bg-gray-800 my-3"></div>
      <div className="w-1/3 h-6 bg-gray-200 dark:bg-gray-800"></div>
    </div>
  );
}

export default function ProductsLoading() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 py-5 px-3">
      <LoadingCard />
      <LoadingCard />
      <LoadingCard />
      <LoadingCard />
      <LoadingCard />
      <LoadingCard />
      <LoadingCard />
      <LoadingCard />
      <LoadingCard />
      <LoadingCard />
    </div>
  );
}
