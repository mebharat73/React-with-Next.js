'use client';
import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Image from 'next/image';
import ProductDetailExchangeForm from './ProductDetailExchangeForm/ProductDetailExchangeForm';
import AddItemForm from './AddItemForm';
import ReceivedOffers from './ReceivedOffers';
import axios from 'axios';
import { getCurrentUserId } from '@/constants/authToken';

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
});

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [exchangeFormVisibility, setExchangeFormVisibility] = useState(false);
  const [additionalPrice, setAdditionalPrice] = useState('');
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [addItemFormVisibility, setAddItemFormVisibility] = useState(false);
  const exchangeFormRef = useRef(null);
  const [statusText, setStatusText] = useState({});
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

    fetchProducts();
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

  const updateProductStatus = (selectedProductId, selectedExchangeProductId, isConfirmed) => {
    setProducts((prevProducts) => {
      const updatedProducts = prevProducts.map((product) => {
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

      localStorage.setItem('products', JSON.stringify(updatedProducts));
      return updatedProducts;
    });
  };

  const handleNewExchange = () => {
    setSelectedProduct(null);
    setExchangeFormVisibility(false);
    setIsFormSubmitted(false);
    setAdditionalPrice('');
  };

  const handleAddItemClick = () => {
    setAddItemFormVisibility(true);
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="container px-5">
      <Link href="/sattapatta/offers">
        <button className="py-2 px-4 bg-[#68217A] text-white font-semibold rounded-md hover:bg-[#8b2fa2] transition-all duration-300">
          View Received Offers
        </button>
      </Link>

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
        <div className="lg:col-span-4 overflow-y-auto scrollbar-hide" style={{ maxHeight: 'calc(100vh - 77px)' }}>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-4 rounded-xl mr-4 mt-2 ml-2">
            {products.length === 0 ? (
              <p className="text-center text-lg text-gray-500">No products available.</p>
            ) : (
              products.map((product) => (
                <div
                  key={product._id}
                  className={`bg-gradient-to-tl p-2 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 relative flex gap-4 cursor-pointer ${
                    product.status === 'locked'
                      ? 'border-4 border-double shadow-[#82e677] border-[#f45ddb]'
                      : product.status === 'ongoing'
                      ? 'border-4 border-double shadow-lg shadow-[#f444fa] border-[#6cf770]'
                      : ''
                  }`}
                  onClick={() => handleProductClick(product)}
                >
                  <div className="flex-1 relative">
                    <div>
                      <div className="mb-1 border-1 border-[#8b2fa2] border-solid bg-gradient-to-br rounded-lg from-[#f0f656] to-[#e382fb] text-[#68217A] dark:text-[#d0fa44] font-bold whitespace-nowrap overflow-hidden dark:bg-gradient-to-tl dark:from-[#000000] dark:to-[#979595] max-w-full">
                        <motion.div
                          className="whitespace-nowrap overflow-hidden w-40"
                          style={{ maxWidth: '100%' }}
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
                      <div className="overflow-hidden">
                        <Image
                          alt={product.title}
                          src={product.imageUrls.length > 0 ? product.imageUrls[0] : '/placeholder.jpg'}
                          width={500}
                          height={500}
                          className="h-36 bg-gradient-to-br from-[#fdffc0] to-[#f1d2f9] rounded-2xl border-y-2 border-dashed border-[#8b2fa2] dark:bg-gradient-to-tl dark:from-[#504e4e] dark:to-[#b4b0b0] object-fill"
                        />
                      </div>
                    </div>
                    <div className="px-0">
                      <p className="text-sm font-semibold text-zinc-600 dark:text-white max-h-24 overflow-hidden text-ellipsis">
                        {product.description?.length > 40
                          ? `${product.description.slice(0, 38)}...`
                          : product.description}
                        <Link
                          href={`/products/${product._id}`}
                          className="text-[#dc57fd] font-semibold underline hover:text-[#8b2fa2] hover:underline transition-all duration-200 inline-block"
                        >
                          More details
                        </Link>
                      </p>
                    </div>

                    <div className="md:flex items-center justify-between">
                      {userId && product.owner && userId === (typeof product.owner === 'string' ? product.owner : product.owner._id) && (
                        <button
                          onClick={handleExchangeClick}
                          className="w-full bg-[#68217A] text-xs font-medium px-1 py-0.5 text-[#d0fa44] mt-2 rounded-md hover:bg-[#8b2fa2] hover:text-black transition duration-300"
                        >
                          Exchange Offer
                        </button>
                        )}

                      <p className="text-right">
                        <span className="text-2xl font-bold font-serif text-[#84a123] pr-1">$</span>
                        <span className="dark:text-white font-bold text-[#68217A]">{product.estimatedValue}</span>
                      </p>
                    </div>


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
          statusText={statusText}
        />
      </div>

      {addItemFormVisibility && (
        <AddItemForm setAddItemFormVisibility={setAddItemFormVisibility} setProducts={setProducts} />
      )}

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
