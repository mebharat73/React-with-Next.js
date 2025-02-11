"use client";
import { LuLayoutGrid } from "react-icons/lu";
import { useDispatch, useSelector } from "react-redux";
import { TfiViewListAlt } from "react-icons/tfi";
import { BsGrid3X3Gap } from "react-icons/bs";
import { PRODUCT_GRID_VIEW } from "@/constants/productView";
import { toggleProductView } from "@/redux/userPreferences/userPreferencesSlice";

function ProductViewSwitcher() {
  const { productView } = useSelector((state) => state.userPreferences);

  const dispatch = useDispatch();

  return (
    <div className="flex items-center mr-4 px-0 py-0 rounded border-2 bg-gradient-to-tl from-[#ebacfb] to-[#f9fbc6] dark:bg-gradient-to-tl dark:from-[#504e4e] dark:to-[#b4b0b0]
">
      <button onClick={() => dispatch(toggleProductView())}>
        {productView === PRODUCT_GRID_VIEW ? (
          <BsGrid3X3Gap className="h-7 w-7 hover:text-[#8b2fa2]" />
        ) : (
          <TfiViewListAlt className="h-6 w-6 hover:text-[#8b2fa2]" />
        )}
      </button>
    </div>
  );
}

export default ProductViewSwitcher;
