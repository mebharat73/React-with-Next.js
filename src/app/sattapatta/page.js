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
    <div className="container px-5">
      {/* Offers Button with Count */}
      <div className="relative inline-block">
        <Link href="/sattapatta/offers">
          <button className="py-2 px-4 bg-[#68217A] text-white font-semibold rounded-md hover:bg-[#8b2fa2] transition-all duration-300 relative">
            View Received Offers
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

      <h1 className="text-3xl font-bold text-[#68217A] text-center mt-4">Sattapatta Products</h1>

      <div className="text-center my-4">
        <button
          onClick={handleAddItemClick}
          className="py-2 px-4 bg-[#68217A] text-white font-semibold rounded-md hover:bg-[#8b2fa2] transition-all duration-300"
        >
          Add New Sattapatta Item
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-6 gap-4 relative">
        <div
          className="lg:col-span-4 overflow-y-auto scrollbar-hide"
          style={{ maxHeight: 'calc(100vh - 77px)' }}
        >
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-4 rounded-xl mr-4 mt-2 ml-2">
            {products.length === 0 ? (
              <p className="text-center text-lg text-gray-500">No products available.</p>
            ) : (
              products.map((product) => (
                <div
                  key={product._id}
                  className={`bg-gradient-to-tl p-2 rounded-lg shadow-lg transform transition-all duration-300 relative flex gap-4 ${
                    inExchangeItemIds.has(product._id) ? 'pointer-events-none opacity-70' : 'hover:shadow-xl hover:scale-105 cursor-pointer'
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
                    {/* Booked Overlay */}
                      {/* Booked Overlay */}
                    {inExchangeItemIds.has(product._id) && (
                      <div
                        className="absolute inset-0 bg-black bg-opacity-60 flex flex-col items-center justify-center rounded-lg z-20"
                        // no pointer-events:none here, so clicks are blocked
                      >
                        {/* Fingerprint SVG icon */}
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

                        {/* Booked text */}
                        <p className="text-yellow-400 font-bold text-sm select-none">Booked</p>
                      </div>
                    )}


                    {/* Title */}
                    <div className="mb-1 border-1 border-[#8b2fa2] bg-gradient-to-br from-[#f0f656] to-[#e382fb] text-[#68217A] font-bold rounded-lg overflow-hidden">
                      <motion.div
                        className="whitespace-nowrap overflow-hidden w-40"
                        style={{ maxWidth: '100%' }}
                        animate={{ x: ['100%', '-100%'] }}
                        transition={{
                          x: { repeat: Infinity, repeatType: 'loop', duration: 15, ease: 'linear' },
                        }}
                      >
                        {product.title}
                      </motion.div>
                    </div>

                    {/* Image */}
                    <Image
                      alt={product.title}
                      src={product.imageUrls.length > 0 ? product.imageUrls[0] : '/placeholder.jpg'}
                      width={500}
                      height={500}
                      className="h-36 bg-gradient-to-br from-[#fdffc0] to-[#f1d2f9] rounded-2xl border-y-2 border-dashed border-[#8b2fa2] object-fill"
                    />

                    {/* Description */}
                    <div className="px-0 mt-2">
                      <p className="text-sm font-semibold text-zinc-600 max-h-24 overflow-hidden text-ellipsis">
                        {product.description?.length > 40
                          ? `${product.description.slice(0, 38)}...`
                          : product.description}
                        <Link
                          href={`/products/${product._id}`}
                          className="text-[#dc57fd] font-semibold underline hover:text-[#8b2fa2] ml-1"
                        >
                          More details
                        </Link>
                      </p>
                    </div>

                    {/* Exchange Button & Price */}
                    <div className="md:flex items-center justify-between mt-2">
                      {userId &&
                        product.owner &&
                        userId === (typeof product.owner === 'string' ? product.owner : product.owner._id) && (
                          <button
                            onClick={handleExchangeClick}
                            className="w-full bg-[#68217A] text-xs font-medium px-1 py-0.5 text-[#d0fa44] mt-2 rounded-md hover:bg-[#8b2fa2] hover:text-black transition duration-300"
                          >
                            Exchange Offer
                          </button>
                        )}

                      <p className="text-right">
                        <span className="text-2xl font-bold font-serif text-[#84a123] pr-1">$</span>
                        <span className="text-[#68217A] font-bold">{product.estimatedValue}</span>
                      </p>
                    </div>

                    {/* Status Overlay */}
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
          inExchangeItemIds={inExchangeItemIds} // 👉 pass this prop
        />

      </div>

      {/* Add Item Modal */}
      {addItemFormVisibility && (
        <AddItemForm setAddItemFormVisibility={setAddItemFormVisibility} setProducts={setProducts} />
      )}

      {/* New Exchange CTA */}
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
