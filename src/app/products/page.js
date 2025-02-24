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
  const { user } = useSelector((state) => state.auth);

  const searchParams = useSearchParams(); // Unwrap the searchParams using this hook
  const router = useRouter();

  useEffect(() => {
    async function fetchData() {
      try {
        const query = new URLSearchParams(searchParams).toString(); // Converts the searchParams to a query string
        const productsData = await getAllProducts(query); // Pass the query string to the API
        setProducts(productsData);

        const brandsData = await getBrands();
        setBrands(brandsData);

        const categoriesData = await getCategories();
        setCategories(categoriesData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchData();
  }, [searchParams]); // Re-run the effect whenever searchParams changes

  return (
    <div>
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
          {/* Conditionally render Add Product button for ADMIN role */}
          {user?.roles.includes('ADMIN') && (
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
    </div>
  );
}

export default ProductsPage;
