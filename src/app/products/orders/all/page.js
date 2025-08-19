"use client";

import OrdersTable from "@/components/orders/Table";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

function AllOrders() {
  const { user } = useSelector((state) => state.auth);
  const router = useRouter();

  useEffect(() => {
    if (!user?.roles.includes("ADMIN")) throw new Error("Access denied");
  }, [user]);

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-[#F5F5F7] to-[#F5F5F7] dark:bg-gradient-to-tl dark:from-[#000000] dark:to-[#979595]">
      <div className="max-w-screen-xl mx-auto py-8 px-2 sm:p-10">
        <div className="flex justify-between items-center">
          <h2 className="text-center md:text-left text-2xl md:text-3xl font-semibold text-textColor dark:text-white">
            All Orders
          </h2>
          <motion.button
            className="bg-[#007BFF] text-[#1A1A1A] hover:text-white h-6 px-1 md:px-4 md:mt-0 rounded-lg hover:bg-[#0056D2] transition-colors"
            onClick={() => router.back()}
          >
            Back
          </motion.button>
        </div>

        <OrdersTable />
      </div>
    </div>
  );
}

export default AllOrders;
