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
      <img
        src={product.imageUrls}
        alt={product.name}
        className="w-auto h-20 object-fill rounded-lg"
      />
      <h3 className="text-xl mt-2 font-semibold text-[#68217A] hover:underline ">
        {product.name}
      </h3>
      <p className="text-lg text-[#84a123] font-bold">Rs{product.price}</p>
    </div>
  );
}

function PopularBrand() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [intervalIds, setIntervalIds] = useState([]);
  const router = useRouter();

  useEffect(() => {
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
    if (products.length === 0) return;

    const intervals = products.slice(0, 4).map((_, idx) => {
      return setInterval(() => {
        setCurrentIndex((prevIndex) => {
          const nextIndex = prevIndex + 1;
          return nextIndex >= products.length ? 0 : nextIndex;
        });
      }, 6000 * (idx + 1));
    });

    setIntervalIds(intervals);

    return () => {
      intervals.forEach(clearInterval);
    };
  }, [products]);

  const displayProducts = [];
    const seenIds = new Set();

    for (let i = 0; displayProducts.length < 4 && i < products.length * 2; i++) {
      const product = products[(currentIndex + i) % products.length];
      if (!seenIds.has(product.id)) {
        displayProducts.push(product);
        seenIds.add(product.id);
      }
    }


  const handleMouseEnter = () => {
    intervalIds.forEach(clearInterval);
  };

  const handleMouseLeave = () => {
    if (products.length === 0) return;

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

      <div className="overflow-hidden">
        <div className="grid grid-cols-2 px-2 py-4 md:grid-cols-4 gap-5 transition-transform duration-1000 ease-in-out">
          {loading ? (
            <p className="text-center text-lg text-gray-500 col-span-4">
              Loading products...
            </p>
          ) : products.length === 0 ? (
            <p className="text-center text-lg text-gray-500 col-span-4">
              No products available to display.
            </p>
          ) : (
            displayProducts.map(
              (product, index) =>
                product && (
                  <ProductCard
                    key={product.id || `${product.name}-${index}`} // ✅ using the formatted `id`
                    product={product}
                    onClick={() => handleProductClick(product.id)} // ✅ using `product.id`, not `_id`
                  />

                )
            )
          )}
        </div>
      </div>
    </div>
  );
}

export default PopularBrand;
