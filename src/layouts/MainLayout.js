"use client";

import Footer from "@/components/Footer";
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
      <Footer />

      

      {/* Button to Show Modal */}
      <button onClick={handleShowModal} className="fixed bottom-5 right-5 text-[#d0fa44] bg-[#68217A] hover:bg-[#8b2fa2] hover:text-white p-2 rounded-full animate-bounce">
        Show Advertisement
      </button>

      {/* Modal with Advertisement */}
      <Modal
        title="Special Offer!"
        imageUrl="https://images.unsplash.com/photo-1478827217976-7214a0556393?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        adText="Get inspired by this beautiful image!"
        show={showModal}
        setShow={setShowModal}
      />
    </main>
  );
}

export default MainLayout;