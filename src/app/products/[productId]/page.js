import { getProductById } from "@/api/products";
import {
  MdOutlineStarPurple500,
  MdStarHalf,
  MdOutlineShoppingCart,
  MdArrowBack,
} from "react-icons/md";

import Link from "next/link";
import { PRODUCTS_ROUTE } from "@/constants/routes";
import ProductImageViewer from "@/components/products/ImageViewer";
import AddToCart from "@/components/products/AddToCart";
import styles from './animations.css';

async function ProductById({ params }) {
  const id = (await params).productId;

  const product = await getProductById(id);

  return (
<div className="py-12 px-10 flex flex-col lg:flex-row justify-around bg-gradient-to-br from-[#fdffc0] to-[#f1d2f9] dark:bg-gray-900">

{/* Left Column: Product Image */}
<div className="p-5 rounded-2xl border-2 border-[#84a123] relative w-full lg:w-1/2 md:p-16 bg-gradient-to-tl from-[#f0f656] to-[#e382fb] dark:bg-gray-800 flex items-center justify-around transition-transform transform hover:scale-105 hover:shadow-xl duration-300 ease-in-out">
  <ProductImageViewer 
    product={product} 
    className="rounded-3xl transition-transform duration-500 hover:scale-150 hover:shadow-lg product-image"
  />
</div>

{/* Right Column: Product Details */}
<div className="w-full lg:w-1/2 p-10 md:px-10 bg-gradient-to-br from-[#fdffc0] to-[#f1d2f9] dark:bg-gray-700 rounded-2xl border-2 border-[#8b2fa2]">
  <Link
    href={PRODUCTS_ROUTE}
    className="hidden lg:flex items-center dark:text-gray-100 hover:underline font-bold text-[#68217A] py-2 px-2 hover:bg-[#d0fa44] rounded-3xl"
  >
    <MdArrowBack className="mr-3 bg-gradient-to-tl from-[#8e912d] to-[#dd53ff] rounded-full" /> Go Back
  </Link>

  {/* Category */}
  <p className="px-5 py-1 mt-2 font-bold uppercase text-[#68217A] text-center bg-gradient-to-tl from-[#f0f656] to-[#e382fb] rounded-md dark:text-gray-300 fade-in">
    {product.category}
  </p>

  {/* Product Name */}
  <h1 className="text-3xl md:text-2xl mt-5 font-bold text-[#8b2fa2] dark:text-white my-0 slide-up">
    {product.name}
  </h1>

  
   




  {/* Description */}
  <div className="py-5">
    <div className="border-b border-gray-300 mb-5">
      <h3 className="font-serif text-xl font-extrabold text-[#84a123] dark:text-gray-100">
        Description
      </h3>
    </div>
    <p className="mt-3 dark:text-white fade-in">
      {product.description}
    </p>
    <ul className="mt-3 px-6 list-disc dark:text-gray-100">
      <li>Features: High quality material</li>
      <li>Delivery: On time</li>
      <li>Product is as shown in the image</li>
      <li>Delivery all over Nepal.</li>
    </ul>
  </div>

    <div className="flex items-center justify-between mt-2">


    {/* Price */}
    <div className="flex items-center">
      <span className="text-xl md:text-3xl text-[#68217A] font-bold dark:text-white mr-2">
        $
      </span>
      <span className="text-[#d15bee] font-mono dark:text-white text-xl md:text-2xl font-bold">
        {Math.floor(product.price * 0.9)}
      </span>
      
      
    </div>
        {/* Brand */}
    <span className="px-3 py-1 font-serif font-semibold inline-flex items-center rounded-md bg-[#84a123] text-xs text-white ring-1 ring-inset ring-primary-500/10">
      {product.brand}
    </span>

    {/* Ratings */}
    <div className="flex text-yellow-500 md:text-2xl items-center">
      <MdOutlineStarPurple500 />
      <MdOutlineStarPurple500 />
      <MdOutlineStarPurple500 />
      <MdOutlineStarPurple500 />
      <MdStarHalf />
      <span className="text-gray-600 text-xs md:text-sm ml-3 font-semibold dark:text-gray-300">
        4.5 (329 rev.)
      </span>
    </div>



    </div>

  {/* Add to Cart Button */}
  <div className="mt-5 flex items-center justify-end">
    <AddToCart product={product} className="w-full md:w-1/2 py-3 bg-[#68217A] text-[#C3EF38] text-lg rounded-2xl transition-all transform hover:scale-105 hover:bg-[#8b2fa2] duration-300 add-to-cart-btn" />
  </div>

  
</div>

</div>

  );
}

export default ProductById;
