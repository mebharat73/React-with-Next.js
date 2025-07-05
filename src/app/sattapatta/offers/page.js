'use client';
import React from 'react';
import ReceivedOffers from '@/app/sattapatta/ReceivedOffers'; // Adjust if needed

const OffersPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fdffc0] to-[#f1d2f9] dark:bg-gradient-to-tl dark:from-[#b4b0b0] dark:to-[#504e4e] transition-colors">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-[#68217A] dark:text-white text-center mb-6">
          Sattapatta Offer's Page
        </h1>

        <ReceivedOffers />
      </div>
    </div>
  );
};

export default OffersPage;
