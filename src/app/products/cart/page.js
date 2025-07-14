"use client";

import { motion, useAnimation } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import RemoveFromCart from "@/components/products/RemoveFromCart";
import { IoCog } from "react-icons/io5";
import { LuCircleMinus, LuCirclePlus } from "react-icons/lu";
import { PRODUCTS_ROUTE } from "@/constants/routes";
import { decreaseQuantity, increaseQuantity } from "@/redux/cart/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import CheckoutProducts from "@/components/products/Checkout";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

function ProductsCart() {
  const { products, totalPrice } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const router = useRouter();

  // Scroll state for horizontal scroll indicators
  const scrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  // Update scroll indicators
  const checkScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 5);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 5);
  };

  useEffect(() => {
    checkScroll();
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener("scroll", checkScroll);
    window.addEventListener("resize", checkScroll);
    return () => {
      el.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", checkScroll);
    };
  }, []);

  // Reduce animations on small screens for performance
  const isMobile = typeof window !== "undefined" && window.innerWidth < 640;

  return (
  <div className="min-h-screen bg-from-[#fdffc0] to-[#f1d2f9] dark:bg-[#1a1a1a]">
      <div className="px-[4vw] sm:px-[6vw] md:px-[8vw] lg:px-[10vw] py-[3vh] max-w-screen-xl mx-auto">
      <motion.div
        className="bg-gradient-to-br from-[#fdffc0] to-[#f1d2f9] rounded-3xl border-4 border-[#C3EF38] border-double shadow-2xl dark:bg-gradient-to-tl dark:from-[#b4b0b0] dark:to-[#504e4e]"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: isMobile ? 0.4 : 0.8 }}
        style={{ willChange: "transform, opacity" }}
      >
        <div className="flex flex-col sm:flex-row justify-between items-center">
          <motion.h2
            className="mt-[3vh] mb-[2vh] sm:mb-[1vh] px-[2vw] font-serif text-center sm:text-left text-[6vw] sm:text-3xl font-bold text-[#8b2fa2] dark:text-white"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: isMobile ? 0.4 : 1 }}
          >
            Your Cart ({products.length} items)
          </motion.h2>

          <motion.button
            className="bg-[#8b2fa2] text-white hover:text-[#C3EF38] h-[4vh] px-[3vw] sm:px-[1.5rem] sm:mt-8 rounded-lg hover:bg-[#68217A] transition-colors"
            onClick={() => router.back()}
            whileTap={{ scale: isMobile ? 0.95 : 0.9 }}
          >
            Back
          </motion.button>
        </div>

        {/* TABLE VIEW FOR md+ */}
        <motion.div
          ref={scrollRef}
          className="hidden sm:block p-[3vw] md:py-[3vh] overflow-x-auto shadow-lg bg-gradient-to-tl from-[#ebacfb] to-[#f9fbc6] dark:bg-gray-800 rounded-xl border-2 border-[#84a123] dark:bg-gradient-to-tl dark:from-[#504e4e] dark:to-[#b4b0b0] relative"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: isMobile ? 0.4 : 1 }}
          style={{ willChange: "transform, opacity" }}
        >
          {/* Left shadow indicator */}
          {canScrollLeft && (
            <div className="pointer-events-none absolute top-0 left-0 h-full w-6 bg-gradient-to-r from-[#68217A]/70 to-transparent z-10" />
          )}
          {/* Right shadow indicator */}
          {canScrollRight && (
            <div className="pointer-events-none absolute top-0 right-0 h-full w-6 bg-gradient-to-l from-[#68217A]/70 to-transparent z-10" />
          )}

          <table className="min-w-[600px] w-full border-2 rounded-2xl dark:text-white text-[3.5vw] sm:text-base">
            <thead>
              <tr className="rounded-2xl border-b-2 border-[#8b2fa2] bg-[#f0b8ff] dark:bg-gray-700">
                <th className="p-[1vw] text-left">S.N</th>
                <th colSpan={2} className="p-[1vw] text-left">
                  Product Name
                </th>
                <th className="p-[1vw] text-center">Price</th>
                <th className="p-[1vw] text-center">Quantity</th>
                <th className="p-[1vw] text-right">Total</th>
                <th className="p-[1vw] text-center">
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
                    <div className="h-[4vh] text-center text-[4vw] sm:text-lg font-semibold text-gray-500 dark:text-white">
                      Cart is empty
                    </div>
                  </td>
                </motion.tr>
              ) : (
                products.map((product, index) => (
                  <motion.tr
                    key={product.id || index}
                    className="border-t-2 border-[#68217A] border-dashed bg-[#fff5ff] dark:bg-gray-800 hover:bg-[#fce7ff] dark:hover:bg-gray-700 transition-colors"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    style={{ willChange: "transform, opacity" }}
                  >
                    <td className="p-[1vw]">{index + 1}.</td>
                    <td className="p-[1vw]" colSpan={2}>
                      <div className="flex items-center space-x-[3vw] sm:space-x-4">
                        <motion.div whileHover={{ scale: 1.2 }}>
                          <Image
                            src={product.image}
                            alt={product.name}
                            height={60}
                            width={60}
                            className="h-[8vw] w-[8vw] sm:h-12 sm:w-12 rounded-lg shadow-md object-cover"
                          />
                        </motion.div>
                        <Link
                          href={`${PRODUCTS_ROUTE}/${product.id}`}
                          className="font-semibold text-[#68217A] hover:text-[#8b2fa2] capitalize dark:text-primary-200 hover:underline text-[4vw] sm:text-base"
                        >
                          {product.name}
                        </Link>
                      </div>
                    </td>
                    <td className="p-[1vw] text-center">${product.price}</td>
                    <td className="p-[1vw] text-center">
                      <div className="flex items-center justify-center space-x-[3vw] sm:space-x-3">
                        <motion.button
                          className="px-[2vw] py-[1vw] bg-[#68217A] rounded-full text-white hover:bg-[#8b2fa2] border-2 border-[#6f8622]"
                          onClick={() => dispatch(decreaseQuantity(product))}
                          disabled={product.quantity <= 1}
                          whileTap={{ scale: 0.9 }}
                        >
                          <LuCircleMinus size={18} />
                        </motion.button>
                        <span className="text-[5vw] sm:text-lg font-bold">
                          {product.quantity}
                        </span>
                        <motion.button
                          className="px-[2vw] py-[1vw] bg-[#C3EF38] rounded-full text-gray-700 hover:bg-[#d0fa44] border-2 border-[#68217A]"
                          onClick={() => dispatch(increaseQuantity(product))}
                          disabled={product.quantity >= 5}
                          whileTap={{ scale: 0.9 }}
                        >
                          <LuCirclePlus size={18} />
                        </motion.button>
                      </div>
                    </td>
                    <td className="p-[1vw] text-right font-bold">
                      ${product.price * product.quantity}
                    </td>
                    <td className="p-[1vw] text-center">
                      <RemoveFromCart product={product} />
                    </td>
                  </motion.tr>
                ))
              )}
            </tbody>

            {products.length > 0 && (
              <tfoot>
                <motion.tr
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className="border-t-4 border-[#68217A]"
                >
                  <td colSpan={4}></td>
                  <td className="font-serif font-extrabold text-[4vw] sm:text-lg text-[#68217A]">
                    Sub total:
                  </td>
                  <td className="text-[4vw] sm:text-lg font-bold">${totalPrice}</td>
                  <td></td>
                </motion.tr>

                <motion.tr
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className="border-1 border-[#68217A]"
                >
                  <td colSpan={4}></td>
                  <td className="font-serif font-extrabold text-[4vw] sm:text-lg text-[#68217A]">
                    Discount:
                  </td>
                  <td className="text-[4vw] sm:text-lg text-[#d0fa44]">
                    ${Math.floor(totalPrice * 0.1)}
                  </td>
                  <td></td>
                </motion.tr>

                <motion.tr
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className="border-b-4 border-[#68217A]"
                >
                  <td colSpan={4}></td>
                  <td className="font-serif font-extrabold text-[5vw] sm:text-xl text-[#68217A]">
                    Grand total:
                  </td>
                  <td className="text-[5vw] sm:text-xl font-bold text-green-500">
                    ${Math.floor(totalPrice * 0.9)}
                  </td>
                  <td></td>
                </motion.tr>
              </tfoot>
            )}
          </table>
        </motion.div>

        {/* STACKED MOBILE VIEW */}
        <div className="sm:hidden mt-4 space-y-4">
          {products.length === 0 ? (
            <div className="text-center text-lg font-semibold text-gray-500 dark:text-white h-[6vh] flex items-center justify-center">
              Cart is empty
            </div>
          ) : (
            products.map((product, index) => (
              <motion.div
                key={product.id || index}
                className="bg-[#fff5ff] dark:bg-gray-800 rounded-xl border-2 border-[#68217A] p-4 shadow-md"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                style={{ willChange: "transform, opacity" }}
              >
                <div className="flex space-x-4">
                  <Image
                    src={product.image}
                    alt={product.name}
                    height={70}
                    width={70}
                    className="rounded-lg object-cover"
                  />
                  <div className="flex flex-col flex-grow">
                    <Link
                      href={`${PRODUCTS_ROUTE}/${product.id}`}
                      className="font-semibold text-[#68217A] hover:text-[#8b2fa2] capitalize dark:text-primary-200 hover:underline text-lg"
                    >
                      {product.name}
                    </Link>
                    <div className="mt-1 text-sm text-gray-600 dark:text-gray-300">
                      Price: <span className="font-bold">${product.price}</span>
                    </div>
                    <div className="mt-1 text-sm text-gray-600 dark:text-gray-300">
                      Total:{" "}
                      <span className="font-bold">${product.price * product.quantity}</span>
                    </div>

                    <div className="flex items-center mt-2 space-x-4">
                      <motion.button
                        className="px-3 py-1 bg-[#68217A] rounded-full text-white hover:bg-[#8b2fa2] border-2 border-[#6f8622]"
                        onClick={() => dispatch(decreaseQuantity(product))}
                        disabled={product.quantity <= 1}
                        whileTap={{ scale: 0.9 }}
                      >
                        <LuCircleMinus size={20} />
                      </motion.button>
                      <span className="text-lg font-bold">{product.quantity}</span>
                      <motion.button
                        className="px-3 py-1 bg-[#C3EF38] rounded-full text-gray-700 hover:bg-[#d0fa44] border-2 border-[#68217A]"
                        onClick={() => dispatch(increaseQuantity(product))}
                        disabled={product.quantity >= 5}
                        whileTap={{ scale: 0.9 }}
                      >
                        <LuCirclePlus size={20} />
                      </motion.button>

                      <div className="ml-auto">
                        <RemoveFromCart product={product} />
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>

        <motion.div
          className="mt-[2vh] md:mt-[3vh] flex justify-end"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: isMobile ? 0.4 : 0.8 }}
          style={{ willChange: "opacity" }}
        >
          <CheckoutProducts disabled={products.length === 0} />
        </motion.div>
      </motion.div>
    </div>

  </div>  
    
    
  );
}

export default ProductsCart;
