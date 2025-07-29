"use client";

import Image from "next/image";
import { useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { motion } from "framer-motion";
import placeholder from "@/assets/images/placeholder.jpeg";

function ZoomImage({ url, zoom = false, setZoom }) {
  return (
    <motion.div
      className={zoom ? "fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 backdrop-blur-sm" : "hidden"}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <button
        className="absolute top-4 right-4 text-white hover:scale-110 transition"
        onClick={() => setZoom(false)}
      >
        <RxCross2 className="h-8 w-8 bg-gradient-to-tl from-[#C3EF38] to-[#dd53ff] rounded-full border-2 border-[#68217A] p-1" />
      </button>
      <Image
        src={url}
        alt="Zoomed product image"
        width={1000}
        height={1000}
        className="max-w-[90vw] max-h-[90vh] rounded-3xl border-4 border-[#84a123] bg-gradient-to-tl from-[#ebacfb] to-[#f9fbc6] p-4 object-contain"
      />
    </motion.div>
  );
}

function ProductImageViewer({ product }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [zoom, setZoom] = useState(false);

  if (!product?.imageUrls?.length) {
    return (
      <Image
        alt="product image"
        src={placeholder}
        width={400}
        height={400}
        className="h-60 w-auto mx-auto rounded-xl"
      />
    );
  }

  const nextImage = () => {
    setCurrentImageIndex((prev) =>
      prev === product.imageUrls.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? product.imageUrls.length - 1 : prev - 1
    );
  };

  return (
    <div className="flex flex-col items-center gap-4 w-full">
      {/* Zoomed image overlay */}
      <ZoomImage
        url={product.imageUrls[currentImageIndex]}
        zoom={zoom}
        setZoom={setZoom}
      />

      {/* Main Image with Arrows */}
      <div className="relative w-[350px] h-[350px] md:w-[400px] md:h-[400px] bg-white rounded-3xl shadow-md border-4 border-[#C3EF38] overflow-hidden">
        {/* Arrows */}
        <button
          onClick={prevImage}
          className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-[#68217A] text-white p-2 rounded-full hover:scale-110 transition"
        >
          <FaArrowLeft />
        </button>

        <button
          onClick={nextImage}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-[#68217A] text-white p-2 rounded-full hover:scale-110 transition"
        >
          <FaArrowRight />
        </button>

        {/* Main image */}
        <Image
          src={product.imageUrls[currentImageIndex]}
          alt={`Product image ${currentImageIndex + 1}`}
          width={400}
          height={400}
          className="w-full h-full object-contain cursor-zoom-in p-4"
          onClick={() => setZoom(true)}
        />
      </div>

      {/* Thumbnails */}
      <div className="flex gap-2 flex-wrap justify-center mt-2">
        {product.imageUrls.map((url, index) => (
          <button
            key={index}
            onClick={() => setCurrentImageIndex(index)}
            className={`border-2 rounded-xl overflow-hidden transition hover:scale-105 ${
              index === currentImageIndex
                ? "border-[#68217A]"
                : "border-transparent"
            }`}
          >
            <Image
              src={url}
              alt={`Thumbnail ${index + 1}`}
              width={60}
              height={60}
              className="object-cover w-[60px] h-[60px]"
            />
          </button>
        ))}
      </div>
    </div>
  );
}

export default ProductImageViewer;
