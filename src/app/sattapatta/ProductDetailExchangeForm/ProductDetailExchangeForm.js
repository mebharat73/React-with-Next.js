'use client';
import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { createExchangeOffer } from '@/api/sattapattaExchangeOffer';
import { getCurrentUserId } from '@/constants/authToken';

const ProductDetailExchangeForm = React.forwardRef(
  (
    {
      selectedProduct,
      setSelectedProduct,
      exchangeFormVisibility,
      setExchangeFormVisibility,
      products,
      additionalPrice,
      setAdditionalPrice,
      updateProductStatus,
      inExchangeItemIds,
    },
    ref
  ) => {
    const [selectedExchangeProduct, setSelectedExchangeProduct] = useState(null);
    const [isFormSubmitted, setIsFormSubmitted] = useState(false);
    const [userId, setUserId] = useState(null);

    const formScrollRef = useRef(null);

    useEffect(() => {
      const id = getCurrentUserId();
      setUserId(id);
    }, []);

    // Scroll snap to top on submit/reset
    useEffect(() => {
      if (formScrollRef.current) {
        formScrollRef.current.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }, [isFormSubmitted]);

    const saveToLocalStorage = () => {
      if (selectedProduct) localStorage.setItem('selectedProduct', JSON.stringify(selectedProduct));
      if (selectedExchangeProduct) localStorage.setItem('selectedExchangeProduct', JSON.stringify(selectedExchangeProduct));
      localStorage.setItem('additionalPrice', additionalPrice);
      localStorage.setItem('exchangeFormVisibility', JSON.stringify(exchangeFormVisibility));
    };

    const handleExchangeSubmit = async (e) => {
      e.preventDefault();
      try {
        const offerData = {
          itemOffered: selectedExchangeProduct._id,
          itemRequested: selectedProduct._id,
          extraPrice: parseFloat(additionalPrice) || 0,
        };
        await createExchangeOffer(offerData);
        updateProductStatus(selectedProduct._id, selectedExchangeProduct._id, true);
        saveToLocalStorage();
        setIsFormSubmitted(true);
      } catch (error) {
        console.error('Error creating exchange offer:', error);
      }
    };

 
    const resetForm = () => {
      localStorage.removeItem('selectedProduct');
      localStorage.removeItem('selectedExchangeProduct');
      localStorage.removeItem('additionalPrice');
      localStorage.removeItem('exchangeFormVisibility');

      setSelectedProduct(null);
      setSelectedExchangeProduct(null);
      setAdditionalPrice(0);
      setExchangeFormVisibility(false);
      setIsFormSubmitted(false);
    };



    const exchangeOptions = products.filter((product) => {
      if (!userId) return false;
      const ownerId = typeof product.owner === 'object' ? product.owner?._id : product.owner;
      const isDifferentOwner = String(ownerId) !== String(userId);
      const isNotSelectedProduct = selectedProduct && product._id !== selectedProduct._id;
      const isNotInExchange = !inExchangeItemIds?.has(product._id);
      return isDifferentOwner && isNotSelectedProduct && isNotInExchange;
    });

    if (!selectedProduct || !exchangeFormVisibility) {
    }

    return (
      <motion.div
        ref={formScrollRef}
        className="w-full px-4 py-4 max-h-[85vh] md:max-h-[80vh] lg:max-h-[85vh] overflow-y-auto touch-auto"
        role="form"
        aria-labelledby="exchange-form-heading"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.4 }}
        drag="y"
        dragConstraints={{ top: 0, bottom: 0 }}
        dragElastic={0.15}
        dragMomentum={false}
      >
        <div className="p-2 -mt-2 rounded-2xl shadow-2xl border-2 border-[#656dff] bg-gradient-to-b from-[#F5F5F7] to-[#97bee7] dark:from-[#2c2c2f] dark:to-[#4a2e58]">
          <div className="border-4 border-double border-[#D1D1D1] rounded-xl p-4 bg-gradient-to-b from-[#F5F5F7] to-[#97bee7] dark:from-[#434d2b] dark:to-[#6a3e74]">
            {!isFormSubmitted ? (
              <form
                onSubmit={handleExchangeSubmit}
                className="flex flex-col lg:flex-row gap-4 items-start w-full"
              >

                {!selectedExchangeProduct && (
                  <h2
                    id="exchange-form-heading"
                    className="-mt-2 text-2xl font-extrabold text-center text-[#1A1A1A] dark:text-[#f3d3ff] w-full md:hidden lg:hidden"
                  >
                    ✨ Start Exchange
                  </h2>
                )}

                {/* Product Cards */}
                <div className="flex gap-4 overflow-x-auto w-full px-1">

                  {[selectedProduct, selectedExchangeProduct].map((product, idx) =>
                    product ? (
                      <div
                        key={idx}
                        className="flex flex-col items-center bg-white/70 dark:bg-[#2e2e31] p-2 rounded-xl shadow-md border-2 border-[#D1D1D1] w-[140px] sm:w-[160px] md:w-[180px]"
                      >
                        <p className="text-sm font-semibold text-[#1A1A1A] dark:text-purple-200 text-center mb-1">
                          {idx === 0 ? 'Yours Product' : 'Exchange Product'}
                        </p>
                        <div className="aspect-square w-full max-w-[120px] sm:max-w-[140px] bg-[#F5F5F7] dark:bg-[#1e1e20] rounded-md overflow-hidden flex justify-center items-center">
                          <Image
                            src={product.imageUrls?.[0] || '/placeholder.jpg'}
                            alt={product.title || 'Product image'}
                            width={500}
                            height={500}
                            className="object-contain w-full h-full"
                          />
                        </div>


                        <p className="mt-2 text-xs font-medium text-center text-[#1A1A1A] dark:text-purple-200 truncate">
                          {product.title}
                        </p>
                        <p className="text-sm font-bold text-[#1A1A1A] dark:text-green-300">
                          💰 Rs{product.estimatedValue}
                        </p>
                      </div>
                    ) : null
                  )}
                </div>

                {/* Form Inputs */}
                <div className="flex flex-col gap-2 w-full max-w-[480px]">

                  <label htmlFor="exchange-product-select" className="text-sm font-medium text-[#1A1A1A] dark:text-gray-300">
                    Select your exchange product
                  </label>
                  <select
                    id="exchange-product-select"
                    value={selectedExchangeProduct?._id || ''}
                    onChange={(e) => {
                      const selected = products.find((p) => p._id === e.target.value);
                      setSelectedExchangeProduct(selected);
                    }}
                    className="w-full px-4 py-1 rounded-lg border border-[#D1D1D1] dark:border-gray-600 bg-[#F5F5F7] dark:bg-[#2a2a2d] text-[#333] dark:text-gray-200 focus:ring-2 focus:ring-[#68217A]"
                    aria-required="true"
                  >
                    <option value="" disabled>
                      -- Choose Product --
                    </option>
                    {exchangeOptions.map((product) => (
                      <option key={product._id} value={product._id}>
                        {product.title}
                      </option>
                    ))}
                  </select>

                  <label htmlFor="additional-price-input" className="text-sm font-medium text-[#333] dark:text-gray-300">
                    Additional Price (optional)
                  </label>
                  <input
                    id="additional-price-input"
                    type="number"
                    value={additionalPrice}
                    onChange={(e) => setAdditionalPrice(e.target.value)}
                    className="w-full px-4 py-1 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#2a2a2d] text-[#333] dark:text-gray-200 focus:ring-2 focus:ring-[#68217A]"
                    placeholder="Enter additional price"
                    inputMode="decimal"
                  />

                  <button
                    type="submit"
                    className="mt-2 px-6 py-2 bg-[#007BFF] text-[#051206] font-semibold rounded-full hover:bg-[#0056D2] transition-transform duration-300 hover:scale-105 disabled:opacity-50"
                    disabled={!selectedExchangeProduct}
                  >
                    🔁 Confirm Exchange
                  </button>
                </div>
              </form>
            ) : (
              <div className="text-center" role="alert" aria-live="polite">
                <h3 className="text-xl md:text-2xl text-[#1A1A1A] dark:text-[#f3d3ff] font-semibold mb-2">
                  ✅ Exchange Confirmed!
                </h3>
                <ol className="text-left text-sm text-[#1A1A1A] dark:text-gray-200 bg-white/60 dark:bg-white/10 p-4 rounded-xl border border-[#D1D1D1] list-decimal space-y-2 pl-8 marker:font-bold marker:text-[#1A1A1A]">
                  <li>Order confirmed. Check “View Received Offers”.</li>
                  <li>Delete or wait for owner response.</li>
                  <li>On response, view contact details.</li>
                  <li>Start a chat from the Contact page.</li>
                  <li>Need help? Reach out via Contact.</li>
                </ol>

                <button
                  onClick={resetForm}
                  className="mt-4 w-full px-4 py-1 bg-[#F5F5F7] text-[#1A1A1A] font-semibold rounded-full hover:bg-[#aba0ae]"
                >
                  ➕ Start Another Exchange
                </button>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    );
  }
);

export default ProductDetailExchangeForm;
