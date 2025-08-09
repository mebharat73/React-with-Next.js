'use client';
import ProductForm from "@/components/products/Form";
import { useRouter } from 'next/navigation';
import { motion } from "framer-motion";

function AddProductPage() {
  const router = useRouter();

  return (
    <div className="bg-gradient-to-tl from-[#ebacfb] to-[#f9fbc6] flex items-center flex-col p-2 dark:bg-gradient-to-tl dark:from-[#504e4e] dark:to-[#b4b0b0] relative">
      <h2 className="text-xl md:text-3xl font-extrabold font-serif dark:text-white text-[#68217A] p-2">
        Add Product Page
      </h2>

      {/* Back Button */}
      <motion.button
        className="bg-[#8b2fa2] text-white hover:text-[#C3EF38] h-6 px-4 mt-1 rounded-lg hover:bg-[#68217A] transition-colors absolute top-5 left-5 md:top-5 md:left-10 lg:left-20"
        onClick={() => router.back()} // Handle the back navigation
      >
        Back
      </motion.button>

      <ProductForm />
    </div>
  );
}

export default AddProductPage;
