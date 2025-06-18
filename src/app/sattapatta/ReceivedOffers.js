'use client';
import React, { useState, useEffect } from 'react';
import api from '@/api/api';
import { getCurrentUserId } from '@/constants/authToken';

const ReceivedOffers = () => {
  const userId = getCurrentUserId();
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const res = await api.get('/exchange-offers/received');
        setOffers(res.data);
      } catch (err) {
        console.error('Failed to fetch offers', err);
      } finally {
        setLoading(false);
      }
    };
    fetchOffers();
  }, []);

  const handleAccept = async (offerId) => {
    try {
      await api.post(`/exchange-offers/${offerId}/accept`);
      setOffers((prev) =>
        prev.map((offer) =>
          offer._id === offerId ? { ...offer, status: 'accepted' } : offer
        )
      );
      alert('Offer accepted!');
    } catch (err) {
      console.error('Accept failed', err);
      alert('Failed to accept offer. Please try again.');
    }
  };

  const handleDecline = async (offerId) => {
    try {
      await api.post(`/exchange-offers/${offerId}/reject`);
      setOffers((prev) =>
        prev.map((offer) =>
          offer._id === offerId ? { ...offer, status: 'rejected' } : offer
        )
      );
      alert('Offer declined!');
    } catch (err) {
      console.error('Decline failed', err);
      alert('Failed to decline offer. Please try again.');
    }
  };

  if (loading) return <div>Loading offers...</div>;

  if (offers.length === 0) {
    return (
      <div className="mb-4 p-4 bg-yellow-50 rounded">
        No received or created offers currently.
      </div>
    );
  }

  return (
    <div className="mb-6 p-4 bg-purple-100 rounded shadow">
      <h2 className="text-xl font-bold text-[#68217A] mb-2">Exchange Offers</h2>
      {offers.map((offer) => {
        const isRequester = String(offer.fromUserId) === String(userId);
        const isOfferedItemOwner = String(offer.offeredItemOwnerId) === String(userId);

        return (
          <div
            key={offer._id}
            className="mb-3 p-3 bg-white rounded shadow flex justify-between items-center"
          >
            <div>
              {/* Show role note */}
              <p className="text-sm mb-1">
                {isRequester && offer.status === 'pending' && (
                  <span className="text-blue-600">You made this offer.</span>
                )}
                {isOfferedItemOwner && offer.status === 'pending' && (
                  <span className="text-green-600">Offer made on your item.</span>
                )}
              </p>

              <p><strong>From:</strong> {offer.fromUserName}</p>
              <p><strong>Product Offered:</strong> {offer.offeredProductTitle}</p>
              <p><strong>For Your Product:</strong> {offer.requestedProductTitle}</p>
              <p><strong>Additional Price:</strong> ${offer.additionalPrice}</p>
              <p><strong>Status:</strong> {offer.status}</p>

              {/* Contact info if accepted */}
              {offer.status === 'accepted' && isRequester && (
                <div className="mt-2 p-2 bg-green-100 rounded">
                  <p>🎉 Your offer was accepted! You can now contact the item owner:</p>
                  <p><strong>Email:</strong> {offer.requestedItemOwnerEmail || 'N/A'}</p>
                  <p><strong>Phone:</strong> {offer.requestedItemOwnerPhone || 'N/A'}</p>
                </div>
              )}

              {/* Rejection message */}
              {offer.status === 'rejected' && isRequester && (
                <p className="mt-2 text-red-600">
                  ❌ Your offer was declined.
                </p>
              )}
            </div>

            {/* Accept/Decline buttons — only visible to offered item owner */}
            {isOfferedItemOwner && offer.status === 'pending' && (
              <div className="flex gap-2">
                <button
                  onClick={() => handleAccept(offer._id)}
                  className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                >
                  Accept
                </button>
                <button
                  onClick={() => handleDecline(offer._id)}
                  className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Decline
                </button>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default ReceivedOffers;
