"use client";

import { useSelector } from "react-redux";
import ProductCard from "./Card";
import { PRODUCT_GRID_VIEW } from "@/constants/productView";

function ProductList({ products }) {
  const { productView } = useSelector((state) => state.userPreferences);

  const className =
    productView === PRODUCT_GRID_VIEW
      ? `grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-1 md:gap-0 md:py-1`
      : `grid grid-cols-1 gap-1 py-5 px-3`;

  return (
    <div className={className}>
      {products.map((product) => (
        <ProductCard key={product.id || product._id} product={product} productView={productView} />

      ))}
    </div>
  );
}

export default ProductList;
