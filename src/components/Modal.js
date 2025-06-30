// components/Modal.jsx
import { useEffect } from "react";
import { createPortal } from "react-dom";
import { MdClose } from "react-icons/md";

function Modal({ title, children, show = false, setShow }) {
  useEffect(() => {
    if (show) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    const handleEsc = (e) => {
      if (e.key === "Escape") setShow(false);
    };

    window.addEventListener("keydown", handleEsc);
    return () => {
      document.body.style.overflow = "auto";
      window.removeEventListener("keydown", handleEsc);
    };
  }, [show, setShow]);

  if (!show) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#e382fb]/50 dark:bg-gray-800/50 px-4">
      <div className="min-h-fit w-full md:w-1/2 bg-gradient-to-tl from-[#ebacfb] to-[#f9fbc6] dark:from-[#000000] dark:to-[#979595] rounded-3xl shadow-2xl transform transition duration-300 scale-100">
        <div className="flex flex-col p-8 rounded-3xl bg-gradient-to-tl from-[#f0f656] to-[#e382fb] dark:from-[#000000] dark:to-[#979595] text-textColor dark:text-white">
          <div className="flex justify-between items-center mb-5">
            <h2 className="text-3xl font-semibold text-[#C3EF38] dark:text-[#d0fa44]">
              {title}
            </h2>
            <button
              onClick={() => setShow(false)}
              className="text-gray-600 dark:text-white hover:text-red-500 transition"
              aria-label="Close modal"
            >
              <MdClose className="h-6 w-6 animate-bounce rounded-full border-2 border-[#68217A]" />
            </button>
          </div>
          <div className="w-full">{children}</div>
        </div>
      </div>
    </div>,
    document.body
  );
}

export default Modal;
