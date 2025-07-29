"use client";

import { addToCart } from "@/redux/cart/cartSlice";
import { MdOutlineShoppingCart } from "react-icons/md";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Don't forget the styles
import { useRouter } from "next/navigation"; // To redirect
import { useSelector } from "react-redux"; // To access the user state

function AddToCart({ product }) {
  const dispatch = useDispatch();
  const router = useRouter();
  const { user } = useSelector((state) => state.auth); // Get user from the redux state

  function addProductToCart() {
    // If user is not logged in, redirect to login page
    if (!user) {
      router.push("/login");
      return; // Prevent further action if not logged in
    }

    // If user is logged in, proceed to add to cart
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
    <>
      <button
        onClick={addProductToCart}
        className="text-sm font-medium md:font-serif text-[#d0fa44] hover:text-white bg-[#68217A] hover:bg-[#8b2fa2] px-2 py-0 rounded-2xl flex items-center dark:text-white dark:hover:text-black dark:bg-gradient-to-tl dark:from-[#b4b0b0] dark:to-[#504e4e] animate-[pulse_1s_linear_infinite]"
      >
        Add to cart
        <MdOutlineShoppingCart className="ml-1 text-[#dbff65] dark:text-white" />
      </button>
    </>
  );
}

export default AddToCart;
