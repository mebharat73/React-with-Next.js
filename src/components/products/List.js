"use client";

import { useSelector } from "react-redux";
import ProductCard from "./Card";
import { PRODUCT_GRID_VIEW } from "@/constants/productView";

function ProductList({ products }) {
  const { productView } = useSelector((state) => state.userPreferences);

  const className =
    productView === PRODUCT_GRID_VIEW
      ? `grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 py-5 px-3`
      : `grid grid-cols-1 gap-5 py-5 px-3`;

  return (
    <div className={className}>
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          productView={productView}
        />
      ))}
    </div>
  );
}

export default ProductList;
