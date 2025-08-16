'use client'
import 'animate.css';
import { motion } from 'framer-motion';

import Head from "next/head";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const TermsPage = () => {
  const [isClient, setIsClient] = useState(false); // To track if we're on the client side
  const router = useRouter();

  useEffect(() => {
    setIsClient(true); // Set to true once the component has mounted on the client
  }, []);

  const redirectToLogin = () => {
    router.push("/login");
  };

  if (!isClient) {
    // Return null or a loader until the component is mounted
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F5F5F7] to-[#97bee7] text-gray-900 dark:text-white dark:bg-gradient-to-tl dark:from-[#b4b0b0] dark:to-[#504e4e]">
      <Head>
        <title>Terms and Conditions - Online Shopping Platform</title>
        <meta name="description" content="Terms and Conditions for our online shopping platform." />
      </Head>

      <header className="bg-gradient-to-b from-[#F5F5F7] to-[#97bee7] text-white text-center dark:bg-gradient-to-tl dark:from-[#000000] dark:to-[#979595] dark:text-[#d0fa44] animate__animated animate__fadeIn">
        <h1 className="text-3xl font-semibold">Terms and Conditions</h1>
      </header>

      <main className="max-w-4xl mx-auto p-6">
        <section className="space-y-5">
          <h2 className="text-2xl font-bold animate__animated animate__zoomIn animate__delay-0.2s">Welcome to Our Online Shopping Platform!</h2>

          <motion.div
            className="animate__animated"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            These Terms and Conditions ("Terms", "Terms and Conditions") govern your use of our website and services provided by our online shopping platform. By accessing or using the website, you agree to comply with and be bound by these Terms.
          </motion.div>

          <h3 className="text-[#68217A] font-bold text-lg animate__animated animate__fadeIn animate__delay-3s animate-bounce">1. Acceptance of Terms</h3>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
          >
            By using this website, you confirm that you are of legal age to form a binding contract. If you do not agree with these Terms, please do not use our services.
          </motion.div>

          <h3 className="text-[#68217A] font-bold text-lg animate__animated animate__fadeIn animate__delay-3.5s animate-spin">2. Privacy Policy</h3>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.5 }}
          >
            Your use of our platform is also governed by our Privacy Policy. Please read it to understand how we collect, use, and protect your personal information.
          </motion.div>

          <h3 className="text-[#68217A] font-bold text-lg animate__animated animate__fadeIn animate__delay-7s animate-ping">3. User Account</h3>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.5 }}
          >
            To use certain features of our platform, you may need to create an account. You are responsible for maintaining the confidentiality of your account details and are fully responsible for all activities under your account.
          </motion.div>

          <h3 className="text-[#68217A] font-bold text-lg animate__animated animate__fadeIn animate__delay-8s animate-ping">4. Product Information and Pricing</h3>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 2 }}
          >
            We strive to provide accurate product descriptions and pricing. However, we reserve the right to correct any errors or inaccuracies, including errors in pricing, at any time without notice.
          </motion.div>

          <h3 className="text-[#68217A] font-bold text-lg animate__animated animate__fadeIn animate__delay-9s animate-ping">5. Order and Payment</h3>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 2.5 }}
          >
            By placing an order through our platform, you agree to pay for the products and services purchased. Payment must be made through our supported payment methods, and the transaction will be processed securely.
          </motion.div>

          <h3 className="text-[#68217A] font-bold text-lg animate__animated animate__fadeIn animate__delay-10s animate-ping">6. Delivery and Shipping</h3>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 3 }}
          >
            We provide shipping services to various locations. Delivery times and costs vary depending on your location and the shipping method selected at checkout.
          </motion.div>

          <h3 className="text-[#68217A] font-bold text-lg animate__animated animate__fadeIn animate__delay-11s animate-ping">7. Returns and Refunds</h3>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 3.5 }}
          >
            Please refer to our Return and Refund Policy for detailed information on how we handle returns, exchanges, and refunds.
          </motion.div>

          <h3 className="text-[#68217A] font-bold text-lg animate__animated animate__fadeIn animate__delay-12s animate-ping">8. Limitation of Liability</h3>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 4 }}
          >
            To the fullest extent permitted by applicable law, we are not responsible for any indirect, incidental, or consequential damages arising from the use of our website or products.
          </motion.div>

          <h3 className="text-[#68217A] font-bold text-lg animate__animated animate__fadeIn animate__delay-13s animate-ping">9. Changes to Terms</h3>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 4.5 }}
          >
            We reserve the right to modify or update these Terms and Conditions at any time. Any changes will be posted on this page, and the effective date will be updated accordingly.
          </motion.div>

          <h3 className="text-[#68217A] font-bold text-lg animate__animated animate__fadeIn animate__delay-14s animate-ping">10. Governing Law</h3>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 5 }}
          >
            These Terms are governed by the laws of the jurisdiction in which we operate. Any disputes will be handled according to the laws of that jurisdiction.
          </motion.div>

          <h3 className="text-[#68217A] font-bold text-lg animate__animated animate__fadeIn animate__delay-15s animate-ping">11. Contact Us</h3>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 5.5 }}
          >
            If you have any questions about these Terms, please contact us at [email/contact information].
          </motion.div>
        </section>

        {/* Attractive Login Box */}
        <div 
          onClick={redirectToLogin} 
          className="mt-4 cursor-pointer w-full px-4 bg-gradient-to-tl from-[#F5F5F7] to-[#1a7ce4] rounded-lg shadow-lg transform transition duration-300 hover:scale-105 hover:shadow-xl text-center text-white font-bold text-xl animate__animated animate__fadeIn animate__delay-25s"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 6 }}
          >
            Want to Join Us? Click to Log In!
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default TermsPage;
