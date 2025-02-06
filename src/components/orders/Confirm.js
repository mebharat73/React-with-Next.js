import Modal from "../Modal";
import config from "@/config/config";
import { checkoutOrder } from "@/api/orders";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import Spinner from "../Spinner";

function ConfirmOrder({ order }) {
  const [loading, setLoading] = useState(false);
  const [showConfirmPopup, setShowConfirmPopup] = useState(false);

  const { user } = useSelector((state) => state.auth);

  const router = useRouter();

  function onClickConfirm() {
    if (user && user.address && user.address.city && user.phone) {
      setShowConfirmPopup(true);

      return;
    }

    router.push("/profile/edit");
  }

  async function confirmOrder() {
    setLoading(true);

    try {
      const data = await checkoutOrder(order.id, {
        returnUrl: `${config.appUrl}/products/orders/${order.id}/payment`,
        websiteUrl: config.appUrl,
        totalAmount: order.totalPrice,
        orderName: order.orderItems[0].product.name,
      });

      window.location.href = data.payment_url;
    } catch (error) {
      toast.error(error.response.data, { autoClose: 1500 });
    } finally {
      setLoading(true);
      setShowConfirmPopup(false);
    }
  }

  return (
    <>
      <button
        className={`font-serif font-extrabold rounded-2xl bg-[#68217A] px-4 py-1 text-[#d0fa44] hover:bg-[#8b2fa2] hover:text-white shadow`}
        onClick={onClickConfirm}
      >
        Confirm Order
      </button>
      <Modal
        title={"Confirm order"}
        show={showConfirmPopup}
        setShow={setShowConfirmPopup}
      >
        {loading ? (
          <div className="p-5 flex items-center justify-center">
            <Spinner className="h-16 w-16" />
          </div>
        ) : (
          <>
            <p className="py-5 text-left">
              Are you sure you want to confirm this order?
            </p>

            <div className="flex items-center justify-between pt-2">
              <button
                className="px-5 py-2 bg-red-500 hover:bg-red-700 text-white rounded"
                onClick={() => setShowConfirmPopup(false)}
              >
                Cancel
              </button>
              <button
                className="px-5 py-2 bg-green-700 hover:bg-green-800 text-white rounded"
                onClick={confirmOrder}
              >
                Confirm
              </button>
            </div>
          </>
        )}
      </Modal>
      <ToastContainer />
    </>
  );
}

export default ConfirmOrder;
