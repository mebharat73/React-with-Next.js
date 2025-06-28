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
        const sorted = res.data.sort((a, b) => b._id.localeCompare(a._id));
        setOffers(sorted);
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
      setOffers(prev =>
        prev.map(o =>
          o._id === offerId ? { ...o, status: 'accepted' } : o
        )
      );
      alert('Offer accepted!');
    } catch (err) {
      console.error('Accept failed', err);
      alert('Failed to accept offer. You might not have permission.');
    }
  };

  const handleDecline = async (offerId) => {
    try {
      await api.post(`/exchange-offers/${offerId}/reject`);
      setOffers(prev =>
        prev.map(o =>
          o._id === offerId ? { ...o, status: 'rejected' } : o
        )
      );
      alert('Offer declined!');
    } catch (err) {
      console.error('Decline failed', err);
      alert('Failed to decline offer. Please try again.');
    }
  };

  const handleDelete = async (offerId) => {
    if (!window.confirm('Are you sure you want to delete this offer?')) return;

    try {
      await api.delete(`/exchange-offers/${offerId}`);
      setOffers(prev => prev.filter(o => o._id !== offerId));
      alert('Offer deleted!');
    } catch (err) {
      console.error('Delete failed', err);
      
      // ✅ Show backend message if available
      const errorMessage = err?.response?.data?.message || 'Failed to delete offer. Please try again.';
      alert(errorMessage);
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
      <h2 className="text-xl font-bold text-[#68217A] mb-4">Exchange Offers</h2>

      {offers.map(offer => {
        const isRequester = String(offer.fromUserId) === String(userId);
        const isOfferedItemOwner = String(offer.offeredItemOwnerId) === String(userId);

        return (
          <div
            key={offer._id}
            className="mb-4 p-4 bg-white rounded shadow flex flex-col md:flex-row justify-between gap-4"
          >
            {/* Image Preview Section */}
            <div className="flex gap-4 items-center justify-center md:w-1/3">
              <div className="text-center">
                <img
                  src={offer.offeredItemImage || '/placeholder.jpg'}
                  alt="Your Item"
                  className="w-28 h-28 object-cover rounded border"
                />
                <p className="text-sm mt-1 text-gray-600">Requested Item</p>
              </div>
              <div className="text-center">
                <img
                  src={offer.requestedItemImage || '/placeholder.jpg'}
                  alt="Requested Item"
                  className="w-28 h-28 object-cover rounded border"
                />
                <p className="text-sm mt-1 text-gray-600">Proposed Item</p>
              </div>
            </div>

            {/* Offer Details Section */}
            <div className="flex-1">
              <p className="text-sm mb-1">
                {isRequester && offer.status === 'pending' && (
                  <span className="text-blue-600">You made this offer.</span>
                )}
                {isOfferedItemOwner && offer.status === 'pending' && (
                  <span className="text-green-600">Offer made on your item.</span>
                )}
              </p>

              <p><strong>From:</strong> {offer.fromUserName}</p>
              <p><strong>Requested Item:</strong> {offer.offeredProductTitle}</p>
              <p><strong>Offered Item:</strong> {offer.requestedProductTitle}</p>
              <p><strong>Additional Price:</strong> ${offer.additionalPrice}</p>
              <p><strong>Status:</strong> {offer.status}</p>

              {/* Contact Info if Accepted */}
              {offer.status === 'accepted' && isRequester && (
                <div className="mt-2 p-2 bg-green-100 rounded">
                  <p>🎉 Your offer was accepted! Contact the item owner:</p>
                  <p><strong>Email:</strong> {offer.offeredItemOwnerEmail || 'N/A'}</p>
                  <p><strong>Phone:</strong> {offer.offeredItemOwnerPhone || 'N/A'}</p>
                </div>
              )}

              {/* Rejection Message */}
              {offer.status === 'rejected' && isRequester && (
                <p className="mt-2 text-red-600">❌ Your offer was declined.</p>
              )}

              {/* Action Buttons */}
              <div className="mt-3 flex gap-3 flex-wrap">
                {isRequester && (
                  <button
                    onClick={() => handleDelete(offer._id)}
                    className="px-3 py-1 bg-gray-500 text-white rounded hover:bg-gray-600"
                  >
                    Delete
                  </button>
                )}

                {isOfferedItemOwner && offer.status === 'pending' && (
                  <>
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
                  </>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ReceivedOffers;
