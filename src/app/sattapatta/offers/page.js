// /app/offers/page.js
'use client';
import React from 'react';
import ReceivedOffers from '@/app/sattapatta/ReceivedOffers'; // Adjust path if needed

const OffersPage = () => {
  return (
    <div className="container px-5">
      <h1 className="text-2xl font-bold text-[#68217A] text-center my-4">Sattapatta Offer's Page</h1>
      <ReceivedOffers />
    </div>
  );
};

export default OffersPage;
