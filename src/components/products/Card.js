"use client";

import Image from "next/image";
import Link from "next/link";
import Modal from "../Modal";
import placeholder from "@/assets/images/placeholder.jpeg";
import { MdDelete, MdOutlineCategory, MdOutlineEdit } from "react-icons/md";
import { PRODUCTS_ROUTE } from "@/constants/routes";
import { toast, ToastContainer } from "react-toastify";
import { deleteProduct } from "@/api/products";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useSelector } from "react-redux";
import { addToCart } from "@/redux/cart/cartSlice";
import { PRODUCT_GRID_VIEW } from "@/constants/productView";
import { FaStar } from "react-icons/fa"; // For star rating
import { motion } from 'framer-motion';
import AddToCart from "@/components/products/AddToCart";


function ProductCard({ product, productView }) {
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const router = useRouter();

  function addProductToCart() {
    dispatch(
      addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.imageUrls[0],
      })
    );

    toast.success(`${product.name} added to cart successfully.`, {
      autoClose: 1500,
    });
  }


  function removeProduct() {
    setShowDeletePopup(true);
  }

  async function confirmDeleteProduct() {
    try {
      await deleteProduct(product.id);
      toast.success(`${product.name} deleted successfully.`, {
        autoClose: 1500,
      });
      router.refresh();
    } catch (error) {
      toast.error(error.response.data ?? "", {
        autoClose: 1500,
      });
    } finally {
      setShowDeletePopup(false);
    }
  }

  const className =
    productView === PRODUCT_GRID_VIEW
      ? "mx-1 my-1 py-1 px-1 md:bg-gradient-to-tl from-[#ebacfb] to-[#f9fbc6] md:mx-6 md:my-2 md:p-2 rounded-3xl border-2 border-[#8e912d] border-double shadow-lg shadow-[#d0fa44] hover:bg-gradient-to-br from-[#F5F7FA] to-[#FEEEF9] dark:bg-gradient-to-tl dark:from-[#504e4e] dark:to-[#b4b0b0]"
      : "grid grid-cols-1 sm:grid-cols-[1fr,1fr] md:grid-cols-[1fr,2fr] gap-x-20 bg-gray-50 p-5 sm:p-10 rounded-xl shadow dark:bg-gray-900 hover:bg-gray-100 dark:hover:bg-gray-950 transition-all duration-300 ease-in-out";

  const descriptionPreview = product.description.substring(0, 60);
  const fullDescription = product.description;

  return (
    <div className={className}>
      {/* Product Image */}
      <Link href={`${PRODUCTS_ROUTE}/${product.id}`}>
        <div className="relative">
          {/* Scrolling Product Name at the Top */}
          <div className="mb-2 border-1 border-[#8b2fa2] border-solid bg-gradient-to-br rounded-lg from-[#f0f656] to-[#e382fb] text-[#68217A] font-bold whitespace-nowrap overflow-hidden">
            <motion.div
              className="overflow-hidden"
              animate={{ x: ["100%", "-100%"] }} // Move from right to left
              transition={{
                x: {
                  repeat: Infinity,  // Loop indefinitely
                  repeatType: "loop",  // Make it a continuous loop
                  duration: 10,  // Adjust duration for scrolling speed
                  ease: "linear",  // Smooth linear scroll
                },
              }}
            >
              {product.name}
            </motion.div>
            
          </div>
        </div>

          <Image
              alt={product.name}
              src={product.imageUrls.length > 0 ? product.imageUrls[0] : placeholder}
              width={500}
              height={500}
              className="h-36 bg-gradient-to-br from-[#fdffc0] to-[#f1d2f9] rounded-2xl border-y-2 border-dashed border-[#8b2fa2] dark:bg-gradient-to-tl dark:from-[#504e4e] dark:to-[#b4b0b0]"
          />

      </Link>
            

      {/* Product Details */}
      <div className="py-0">
        {/* Brand and Category */}
        <div className="flex md:flex items-center justify-between">
          <Link href={`${PRODUCTS_ROUTE}/brand/${product.brand}`}>
            <span className="inline-flex items-center rounded-md bg-[#d76cf2] px-1 py-0 text-xs font-medium text-black hover:text-white ring-1 ring-inset ring-primary-500/10">
              {product.brand}
            </span>
          </Link>
          <Link href={`${PRODUCTS_ROUTE}/category/${product.category}`}>
            <span className="flex md:inline-flex items-center rounded-md bg-[#68217A] hover:bg-[#8b2fa2] px-1 py-0 text-xs font-medium text-[#d0fa44] hover:text-white ring-1 ring-inset ring-red-500/10">
              <MdOutlineCategory className="mr-1" />
              {product.category}
            </span>
          </Link>
        </div>

        {/* Title and Edit/Delete Buttons */}
        

        {/* Product Description */}
        <p className="mt-1 text-sm font-semibold text-zinc-600 dark:text-white max-h-14 overflow-hidden text-ellipsis">
          {descriptionPreview?.length > 30 ? `${descriptionPreview.slice(0, 30)}...` : descriptionPreview}
          <Link
            href={`${PRODUCTS_ROUTE}/${product.id}`}
            className="text-[#dc57fd] font-semibold underline hover:text-[#8b2fa2] ml-1 hover:underline transition-all duration-200 inline-block"
          >
            More details
          </Link>
        </p>



            <div className="md:flex items-center justify-between pt-1">
              {/* Add to Cart Button */}
                <div className="mt-0 flex items-center justify-end">
                  <AddToCart product={product} className="w-full md:w-1/2 py-3 bg-[#68217A] text-[#C3EF38] text-lg rounded-2xl transition-all transform hover:scale-105 hover:bg-[#8b2fa2] duration-300 add-to-cart-btn" />
                </div>
              {/* Price */}
              <p className="text-right">
                <span className="text-2xl font-bold font-serif text-[#84a123] pr-1">$</span>
                <span className="dark:text-white font-bold text-[#68217A]">{product.price}</span>
              </p>
            </div>



        {/* Star Rating */}
        <div className="flex items-center justify-center mt-1">
          {[...Array(5)].map((_, index) => (
            <FaStar
              key={index}
              className={`h-5 w-5 ${index < product.rating ? 'text-yellow-400' : 'text-[#8c6496]'}`}
            />
          ))}
        </div>
        <div className="flex items-center justify-end">
          {user?.roles.includes("ADMIN") && (
            <Link
              href={`${PRODUCTS_ROUTE}/edit/${product.id}`}
              className="text-black hover:text-[#68217A] dark:text-white hover:dark:text-gray-200"
            >
              <MdOutlineEdit className="h-5 w-5 rounded-full border-2 border-[#8b2fa2] bg-[#C3EF38] hover:bg-white " />
            </Link>
          )}
          {user?.roles.includes("ADMIN") && (
            <button
              onClick={removeProduct}
              className="p-1 text-red-500 hover:text-red-700 dark:text-white hover:dark:text-gray-200"
            >
              <MdDelete />
            </button>
          )}
        </div>
      </div>


            

      {/* Delete Confirmation Modal */}
      <Modal
        title={"Delete product"}
        show={showDeletePopup}
        setShow={setShowDeletePopup}
      >
        <p className="py-5">
          Are you sure you want to delete <b>{product.name}</b>?
        </p>

        <div className="flex items-center justify-between pt-2">
          <button
            className="px-5 py-2 bg-red-500 hover:bg-red-700 text-white rounded"
            onClick={() => setShowDeletePopup(false)}
          >
            Cancel
          </button>
          <button
            className="px-5 py-2 bg-primary-500 hover:bg-primary-700 text-white rounded"
            onClick={confirmDeleteProduct}
          >
            Delete
          </button>
        </div>
      </Modal>

      <ToastContainer />
      
    </div>
  );
}

export default ProductCard;
