"use client";

import { getOrdersByUser } from "@/api/orders";
import OrdersCard from "@/components/orders/Card";
import OrdersLoadingCard from "@/components/orders/LoadingCard";
import {
  ORDER_CONFIRMED,
  ORDER_DELIVERED,
  ORDER_PENDING,
  ORDER_SHIPPED,
} from "@/constants/orderStatus";
import {
  ALL_ORDERS_ROUTE,
  LOGIN_ROUTE,
} from "@/constants/routes";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";

const orderTabs = [
  { label: "PENDING", status: ORDER_PENDING },
  { label: "CONFIRMED", status: ORDER_CONFIRMED },
  { label: "SHIPPED", status: ORDER_SHIPPED },
  { label: "DELIVERED", status: ORDER_DELIVERED },
];

function ProductOrders() {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(ORDER_PENDING);
  const [orders, setOrders] = useState([]);

  const { user } = useSelector((state) => state.auth);
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.replace(LOGIN_ROUTE);
      return;
    }

    setLoading(true);
    getOrdersByUser(status, user?.id)
      .then((data) => setOrders(data))
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  }, [status, user, router]);

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-[#F5F5F7] to-[#F5F5F7] dark:bg-gradient-to-tl dark:from-[#000000] dark:to-[#979595]">
      <motion.div
        className="max-w-screen-xl mx-auto py-8 px-2 sm:p-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center justify-between">
          <h2 className="px-1 lg:px-1 bg-gradient-to-b from-[#F5F5F7] to-[#b8b8da] py-0 font-serif border-b-2 rounded-lg #F5F5F7 dark:bg-gradient-to-tl dark:from-[#000000] dark:to-[#979595] text-center md:text-left text-xl md:text-2xl font-semibold text-[#1A1A1A] dark:text-white">
            Your orders
          </h2>
          {user?.roles.includes("ADMIN") && (
            <Link
              href={ALL_ORDERS_ROUTE}
              className="px-3 py-1 font-serif font-bold text-[#1A1A1A] dark:text-black bg-[#F5F5F7] dark:bg-white rounded-3xl shadow hover:bg-[#afa8b0] transition-all duration-300"
            >
              All Orders
            </Link>
          )}
        </div>

        {/* Tabs */}
        <motion.div
          className="md:flex justify-between items-center w-full my-5 px-5 py-0.5 border-2 border-[#D1D1D1] relative rounded-2xl bg-gradient-to-b from-[#F5F5F7] to-[#86a3c1] dark:bg-gradient-to-tl dark:from-[#504e4e] dark:to-[#b4b0b0]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          {orderTabs.map((tab, index) => (
            <motion.div
              key={index}
              className={`py-1 px-2 bg-gradient-to-b from-[#F5F5F7] to-[#d3e1ef] text-[#1A1A1A] font-serif font-extrabold relative p-2 dark:text-white text-base cursor-pointer border-x-2 rounded-2xl border-[#D1D1D1]`}
              onClick={() => setStatus(tab.status)}
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <span>{tab.label}</span>
              {status === tab.status && (
                <motion.div
                  className="absolute bottom-0 left-0 w-full h-[3px] bg-[#F5F5F7]"
                  initial={{ x: -100 }}
                  animate={{ x: 0 }}
                  transition={{ type: "spring", stiffness: 300 }}
                />
              )}
            </motion.div>
          ))}
        </motion.div>

        {/* Loading */}
        {loading && (
          <>
            <OrdersLoadingCard />
            <OrdersLoadingCard />
            <OrdersLoadingCard />
          </>
        )}

        {/* No Orders */}
        {!loading && orders.length === 0 && (
          <motion.div
            className="text-center p-3 dark:text-white"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            No orders
          </motion.div>
        )}

        {/* Orders List */}
        {orders.map((order, index) => (
          <motion.div
            key={order._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2, duration: 0.5 }}
          >
            <OrdersCard order={order} status={status} loading={loading} />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}

export default ProductOrders;
