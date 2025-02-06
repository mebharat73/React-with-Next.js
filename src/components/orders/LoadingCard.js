function OrdersLoadingCard() {
  return (
    <div className="border rounded-2xl my-5 p-5 bg-gray-50 dark:bg-gray-700 w-full h-56 animate-pulse">
      <div className="w-1/6 h-6 bg-gray-200 dark:bg-gray-800 mx-2"></div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 my-4">
        <div className="grid grid-cols-[1fr,4fr] py-3 px-5 rounded-xl border bg-gray-200 dark:bg-gray-800 h-24"></div>
        <div className="hidden md:grid grid-cols-[1fr,4fr] py-3 px-5 rounded-xl border bg-gray-200 dark:bg-gray-800 h-24"></div>
      </div>
      <div className="w-1/3 h-8 bg-gray-200 dark:bg-gray-800 mx-2"></div>
    </div>
  );
}

export default OrdersLoadingCard;
