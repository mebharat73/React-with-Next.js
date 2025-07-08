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

  const userId = getCurrentUserId();

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
            statusText: isConfirmed ? 'Selected product by you' : null,
          };
        }
        if (product._id === selectedExchangeProductId) {
          return {
            ...product,
            status: 'locked',
            statusText: isConfirmed ? 'Your Product for exchange' : null,
          };
        }
        return product;
      });
      localStorage.setItem('products', JSON.stringify(updated));
      return updated;
    });
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="min-h-screen px-8 md:px-5 md:py-5 bg-gradient-to-br from-[#fdffc0] to-[#f1d2f9] dark:bg-gradient-to-br dark:from-[#1c1c1e] dark:to-[#2e2e30] transition-colors">

  {/* Header */}
  <div className="container md:px-5 md:py-2 font-poppins">
    <div className="flex flex-col mb-2 lg:flex-row items-center justify-between gap-6 md:mb-4">
      <div className="text-center lg:text-left w-full">
        <h1 className="text-3xl font-bold text-primary-700 dark:text-white tracking-tight font-poppins-bold">
          🪙 Sattapatta Products
        </h1>
        <div className=" md:w-24 h-1 bg-primary-500 rounded-full md:mx-auto lg:mx-0 mt-2" />
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-start gap-3 w-full md:ml-52 lg:-ml-56 px-3">
  {/* View Offers Button */}
  <div className="relative -mt-4">
    <Link href="/sattapatta/offers">
      <button className="md:py-1 md:px-2 bg-[#68217A] text-white font-thin rounded-lg shadow-md hover:bg-[#8b2fa2] transform hover:scale-105 transition-all duration-300">
        📥 View Received Offers
      </button>
    </Link>

    {offerCount > 0 && (
      <motion.span
        className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center animate-ping-fast"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 300, damping: 10 }}
      >
        {offerCount}
      </motion.span>
    )}
  </div>

  {/* Add Item Button */}
  <button
    onClick={handleAddItemClick}
    className="-mt-2 md:-mt-4 md:py-1 md:px-3 bg-gradient-to-r from-[#68217A] to-[#8b2fa2] text-white font-thin rounded-lg shadow-md hover:brightness-110 transform hover:scale-105 transition-all duration-300"
  >
    ➕ Add New Sattapatta Item
  </button>
</div>


    </div>
  </div>

  {/* Grid */}
  <div className="grid grid-cols-1 border-x-4 border-[#68217A] dark:border-purple-400 rounded-2xl md:grid-cols lg:grid-cols-6 gap-4 relative -mt-2">
    {/* Product List */}
    <div className="lg:col-span-4">
      <div
        className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 rounded-xl mr-4 ml-2 pt-2"
      >

        {products.length === 0 ? (
          <p className="text-center text-lg text-gray-500 dark:text-gray-300">No products available.</p>
        ) : (
          products.map((product) => (
            <div
              key={product._id}
              className={`bg-gradient-to-tl py-2 px-2 md:py-6 md:px-4 rounded-xl border-2 border-[#8b2fa2] shadow-lg transform transition-all duration-300 relative flex gap-4 dark:bg-gradient-to-tl dark:from-[#b4b0b0] dark:to-[#504e4e] ${
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

                {/* Title */}
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

                {/* Description */}
                <p className="text-sm font-semibold text-zinc-600 dark:text-white md:mt-2 max-h-24 overflow-hidden">
                  {product.description
                    ? product.description.slice(0, 15)
                    : ""}
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
                        className="w-auto bg-[#68217A] text-xs font-medium px-1 py-0.5 text-[#d0fa44] mt-2 rounded-md hover:bg-[#8b2fa2] hover:text-black transition duration-300"
                      >
                        Exchange Offer
                      </button>
                    )}

                  <p className="text-right">
                    <span className="text-2xl font-bold font-serif text-[#84a123] dark:text-[#58ee71] pr-1">$</span>
                    <span className="text-[#68217A] font-bold">{product.estimatedValue}</span>
                  </p>
                </div>

                {/* Status Text */}
                {product.statusText && (
                  <div className="absolute -inset-3 bg-black bg-opacity-50 flex justify-center items-center text-white text-lg font-semibold rounded-md">
                    {product.statusText}
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>

    {/* Exchange Form */}
    <ProductDetailExchangeForm
      ref={exchangeFormRef}
      selectedProduct={selectedProduct}
      setSelectedProduct={setSelectedProduct}
      exchangeFormVisibility={exchangeFormVisibility}
      setExchangeFormVisibility={setExchangeFormVisibility}
      products={products}
      handleFormSubmit={(e) => console.log('Form submitted!')}
      additionalPrice={additionalPrice}
      setAdditionalPrice={setAdditionalPrice}
      updateProductStatus={updateProductStatus}
      inExchangeItemIds={inExchangeItemIds}
    />
  </div>

  {/* Add Item Modal */}
  {addItemFormVisibility && (
    <AddItemForm setAddItemFormVisibility={setAddItemFormVisibility} setProducts={setProducts} />
  )}

  {/* CTA */}
  {isFormSubmitted && (
    <div className="text-center mt-4">
      <button
        onClick={handleNewExchange}
        className="py-1 px-2 bg-[#68217A] text-white hover:text-black font-semibold rounded-2xl hover:bg-[#8b2fa2] transition-all duration-300 transform hover:scale-105"
      >
        Start New Exchange
      </button>
    </div>
  )}
</div>

  );
};

export default Products;
