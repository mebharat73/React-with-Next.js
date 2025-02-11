import { MdClose } from "react-icons/md";

function Modal({ title, children, show = false, setShow }) {
  return (
    <div className={show ? "block" : "hidden"}>
      <div className="h-screen w-full bg-[#e382fb] bg-opacity-50 dark:bg-opacity-50 dark:bg-gray-800 fixed top-0 left-0 flex items-center justify-center z-50">
        {/* Modal Background */}
        <div className="min-h-fit w-full md:w-1/2 bg-gradient-to-tl from-[#ebacfb] to-[#f9fbc6] dark:bg-gradient-to-tl dark:from-[#000000] dark:to-[#979595] rounded-3xl shadow-2xl transform transition duration-500 scale-95 hover:scale-100">
          {/* Modal Container */}
          <div className="flex flex-col p-8 rounded-3xl bg-gradient-to-tl from-[#f0f656] to-[#e382fb] dark:bg-gradient-to-tl dark:from-[#000000] dark:to-[#979595] text-textColor dark:text-white">
            {/* Modal Header */}
            <div className="flex justify-between items-center mb-5">
              <h2 className="text-3xl font-semibold text-[#C3EF38] dark:text-[#d0fa44]">
                {title}
              </h2>
              {/* Close Button */}
              <button onClick={() => setShow(false)} className="text-gray-600 dark:text-white hover:text-red-500 transition">
                <MdClose className="h-6 w-6 animate-bounce rounded-full border-2 border-[#68217A]" />
              </button>
            </div>
            {/* Modal Content */}
            <div className="w-full">{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;
