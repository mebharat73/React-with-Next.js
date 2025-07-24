'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useSelector } from 'react-redux';
import { getAllProducts, getBrands, getCategories } from '@/api/products';
import FilterProducts from '@/components/products/Filter';
import SearchProducts from '@/components/products/Search';
import ProductViewSwitcher from '@/components/products/ViewSwitcher';
import ProductList from '@/components/products/List';
import Link from 'next/link';
import Image from 'next/image';
import { PRODUCTS_ROUTE } from '@/constants/routes';

function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [offset, setOffset] = useState(0);
  const limit = 15; // Number of products per page

  const { user } = useSelector((state) => state.auth);

  const searchParams = useSearchParams();
  const router = useRouter();

  // Helper function to get current filters without limit & offset params
  const getBaseQueryParams = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete('limit');
    params.delete('offset');
    return params.toString();
  };

  // Load initial products & filters when searchParams change
  useEffect(() => {
    async function fetchInitial() {
      setLoading(true);
      try {
        setOffset(0); // Reset offset on filter/search change
        const baseParams = getBaseQueryParams();
        const queryString = baseParams ? `${baseParams}&limit=${limit}&offset=0` : `limit=${limit}&offset=0`;

        const productsData = await getAllProducts(queryString);
        setProducts(productsData);
        setHasMore(productsData.length === limit); // If less than limit, no more products

        // Fetch brands & categories (you may want to fetch this once globally, but fine here for now)
        const brandsData = await getBrands();
        setBrands(brandsData);

        const categoriesData = await getCategories();
        setCategories(categoriesData);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchInitial();
  }, [searchParams]);

  // Load more products when "Load More" button clicked
  const loadMoreProducts = async () => {
  if (loading) return;
  setLoading(true);
  try {
    const baseParams = getBaseQueryParams();
    const newOffset = offset + limit;
    const queryString = baseParams
      ? `${baseParams}&limit=${limit}&offset=${newOffset}`
      : `limit=${limit}&offset=${newOffset}`;

    const moreProducts = await getAllProducts(queryString);

    // ✅ Deduplicate by `id`
    setProducts((prev) => {
      const existingIds = new Set(prev.map((p) => p.id));
      const uniqueNew = moreProducts.filter((p) => !existingIds.has(p.id));
      return [...prev, ...uniqueNew];
    });

    setOffset(newOffset);
    setHasMore(moreProducts.length === limit);
  } catch (error) {
    console.error('Error loading more products:', error);
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="bg-gradient-to-br from-[#fdffc0] to-[#f1d2f9] dark:bg-gradient-to-tl dark:from-[#000000] dark:to-[#979595] text-black dark:text-white min-h-screen transition-colors duration-300" >
      <div className="px-0 md:py-1 md:px-5 flex items-center justify-between">
        <h1 className="font-serif text-center md:text-left text-2xl lg:text-4xl font-semibold text-[#68217A] dark:text-white">
          Make a wish..
        </h1>

        <Image
          src="/images/logo.png"
          alt="Logo"
          width={200}
          height={200}
          className="hidden md:block md:h-10 md:w-10 lg:h-20 lg:w-20 border-2 rounded-full border-[#8b2fa2] transition-all hover:scale-150 scroll-smooth"
        />

        <div className="flex items-center py-0">
          <ProductViewSwitcher />
          {user?.roles.some((role) => role === 'ADMIN' || role === 'MERCHANT') && (
            <Link
              href={`${PRODUCTS_ROUTE}/add`}
              className="px-2 py-0 font-normal lg:font-serif lg:font-semibold rounded-xl bg-gradient-to-tl from-[#8e912d] to-[#dd53ff] lg:px-3 lg:py-0 border-2 border-[#84a123] border-solid text-[#41144c] hover:text-[white] dark:bg-gradient-to-tl dark:from-[#b4b0b0] dark:to-[#504e4e]"
            >
              Add Product
            </Link>
          )}
        </div>
      </div>

      <div className="px-0 lg:grid grid-cols-[1fr,auto] gap-2 items-center justify-between md:px-5">
        <SearchProducts />
        <FilterProducts brands={brands} categories={categories} />
      </div>

      <ProductList products={products} />

      {/* Load More Button */}
      {hasMore && (
        <div className="flex justify-center my-4">
          <button
            onClick={loadMoreProducts}
            disabled={loading}
            className="bg-[#68217A] text-white px-3 py-1 -mt-3 mb-4 md:px-6 md:py-1 rounded hover:bg-[#8b2fa2] transition"
          >
            {loading ? 'Loading...' : 'Load More'}
          </button>
        </div>
      )}
    </div>
  );
}

export default ProductsPage;
