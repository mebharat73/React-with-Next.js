import Modal from "../Modal";
import { PiPencilLineDuotone } from "react-icons/pi";
import { orderStatus } from "@/constants/orderStatus";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { updateStatus } from "@/api/orders";
import { toast, ToastContainer } from "react-toastify";
import Spinner from "../Spinner";

function EditOrderStatus({ order, setIsStatusUpdated }) {
  const [loading, setLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  const { register, handleSubmit } = useForm({
    defaultValues: {
      status: order.status,
    },
  });

  function editStatus(data) {
    setLoading(true);

    updateStatus(order.id, data)
      .then(() => {
        setIsStatusUpdated(true);
        toast.success("Status update successful.", { autoClose: 1500 });
      })
      .catch((error) => {
        toast.error(error.response?.data, { autoClose: 1500 });
      })
      .finally(() => {
        setLoading(false);
        setShowPopup(false);
      });
  }

  return (
    <>
      <button
        className="h-7 w-6 bg-primary-600 p-1 rounded text-white"
        onClick={() => setShowPopup(true)}
      >
        <PiPencilLineDuotone />
      </button>
      <Modal
        title={"Edit order status"}
        show={showPopup}
        setShow={setShowPopup}
      >
        <form onSubmit={handleSubmit(editStatus)} className="mt-3">
          <div className="py-2">
            <label
              htmlFor="status"
              className="font-semibold text-sm uppercase p-1 dark:text-white text-left block"
            >
              Status
            </label>
            <select
              id="status"
              className="border border-gray-500 rounded px-3 py-1 w-full shadow-md mt-1 dark:text-white dark:bg-zinc-600"
              {...register("status")}
            >
              {orderStatus.map((status, index) => (
                <option
                  key={index}
                  value={status.value}
                  disabled={status.disabled}
                >
                  {status.label}
                </option>
              ))}
            </select>
          </div>
          <div className="py-3">
            <div className="flex items-center justify-between pt-2">
              <button
                className="px-5 py-2 bg-red-500 hover:bg-red-700 text-white rounded"
                onClick={() => setShowPopup(false)}
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex px-5 py-2 bg-primary-500 hover:bg-primary-700 text-white rounded disabled:opacity-85"
              >
                <span>Update</span>
                {loading && <Spinner className="h-6 w-6 ml-2" />}
              </button>
            </div>
          </div>
        </form>
      </Modal>
      <ToastContainer />
    </>
  );
}

export default EditOrderStatus;
