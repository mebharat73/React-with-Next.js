"use client";

import { addToCart } from "@/redux/cart/cartSlice";
import { MdOutlineShoppingCart } from "react-icons/md";
import { useDispatch } from "react-redux";
import { toast, ToastContainer } from "react-toastify";

function AddToCart({ product }) {
  const dispatch = useDispatch();

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

  return (
    <button
      onClick={addProductToCart}
      className="text-sm font-medium md:font-serif text-[#d0fa44] hover:text-white bg-[#68217A] hover:bg-[#8b2fa2] px-2 py-0 rounded-2xl flex items-center md:text-base dark:text-white dark:hover:text-black dark:bg-gradient-to-tl dark:from-[#b4b0b0] dark:to-[#504e4e] animate-[pulse_1s_linear_infinite]"
    >
      Add to cart
      <MdOutlineShoppingCart className="ml-1 text-[#dbff65] dark:text-white" />
      <ToastContainer />
    </button>
  );
}

export default AddToCart;
