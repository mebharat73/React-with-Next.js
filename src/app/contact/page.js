'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { submitContactForm } from '@/api/contactApi';
import { getUnseenMessageCount } from '@/api/chat';
import { useGlobalSocket } from '@/context/SocketContext';
import styles from './Fireworks.module.css';

const ContactPage = () => {
  const [fireworksVisible, setFireworksVisible] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [unseenCount, setUnseenCount] = useState(0);

  const fireworksRef = useRef(null);
  const buttonRef = useRef(null);

  const { user } = useSelector((state) => state.auth);
  const socket = useGlobalSocket();

  const triggerFireworks = () => {
    setFireworksVisible(true);
    setTimeout(() => setFireworksVisible(false), 4000);
  };

  // Fetch unseen count and refresh every 30 seconds (fallback)
  useEffect(() => {
    const fetchUnseenCount = async () => {
      if (!user?.id) return;
      try {
        const counts = await getUnseenMessageCount(user.id);
        const total = Object.values(counts).reduce((acc, val) => acc + val, 0);
        setUnseenCount(total);
      } catch (err) {
        console.error('Failed to fetch unseen message count:', err);
      }
    };

    fetchUnseenCount();
    const interval = setInterval(fetchUnseenCount, 30000);
    return () => clearInterval(interval);
  }, [user]);

  // Real-time update with socket when new message arrives
  useEffect(() => {
    if (!socket || !user?.id) return;

    const handleNewMessage = (msg) => {
      const isIncoming = msg.senderId !== user.id;
      if (isIncoming) {
        setUnseenCount((prev) => prev + 1);
      }
    };

    socket.on('newMessage', handleNewMessage);
    return () => socket.off('newMessage', handleNewMessage);
  }, [socket, user?.id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage('');
    setErrorMessage('');

    try {
      await submitContactForm(formData);
      setSuccessMessage('You will be contacted soon from our team. Thank you.');
      setFormData({ name: '', email: '', message: '' });
      triggerFireworks();
    } catch (err) {
      const errorMsg = err.response?.data?.error || 'Failed to send message. Please try again.';
      setErrorMessage(errorMsg);
    }
  };

  return (
    <div
      className="relative min-h-screen bg-cover bg-center bg-opacity-50"
      style={{ backgroundImage: "url('/images/contact.avif')" }}
    >
      <div className="absolute inset-0 bg-black opacity-40" />
      <div className="relative z-10 flex flex-col items-center justify-center text-white min-h-screen">
        <h1 className="-mt-20 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-extrabold text-center px-6 sm:px-10">
          Let's Get in Touch!
        </h1>

        <div className="bg-gradient-to-br from-[#fdffc0] to-[#f1d2f9] rounded-3xl w-full max-w-md shadow-lg p-6 mt-8 sm:mt-12 dark:bg-gradient-to-tl dark:from-[#000000] dark:to-[#979595]">
          <h1 className="text-2xl text-[#C3EF38] font-extrabold text-center mb-4">CONTACT FORM</h1>
          <form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
            <div className="flex flex-col">
              <label className="text-lg font-semibold text-[#8b2fa2]">Full Name:</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="p-3 text-blue-600 border-2 border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#68217A]"
                placeholder="Enter your name"
                required
              />
            </div>
            <div className="flex flex-col text-[#8b2fa2]">
              <label className="text-lg font-semibold">Email:</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="p-3 border-2 border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#68217A]"
                placeholder="Enter your email"
                required
              />
            </div>
            <div className="flex flex-col text-[#8b2fa2]">
              <label className="text-lg font-semibold">Message:</label>
              <textarea
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="p-3 border-2 border-gray-300 rounded min-h-[100px] focus:outline-none focus:ring-2 focus:ring-[#68217A]"
                placeholder="Enter your message"
                required
              />
            </div>
            <button
              type="submit"
              className="mt-4 py-1 px-6 rounded-full bg-[#68217A] font-semibold text-[#d0fa44] hover:bg-[#8b2fa2] transition-all"
            >
              Submit
            </button>
          </form>

          {successMessage && (
            <p className="mt-4 text-green-600 font-semibold text-center">{successMessage}</p>
          )}
          {errorMessage && (
            <p className="mt-4 text-red-600 font-semibold text-center">{errorMessage}</p>
          )}
        </div>

        {/* Fireworks Effect */}
        <div ref={buttonRef} className="relative w-full">
          {fireworksVisible && (
            <div
              ref={fireworksRef}
              className={`${styles['firework-container']} absolute bottom-0 left-1/2 transform -translate-x-1/2`}
            >
              <div className={styles.firework} />
              <div className={styles.firework} />
              <div className={styles.firework} />
              <div className={styles.firework} />
            </div>
          )}
        </div>

        {/* Start Chat Button */}
        <div className="bottom-20 absolute md:bottom-16 md:right-10 z-20">
          <Link
            href="/chat"
            onMouseEnter={triggerFireworks}
            className="relative px-4 py-2 text-xl font-semibold text-white bg-gradient-to-tl from-[#C3EF38] to-[#dd53ff] rounded-full shadow-lg transform transition-transform hover:scale-105 hover:from-[#68217A] hover:to-[#C3EF38] hover:text-[#68217A] animate-pulse"
          >
            Start Chat
            {unseenCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full border-2 border-white shadow-md">
                {unseenCount}
              </span>
            )}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
