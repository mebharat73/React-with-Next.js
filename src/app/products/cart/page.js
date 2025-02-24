"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import RemoveFromCart from "@/components/products/RemoveFromCart";
import { IoCog } from "react-icons/io5";
import { LuCircleMinus, LuCirclePlus } from "react-icons/lu";
import { PRODUCTS_ROUTE } from "@/constants/routes";
import { decreaseQuantity, increaseQuantity } from "@/redux/cart/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import CheckoutProducts from "@/components/products/Checkout";
import { useRouter, useSearchParams } from 'next/navigation';

function ProductsCart() {
  const { products, totalPrice } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const router = useRouter();  // Create router instance

  return (
    <div className="px-4 sm:px-8 lg:px-12 py-6 max-w-screen-xl mx-auto">

      <motion.div
        className="bg-gradient-to-br from-[#fdffc0] to-[#f1d2f9] rounded-3xl border-4 border-[#C3EF38] border-double shadow-2xl dark:bg-gradient-to-tl dark:from-[#b4b0b0] dark:to-[#504e4e]"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="flex justify-between items-center">
          <motion.h2
            className="mt-10 mb-5 md:mb-4 px-5 font-serif text-center md:text-left text-3xl font-bold text-[#8b2fa2] dark:text-white"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            Your Cart ({products.length} items)
          </motion.h2>

          {/* Back Button */}
          <motion.button
              className="bg-[#8b2fa2] text-white hover:text-[#C3EF38] h-8 px-5 md:px-6 mt-8 mr-6 rounded-lg hover:bg-[#68217A] transition-colors"
              onClick={() => router.back()}  // Handle the back navigation
            >
              Back
            </motion.button>
        </div>

        {/* Cart Details */}
        <motion.div
          className="p-4 md:py-5 overflow-hidden shadow-lg bg-gradient-to-tl from-[#ebacfb] to-[#f9fbc6] dark:bg-gray-800 rounded-xl border-2 border-[#84a123] dark:bg-gradient-to-tl dark:from-[#504e4e] dark:to-[#b4b0b0]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <div className="overflow-x-auto h-[50vh] md:h-[60vh] border-x-2 border-[#68217A] rounded-xl">
            <table className="min-w-full border-2 rounded-2xl dark:text-white">
              <thead>
                <tr className="rounded-2xl border-b-2 border-[#8b2fa2] bg-[#f0b8ff] dark:bg-gray-700">
                  <th className="p-4 text-sm text-left">S.N</th>
                  <th colSpan={2} className="p-4 text-sm text-left">Product Name</th>
                  <th className="p-4 text-sm text-center">Price</th>
                  <th className="p-4 text-sm text-center">Quantity</th>
                  <th className="p-4 text-sm text-right">Total</th>
                  <th className="p-4 text-lg text-center">
                    <IoCog className="inline-block" />
                  </th>
                </tr>
              </thead>
              <tbody>
                {products.length === 0 ? (
                  <motion.tr
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <td colSpan={7}>
                      <div className="h-8">
                        <div className="text-center text-lg font-semibold text-gray-500 dark:text-white">
                          Cart is empty
                        </div>
                      </div>
                    </td>
                  </motion.tr>
                ) : (
                  products.map((product, index) => (
                    <motion.tr
                      key={index}
                      className="border-t-2 border-[#68217A] border-dashed bg-[#fff5ff] dark:bg-gray-800 hover:bg-[#fce7ff] dark:hover:bg-gray-700 transition-colors"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: index * 0.1, duration: 0.5 }}
                    >
                      <td className="p-4">{index + 1}.</td>
                      <td className="p-4" colSpan={2}>
                        <div className="flex items-center space-x-4">
                          <motion.div whileHover={{ scale: 1.2 }}>
                            <Image
                              src={product.image}
                              alt={product.name}
                              height={60}
                              width={60}
                              className="h-12 w-12 rounded-lg shadow-md"
                            />
                          </motion.div>
                          <Link
                            href={`${PRODUCTS_ROUTE}/${product.id}`}
                            className="font-semibold text-[#68217A] hover:text-[#8b2fa2] capitalize dark:text-primary-200 hover:underline"
                          >
                            {product.name}
                          </Link>
                        </div>
                      </td>
                      <td className="p-4 text-center">${product.price}</td>
                      <td className="p-4 text-center">
                        <div className="flex items-center justify-center space-x-3">
                          <motion.button
                            className="px-2 py-2 bg-[#68217A] rounded-full text-white hover:bg-[#8b2fa2] border-2 border-[#6f8622]"
                            onClick={() => dispatch(decreaseQuantity(product))}
                            disabled={product.quantity <= 1}
                            whileTap={{ scale: 0.9 }}
                          >
                            <LuCircleMinus />
                          </motion.button>
                          <span className="text-lg font-bold">{product.quantity}</span>
                          <motion.button
                            className="px-2 py-2 bg-[#C3EF38] rounded-full text-gray-700 hover:bg-[#d0fa44] border-2 border-[#68217A]"
                            onClick={() => dispatch(increaseQuantity(product))}
                            disabled={product.quantity >= 5}
                            whileTap={{ scale: 0.9 }}
                          >
                            <LuCirclePlus />
                          </motion.button>
                        </div>
                      </td>
                      <td className="p-4 text-right font-bold">${product.price * product.quantity}</td>
                      <td className="p-4 text-center">
                        <RemoveFromCart product={product} />
                      </td>
                    </motion.tr>
                  ))
                )}
              </tbody>
            </table>

            {products.length > 0 && (
              <div className="grid items-center justify-center mt-4">
                <motion.tr
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className="border-t-4 border-[#68217A]"
                >
                  <td colSpan={4}></td>
                  <td className="font-serif font-extrabold text-lg text-[#68217A]">
                    Sub total:
                  </td>
                  <td className="text-lg font-bold">${totalPrice}</td>
                </motion.tr>

                <motion.tr
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className="border-1 border-[#68217A]"
                >
                  <td colSpan={4}></td>
                  <td className="font-serif font-extrabold text-lg text-[#68217A]">
                    Discount:
                  </td>
                  <td className="text-lg text-[#d0fa44]">${Math.floor(totalPrice * 0.1)}</td>
                </motion.tr>

                <motion.tr
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className="border-b-4 border-[#68217A]"
                >
                  <td colSpan={4}></td>
                  <td className="font-serif font-extrabold text-lg text-[#68217A]">Grand total:</td>
                  <td className="text-xl font-bold text-green-500">
                    ${Math.floor(totalPrice * 0.9)}
                  </td>
                </motion.tr>
              </div>
            )}
          </div>
        </motion.div>

        <motion.div
          className="mt-4 md:mt-8 flex justify-end"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <CheckoutProducts disabled={products.length === 0} />
        </motion.div>
      </motion.div>
    </div>
  );
}

export default ProductsCart;
