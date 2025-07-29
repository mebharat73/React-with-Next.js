"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";

export function SattapattaItemImageGallery({ imageUrls = [], title }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [zoom, setZoom] = useState(false);

  const handleThumbnailClick = (index) => setCurrentIndex(index);
  const handleNext = () => setCurrentIndex((prev) => (prev + 1) % imageUrls.length);
  const handlePrev = () => setCurrentIndex((prev) => (prev - 1 + imageUrls.length) % imageUrls.length);

  return (
    <div className="relative w-full flex flex-col items-center">
      {/* Zoomed Image Overlay */}
      {zoom && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 backdrop-blur-sm"
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
          <img
            src={imageUrls[currentIndex]}
            alt={title}
            className="max-w-[90vw] max-h-[90vh] rounded-3xl border-4 border-[#84a123] bg-gradient-to-tl from-[#ebacfb] to-[#f9fbc6] p-4 object-contain"
          />
        </motion.div>
      )}

      {/* Main Image Container with Arrows */}
      <div className="relative flex justify-center items-center p-10 mt-4 md:p-12 md:-mt-4 rounded-2xl border-2 border-[#84a123] bg-gradient-to-tl from-[#f0f656] to-[#e382fb] dark:from-[#000000] dark:to-[#979595]">
        {/* Prev Arrow */}
        <button
          onClick={handlePrev}
          className="absolute left-3 top-1/2 -translate-y-1/2 bg-[#68217A] text-white p-2 rounded-full hover:scale-110 transition"
        >
          <FaArrowLeft />
        </button>

        {/* Main Image */}
        <img
          src={imageUrls[currentIndex]}
          alt={title}
          className="w-[400px] h-[400px] object-contain rounded-3xl bg-white shadow cursor-zoom-in border"
          onClick={() => setZoom(true)}
        />

        {/* Next Arrow */}
        <button
          onClick={handleNext}
          className="absolute right-3 top-1/2 -translate-y-1/2 bg-[#68217A] text-white p-2 rounded-full hover:scale-110 transition"
        >
          <FaArrowRight />
        </button>
      </div>

      {/* Thumbnails */}
      <div className="mt-4 flex gap-3 justify-center flex-wrap">
        {imageUrls.map((url, index) => (
          <img
            key={index}
            src={url}
            alt={`Thumbnail ${index + 1}`}
            onClick={() => handleThumbnailClick(index)}
            className={`w-20 h-20 object-cover rounded-md border-2 cursor-pointer transition-transform transform hover:scale-105 ${
              index === currentIndex ? "border-[#68217A]" : "border-transparent"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
