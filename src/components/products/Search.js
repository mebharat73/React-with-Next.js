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
        className="md:block hidden whitespace-nowrap mr-4 bg-gradient-to-tl from-[#C3EF38] to-[#dd53ff] text-white font-serif font-semibold dark:bg-slate-900 dark:text-white h-7 rounded-md"
      >
        <div className="flex items-center px-3 py-0.5" >
          <RiSearchLine className="mr-2" />
          All Products:
        </div>
      </label>
      <input
        id="name"
        placeholder="Type name of your desire product..."
        name="name"
        type="search"
        className="h-8 text-lg font-serif text-black dark:text-white border-b-4 border-[#68217A] bg-[#f1d2f9] dark:bg-gray-950 rounded-xl w-full pl-20" // Added pl-6 for padding-left
        onChange={(e) => setName(e.target.value)}
      />

    </div>
  );
}

export default SearchProducts;
