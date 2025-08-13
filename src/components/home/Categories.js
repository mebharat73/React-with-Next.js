'use client';

import { motion } from 'framer-motion';  // Import Framer Motion
import apache from "@/assets/images/apache.png";
import s24 from "@/assets/images/s24.png";
import acer from "@/assets/images/acer.png";
import car from "@/assets/images/car.png";
import skincare from "@/assets/images/skincare.png";
import electronics from "@/assets/images/electronics.png";
import Image from "next/image";
import Link from "next/link";
import { PRODUCTS_ROUTE } from "@/constants/routes";

const categories = [
  {
    title: "Smartphones",
    image: s24,
  },
  {
    title: "Laptop",
    image: acer,
  },
  {
    title: "Electronics",
    image: electronics,
  },
  {
    title: "Bikes",
    image: apache,
  },
  {
    title: "Cars",
    image: car,
  },
  {
    title: "Skincare",
    image: skincare,
  },
];

function HomeCategories() {
  return (
    <div className="mt-5 py-10 px-6 bg-[#F5F5F7] dark:bg-gradient-to-tl dark:from-[#979595] dark:to-[#000000] border-y-2 border-[#84a123] rounded-3xl">
      <h2 className="font-serif text-[#68217A] text-4xl text-center font-semibold mb-8 dark:text-white">
        Popular Categories
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-5">
        {categories.map((category, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.8 }}  // Initial state: invisible and slightly smaller
            animate={{ opacity: 1, scale: 1 }}    // Final state: fully visible and normal size
            transition={{ duration: 0.5, delay: 0.2 * index }}  // Delay for staggered animation
          >
            <Link
              href={`${PRODUCTS_ROUTE}/category/${category.title}`}
              className="flex flex-col items-center justify-center relative"
            >
              <motion.div
                whileHover={{ scale: 1.1 }}  // Hover effect to scale up the card
                className="px-5 py-2 bg-[#F5F5F7] hover:bg-[#d4d5dc] rounded-xl transition duration-300"
              >
                <Image
                  src={category.image}
                  alt="category"
                  height={200}
                  width={200}
                  className="rounded-xl"
                />
              </motion.div>
              <h3 className="absolute bottom-1 font-semibold text-gray-800">{category.title}</h3>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default HomeCategories;
