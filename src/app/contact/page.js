// components/ContactPage.js
import Image from 'next/image';
import React from 'react';


const ContactPage = () => {
  return (
    <div className="relative flex flex-col items-center justify-center h-screen bg-cover bg-center" style={{ backgroundImage: "url('/images/contact.avif')" }}>
      {/* Overlay for better text visibility */}
      <div className="m-20 absolute inset-0 flex flex-col">
        <h1 className="text-6xl text-bg font-serif font-extrabold ">Let&apos;s Get in Touch!</h1>
        <p className="text-xl mt-2 ml-10 text-bgBack font-bold ">
          Have a question or need assistance? Reach out via email, phone, or the contact form below. We&apos;re eager to assist you.
        </p>
      </div>


      {/* Contact Form Section */}
      <div className="z-10 p-5 mt-20 bg-gradient-to-br from-[#fdffc0] to-[#f1d2f9] rounded-3xl w-full max-w-md">
        <h1 className='text-2xl text-[#C3EF38] font-extrabold text- flex items-center justify-center'>CONTACT FORM</h1>
        <form className="flex flex-col">
          <div className="flex flex-col mb-4">
            <label className="text-base font-semibold">Full Name:</label>
            <input type="text" className="p-1 mt-1 text-blue-600 border-2 border-gray-300 rounded" placeholder="Enter your name" />
          </div>
          <div className="flex flex-col mb-4 font-semibold">
            <label className="text-base">Email:</label>
            <input type="email" className="p-1 mt-1 border-2 border-gray-300 rounded" placeholder="Enter your email" />
          </div>
          <div className="flex flex-col mb-4">
            <label className="text-base font-semibold">Message:</label>
            <textarea className="p-1 mt-1 border-2 border-gray-300 rounded min-h-[100px]" placeholder="Enter your message" />
          </div>
          <button type="submit" className="mt-1 p-1 w-28 rounded-full bg-[#68217A] font-semibold font-serif text-[#d0fa44] hover:bg-[#8b2fa2] hover:text-white">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default ContactPage;


