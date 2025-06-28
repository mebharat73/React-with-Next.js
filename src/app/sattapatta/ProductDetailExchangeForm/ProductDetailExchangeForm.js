'use client';
import React, { useEffect, useState } from 'react';
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
      handleFormSubmit,
      additionalPrice,
      setAdditionalPrice,
      updateProductStatus,
      inExchangeItemIds, // 👈 add this
    },

    ref
  ) => {
    const [selectedExchangeProduct, setSelectedExchangeProduct] = useState(null);
    const [isFormSubmitted, setIsFormSubmitted] = useState(false);
    const [userId, setUserId] = useState(null); // Use this instead of prop
    const maxLength = 100;

    useEffect(() => {
      const id = getCurrentUserId();
      setUserId(id);
    }, []);

    const truncateDescription = (text, maxLength) => {
      return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
    };

    useEffect(() => {
      console.log('--- Debug Info ---');
      console.log('Current User ID:', userId);
      console.log('Selected Product:', selectedProduct);

      if (products?.length) {
        products.forEach((product) => {
          console.log(
            `Product: ${product.title}, Owner: ${
              typeof product.owner === 'object' ? product.owner?._id : product.owner
            }, ID: ${product._id}`
          );
        });
      }
    }, [products, userId, selectedProduct]);

    const saveToLocalStorage = () => {
      if (selectedProduct) {
        localStorage.setItem('selectedProduct', JSON.stringify(selectedProduct));
      }
      if (selectedExchangeProduct) {
        localStorage.setItem('selectedExchangeProduct', JSON.stringify(selectedExchangeProduct));
      }
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

        const response = await createExchangeOffer(offerData);
        console.log('Exchange offer created:', response);

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
      const isNotInExchange = !inExchangeItemIds?.has(product._id); // ✅ new condition

      return isDifferentOwner && isNotSelectedProduct && isNotInExchange;
    });


    useEffect(() => {
      console.log('Filtered exchange options:');
      exchangeOptions.forEach((product) => {
        console.log(
          `Exchange Option - Product: ${product.title}, Owner: ${
            typeof product.owner === 'object' ? product.owner?._id : product.owner
          }, ID: ${product._id}`
        );
      });
    }, [exchangeOptions]);

    if (!selectedProduct || !exchangeFormVisibility) {
      return (
        <div className="w-full mt-1 lg:w-1/3 lg:fixed lg:top-10 lg:right-0 lg:h-[90vh]">
          <motion.div
            className="mt-10 md:mr-8 p-5 max-h-[85vh] overflow-y-auto scrollbar-hide shadow-lg border-2 border-[#656dff] bg-gradient-to-tl from-[#8e912d] to-[#dd53ff] rounded-xl"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.5 }}
          >
            <div className="mt-5 mb-5 px-3 rounded-lg shadow-lg border-[#d8fd72] border-4 border-double bg-gradient-to-tl from-[#C3EF38] to-[#dd53ff]">
              <div className="text-center py-10">
                <h2 className="mt-20 mb-20 text-3xl font-semibold text-[#68217A]">Preparing Exchange Offer...</h2>
                <p className="text-xl text-gray-600">Please click in "Exchange Offer" in your selected product to do sattapatta</p>
                <div className="mt-4">
                  <div className="animate-spin border-t-4 border-[#68217A] rounded-full h-40 w-12 mx-auto border-b-4 border-transparent"></div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      );
    }

    return (
      <div ref={ref} className="w-full mt-1 lg:w-1/3 lg:fixed lg:top-10 lg:right-0 lg:h-[90vh]">
        <motion.div
          className="mt-10 md:mr-8 p-5 max-h-[85vh] overflow-y-auto scrollbar-hide shadow-lg border-2 border-[#656dff] bg-gradient-to-tl from-[#8e912d] to-[#dd53ff] rounded-xl"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          transition={{ duration: 0.5 }}
        >
          <div className="px-3 rounded-lg shadow-lg border-[#d8fd72] border-4 border-double bg-gradient-to-tl from-[#C3EF38] to-[#dd53ff]">
            {!isFormSubmitted ? (
              <form onSubmit={handleExchangeSubmit}>
                <h2 className="mt-3 text-3xl text-[#eef13c] font-bold text-center">Let's begin with Exchange</h2>

                {/* Selected Product */}
                <div className="flex justify-center items-center bg-gradient-to-tl from-[#C3EF38] to-[#dd53ff] p-8 mt-2 mb-2 rounded-xl shadow-2xl max-w-lg mx-auto">
                  <div className="text-center flex flex-col items-center -mt-12">
                    <p className="text-xl font-serif font-semibold text-[#500b57fa] mt-5">
                      Selected Product: {selectedProduct.title}
                    </p>
                    <Image
                      src={selectedProduct.imageUrls?.[0] || '/placeholder.jpg'}
                      alt={selectedProduct.title}
                      width={200}
                      height={200}
                      className="rounded-xl mt-2"
                    />
                    <p className="mt-2">{truncateDescription(selectedProduct.description, maxLength)}</p>
                    <p className="mt-3 font-semibold text-[#68217A]">Price: ${selectedProduct.estimatedValue}</p>
                  </div>
                </div>

                {/* Dropdown */}
                <div className="mb-2">
                  <label className="block text-sm font-medium text-gray-700">Choose Exchange Product</label>
                  <select
                    value={selectedExchangeProduct?._id || ''}
                    onChange={(e) => {
                      const selectedId = e.target.value;
                      const selected = products.find((product) => product._id === selectedId);
                      setSelectedExchangeProduct(selected);
                    }}
                    className="mt-1 px-2 border border-gray-300 rounded-lg w-full"
                  >
                    <option value="" disabled>Select exchange product</option>
                    {exchangeOptions.map((product) => (
                      <option key={product._id} value={product._id}>
                        {product.title}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Extra Price */}
                <div className="mt-2">
                  <label className="block text-sm font-medium text-gray-700">Additional Price as offer</label>
                  <input
                    type="number"
                    value={additionalPrice}
                    onChange={(e) => setAdditionalPrice(e.target.value)}
                    className="mt-1 px-2 border border-gray-300 rounded-lg w-full"
                    placeholder="Enter additional price"
                  />
                </div>

                <div className="mt-3 mb-2 text-center">
                  <button
                    type="submit"
                    className="py-1 px-2 bg-[#68217A] text-white font-semibold rounded-3xl w-full hover:bg-[#8b2fa2] transition-all duration-300 transform hover:scale-105"
                    disabled={!selectedExchangeProduct}
                  >
                    Confirm Exchange
                  </button>
                </div>
              </form>
            ) : (
              <div className="text-center">
                <h3 className="text-2xl text-[#68217A] font-semibold">Exchange Confirmed!</h3>
                {/* Display selected + exchange products here as in your original */}
                {/* Omitted for brevity but you can plug that part back in directly */}
                <div className="mt-3 mb-2 text-center">
                  <button
                    onClick={resetForm}
                    className="py-1 px-2 bg-[#68217A] text-white font-semibold rounded-3xl w-full hover:bg-[#8b2fa2] transition-all duration-300 transform hover:scale-105"
                  >
                    Choose Next
                  </button>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    );
  }
);

export default ProductDetailExchangeForm;
