"use client";

import { usePathname } from "next/navigation";
import React from "react";

function ReactV19Course() {
  const pathname = usePathname();

  console.log(pathname)
  return <div>ReactV19Course</div>;
}

export default ReactV19Course;
