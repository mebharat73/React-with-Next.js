import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
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
    <AnimatePresence>
      <motion.div
        key="backdrop"
        className="fixed inset-0 z-50 flex items-center justify-center bg-[#e382fb]/50 dark:bg-gray-800/50 px-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        aria-modal="true"
        role="dialog"
        aria-labelledby="modal-title"
        onClick={() => setShow(false)} // click outside closes modal
      >
        <motion.div
          key="modal"
          onClick={(e) => e.stopPropagation()} // prevent modal close on inside click
          drag="y"
          dragConstraints={{ top: 0, bottom: 0 }}
          dragElastic={0.15}
          dragMomentum={false}
          className="
            bg-gradient-to-tl from-[#ebacfb] to-[#f9fbc6]
            dark:from-[#000000] dark:to-[#979595]
            rounded-3xl shadow-2xl
            w-full max-w-[900px]
            max-h-[90vh] md:max-h-[85vh] lg:max-h-[90vh]
            overflow-y-auto
            p-6
            flex flex-col
            outline-none
            relative
          "
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 50, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          tabIndex={-1}
        >
          <header className="flex justify-between items-center mb-4">
            <h2
              id="modal-title"
              className="text-2xl sm:text-2xl md:text-3xl lg:text-3xl font-semibold text-[#C3EF38] dark:text-[#d0fa44]"
            >
              {title}
            </h2>

            <button
              onClick={() => setShow(false)}
              aria-label="Close modal"
              className="text-gray-600 dark:text-white hover:text-red-500 transition"
            >
              <MdClose className="h-6 w-6 animate-bounce rounded-full border-2 border-[#68217A]" />
            </button>
          </header>
          <main className="flex-grow">{children}</main>
        </motion.div>
      </motion.div>
    </AnimatePresence>,
    document.body
  );
}

export default Modal;
