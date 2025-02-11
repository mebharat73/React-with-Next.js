import { ORDER_PENDING } from "@/constants/orderStatus";
import Image from "next/image";
import ConfirmOrder from "./Confirm";
import { motion } from "framer-motion";

function OrdersCard({ order, status }) {
  return (
    <motion.div
      className="border-4 rounded-3xl border-[#8b2fa2] border-double my-5 bg-gradient-to-tl from-[#ebacfb] to-[#f9fbc6] dark:bg-gradient-to-tl dark:from-[#b4b0b0] dark:to-[#504e4e]"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, type: "spring", stiffness: 300 }}
    >
      <div className="px-10 py-0 rounded-full flex items-center justify-between m-6 bg-gradient-to-tl from-[#ebacfb] to-[#f9fbc6] dark:bg-gradient-to-tl dark:from-[#504e4e] dark:to-[#b4b0b0]">
        <div>
          <p className="text-[#68217A] font-extrabold dark:text-gray-200 text-sm">OrderId</p>
          <h5 className="font-semibold dark:text-white">#{order.id}</h5>
        </div>
        <motion.span
          className="inline-flex items-center rounded-2xl px-2 py-1 text-xs font-medium ring-1 ring-inset"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 300, delay: 0.3 }}
          style={{
            backgroundColor:
              order.status === "Pending"
                ? "#68217A"
                : order.status === "Confirmed"
                ? "#8b2fa2"
                : order.status === "Shipped"
                ? "#3B82F6"
                : "#9333EA",
            color: "white",
          }}
        >
          {order.status}
        </motion.span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 m-6">
        {order.orderItems.map((item, index) => {
          if (!item?.product) return null;

          return (
            <motion.div
              key={index}
              className="grid grid-cols-[auto,1fr] gap-5 py-3 px-5 rounded-2xl border-2 border-[#84a123] border-dashed dark:text-white bg-gradient-to-br from-[#fdffc0] to-[#f1d2f9] dark:bg-gradient-to-tl dark:from-[#504e4e] dark:to-[#b4b0b0]"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Image
                src={item.product.imageUrls[0]}
                alt={item.product.name}
                height={100}
                width={100}
                className="h-24 w-auto rounded-lg transition hover:scale-125"
              />
              <div>
                <h5 className="font-serif text-[#68217A] font-semibold text-xl">{item.product.name}</h5>
                <p className="text-base font-extrabold font-serif text-[#8b2fa2]">
                  Brand:
                  <span className="font-semibold ml-2">{item.product.brand}</span>
                </p>
                <p className="text-sm font-extrabold text-gray-900 dark:text-gray-100">
                  ${Math.floor(item.product.price * 0.9)}
                </p>
                <p>Quantity: {item.quantity}</p>
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="bg-[#84a123] dark:bg-slate-800 dark:text-white rounded-b-2xl py-2 px-5 flex justify-between items-center">
        <p className="text-[#68217A] font-extrabold">
          Total price:
          <span className="font-bold ml-4 text-[#d0fa44]">${order.totalPrice}</span>
        </p>
        <div className={status === ORDER_PENDING ? "block" : "hidden"}>
          <ConfirmOrder order={order} />
        </div>
      </div>
    </motion.div>
  );
}

export default OrdersCard;