"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getProductById } from "@/api/products";
import {
  MdOutlineStarPurple500,
  MdStarHalf,
  MdArrowBack,
} from "react-icons/md";

import Link from "next/link";
import { PRODUCTS_ROUTE } from "@/constants/routes";
import ProductImageViewer from "@/components/products/ImageViewer";
import AddToCart from "@/components/products/AddToCart";
import styles from './animations.css';

export default function ProductById() {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProduct() {
      try {
        const data = await getProductById(productId);
        setProduct(data);
      } catch (err) {
        console.error("Failed to fetch product:", err);
      } finally {
        setLoading(false);
      }
    }

    if (productId) {
      fetchProduct();
    }
  }, [productId]);

  if (loading) return <div className="p-10 text-center">Loading product...</div>;
  if (!product) return <div className="p-10 text-center text-red-500">Product not found or failed to load.</div>;

  return (
    <div className="py-12 px-10 flex flex-col lg:flex-row justify-around bg-[#F5F5F7] dark:bg-gradient-to-tl dark:from-[#504e4e] dark:to-[#b4b0b0]">

      {/* Left: Product Image */}
      <div className="p-5 rounded-2xl border-2 border-[#D1D1D1] relative w-full lg:w-1/2 md:p-16 bg-gradient-to-tl from-[#F5F5F7] to-[#97bee7] dark:bg-gradient-to-tl dark:from-[#000000] dark:to-[#979595] flex items-center justify-around transition-transform transform hover:scale-105 hover:shadow-xl duration-300 ease-in-out">
        <ProductImageViewer product={product} className="rounded-3xl transition-transform duration-500 hover:scale-150 hover:shadow-lg product-image" />
      </div>

      {/* Right: Product Details */}
      <div className="w-full lg:w-1/2 p-10 md:px-10 bg-gradient-to-br from-[#F5F5F7] to-[#97bee7] dark:bg-gray-700 rounded-2xl border-2 border-[#D1D1D1] dark:bg-gradient-to-tl dark:from-[#b4b0b0] dark:to-[#504e4e]">

        <Link href={PRODUCTS_ROUTE} className="hidden lg:flex items-center dark:text-gray-100 hover:underline font-bold text-[#1A1A1A] py-2 px-2 hover:bg-[#999494] rounded-3xl">
          <MdArrowBack className="mr-3 bg-gradient-to-tl from-[#F5F5F7] to-[#97bee7] rounded-full" /> Go Back
        </Link>

        <p className="px-5 py-1 mt-2 font-bold uppercase text-[#1A1A1A] text-center bg-gradient-to-tl from-[#F5F5F7] to-[#97bee7] rounded-md dark:text-gray-300">
          {product.category}
        </p>

        <h1 className="text-3xl md:text-2xl mt-5 font-bold text-[#1A1A1A] dark:text-white my-0">
          {product.name}
        </h1>

        {/* Description */}
        <div className="py-5">
          <div className="border-b border-gray-300 mb-5">
            <h3 className="font-serif text-xl font-extrabold text-[#1A1A1A] dark:text-gray-100">
              Description
            </h3>
          </div>
          <p className="mt-3 dark:text-white">{product.description}</p>
          <ul className="mt-3 px-6 list-disc dark:text-gray-100">
            <li>Features: High quality material</li>
            <li>Delivery: On time</li>
            <li>Product is as shown in the image</li>
            <li>Delivery all over Nepal.</li>
          </ul>
        </div>

        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center">
            <span className="text-xl md:text-3xl text-[#1A1A1A] font-bold dark:text-white mr-2">$</span>
            <span className="text-[#1A1A1A] font-mono dark:text-white text-xl md:text-2xl font-bold">
              {Math.floor(product.price * 0.9)}
            </span>
          </div>

          <span className="px-3 py-1 font-serif font-semibold inline-flex items-center rounded-md bg-[#F5F5F7] text-xs text-[#1A1A1A] ring-1 ring-inset ring-primary-500/10">
            {product.brand}
          </span>

          
        </div>

        <div className="mt-5 flex items-center justify-end">
          <AddToCart product={product} className="w-full md:w-1/2 py-3 bg-[#F5F5F7] text-[#1A1A1A] text-lg rounded-2xl transition-all transform hover:scale-105 hover:bg-[#b5a5ba] duration-300" />
        </div>
      </div>
    </div>
  );
}
