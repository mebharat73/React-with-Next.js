'use client';
import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Image from 'next/image';
import ProductDetailExchangeForm from './ProductDetailExchangeForm/ProductDetailExchangeForm';
import AddItemForm from './AddItemForm';
import { getCurrentUserId } from '@/constants/authToken';
import { getReceivedOffers } from '@/api/sattapattaExchangeOffer';
import api from '@/api/api';
import Modal from '@/components/Modal'; // adjust path if needed
import ExchangeInstructions from '@/app/sattapatta/exchangemodal/ExchangeInstructions';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [exchangeFormVisibility, setExchangeFormVisibility] = useState(false);
  const [additionalPrice, setAdditionalPrice] = useState('');
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [addItemFormVisibility, setAddItemFormVisibility] = useState(false);
  const exchangeFormRef = useRef(null);
  const [offerCount, setOfferCount] = useState(0);
  const [inExchangeItemIds, setInExchangeItemIds] = useState(new Set());

  // State to control the ExchangeInstructions modal visibility
  const [showInstructionsModal, setShowInstructionsModal] = useState(false);

  const userId = getCurrentUserId();

  // Scroll exchange form into view when visible
  useEffect(() => {
    if (exchangeFormVisibility && exchangeFormRef.current) {
      exchangeFormRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [exchangeFormVisibility]);

  // Fetch products, offers, exchange item IDs on mount
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.get('/sattapatta-items');
        setProducts(response.data);
        localStorage.setItem('products', JSON.stringify(response.data));
      } catch (err) {
        console.error('Error fetching products', err);
        const savedProducts = localStorage.getItem('products');
        if (savedProducts) {
          setProducts(JSON.parse(savedProducts));
        }
      } finally {
        setLoading(false);
      }
    };

    const fetchOfferCount = async () => {
      try {
        const offers = await getReceivedOffers();
        setOfferCount(offers.length || 0);
      } catch (error) {
        console.error('Error fetching offer count:', error);
      }
    };

    const fetchExchangeItemIds = async () => {
      try {
        const res = await api.get('/exchange-offers/active-items');
        setInExchangeItemIds(new Set(res.data.map((id) => String(id))));
      } catch (error) {
        console.error('Error fetching exchange item IDs:', error);
      }
    };

    fetchProducts();
    fetchOfferCount();
    fetchExchangeItemIds();

    // Show ExchangeInstructions modal on page load
    setShowInstructionsModal(true);

    // Auto close modal after 7 seconds
    const timer = setTimeout(() => {
      setShowInstructionsModal(false);
    }, 80000);

    // Cleanup timer on unmount
    return () => clearTimeout(timer);

  }, []);

  const handleProductClick = (product) => {
    setSelectedProduct(product);
  };

  const handleExchangeClick = () => {
    setExchangeFormVisibility(true);
    if (exchangeFormRef.current) {
      exchangeFormRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleAddItemClick = () => {
    setAddItemFormVisibility(true);
  };

  const handleNewExchange = () => {
    setSelectedProduct(null);
    setExchangeFormVisibility(false);
    setIsFormSubmitted(false);
    setAdditionalPrice('');
  };

  const updateProductStatus = (selectedProductId, selectedExchangeProductId, isConfirmed) => {
    setProducts((prevProducts) => {
      const updated = prevProducts.map((product) => {
        if (product._id === selectedProductId) {
          return {
            ...product,
            status: isConfirmed ? 'exchanged' : 'ongoing',
            statusText: isConfirmed ? 'Selected product' : null,
          };
        }
        if (product._id === selectedExchangeProductId) {
          return {
            ...product,
            status: 'locked',
            statusText: isConfirmed ? 'Your Product' : null,
          };
        }
        return product;
      });
      localStorage.setItem('products', JSON.stringify(updated));
      return updated;
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
                <button className="px-4 py-2 bg-[#68217A] text-white rounded hover:bg-[#8b2fa2] transition-all">
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
              className="px-4 py-2 bg-gradient-to-r from-[#68217A] to-[#8b2fa2] text-white rounded hover:brightness-110 transition-all"
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
            products.map((product) => (
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
                    src={product.imageUrls?.[0] || '/placeholder.jpg'}
                    width={500}
                    height={500}
                    className="h-28 md:h-36 bg-gradient-to-br from-[#fdffc0] to-[#f1d2f9] rounded-2xl border-y-2 border-dashed border-[#8b2fa2] object-fill dark:bg-gradient-to-tl dark:from-[#b4b0b0] dark:to-[#504e4e]"
                  />

                  {/* Description + More details */}
                  <p className="text-sm font-semibold text-zinc-600 dark:text-white md:mt-2 max-h-24 overflow-hidden">
                    {product.description ? product.description.slice(0, 40) : ''}
                    <Link
                      href={`/sattapatta/${product._id}`}
                      className="text-[#dc57fd] dark:text-[#673075] font-semibold underline hover:text-[#8b2fa2] ml-1"
                    >
                      More details
                    </Link>
                  </p>

                  {/* Action & Price */}
                  <div className="md:flex items-center justify-between mt-2">
                    {userId &&
                      product.owner &&
                      userId === (typeof product.owner === 'string' ? product.owner : product.owner._id) && (
                        <button
                          onClick={handleExchangeClick}
                          className="w-auto bg-[#68217A] text-xs font-medium px-2 py-1 text-[#d0fa44] rounded-md hover:bg-[#8b2fa2] hover:text-black transition duration-300"
                        >
                          Exchange Offer
                        </button>
                      )}

                    <p className="text-right">
                      <span className="text-2xl font-bold font-serif text-[#84a123] dark:text-[#58ee71] pr-1">$</span>
                      <span className="text-[#68217A] font-bold">{product.estimatedValue}</span>
                    </p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* ExchangeInstructions Modal */}
        <Modal
          title="How to Exchange a Product 🪙"
          show={showInstructionsModal}
          setShow={setShowInstructionsModal}
          
        >
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
          <AddItemForm setAddItemFormVisibility={setAddItemFormVisibility} setProducts={setProducts} />
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
    </div>
  );
};

export default Products;
