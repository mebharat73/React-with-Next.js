import React from 'react';

const ExchangeInstructions = () => {
  return (
    <div
      className="w-full px-6 py-6 md:mt-2 mb-6 max-h-[60vh] overflow-y-auto rounded-xl
        shadow-lg border-2 border-[#656dff]
        bg-gradient-to-b from-[#F5F5F7] to-[#97bee7]
        dark:from-[#2d2d30] dark:to-[#3c3c41]"
    >
      <div className="border-4 border-double border-[#D1D1D1] p-4 rounded-xl
        bg-[#FFFFFF]
        dark:from-[#444c3a] dark:to-[#673877]"
      >
        <h2 className="text-xl md:text-2xl font-bold text-[#1A1A1A] dark:text-[#fafc86] text-center mb-2">
          How to Exchange a Product
        </h2>
        <ol className="text-sm md:text-base text-left text-[#386184] dark:text-gray-300 list-decimal space-y-1 marker:font-bold marker:text-[#68217A] pl-5">
          <li><strong>Add your product</strong> using the "Add New Sattapatta Item" button.</li>
          <li>Click <strong>"Exchange Offer"</strong> on your product.</li>
          <li>Select a product and specify the <strong>price</strong> you offer.</li>
          <li>Click <strong>"Confirm"</strong> to place your request.</li>
          <li>Track status in the products section.</li>
        </ol>
      </div>
    </div>
  );
};

export default ExchangeInstructions;
