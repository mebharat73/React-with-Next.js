import { MdClose } from "react-icons/md";

function ModalAdvertise({ title, show = false, setShow }) {
  return (
    <div className={show ? "block" : "hidden"}>
      <div className="h-screen bg-[#e382fb] bg-opacity-50 dark:bg-opacity-50 dark:bg-gray-800 fixed top-0 left-0 flex items-center justify-center z-50">
        {/* Modal Background */}
        <div className="min-h-fit w-11/12 md:w-1/2 bg-gradient-to-tl from-[#ebacfb] to-[#f9fbc6] dark:bg-gradient-to-tl dark:from-[#504e4e] dark:to-[#b4b0b0] rounded-3xl shadow-2xl transform transition duration-500 scale-95 hover:scale-100">
          {/* Modal Container */}
          <div className="flex flex-col p-10 rounded-3xl bg-gradient-to-tl from-[#f0f656] to-[#e382fb] dark:bg-gradient-to-tl dark:from-[#504e4e] dark:to-[#b4b0b0] text-textColor dark:text-white">
            {/* Modal Header */}
            <div className="flex justify-between items-center mb-5">
              <h2 className="ml-20 text-3xl font-semibold text-[#C3EF38] dark:text-[#d0fa44] animate-[ping_5s_linear_infinite]">
                {title}
              </h2>
              {/* Close Button */}
              <button onClick={() => setShow(false)} className="text-gray-600 dark:text-white hover:text-red-500 transition">
                <MdClose className="h-6 w-6 animate-bounce rounded-full border-2 border-[#68217A]" />
              </button>
            </div>
            {/* Modal Content */}
            <div className="w-full flex flex-col items-center">
              <img src="https://images.unsplash.com/photo-1478827217976-7214a0556393?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Advertisement" className="w-8/12 h-auto rounded-lg mb-4" />
              <p className="font-extrabold font-mono text-3xl text-center text-[#8b2fa2] dark:text-white">Hurry up....Discount</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ModalAdvertise;