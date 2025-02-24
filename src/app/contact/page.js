'use client';
import React, { useState, useRef } from 'react';
import Link from 'next/link';
import styles from './Fireworks.module.css'; // Import the CSS Module

const ContactPage = () => {
  const [fireworksVisible, setFireworksVisible] = useState(false);
  const fireworksRef = useRef(null);  // Reference to the fireworks
  const buttonRef = useRef(null);  // Reference to the button container

  const triggerFireworks = () => {
    setFireworksVisible(true);
    setTimeout(() => {
      setFireworksVisible(false);
    }, 2000); // Fireworks will last for 2 seconds
  };

  return (
    <div className="md:relative flex flex-col items-center justify-center h-screen bg-cover bg-center bg-opacity-50" style={{ backgroundImage: "url('/images/contact.avif')" }}>
      {/* Overlay for better text visibility */}
      <div className="flex flex-col items-center justify-center text-white">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-extrabold text-center sm:block lg:block md:hidden">
          Let's Get in Touch!
        </h1>
      </div>

      {/* Contact Form Section */}
      <div className="p-6 mb-6 md:-mt-24 lg:mt-10 bg-gradient-to-br from-[#fdffc0] to-[#f1d2f9] rounded-3xl w-full max-w-md shadow-lg">
        <h1 className="text-2xl text-[#C3EF38] font-extrabold text-center mb-4">CONTACT FORM</h1>
        <form className="flex flex-col space-y-4">
          <div className="flex flex-col">
            <label className="text-lg font-semibold">Full Name:</label>
            <input type="text" className="p-3 text-blue-600 border-2 border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#68217A]" placeholder="Enter your name" />
          </div>
          <div className="flex flex-col">
            <label className="text-lg font-semibold">Email:</label>
            <input type="email" className="p-3 border-2 border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#68217A]" placeholder="Enter your email" />
          </div>
          <div className="flex flex-col">
            <label className="text-lg font-semibold">Message:</label>
            <textarea className="p-3 border-2 border-gray-300 rounded min-h-[100px] focus:outline-none focus:ring-2 focus:ring-[#68217A]" placeholder="Enter your message" />
          </div>
          <button type="submit" className="mt-4 py-2 px-6 rounded-full bg-[#68217A] font-semibold text-[#d0fa44] hover:bg-[#8b2fa2] transition-all">
            Submit
          </button>
        </form>
      </div>

      {/* Fireworks Effect */}
      <div ref={buttonRef} className="relative">
        {fireworksVisible && (
          <div ref={fireworksRef} className={`${styles['firework-container']} absolute bottom-0 left-1/2 transform -translate-x-1/2`}>
            <div className={styles.firework} />
            <div className={styles.firework} />
            <div className={styles.firework} />
            <div className={styles.firework} />
            <div className={styles.firework} />
          </div>
        )}
      </div>


      {/* Start Chat Button */}
      <div className="md:fixed bottom-10 right-10 md:right-12 z-10">
        <Link
          href="/chat"
          onMouseEnter={triggerFireworks}
          className="px-6 py-3 text-xl font-semibold text-white bg-gradient-to-tl from-[#C3EF38] to-[#dd53ff] rounded-full shadow-lg transform transition-transform hover:scale-105 hover:from-[#68217A] hover:to-[#C3EF38] hover:text-[#68217A] animate-pulse"
        >
          Start Chat
        </Link>
      </div>
    </div>
  );
};

export default ContactPage;
