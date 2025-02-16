"use client";


import Header from "@/components/Header";
import Modal from "@/components/Advertise.js"; // Import your Modal component
import { useSelector } from "react-redux";
import { useState } from "react";

function MainLayout({ children }) {
  const { theme } = useSelector((state) => state.userPreferences);
  const [showModal, setShowModal] = useState(true); // State to manage modal visibility

  const handleShowModal = () => {
    setShowModal(true);
  };

  return (
    <main className={theme}>
      <Header />
   
      {children}
      

      {/* Add to Cart Button
      <div className="bg-gradient-to-tl from-[#ebacfb] to-[#f9fbc6] dark:bg-gradient-to-tl dark:from-[#000000] dark:to-[#979595]">
          <button 
            onClick={handleShowModal} 
            className="text-[#d0fa44] dark:text-white bg-[#68217A] hover:bg-[#8b2fa2] hover:text-white p-2 rounded-full ml-5 dark:bg-gradient-to-tl dark:from-[#504e4e] dark:to-[#b4b0b0] animate-bounce ">
            Show Advertisement
          </button>
        </div>
      */}

        

    </main>
  );
}

export default MainLayout;