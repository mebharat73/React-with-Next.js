'use client';

import { getProductsByBrand } from "@/api/products";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

// Simple component to display a product card
function ProductCard({ product, onClick }) {
  return (
    <div
      onClick={onClick}
      className="bg-gradient-to-br from-[#fdffc0] to-[#f1d2f9] shadow-lg rounded-2xl border-t-2 border-[#84a123] p-4 dark:bg-gray-800 dark:text-white cursor-pointer"
    >
      <img src={product.imageUrls} alt={product.name} className="w-auto h-20 object-fill rounded-lg" />
      <h3 className="text-xl mt-2 font-semibold text-[#68217A] hover:underline ">{product.name}</h3>
      <p className="text-lg text-[#84a123] font-bold">${product.price}</p>
    </div>
  );
}

function PopularBrand() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0); // Manage current index of products
  const [intervalIds, setIntervalIds] = useState([]); // Store individual interval IDs for each product
  const router = useRouter();

  useEffect(() => {
    // Fetch products from API
    const fetchProducts = async () => {
      try {
        const data = await getProductsByBrand("Apple");
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    // Set up different intervals for each product
    const intervals = products.slice(0, 4).map((_, idx) => {
      return setInterval(() => {
        setCurrentIndex((prevIndex) => {
          // Change product index by 1
          const nextIndex = prevIndex + 1;
          return nextIndex >= products.length ? 0 : nextIndex; // Wrap around to start if end is reached
        });
      }, 6000 * (idx + 1)); // Different interval for each product (6, 12, 18, etc.)
    });

    setIntervalIds(intervals);

    // Cleanup intervals when component unmounts
    return () => {
      intervals.forEach(clearInterval);
    };
  }, [products]);

  // Display products based on the current index
  const displayProducts = [
    products[currentIndex % products.length],
    products[(currentIndex + 1) % products.length],
    products[(currentIndex + 2) % products.length],
    products[(currentIndex + 3) % products.length],
  ]; // Always show 4 products with rotation

  // Pause the interval when the mouse hovers over the products
  const handleMouseEnter = () => {
    intervalIds.forEach(clearInterval); // Stop all intervals when hovering
  };

  // Resume the interval when the mouse leaves the products
  const handleMouseLeave = () => {
    // Reset the intervals for each product
    const newIntervals = products.slice(0, 4).map((_, idx) => {
      return setInterval(() => {
        setCurrentIndex((prevIndex) => {
          const nextIndex = prevIndex + 1;
          return nextIndex >= products.length ? 0 : nextIndex;
        });
      }, 6000 * (idx + 1));
    });
    setIntervalIds(newIntervals);
  };

  // Redirect to the product detail page when a product is clicked
  const handleProductClick = (productId) => {
    router.push(`/products/${productId}`);
  };

  return (
    <div
      className="py-1 px-1 max-w-screen-xl pt-2 bg-gradient-to-tl from-[#ebacfb] to-[#f9fbc6] rounded-3xl border-x-2 border-[#84a123] dark:bg-gradient-to-tl dark:from-[#979595] dark:to-[#000000]"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="flex flex-col md:flex-row items-center justify-between">
        <h1 className="font-serif text-center md:text-left text-3xl md:text-4xl font-semibold text-[#68217A] px-2 dark:text-white">
          Popular brand
        </h1>
      </div>

      {/* Render the products with independent timing */}
      <div className="overflow-hidden">
        <div className="grid grid-cols-2 px-2 py-4 md:grid-cols-4 gap-5 transition-transform duration-1000 ease-in-out">
          {loading ? (
            <p className="text-center text-lg text-gray-500">Loading products...</p>
          ) : (
            displayProducts.map((product, index) => (
              <ProductCard
                key={product.id || index} // Unique key for each product, using index as fallback
                product={product}
                onClick={() => handleProductClick(product.id)} // Handle product click
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default PopularBrand;
