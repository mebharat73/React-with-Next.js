"use client";

import Modal from "../Modal";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { removeFromCart } from "@/redux/cart/cartSlice";
import { IoTrashOutline } from "react-icons/io5";

function RemoveFromCart({ product }) {
  const [selectedProduct, setSelectedProduct] = useState();
  const [showRemovePopup, setShowRemovePopup] = useState(false);

  const dispatch = useDispatch();

  function removeProduct(product) {
    setSelectedProduct(product);
    setShowRemovePopup(true);
  }

  function confirmRemoveProduct() {
    dispatch(removeFromCart(selectedProduct));
    setShowRemovePopup(false);
    setSelectedProduct(null);
  }

  return (
    <>
      <button onClick={() => removeProduct(product)}>
        <IoTrashOutline className="inline-block text-red-500 hover:text-red-700" />
      </button>
      <Modal
        title={"Remove product from cart"}
        show={showRemovePopup}
        setShow={setShowRemovePopup}
      >
        <p className="py-5 text-left">
          Are you sure you want to remove <b>{selectedProduct?.name}</b> from
          cart?
        </p>

        <div className="flex items-center justify-between pt-2">
          <button
            className="px-5 py-2 bg-red-500 hover:bg-red-700 text-white rounded"
            onClick={() => setShowRemovePopup(false)}
          >
            Cancel
          </button>
          <button
            className="px-5 py-2 bg-primary-500 hover:bg-primary-700 text-white rounded"
            onClick={confirmRemoveProduct}
          >
            Remove
          </button>
        </div>
      </Modal>
    </>
  );
}

export default RemoveFromCart;
