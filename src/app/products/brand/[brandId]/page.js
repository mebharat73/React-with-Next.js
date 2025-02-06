import { getProductsByBrand } from "@/api/products";
import ProductCard from "@/components/products/Card";
import ProductList from "@/components/products/List";

async function ProductsByBrand({ params }) {
  const brand = (await params).brandId;

  const products = await getProductsByBrand(brand);

  return (
    <div className="py-8">
      <div className="flex flex-col md:flex-row items-center justify-between px-5">
        <h1 className="text-center md:text-left text-3xl md:text-4xl font-semibold text-textColor px-2 dark:text-white">
          Brand: {brand}
        </h1>
      </div>

      <ProductList products={products} />
    </div>
  );
}

export default ProductsByBrand;
