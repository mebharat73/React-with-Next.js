'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Image from 'next/image';
import ProductDetailExchangeForm from './ProductDetailExchangeForm/ProductDetailExchangeForm';
import AddItemForm from './AddItemForm';
import { getCurrentUserId } from '@/constants/authToken';
import { getReceivedOffers } from '@/api/sattapattaExchangeOffer';
import { deleteSattapattaItem } from '@/api/sattapattaItem';
import api from '@/api/api';
import Modal from '@/components/Modal';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ExchangeInstructions from '@/app/sattapatta/exchangemodal/ExchangeInstructions';


const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(18);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [exchangeFormVisibility, setExchangeFormVisibility] = useState(false);
  const [additionalPrice, setAdditionalPrice] = useState('');
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [addItemFormVisibility, setAddItemFormVisibility] = useState(false);
  const [offerCount, setOfferCount] = useState(0);
  const [inExchangeItemIds, setInExchangeItemIds] = React.useState(new Set());
  const [showInstructionsModal, setShowInstructionsModal] = React.useState(false);

  const userId = getCurrentUserId();

  // Helper to sort products by createdAt DESC
  const sortProductsDesc = (productsArray) =>
    productsArray.slice().sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  useEffect(() => {
  const fetchProducts = async () => {
    try {
      const response = await api.get('/sattapatta-items');
      const sorted = sortProductsDesc(response.data);
      setProducts(sorted);
    } catch (err) {
      console.error('Error fetching products', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchOfferCount = async () => {
    if (!userId) return; // 🛑 Only fetch if logged in
    try {
      const offers = await getReceivedOffers();
      setOfferCount(offers.length || 0);
    } catch (error) {
      // Optional: suppress error silently
    }
  };

  const fetchExchangeItemIds = async () => {
    if (!userId) return; // 🛑 Only fetch if logged in
    try {
      const res = await api.get('/exchange-offers/active-items');
      setInExchangeItemIds(new Set(res.data.map((id) => String(id))));
    } catch (error) {
      // Optional: suppress error silently
    }
  };

    fetchProducts();
    fetchOfferCount();
    fetchExchangeItemIds();

    setShowInstructionsModal(true);
    const timer = setTimeout(() => setShowInstructionsModal(false), 80000);
    return () => clearTimeout(timer);
  }, []);

  const handleLoadMore = () => {
    setVisibleCount((prev) => {
      const next = prev + 18;
      return next > products.length ? products.length : next;
    });
  };

  const handleLoadLess = () => {
    setVisibleCount((prev) => {
      const next = prev - 18;
      return next < 18 ? 18 : next;
    });
  };

  const handleProductClick = (product) => {
    if (!inExchangeItemIds.has(product._id)) {
      setSelectedProduct(product);
    }
  };

  const handleExchangeClick = () => {
    setExchangeFormVisibility(true);
  };

  const handleAddItemClick = () => {
  setSelectedProduct(null);               // ✅ Clear selected product
  setAddItemFormVisibility(true);         // ✅ Then show form in add mode
};

  const handleNewExchange = () => {
    setSelectedProduct(null);
    setExchangeFormVisibility(false);
    setIsFormSubmitted(false);
    setAdditionalPrice('');
  };

  const handleEditProduct = (product) => {
  // You can open a modal or redirect to an edit page here
  console.log("Editing product:", product);
  // Example: open the existing AddItemForm in "edit mode"
  setSelectedProduct(product);
  setAddItemFormVisibility(true);
};


  // Update product status and then sort again
  const updateProductStatus = (selectedProductId, selectedExchangeProductId, isConfirmed) => {
    setProducts((prevProducts) => {
      const updated = prevProducts.map((product) => {
        if (product._id === selectedProductId) {
          return {
            ...product,
            status: isConfirmed ? 'exchanged' : 'ongoing',
            statusText: isConfirmed ? 'Your Product' : null,
          };
        }
        if (product._id === selectedExchangeProductId) {
          return {
            ...product,
            status: 'locked',
            statusText: isConfirmed ? 'Selected product' : null,
          };
        }
        return product;
      });
      return sortProductsDesc(updated);
    });
  };


  const handleDeleteProduct = async (productId) => {
  const confirmDelete = window.confirm('Are you sure you want to delete this item?');

  if (!confirmDelete) return;

  try {
    await deleteSattapattaItem(productId);
    setProducts((prev) => prev.filter((product) => product._id !== productId));
    toast.success('✅ Product deleted successfully!', {
      position: 'top-right',
      autoClose: 3000,
    });
  } catch (error) {
    console.error('❌ Error deleting product:', error);
    toast.error('❌ Failed to delete the product. Please try again.', {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  }
};


  // Call this function when you add a new product to keep sorting correct
  const addNewProduct = (newProduct) => {
    setProducts((prevProducts) => {
      const updated = [newProduct, ...prevProducts];
      return sortProductsDesc(updated);
    });
  };

  if (loading) return <div className="text-center text-lg py-20">Loading...</div>;

  return (
    <div className="min-h-screen w-full px-[3vw] py-[3vh] bg-gradient-to-br from-[#fdffc0] to-[#f1d2f9] dark:from-[#1c1c1e] dark:to-[#2e2e30]">
      <div className="w-full max-w-screen-2xl mx-auto">
        {/* Header */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-y-4 mb-6">
          <div className="w-full text-center lg:text-left">
            <h1 className="text-3xl md:text-4xl font-bold text-[#68217A] dark:text-white font-poppins">🪙 Sattapatta Products</h1>
            <div className="h-1 w-24 bg-[#68217A] rounded mt-2 mx-auto lg:mx-0" />
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 w-full justify-center lg:justify-end">
            <div className="relative">
              <Link href="/sattapatta/offers">
                <button className="px-2 py-1 md:px-4 md:py-1 bg-[#68217A] text-white rounded-xl hover:bg-[#8b2fa2] transition-all">
                  📥 View Received Offers
                </button>
              </Link>
              {offerCount > 0 && (
                <motion.span
                  className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 10 }}
                >
                  {offerCount}
                </motion.span>
              )}
            </div>

            <button
              onClick={handleAddItemClick}
              className="px-2 py-1 md:px-4 md:py-1 bg-gradient-to-r from-[#68217A] to-[#8b2fa2] text-white rounded-xl hover:brightness-110 transition-all"
            >
              ➕ Add New Sattapatta Item
            </button>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6 rounded-xl">
          {products.length === 0 ? (
            <p className="text-center text-lg text-gray-600 dark:text-gray-300">No products available.</p>
          ) : (
            products.slice(0, visibleCount).map((product) => (
              <div
                key={product._id}
                className={`bg-gradient-to-tl py-[1vw] px-[1vw] rounded-xl border-2 border-[#8b2fa2] shadow-lg transform transition-all duration-300 relative flex flex-col gap-3 dark:bg-gradient-to-tl dark:from-[#b4b0b0] dark:to-[#504e4e] ${
                  inExchangeItemIds.has(product._id)
                    ? 'pointer-events-none opacity-70'
                    : 'hover:shadow-xl hover:scale-105 cursor-pointer'
                } ${
                  product.status === 'locked'
                    ? 'border-4 border-double shadow-[#82e677] border-[#f45ddb]'
                    : product.status === 'ongoing'
                    ? 'border-4 border-double shadow-lg shadow-[#f444fa] border-[#6cf770]'
                    : ''
                }`}
                onClick={() => !inExchangeItemIds.has(product._id) && handleProductClick(product)}
                style={{ minWidth: '160px' }}
              >
                <div className="flex-1 relative">
  {inExchangeItemIds.has(product._id) && (
    <div className="absolute inset-0 bg-black bg-opacity-60 flex flex-col items-center justify-center rounded-lg z-20">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-10 h-10 text-yellow-400 mb-2"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.5}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 11c0-1.105-.895-2-2-2s-2 .895-2 2 .895 2 2 2 2-.895 2-2zM12 7V6m0 11v-1m4.24-4.24l.707.707m-10.607 0l.707-.707M16.97 9.03l.707-.707M6.323 9.03l-.707-.707"
        />
      </svg>
      <p className="text-yellow-400 font-bold text-sm select-none">Booked</p>
    </div>
  )}

  {/* Status overlay text */}
  {product.statusText && (
    <div className="absolute inset-0 bg-black bg-opacity-50 flex justify-center items-center text-white text-lg font-semibold rounded-md z-10 pointer-events-none">
      {product.statusText}
    </div>
  )}

  {/* Title marquee */}
  <div className="mb-1 border border-[#8b2fa2] bg-gradient-to-br from-[#f0f656] to-[#e382fb] text-[#68217A] dark:text-[#ecf074] font-bold rounded-lg overflow-hidden dark:bg-gradient-to-tl dark:from-[#b4b0b0] dark:to-[#504e4e]">
    <motion.div
      className="w-auto whitespace-nowrap overflow-hidden md:w-40"
      animate={{ x: ['100%', '-100%'] }}
      transition={{
        x: {
          repeat: Infinity,
          repeatType: 'loop',
          duration: 15,
          ease: 'linear',
        },
      }}
    >
      {product.title}
    </motion.div>
  </div>

  {/* Image */}
  <Image
    alt={product.title}
    src={`${product.imageUrls?.[0]}?v=${new Date(product.updatedAt).getTime()}`}
    width={500}
    height={500}
    className="h-28 md:h-36 bg-gradient-to-br from-[#fdffc0] to-[#f1d2f9] rounded-2xl border-y-2 border-dashed border-[#8b2fa2] object-fill dark:bg-gradient-to-tl dark:from-[#b4b0b0] dark:to-[#504e4e]"
  />

  {/* Description + More details */}
  <p className="text-sm font-semibold text-zinc-600 dark:text-white md:mt-2 max-h-24 overflow-hidden">
    {product.description ? product.description.slice(0, 30) : ''}
    <Link
      href={`/sattapatta/${product._id}`}
      className="text-[#dc57fd] dark:text-[#673075] font-semibold underline hover:text-[#8b2fa2] ml-1"
    >
      More details
    </Link>
  </p>

  {/* Action & Price */}
  <div className="md:flex items-center justify-between mt-1">
    {/* Exchange Offer button stays here */}
    {userId &&
      product.owner &&
      userId === (typeof product.owner === 'string' ? product.owner : product.owner._id) && (
        <button
          onClick={handleExchangeClick}
          className="w-auto bg-[#68217A] text-xs font-medium px-2 py-1 text-[#d0fa44] rounded-md hover:bg-[#8b2fa2] hover:text-black transition duration-300 mr-2"
        >
          Exchange
        </button>
      )}

    <p className="text-right">
      <span className="text-base font-bold font-serif text-[#84a123] dark:text-[#58ee71] pr-1">
        Rs
      </span>
      <span className="text-[#68217A] font-bold">{product.estimatedValue}</span>
    </p>
  </div>

  {/* Delete icon button positioned at bottom right */}
{userId &&
  product.owner &&
  userId === (typeof product.owner === 'string' ? product.owner : product.owner._id) && (
    <div className="absolute bottom-32 right-2 flex flex-col gap-1 z-10">
      {/* Edit Button */}
      <button
        onClick={() => handleEditProduct(product)}
        className="bg-blue-600 hover:bg-blue-700 text-white rounded-md p-1 shadow-md"
        title="Edit product"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M11 5h7M11 9h4M5 17h14M5 21h14M5 13h4m4 0h6"
          />
        </svg>
      </button>

      {/* Delete Button */}
      <button
        onClick={() => handleDeleteProduct(product._id)}
        className="bg-red-600 hover:bg-red-700 text-white rounded-md p-1 shadow-md"
        title="Delete product"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5-4h4m-4 0a1 1 0 011-1h2a1 1 0 011 1m-4 0h4"
          />
        </svg>
      </button>
    </div>
)}


</div>

              </div>
            ))
          )}
        </div>

        {/* Load More and Load Less Buttons */}
        <div className="flex justify-center gap-4 mt-6">
          {visibleCount < products.length && (
            <button
              onClick={handleLoadMore}
              className="px-3 py-0 md:px-6 md:py-1 bg-[#68217A] text-white rounded-full hover:bg-[#8b2fa2] transition-all"
            >
              Load More
            </button>
          )}
          {visibleCount > 18 && (
            <button
              onClick={handleLoadLess}
              className="px-3 py-0 md:px-6 md:py-2 bg-gray-500 text-white rounded-full hover:bg-gray-700 transition-all"
            >
              Load Less
            </button>
          )}
        </div>

        {/* ExchangeInstructions Modal */}
        <Modal title="How to Exchange a Product 🪙" show={showInstructionsModal} setShow={setShowInstructionsModal}>
          <ExchangeInstructions />
        </Modal>

        {/* Exchange Form Modal */}
        <Modal title="Exchange Offer" show={exchangeFormVisibility} setShow={setExchangeFormVisibility}>
          <ProductDetailExchangeForm
            selectedProduct={selectedProduct}
            setSelectedProduct={setSelectedProduct}
            exchangeFormVisibility={exchangeFormVisibility}
            setExchangeFormVisibility={setExchangeFormVisibility}
            products={products}
            additionalPrice={additionalPrice}
            setAdditionalPrice={setAdditionalPrice}
            updateProductStatus={updateProductStatus}
            inExchangeItemIds={inExchangeItemIds}
          />
        </Modal>

        {/* Add Item Modal */}
        {addItemFormVisibility && (
  <AddItemForm
  product={selectedProduct}  // ✅ Correct prop name
  setAddItemFormVisibility={setAddItemFormVisibility}
  setProducts={(newListOrUpdater) => {
    if (typeof newListOrUpdater === 'function') {
      setProducts((prev) => sortProductsDesc(newListOrUpdater(prev)));
    } else {
      setProducts(sortProductsDesc(newListOrUpdater));
    }
  }}
/>

)}

        {/* CTA for another exchange */}
        {isFormSubmitted && (
          <div className="text-center mt-6">
            <button
              onClick={handleNewExchange}
              className="px-6 py-2 bg-[#68217A] text-white rounded-full hover:bg-[#8b2fa2] transition-all"
            >
              🔁 Start New Exchange
            </button>
          </div>
        )}
      </div>
      <ToastContainer
                  position="top-right"
                  autoClose={1500}
                  hideProgressBar={false}
                  newestOnTop
                  closeOnClick
                  rtl={false}
                  pauseOnFocusLoss
                  draggable
                  pauseOnHover
                  theme="light"
                />
    </div>
    
  );
};

export default Products;
