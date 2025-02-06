"use client";

import OrdersTable from "@/components/orders/Table";
import { useEffect } from "react";
import { useSelector } from "react-redux";

function AllOrders() {
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!user?.roles.includes("ADMIN")) throw new Error("Access denied");
  }, [user]);

  return (
    <div className="py-8 px-2 sm:p-10">
      <h2 className="text-center md:text-left text-2xl md:text-3xl font-semibold text-textColor dark:text-white">
        All Orders
      </h2>

      <OrdersTable />
    </div>
  );
}

export default AllOrders;
