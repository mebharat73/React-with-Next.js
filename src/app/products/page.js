import FilterProducts from "@/components/products/Filter";
import Link from "next/link";
import { PRODUCTS_ROUTE } from "@/constants/routes";
import { getAllProducts, getBrands, getCategories } from "@/api/products";
import SearchProducts from "@/components/products/Search";
import ProductViewSwitcher from "@/components/products/ViewSwitcher";
import ProductList from "@/components/products/List";

async function ProductsPage({ searchParams }) {
  const products = await getAllProducts(await searchParams);
  const brands = await getBrands();
  const categories = await getCategories();

  return (
    <div className="px-10">
      <div className="p-5 flex items-center justify-between">
        <h1 className="font-serif text-center md:text-left text-2xl md:text-4xl font-semibold text-[#68217A] dark:text-white">
          Products....
        </h1>
        <div className="flex items-center py-0">
          <ProductViewSwitcher />
          <Link
            href={`${PRODUCTS_ROUTE}/add`}
            className="font-serif font-semibold  rounded-xl bg-gradient-to-tl from-[#8e912d] to-[#dd53ff] px-3 py-0 border-2 border-[#84a123] border-solid text-[#41144c] hover:text-[white]"
          >
            Add Product
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1  md:grid-cols-[1fr,auto] gap-5 items-center justify-between px-5 py-0">
        <SearchProducts />
        <FilterProducts brands={brands} categories={categories} />
      </div>

      <ProductList products={products} />
    </div>
  );
}

export default ProductsPage;
