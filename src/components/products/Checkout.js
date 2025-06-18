import Modal from "../Modal";
import { LOGIN_ROUTE, ORDERS_ROUTE } from "@/constants/routes";
import { createOrder } from "@/api/orders";
import { toast, ToastContainer } from "react-toastify";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { clearCart } from "@/redux/cart/cartSlice";

function CheckoutProducts({ disabled }) {
  const [showCheckoutPopup, setShowCheckoutPopup] = useState(false);

  const { products, totalPrice } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);

  const router = useRouter();

  const dispatch = useDispatch();

  async function confirmCheckoutProduct() {
  console.log("Checkout clicked"); // ✅ Log here

  if (!user) {
    console.log("User not logged in"); // ✅ Log if redirected
    return router.push(LOGIN_ROUTE);
  }

  try {
    const payload = {
      orderItems: products.map((product) => ({
        product: product.id,
        quantity: product.quantity,
      })),
      totalPrice: Math.floor(totalPrice * 0.9),
    };

    console.log("Sending order:", payload); // ✅ Check payload

    await createOrder(payload);

    console.log("Order created successfully");

    dispatch(clearCart());
    router.push(ORDERS_ROUTE);
  } catch (error) {
    console.error("Order error:", error); // ✅ Log any error
    toast.error(error?.response?.data || "Something went wrong");
  }
}


  return (
    <>
      <button
        disabled={disabled}
        onClick={() => setShowCheckoutPopup(true)}
        className="float-right font-serif rounded-3xl text-[#d0fa44] hover:text-white bg-[#68217A] hover:bg-[#8b2fa2] px-5 py-1 flex items-center md:text-xl dark:text-white disabled:bg-opacity-75 dark:bg-gradient-to-tl dark:from-[#504e4e] dark:to-[#b4b0b0] dark:hover:text-black"
      >
        Checkout
      </button>

      <Modal
        title={"Checkout products"}
        show={showCheckoutPopup}
        setShow={setShowCheckoutPopup}
      >
        <p className="py-5 text-left">
          Are you sure you want to checkout these products?
        </p>

        <div className="flex items-center justify-between pt-2">
          <button
            className="px-5 py-2 bg-red-500 hover:bg-red-700 text-white rounded"
            onClick={() => setShowCheckoutPopup(false)}
          >
            Cancel
          </button>
          <button
            className="px-5 py-2 bg-green-700 hover:bg-green-800 text-white rounded"
            onClick={confirmCheckoutProduct}
          >
            Checkout
          </button>
        </div>
      </Modal>
      <ToastContainer />
    </>
  );
}

export default CheckoutProducts;
