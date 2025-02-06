"use client";

import Image from "next/image";
import { useState } from "react";
import placeholder from "@/assets/images/placeholder.jpeg";
import { RxCross2 } from "react-icons/rx";
import { motion } from "framer-motion"; // Import Framer Motion

function ZoomImage({ url, zoom = false, setZoom }) {
  return (
    <motion.div 
      className={zoom ? "fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-20 rounded-2xl" : "hidden"} 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      transition={{ duration: 0.5 }}
    >
      <button
        className="absolute top-4 right-4 text-white"
        onClick={() => setZoom(false)}
      >
        <RxCross2 className="h-8 w-8 bg-gradient-to-tl from-[#C3EF38] to-[#dd53ff] rounded-full border-2 border-[#68217A] animate-spin" />
      </button>
      <Image
        src={url}
        alt="Product details img"
        layout="intrinsic" // Use intrinsic layout for responsive images
        width={1000}
        height={1000}
        className="max-w-full max-h-full p-5 rounded-3xl border-2 border-[#84a123] bg-gradient-to-tl from-[#ebacfb] to-[#f9fbc6]"
      />
    </motion.div>
  );
}

function ProductImageViewer({ product }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [zoom, setZoom] = useState(false);

  if (product.imageUrls.length === 0)
    return (
      <Image
        alt="product image"
        src={placeholder}
        width={500}
        height={500}
        className="h-40 w-auto mx-auto"
      />
    );

  return (
    <div className="grid grid-cols-1 grid-rows-[1fr,auto] gap-10">
      <ZoomImage
        url={product.imageUrls[currentImageIndex]}
        zoom={zoom}
        setZoom={setZoom}
      />
      <motion.div 
        className="grid grid-cols-1 grid-rows-[1fr,auto] gap-5"
        whileHover={{ scale: 1.05 }} 
        transition={{ duration: 0.3 }}
      >
        <Image
          src={product.imageUrls[currentImageIndex]}
          alt="Product details img"
          width={500}
          height={500}
          className="p-2 h-52 w-auto cursor-pointer rounded-2xl border-4 border-[#C3EF38] border-double to-[#dd53ff]"
          onClick={() => setZoom(true)}
        />
      </motion.div>

      <div className="flex">
        {product.imageUrls.map((url, index) => (
          <Image
            key={index}
            src={url}
            alt="Product details img"
            width={40}
            height={40}
            className={`${
              currentImageIndex === index ? "bg-blue-100" : "bg-white"
            } h-auto w-auto p-2 m-2 border rounded`}
            onClick={() => setCurrentImageIndex(index)}
          />
        ))}
      </div>
    </div>
  );
}

export default ProductImageViewer;