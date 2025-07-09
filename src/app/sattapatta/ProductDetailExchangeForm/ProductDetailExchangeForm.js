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
        <div className="-mt-6 mb-4 md:w-full md:mt-4 px-3 lg:px-0 lg:w-1/3 lg:fixed lg:top-24 lg:right-0 lg:h-[90vh]">
          <motion.div
            className="mt-6 md:mr-4 lg:mr-10 py-6 px-4 max-h-[85vh] overflow-y-auto scrollbar-hide shadow-lg border-2 border-[#656dff] bg-gradient-to-tl from-[#8e912d] to-[#dd53ff] dark:from-[#2d2d30] dark:to-[#3c3c41] rounded-xl transition-colors"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.5 }}
          >
            <div className="px-4 -mt-5 max-h-[75vh] md:px-2 md:-mt-4 rounded-lg shadow-lg border-[#d8fd72] border-4 border-double bg-gradient-to-tl from-[#C3EF38] to-[#dd53ff] dark:from-[#444c3a] dark:to-[#673877] transition-colors">
              <div className="mt-2 px-6 text-center py-0 md:px-4 md:mt-6">
                <h2 className="text-xl md:text-2xl font-bold text-[#f5ec39] dark:text-[#fafc86]">
                  How to Exchange a Product 🪙
                </h2>

                <ol className="text-sm text-left md:text-base lg:text-lg text-gray-700 dark:text-gray-300 list-decimal space-y-2 max-w-3xl mx-auto mt-4">
                  <li>
                    In order to exchange a product, first you need to{' '}
                    <span className="font-semibold text-[#68217A] dark:text-[#c4a8fa]">add your product</span>. If you
                    haven’t added one yet, simply add any product using the{' '}
                    <span className="font-semibold text-[#68217A] dark:text-[#c4a8fa]">
                      "Add New Sattapatta Item"
                    </span>{' '}
                    button.
                  </li>
                  <li>
                    You will then see an{' '}
                    <span className="font-semibold text-[#68217A] dark:text-[#c4a8fa]">"Exchange Offer"</span> button on
                    your added product. Click it.
                  </li>
                  <li>
                    In the form that appears, select your desired product and specify the{' '}
                    <span className="font-semibold text-[#68217A] dark:text-[#c4a8fa]">price you offer</span> to the
                    other user.
                  </li>
                  <li>
                    Once done, click the{' '}
                    <span className="font-semibold text-[#68217A] dark:text-[#c4a8fa]">"Confirm"</span> button to place
                    your exchange request.
                  </li>
                  <li>
                    You’ll see a{' '}
                    <span className="font-semibold text-[#68217A] dark:text-[#c4a8fa]">notification</span> in the
                    products section indicating your product and selected product status.
                  </li>
                </ol>

                {/* Optional Spinner */}
                <div className="mt-10 flex justify-center">
                  <div className="animate-spin border-t-4 border-[#68217A] dark:border-[#c4a8fa] rounded-full h-12 w-12 border-b-4 border-transparent"></div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

      );
    }

    return (
      <div
  ref={ref}
  className="w-full px-3 py-2 mt-6 lg:mt-14 lg:w-1/3 lg:fixed lg:top-20 lg:right-8 lg:h-[88vh] font-poppins z-30"
>
  <motion.div
    className="px-4 py-6 max-h-[85vh] overflow-y-auto scrollbar-hide shadow-2xl border-2 border-[#656dff] bg-gradient-to-tl from-[#8e912d] to-[#dd53ff] dark:from-[#2c2c2f] dark:to-[#4a2e58] rounded-2xl transition-colors"
    initial={{ opacity: 0, y: 60 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: 50 }}
    transition={{ duration: 0.5 }}
  >
    <div className="max-h-[80vh] px-4 py-1 border-[#d8fd72] border-4 border-double rounded-xl shadow-xl bg-gradient-to-br from-[#C3EF38] to-[#f37dff] dark:from-[#434d2b] dark:to-[#6a3e74] transition-colors">
      {!isFormSubmitted ? (
        <form onSubmit={handleExchangeSubmit}>
          <h2 className="text-2xl text-[#68217A] dark:text-[#f3d3ff] font-extrabold text-center">
            ✨ Start Exchange
          </h2>

          {/* Selected & Exchange Product */}
          <div className="gap-2 flex justify-center items-start md:gap-4 flex-nowrap bg-white/30 dark:bg-white/10 p-3 mt-2 mb-4 rounded-xl shadow-inner max-w-full overflow-auto">

            {/* Selected Product */}
            <div className="flex flex-col items-center bg-white/70 dark:bg-[#2e2e31] p-2 rounded-xl shadow-md border-2 border-[#68217A] w-[160px]">
              <p className="text-sm font-semibold text-[#500b57] dark:text-purple-200 text-center mb-1">
                Selected Product
              </p>
              <div className="w-[140px] h-[140px] flex items-center justify-center overflow-hidden rounded-md bg-white dark:bg-[#1e1e20]">
                <Image
                  src={selectedProduct.imageUrls?.[0] || '/placeholder.jpg'}
                  alt={selectedProduct.title}
                  width={140}
                  height={140}
                  className="object-contain max-w-full max-h-full"
                />
              </div>
              <p className="mt-2 text-xs text-center font-medium text-[#68217A] dark:text-purple-200">
                {selectedProduct.title}
              </p>
              <p className="text-sm font-bold text-[#3e125a] dark:text-green-300">
                💰 ${selectedProduct.estimatedValue}
              </p>
            </div>

            {/* Exchange Product */}
            {selectedExchangeProduct && (
              <div className="flex flex-col items-center bg-white/70 dark:bg-[#2e2e31] p-2 rounded-xl shadow-md border-2 border-[#68217A] w-[160px]">
                <p className="text-sm font-semibold text-[#500b57] dark:text-purple-200 text-center mb-1">
                  Exchange Product
                </p>
                <div className="w-[140px] h-[140px] flex items-center justify-center overflow-hidden rounded-md bg-white dark:bg-[#1e1e20]">
                  <Image
                    src={selectedExchangeProduct.imageUrls?.[0] || '/placeholder.jpg'}
                    alt={selectedExchangeProduct.title}
                    width={140}
                    height={140}
                    className="object-contain max-w-full max-h-full"
                  />
                </div>
                <p className="mt-2 text-xs text-center font-medium text-[#68217A] dark:text-purple-200">
                  {selectedExchangeProduct.title}
                </p>
                <p className="text-sm font-bold text-[#3e125a] dark:text-green-300">
                  💰 ${selectedExchangeProduct.estimatedValue}
                </p>
              </div>
            )}
          </div>

          {/* Dropdown */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-[#333] dark:text-gray-300 mb-1">
              Select your exchange product
            </label>
            <select
              value={selectedExchangeProduct?._id || ''}
              onChange={(e) => {
                const selectedId = e.target.value;
                const selected = products.find((p) => p._id === selectedId);
                setSelectedExchangeProduct(selected);
              }}
              className="px-4 w-full md:px-3 md:py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#2a2a2d] text-[#333] dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-[#68217A]"
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
          </div>

          {/* Additional Price Input */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-[#333] dark:text-gray-300 mb-1">
              Additional Price (optional)
            </label>
            <input
              type="number"
              value={additionalPrice}
              onChange={(e) => setAdditionalPrice(e.target.value)}
              className="px-4 w-full md:px-3 md:py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#2a2a2d] text-[#333] dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-[#68217A]"
              placeholder="Enter additional price"
            />
          </div>

          {/* Submit */}
          <div className="mt-3">
            <button
              type="submit"
              className="w-full md:p-1 bg-[#f5e72a] text-[#051206] font-semibold rounded-full hover:bg-[#8b2fa2] transition duration-300 transform hover:scale-105 disabled:opacity-50"
              disabled={!selectedExchangeProduct}
            >
              🔁 Confirm Exchange
            </button>
          </div>
        </form>
      ) : (
        <div className="text-center">
          <h3 className=" md:text-2xl text-[#68217A] dark:text-[#f3d3ff] font-semibold mb-3 mt-4">
            ✅ Exchange Confirmed!
          </h3>

          <div className="text-left text-sm text-[#333] dark:text-gray-200 bg-white/60 dark:bg-white/10 rounded-xl p-4 mb-4 shadow-inner border border-[#68217A]">
            <ol className="font-semibold list-decimal list-inside space-y-4">
              <li>
                <span className="font-semibold text-[#500b57] dark:text-purple-300">Your order is confirmed.</span>{' '}
                You can view it in the <strong>"View Received Offers"</strong> section by clicking the button provided there.
              </li>
              <li>
                You can <strong>delete your offer</strong> if you no longer want it — otherwise, wait for the exchange product owner's response.
              </li>
              <li>
                If the exchange product owner <strong>accepts or declines</strong> your request, you’ll receive an email and can also view the status (Name, Email, Contact) in the "View Received Order" page.
              </li>
              <li>
                You can <strong>chat directly</strong> with the owner via the Contact page by clicking the <strong>"Start Chat"</strong> button.
              </li>
              <li>
                For any extra questions, just send us a message and your email through the <strong>Contact</strong> page. Thank you!
              </li>
            </ol>
          </div>

          <button
            onClick={resetForm}
            className="md:py-2 px-4 bg-[#68217A] text-white font-semibold rounded-full w-full hover:bg-[#8b2fa2] transition duration-300 transform hover:scale-105"
          >
            ➕ Start Another Exchange
          </button>
        </div>
      )}
    </div>
  </motion.div>
</div>


    );
  }
);

export default ProductDetailExchangeForm;
