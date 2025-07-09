import { motion } from "framer-motion";
import Link from "next/link";
import { BsTrash } from "react-icons/bs";
import { HiOutlineCog6Tooth } from "react-icons/hi2";
import { PRODUCTS_ROUTE } from "@/constants/routes";
import { getOrders } from "@/api/orders";
import { useEffect, useState } from "react";
import Spinner from "../Spinner";
import EditOrderStatus from "./EditStatus";
import { deleteOrderById } from "@/api/orders";


function OrdersTable() {
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState([]);
  const [isStatusUpdated, setIsStatusUpdated] = useState(true);

  useEffect(() => {
    if (!isStatusUpdated) return;

    getOrders()
      .then((data) => setOrders(data))
      .catch((error) => console.log(error))
      .finally(() => {
        setLoading(false);
        setIsStatusUpdated(false);
      });
  }, [isStatusUpdated]);

  if (loading)
    return (
      <div className="flex items-center justify-center">
        <Spinner className="h-16 w-16" />
      </div>
    );

  return (
    <div className="overflow-x-auto">
      <motion.table
        className="my-8 border dark:text-white w-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        <thead className="bg-primary-200">
          <tr>
            <th className="py-3 px-6 border border-slate-400">Order ID</th>
            <th className="py-3 px-6 border border-slate-400">User  ID</th>
            <th className="py-3 px-6 border border-slate-400">Products</th>
            <th className="py-3 px-6 border border-slate-400">Is Paid</th>
            <th className="py-3 px-6 border border-slate-400">Is Delivered</th>
            <th className="py-3 px-6 border border-slate-400">Status</th>
            <th className="py-3 px-6 border border-slate-400">
              <HiOutlineCog6Tooth className="w-full text-center" />
            </th>
          </tr>
        </thead>
        <motion.tbody
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {orders.map((order) => (
            <motion.tr
              key={order._id}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
              className="hover:bg-primary-50"
            >
              <td className="text-xs px-3 py-2 border border-slate-400">{order._id}</td>
              <td className="text-xs text-blue-600 px-3 py-2 border border-slate-400 hover:underline">
                <Link href={`/users/${order.userId}`}>{order.userId}</Link>
              </td>
              <td className="py-2 px-3 border border-slate-400">
                {order.orderItems.map((item, index) => {
                  if (!item?.product) return null;

                  return (
                    <div key={index}>
                      <Link
                        href={`${PRODUCTS_ROUTE}/${item.product.id}`}
                        className="hover:underline"
                      >
                        {item.product.name}
                        <span className="text-xs ml-2">x {item.quantity}</span>
                      </Link>
                    </div>
                  );
                })}
              </td>
              <td className="px-3 py-2 border border-slate-400 text-center">
                <span
                  className={`${
                    order.isPaid
                      ? "bg-green-100 text-green-600"
                      : "bg-red-100 text-red-600"
                  } inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ring-primary-500/10`}
                >
                  {order.isPaid ? "Yes" : "No"}
                </span>
              </td>
              <td className="px-3 py-2 border border-slate-400 text-center">
                <span
                  className={`${
                    order.isDelivered
                      ? "bg-green-100 text-green-600"
                      : "bg-red-100 text-red-600"
                  } inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ring-primary-500/10`}
                >
                  {order.isDelivered ? "Yes" : "No"}
                </span>
              </td>
              <td className="px-3 py-2 text-sm border border-slate-400 text-center">
                <span
                  className={`bg-primary-100 text-primary-600 inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ring-primary-500/10`}
                >
                  {order.status}
                </span>
              </td>
              <td className="px-3 py-2 text-sm border border-slate-400 text-center">
                <div className="flex items-center gap-x-2">
                  <EditOrderStatus
                    order={order}
                    setIsStatusUpdated={setIsStatusUpdated}
                  />
                  <motion.button
                    onClick={async () => {
                      if (!confirm("Are you sure you want to delete this order?")) return;

                      try {
                        await deleteOrderById(order._id);
                        setOrders((prev) => prev.filter((o) => o._id !== order._id));
                      } catch (error) {
                        console.error("Failed to delete order:", error.message);
                        alert("Error deleting order.");
                      }
                    }}
                    className="h-7 w-6 bg-red-600 p-1 rounded text-white"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.2 }}
                  >
                    <BsTrash />
                  </motion.button>

                </div>
              </td>
            </motion.tr>
          ))}
        </motion.tbody>
      </motion.table>
    </div>
  );
}

export default OrdersTable;