'use client';
import React, { useState, useEffect } from 'react';
import api from '@/api/api';
import { getCurrentUserId } from '@/constants/authToken';

const ReceivedOffers = () => {
  const userId = getCurrentUserId();
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) {
      setLoading(false); // prevent loading spinner
      return;
    }

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

  if (!userId) {
    return (
      <div className="p-4 bg-yellow-100 rounded text-sm text-center">
        🔒 Please log in to view your received exchange offers.
      </div>
    );
  }


  if (offers.length === 0) {
    return (
      <div className="mb-4 p-4 bg-yellow-50 rounded">
        No received or created offers currently.
      </div>
    );
  }

  return (
   <div className="mb-6 p-4 bg-gradient-to-br from-[#fdffc0] to-[#f1d2f9] dark:bg-gradient-to-tl dark:from-[#b4b0b0] dark:to-[#504e4e] rounded shadow">
  <h2 className="text-xl font-bold text-[#68217A] dark:text-white mb-4">Exchange Offers</h2>

  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 justify-items-center">
    {offers.map(offer => {
      const isRequester = String(offer.fromUserId) === String(userId);
      const isOfferedItemOwner = String(offer.offeredItemOwnerId) === String(userId);

      return (
        <div
          key={offer._id}
          className="w-full max-w-sm bg-gradient-to-tl from-[#8e912d] to-[#dd53ff] dark:bg-gradient-to-tl dark:from-[#504e4e] dark:to-[#b4b0b0] text-sm text-black dark:text-white rounded-lg shadow p-4 hover:shadow-md transition"
        >
          {/* Image Section */}
          <div className="flex justify-center gap-3 mb-3">
            <div className="flex flex-col items-center">
              <img
                src={offer.offeredItemImage || '/placeholder.jpg'}
                alt="Requested Item"
                className="w-24 h-24 object-cover rounded-md border dark:border-gray-600"
              />
              <p className="text-sm font-semibold text-[#f2f75d] dark:text-gray-300 mt-1">Requested</p>
            </div>
            <span className="text-gray-400 dark:text-gray-300 text-xl self-center">⇄</span>
            <div className="flex flex-col items-center">
              <img
                src={offer.requestedItemImage || '/placeholder.jpg'}
                alt="Proposed Item"
                className="w-24 h-24 object-cover rounded-md border dark:border-gray-600"
              />
              <p className="text-sm font-semibold text-[#6a1f7b] dark:text-gray-300 mt-1">Offered</p>
            </div>
          </div>

          {/* Info Section */}
          <div>
            <div className="mb-2">
              {isRequester && offer.status === 'pending' && (
                <span className="text-[#541a61] font-semibold dark:text-blue-400 text-xs">You made this offer</span>
              )}
              {isOfferedItemOwner && offer.status === 'pending' && (
                <span className="text-green-600 dark:text-green-400 text-xs">Offer on your item</span>
              )}
            </div>

            <p><strong>From:</strong> {offer.fromUserName}</p>
            <p><strong>Requested:</strong> {offer.offeredProductTitle}</p>
            <p><strong>Offered:</strong> {offer.requestedProductTitle}</p>
            <p><strong>Extra Price:</strong> Rs{offer.additionalPrice}</p>
            <p><strong>Status:</strong> <span className="capitalize">{offer.status}</span></p>

            {/* Accepted Contact */}
            {offer.status === 'accepted' && isRequester && (
              <div className="mt-2 p-2 bg-green-100 dark:bg-green-900 rounded text-xs">
                🎉 Accepted! Contact:
                <div><strong>Email:</strong> {offer.offeredItemOwnerEmail || 'N/A'}</div>
                <div><strong>Phone:</strong> {offer.offeredItemOwnerPhone || 'N/A'}</div>
              </div>
            )}

            {/* Rejected Message */}
            {offer.status === 'rejected' && isRequester && (
              <p className="mt-2 text-red-600 dark:text-red-400 text-sm">❌ Offer declined.</p>
            )}

            {/* Action Buttons */}
            <div className="mt-3 flex flex-wrap gap-2">
              {isRequester && (
                <button
                  onClick={() => handleDelete(offer._id)}
                  className="px-3 py-1 text-xs bg-gray-500 text-white rounded hover:bg-gray-600"
                >
                  Delete
                </button>
              )}

              {isOfferedItemOwner && offer.status === 'pending' && (
                <>
                  <button
                    onClick={() => handleAccept(offer._id)}
                    className="px-3 py-1 text-xs bg-green-500 text-white rounded hover:bg-green-600"
                  >
                    Accept
                  </button>
                  <button
                    onClick={() => handleDecline(offer._id)}
                    className="px-3 py-1 text-xs bg-red-500 text-white rounded hover:bg-red-600"
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
</div>


  );
};

export default ReceivedOffers;
