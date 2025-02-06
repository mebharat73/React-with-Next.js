"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { RiSearchLine } from "react-icons/ri";
import { useDebounce } from "use-debounce";

function SearchProducts() {
  const [name, setName] = useState("");
  const [delayedName] = useDebounce(name, 300);

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("name", name);

    router.push(pathname + "?" + params.toString());

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [delayedName]);
  return (
    <div className="flex items-center">
      <label
        htmlFor="name"
        className="whitespace-nowrap mr-4 bg-[#84a123] text-white font-serif font-semibold dark:bg-slate-900 dark:text-white h-7 rounded-md flex items-center px-3"
      >
        <RiSearchLine className="mr-2" />
        All Products:
      </label>
      <input
        id="name"
        placeholder="       Type name of your desire product..."
        name="name"
        type="search"
        className="h-8 text-lg text-[#68217A] border-2 border-double border-[#68217A] bg-[#f1d2f9] dark:bg-gray-950 rounded-xl w-full pl-20" // Added pl-6 for padding-left
        onChange={(e) => setName(e.target.value)}
      />

    </div>
  );
}

export default SearchProducts;
