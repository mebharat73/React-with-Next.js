import { getProductsByBrand } from "@/api/products";
import ProductList from "@/components/products/List";

async function PopularBrand() {
  const products = await getProductsByBrand("Apple");

  console.log(products);

  return (
    <div className="mt-5 py-10 px-5 max-w-screen-xl mx-auto bg-gradient-to-tl from-[#ebacfb] to-[#f9fbc6] rounded-3xl border-x-2 border-[#84a123] dark:bg-gradient-to-tl dark:from-[#979595] dark:to-[#000000]">
      <div className="flex flex-col md:flex-row items-center justify-between px-5 ">
        <h1 className="font-serif text-center md:text-left text-3xl md:text-4xl font-semibold text-[#68217A] px-2 dark:text-white">
          Popular brand
        </h1>
      </div>

      <ProductList products={products} />
    </div>
  );
}

export default PopularBrand;
