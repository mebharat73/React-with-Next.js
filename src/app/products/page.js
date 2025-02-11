import FilterProducts from "@/components/products/Filter";
import Link from "next/link";
import { PRODUCTS_ROUTE } from "@/constants/routes";
import { getAllProducts, getBrands, getCategories } from "@/api/products";
import SearchProducts from "@/components/products/Search";
import ProductViewSwitcher from "@/components/products/ViewSwitcher";
import ProductList from "@/components/products/List";
import Image from 'next/image'

async function ProductsPage({ searchParams }) {
  const products = await getAllProducts(await searchParams);
  const brands = await getBrands();
  const categories = await getCategories();

  return (
    <div className="px-1 md:px-2">
      <div className="p-1 md:py-1 px-1 flex items-center justify-between">
          
        <h1 className="font-serif text-center md:text-left text-2xl md:text-4xl font-semibold text-[#68217A] dark:text-white">
          Products....          
        
        </h1>
        <Image 
            src="/images/logo.png" // Path to your logo inside the public folder
            alt="Logo"
            width={200} // Adjust based on your logo's size
            height={200} // Adjust based on your logo's size
            className="h-20 w-20 border-2 rounded-full border-[#8b2fa2] transition-all hover:scale-150 scroll-smooth"
          />
        
        <div className="flex items-center py-0">
          <ProductViewSwitcher />
          <Link
            href={`${PRODUCTS_ROUTE}/add`}
            className="font-serif font-semibold  rounded-xl bg-gradient-to-tl from-[#8e912d] to-[#dd53ff] px-3 py-0 border-2 border-[#84a123] border-solid text-[#41144c] hover:text-[white] dark:bg-gradient-to-tl dark:from-[#b4b0b0] dark:to-[#504e4e]"
          >
            Add Product
          </Link>
        </div>
      </div>

      <div className="md:grid grid-cols-[1fr,auto] gap-2 items-center justify-between">
        <SearchProducts />
        <FilterProducts brands={brands} categories={categories} />
      </div>

      <ProductList products={products} />
    </div>
  );
}

export default ProductsPage;
