"use client";

import OrdersTable from "@/components/orders/Table";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useRouter } from 'next/navigation';
import { motion } from "framer-motion";

function AllOrders() {
  const { user } = useSelector((state) => state.auth);
  const router = useRouter();

  useEffect(() => {
    if (!user?.roles.includes("ADMIN")) throw new Error("Access denied");
  }, [user]);

  return (
    <div className="py-8 px-2 sm:p-10">
      <h2 className="text-center md:text-left text-2xl md:text-3xl font-semibold text-textColor dark:text-white">
        All Orders
      </h2>
      <motion.button
        className="bg-[#8b2fa2] text-white hover:text-[#C3EF38] h-6 px-3 mt-1 mr-6 rounded-lg hover:bg-[#68217A] transition-colors absolute top-24 right-32 animate-bounce"
        onClick={() => router.back()}  // Handle the back navigation
      >
        Back
      </motion.button>

      <OrdersTable />
    </div>
  );
}

export default AllOrders;
