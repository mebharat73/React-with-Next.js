"use client";

import Image from "next/image";
import Link from "next/link";
import Modal from "../Modal";
import placeholder from "@/assets/images/placeholder.jpeg";
import { MdDelete, MdOutlineCategory, MdOutlineEdit } from "react-icons/md";
import { PRODUCTS_ROUTE } from "@/constants/routes";
import { toast } from "react-toastify";
import { deleteProduct } from "@/api/products";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { addToCart } from "@/redux/cart/cartSlice";
import { PRODUCT_GRID_VIEW } from "@/constants/productView";
import { FaStar } from "react-icons/fa"; // For star rating
import { motion } from 'framer-motion';
import AddToCart from "@/components/products/AddToCart";
import { useDispatch } from "react-redux";
import { getProductContact } from "@/api/products";
import { rateProduct, getProductById } from "@/api/products"; // Assuming getProductById fetches the product details by ID
import { Tooltip } from "react-tooltip"; // ✅ Import


function ProductCard({ product, productView, products, setProducts }) {
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const router = useRouter();
  const dispatch = useDispatch();  // <-- call inside the component
  const [contactNumber, setContactNumber] = useState(null);
  const [userRating, setUserRating] = useState(product.userRating || 0);
  const [hoverRating, setHoverRating] = useState(0);

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
      // Update local products state to remove deleted product
      setProducts(products.filter(p => p.id !== product.id));
      // Optionally no need to refresh router now
    } catch (error) {
      toast.error(error.response?.data ?? "Error deleting product", {
        autoClose: 1500,
      });
    } finally {
      setShowDeletePopup(false);
    }
  }

 async function handleCallUs() {
  try {
    const data = await getProductContact(product.id);
    const phone = data?.contactNumber;

    if (!phone) {
      toast.error("Phone number not available");
      return;
    }

    const whatsappUrl = `https://wa.me/${phone.replace(/\D/g, '')}`; // remove non-digit characters

    if (typeof window !== "undefined") {
      const isMobile = /iPhone|iPad|iPod|Android/i.test(window.navigator.userAgent);

      if (isMobile) {
        // Show prompt to choose between call or WhatsApp
        const userChoice = window.confirm("Do you want to call directly?\nPress OK to call, Cancel for WhatsApp.");

        if (userChoice) {
          window.location.href = `tel:${phone}`;
        } else {
          window.open(whatsappUrl, "_blank");
        }
      } else {
        // Desktop → go to WhatsApp Web
        window.open(whatsappUrl, "_blank");
      }
    }
  } catch (error) {
    toast.error("Failed to fetch contact number");
    console.error(error);
  }
}


  async function submitRating(ratingValue) {
  try {
    await rateProduct(product.id, ratingValue); // Send rating to backend
    setUserRating(ratingValue); // Update local state so UI reflects immediately
    toast.success(`You rated this product ${ratingValue} stars!`);

    // Optional: Refresh product rating from backend after short delay
    /*
    setTimeout(async () => {
      try {
        const updatedProduct = await getProductById(product.id);
        setUserRating(updatedProduct.userRating);
      } catch (err) {
        console.error("Failed to fetch updated product data:", err);
      }
    }, 1000);
    */

  } catch (err) {
    toast.error("Failed to submit rating.");
    console.error(err);
  }
}





  const className =
    productView === PRODUCT_GRID_VIEW
      ? "mx-0 my-2 py-1 px-2 md:bg-[#F5F5F7] md:mx-7 md:my-2 md:py-2 md:px-2 rounded-3xl border-2 border-[#97bee7] border-double shadow-md shadow-[#97bee7] hover:bg-gradient-to-br from-[#F5F7FA] to-[#FEEEF9] dark:bg-gradient-to-tl dark:from-[#504e4e] dark:to-[#b4b0b0]"
      : "grid grid-cols-1 sm:grid-cols-[1fr,1fr] md:grid-cols-[1fr,2fr] gap-x-20 bg-gray-50 p-5 sm:p-10 rounded-xl shadow dark:bg-gray-900 hover:bg-gray-100 dark:hover:bg-gray-950 transition-all duration-300 ease-in-out";

  const descriptionPreview = product.description.substring(0, 60);
  const fullDescription = product.description;

  return (
    <div className={className}>
      {/* Product Image */}
      <div className="relative w-full cursor-pointer" onClick={() => router.push(`${PRODUCTS_ROUTE}/${product.id}`)}>
          {/* Scrolling Product Name */}
          <div className="mb-1 h-5 px-2 flex items-center border border-[#D1D1D1] rounded-lg bg-gradient-to-b from-[#F5F5F7] to-[#97bee7] text-[#1A1A1A] dark:text-[#d0fa44] font-bold whitespace-nowrap overflow-hidden text-xs dark:bg-gradient-to-tl dark:from-[#000000] dark:to-[#979595]">
            <motion.div
              className="whitespace-nowrap"
              animate={{ x: ["-100%", "100%"] }}
              transition={{
                x: {
                  repeat: Infinity,
                  repeatType: "loop",
                  duration: 10,
                  ease: "linear",
                },
              }}
            >
              {product.name}
            </motion.div>
          </div>


          {/* Product Image */}
          <Image
                      alt={product.name}
                      src={product.imageUrls.length > 0 ? product.imageUrls[0] : placeholder}
                      width={500}
                      height={500}
                      className="h-36 bg-gradient-to-b from-[#F5F5F7] to-[#97bee7] rounded-2xl border-2 border-dashed border-[#D1D1D1] dark:bg-gradient-to-tl dark:from-[#504e4e] dark:to-[#b4b0b0] object-fill"
                  />

          {/* Overlay */}
          <div className="absolute top-36 -left-0 -right-2 flex items-center justify-between px-2 z-10">

            {/* Call Us Button with Tooltip */}
            <div
              className="relative group"
              onMouseEnter={async () => {
                if (!contactNumber) {
                  try {
                    const data = await getProductContact(product.id);
                    setContactNumber(data?.contactNumber || "N/A");
                  } catch (error) {
                    console.error("Failed to fetch contact number");
                    setContactNumber("Unavailable");
                  }
                }
              }}
            >
              <button
                onClick={(e) => {
                  e.stopPropagation(); // Prevent parent card click
                  handleCallUs();
                }}
                className="px-2 rounded-md bg-[#007BFF] hover:bg-[#0056D2] text-[#1A1A1A] text-xs font-medium shadow-sm"
              >
                📞 Call Us
              </button>

              {/* Tooltip */}
              {contactNumber && (
                <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-[10px] px-2 py-0.5 rounded shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-20">
                  {contactNumber}
                </div>
              )}
            </div>

            {/* Edit / Delete Buttons */}
            <div className="flex items-center gap-1">
              {user &&
                (user.roles?.includes("ADMIN") ||
                  (product.createdBy && product.createdBy.toString() === user.id)) && (
                  <>
                    <Link
                      href={`${PRODUCTS_ROUTE}/edit/${product.id}`}
                      onClick={(e) => e.stopPropagation()} // Prevent parent card click
                      className="text-black hover:text-[#68217A] dark:text-white hover:dark:text-gray-200"
                    >
                      <MdOutlineEdit className="h-4 w-4 rounded-full border-2 border-[#8b2fa2] bg-[#C3EF38] hover:bg-white" />
                    </Link>
                    <button
                      onClick={(e) => {
                        e.stopPropagation(); // Prevent card click
                        removeProduct();
                      }}
                      className="p-1 text-red-500 hover:text-red-700 dark:text-white hover:dark:text-gray-200"
                    >
                      <MdDelete className="h-4 w-4" />
                    </button>
                  </>
                )}
            </div>
          </div>
        </div>
                    

      {/* Product Details */}
    <div className="flex flex-col justify-between min-w-0">

      {/* Brand and Category */}
      <div className="flex gap-3 flex-wrap mb-2 mt-1">

        {/* Brand */}
        <Link href={`${PRODUCTS_ROUTE}/brand/${product.brand}`}>
          <div className="relative w-[60px] h-4 px-2 py-0 bg-gradient-to-b from-[#F5F5F7] to-[#1a67db] text-xs font-medium text-black rounded-md overflow-hidden">
            <motion.div
              className="whitespace-nowrap absolute"
              animate={{ x: ['100%', '-100%'] }}
              transition={{
                x: {
                  repeat: Infinity,
                  repeatType: 'loop',
                  duration: 8,
                  ease: 'linear',
                },
              }}
            >
              {product.brand}
            </motion.div>
          </div>
        </Link>

        {/* Category */}
        <Link href={`${PRODUCTS_ROUTE}/category/${product.category}`}>
          <div className="relative w-[70px] h-4 px-2 py-0 bg-gradient-to-b from-[#7070f4] to-[#bacfef] hover:bg-[#8b2fa2] text-xs font-medium text-[#1A1A1A] hover:text-white rounded-md overflow-hidden">
            <motion.div
              className="whitespace-nowrap absolute"
              animate={{ x: ['100%', '-100%'] }}
              transition={{
                x: {
                  repeat: Infinity,
                  repeatType: 'loop',
                  duration: 8,
                  ease: 'linear',
                },
              }}
            >
              {product.category}
            </motion.div>
          </div>
        </Link>

      </div>

    </div>
              {/* Title and Edit/Delete Buttons */}
        

        {/* Product Description */}
        <p className="text-xs font-medium text-[#232527] dark:text-white max-h-14 -mt-2 overflow-hidden text-ellipsis leading-tight">
          {descriptionPreview?.length > 21
            ? `${descriptionPreview.slice(0, 24)}...`
            : descriptionPreview}
          <Link
            href={`${PRODUCTS_ROUTE}/${product._id}`}
            className="text-[#1E2A38] ml-1 underline hover:text-[#334f79]"
          >
            More..
          </Link>
        </p>




            {/* Price + Add to Cart */}
            <div className="flex justify-between items-center mt-1 flex-wrap gap-2">
              <AddToCart product={product} />
              <p className="text-right -mt-2">
                <span className="text-base font-bold text-[#84a123] pr-1">Rs</span>
                <span className="text-base font-bold text-[#1A1A1A] dark:text-white">
                  {product.price}
                </span>
              </p>
            </div>




        {/* Star Rating */}
        {user && (
          <div className="flex flex-wrap items-center justify-start gap-2 mt-1 lg:ml-12">

            {/* Star Rating with Tooltips */}
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <div key={star}>
                  <FaStar
                    data-tooltip-id={`tooltip-star-${star}`}
                    data-tooltip-content={`Rate ${star} star${star > 1 ? "s" : ""}`}
                    onClick={() => submitRating(star)}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    className={`h-3 w-3 sm:h-3 sm:w-3 cursor-pointer transition-colors ${
                      hoverRating >= star || userRating >= star
                        ? "text-yellow-400"
                        : "text-black"
                    }`}
                  />
                  <Tooltip
                    id={`tooltip-star-${star}`}
                    place="top"
                    className="text-[5px] px-1 py-1 rounded-sm"
                  />
                </div>
              ))}
            </div>

            {/* Rating Badges */}
            <div className="flex flex-wrap items-center gap-1 text-xs lg:-ml-7">

              {/* User Rating Badge */}
              {userRating > 0 && (
                <motion.div
                  className="-ml-4 -mt-1 bg-[#F5F5F7] text-[#1A1A1A] px-1 rounded-full shadow-sm border border-[#D1D1D1] whitespace-nowrap"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                >
                  {userRating.toFixed(1)}{" "}
                  <span className="text-[10px]">(Your rating)</span>
                </motion.div>
              )}

              {/* Average Rating Badge */}
              {/* Average Rating Badge */}
              {product.rating > 0 && (
                <motion.div
                  className="ml-9 -mt-1 bg-[#F5F5F7] text-purple-700 px-1 rounded-full shadow-sm border border-purple-300 whitespace-nowrap"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                >
                  Avg: {product.rating.toFixed(1)}
                </motion.div>
              )}

            </div>
          </div>
        )}

            

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

    
      
    </div>
      
  );

}

export default ProductCard;
