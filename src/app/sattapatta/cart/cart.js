import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import api from '@/utils/api'; // Ensure this points to your axios instance

const Cart = ({ products, updateProductStatus }) => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [exchangeProduct, setExchangeProduct] = useState(null);
  const [isCartVisible, setCartVisible] = useState(false);
  const [exchangeOffer, setExchangeOffer] = useState(null);

  useEffect(() => {
    const selected = products?.find((product) => product?.status === 'ongoing');
    const exchange = products?.find((product) => product?.status === 'locked');

    setSelectedProduct(selected || null);
    setExchangeProduct(exchange || null);

    const fetchExchangeOffer = async () => {
      if (selected && exchange) {
        try {
          const response = await api.get(`/exchange-offers/item/${selected.id}`);
          const offer = response.data.find(
            (o) =>
              (o.itemOffered._id === exchange.id && o.itemRequested._id === selected.id) ||
              (o.itemOffered._id === selected.id && o.itemRequested._id === exchange.id)
          );

          if (offer) {
            setExchangeOffer(offer);
          } else {
            setExchangeOffer(null);
          }
        } catch (error) {
          console.error("Error fetching exchange offer:", error);
          setExchangeOffer(null);
        }
      } else {
        setExchangeOffer(null);
      }
    };

    fetchExchangeOffer();
  }, [products]);

  const handleConfirmExchange = async () => {
    if (selectedProduct && exchangeProduct && exchangeOffer) {
      try {
        await api.post(`/exchange-offers/${exchangeOffer._id}/accept`);
        updateProductStatus(selectedProduct.id, exchangeProduct.id, true);
      } catch (error) {
        console.error('Error confirming exchange:', error);
      }
    }
  };

  const toggleCartVisibility = () => {
    setCartVisible((prev) => !prev);
  };

  return (
    <div className="relative">
      <button
        onClick={toggleCartVisibility}
        className="fixed top-5 right-5 p-4 bg-gradient-to-r from-purple-600 to-purple-800 text-white rounded-full shadow-lg hover:shadow-xl transition duration-300 z-50"
      >
        Cart
      </button>

      {isCartVisible && (
        <div className="container mx-auto px-5 mt-10 bg-white rounded-lg shadow-lg fixed top-0 left-0 right-0 bottom-0 z-40 overflow-auto p-6">
          <h1 className="text-4xl font-bold text-purple-800 text-center mb-6">Your Cart</h1>

          <section>
            <h2 className="text-3xl font-semibold text-purple-600 mb-4">Selected & Exchange Products</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              {selectedProduct ? (
                <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center">
                  <Image
                    alt={selectedProduct.title}
                    src={selectedProduct.imageUrls?.[0] || '/placeholder.jpg'}
                    width={150}
                    height={150}
                    className="rounded-2xl object-cover mb-4"
                  />
                  <h3 className="text-xl font-semibold text-purple-700">{selectedProduct.title}</h3>
                  <p className="mt-2 text-gray-600 text-center">{selectedProduct.description}</p>
                  <p className="mt-2 text-xl font-bold text-purple-700">${selectedProduct.estimatedValue}</p>
                  <p className="mt-2 text-lg text-green-500 font-semibold">Selected product by you</p>
                </div>
              ) : (
                <div className="text-center text-lg text-gray-500">No selected product in your cart.</div>
              )}

              {exchangeProduct ? (
                <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center">
                  <Image
                    alt={exchangeProduct.title}
                    src={exchangeProduct.imageUrls?.[0] || '/placeholder.jpg'}
                    width={150}
                    height={150}
                    className="rounded-2xl object-cover mb-4"
                  />
                  <h3 className="text-xl font-semibold text-purple-700">{exchangeProduct.title}</h3>
                  <p className="mt-2 text-gray-600 text-center">{exchangeProduct.description}</p>
                  <p className="mt-2 text-xl font-bold text-purple-700">${exchangeProduct.estimatedValue}</p>
                  <p className="mt-2 text-lg text-green-500 font-semibold">Your product for exchange</p>

                  {exchangeProduct.status === 'locked' && exchangeOffer && (
                    <button
                      onClick={handleConfirmExchange}
                      className="mt-4 bg-gradient-to-r from-purple-600 to-purple-800 text-white font-semibold py-2 px-4 rounded-md hover:bg-purple-700 transition duration-300"
                    >
                      Confirm Exchange
                    </button>
                  )}
                </div>
              ) : (
                <div className="text-center text-lg text-gray-500">No exchange product available.</div>
              )}
            </div>
          </section>

          <div className="mt-6 text-center">
            <button
              onClick={toggleCartVisibility}
              className="bg-gradient-to-r from-purple-600 to-purple-800 text-white font-semibold py-2 px-4 rounded-lg hover:bg-purple-700 transition duration-300"
            >
              Close Cart
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
