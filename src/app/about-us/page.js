"use client";

import { usePathname } from "next/navigation";

function AboutUs() {
  const pathname = usePathname();

  console.log(pathname);
  return <h1 className="text-5xl">About Us page {pathname}</h1>;
}

export default AboutUs;
