"use client";

import Modal from "../Modal";
import { LuFilterX } from "react-icons/lu";
import { MdOutlineFilterAlt } from "react-icons/md";
import { PRODUCTS_ROUTE } from "@/constants/routes";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import './FilterProducts.css';

function FilterProducts({ brands, categories }) {
  const [showFilter, setShowFilter] = useState(false);
  const [brandsFilter, setBrandsFilter] = useState([]);
  const [category, setCategory] = useState("");
  const [limitFilter, setLimitFilter] = useState(12);
  const [maxPrice, setMaxPrice] = useState(null);
  const [minPrice, setMinPrice] = useState(null);
  const [sortFilter, setSortFilter] = useState(JSON.stringify({ createdAt: +1 }));

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  function onChangeLimit(event) {
    setLimitFilter(event.target.value);
  }

  function onChangeSort(event) {
    setSortFilter(event.target.value);
  }

  function handleBrandsFilterChange(brand) {
    setBrandsFilter((prev) =>
      prev.includes(brand)
        ? prev.filter((item) => item !== brand)
        : [...prev, brand]
    );
  }

  function setFilter() {
    const params = new URLSearchParams();

    if (brandsFilter.length > 0) {
      params.set("brands", brandsFilter.join(","));
    }

    if (category) {
      params.set("category", category);
    }

    params.set("limit", Number(limitFilter));

    if (minPrice !== null && minPrice !== "") {
      params.set("min", Number(minPrice));
    }

    if (maxPrice !== null && maxPrice !== "") {
      params.set("max", Number(maxPrice));
    }

    params.set("sort", sortFilter);

    router.push(pathname + "?" + params.toString());
    setShowFilter(false);
  }

  function resetFilter() {
    setBrandsFilter([]);
    setCategory("");
    setLimitFilter(12);
    setMaxPrice(null);
    setMinPrice(null);
    router.push(PRODUCTS_ROUTE);
  }

  const getRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  useEffect(() => {
    setFilter();
  }, [category]);

  return (
    <div className="flex items-center">
      {/* Category Dropdown */}
      <select
        name="category"
        id="category"
        value={category}
        className="border-x-2 border-[#68217A] bg-gradient-to-b from-[#faaae0] to-[#bacfef] dark:bg-gray-950 rounded-xl py-1 px-5 w-full transition duration-300 ease-in-out transform hover:scale-105"
        onChange={(e) => setCategory(e.target.value)}
      >
        <option value="">Select category</option>
        {categories.map((category) => (
          <option
            key={category}
            value={category}
            style={{ backgroundColor: getRandomColor() }}
          >
            {category}
          </option>
        ))}
      </select>

      {/* Filter Button */}
      <button
        onClick={() => setShowFilter(true)}
        className="bg-[#dd53ff] hover:bg-[#8b2fa2] text-white p-2 rounded text-xl h-8 w-9 mr-2 ml-5 transition duration-300 ease-in-out transform hover:scale-105"
      >
        <MdOutlineFilterAlt />
      </button>

      {/* Reset Button */}
      <button
        onClick={resetFilter}
        className="bg-[#8b2fa2] hover:bg-[#dd53ff] text-white p-2 rounded text-xl h-8 w-9 transition duration-300 ease-in-out transform hover:scale-105"
        title="Reset filter"
      >
        <LuFilterX />
      </button>

      {/* Modal */}
      <Modal title={"Filter products"} show={showFilter} setShow={setShowFilter}>
        <div className="py-10">

          {/* Sort */}
          <div className="flex items-center justify-between py-2">
            <label htmlFor="sort" className="text-nowrap mr-3 font-semibold">Sort By:</label>
            <select
              name="sort"
              id="sort"
              className="border w-4/5 bg-gray-50 dark:bg-gray-950 rounded py-1 px-2"
              value={sortFilter}
              onChange={onChangeSort}
            >
              <option value={JSON.stringify({ createdAt: -1 })}>Latest</option>
              <option value={JSON.stringify({ createdAt: 1 })}>Oldest</option>
              <option value={JSON.stringify({ price: 1 })}>Price: Low to High</option>
              <option value={JSON.stringify({ price: -1 })}>Price: High to Low</option>
            </select>
          </div>

          {/* Limit */}
          <div className="flex items-center justify-between py-2">
            <label htmlFor="limit" className="text-nowrap mr-3 font-semibold">Limit:</label>
            <select
              name="limit"
              id="limit"
              value={limitFilter}
              className="border w-4/5 bg-gray-50 dark:bg-gray-950 rounded py-1 px-2"
              onChange={onChangeLimit}
            >
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
            </select>
          </div>

          {/* Price Filter */}
          <div className="flex items-center justify-between py-2">
            <label htmlFor="price" className="text-nowrap mr-3 font-semibold">Price:</label>
            <div className="w-full md:grid grid-cols-2 gap-4">
              <div className="mb-3 md:mb-0">
                <label htmlFor="minPrice" className="mr-2">Min:</label>
                <input
                  type="number"
                  id="minPrice"
                  value={minPrice ?? ""}
                  className="border bg-gray-50 dark:bg-gray-950 rounded py-1 px-1 w-full"
                  name="minPrice"
                  min={0}
                  onChange={(e) =>
                    setMinPrice(e.target.value === "" ? null : e.target.value)
                  }
                />
              </div>
              <div>
                <label htmlFor="maxPrice" className="mr-2">Max:</label>
                <input
                  type="number"
                  id="maxPrice"
                  value={maxPrice ?? ""}
                  className="border bg-gray-50 dark:bg-gray-950 rounded py-1 px-1 w-full"
                  name="maxPrice"
                  min={0}
                  onChange={(e) =>
                    setMaxPrice(e.target.value === "" ? null : e.target.value)
                  }
                />
              </div>
            </div>
          </div>

          {/* Brands */}
          <div className="flex items-center justify-between py-2">
            <label htmlFor="brand" className="text-nowrap mr-3 font-semibold">Brand:</label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2 w-full">
              {brands.map((brand) => (
                <div key={brand} className="font-medium text-xs md:font-semibold md:text-sm brand-checkbox text-black">
                  <input
                    type="checkbox"
                    name={brand}
                    id={brand}
                    className="mr-1"
                    checked={brandsFilter.includes(brand)}
                    onChange={() => handleBrandsFilterChange(brand)}
                  />
                  <label htmlFor={brand}>{brand}</label>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-between">
          <button
            className="bg-red-500 text-white rounded px-5 py-2 transition duration-300 ease-in-out transform hover:scale-105"
            onClick={() => setShowFilter(false)}
          >
            Cancel
          </button>
          <button
            className="bg-primary-500 text-white rounded px-5 py-2 transition duration-300 ease-in-out transform hover:scale-105"
            onClick={setFilter}
          >
            Submit
          </button>
        </div>
      </Modal>
    </div>
  );
}

export default FilterProducts;
