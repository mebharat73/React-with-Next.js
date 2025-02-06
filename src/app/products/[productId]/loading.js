import React from "react";

export default function ProductDetailsLoading() {
  return (
    <div className="flex flex-col lg:flex-row justify-around min-h-[90svh]">
      <div className="relative w-full lg:w-1/2 p-10 md:p-16 bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
      <div className="w-full h-full bg-gray-200 dark:bg-gray-700"></div>
      </div>
      <div className="w-full bg-white dark:bg-gray-700 lg:w-1/2  px-10 py-16 md:px-20"></div>
    </div>
  );
}
