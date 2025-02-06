import React from "react";

async function BlogsBySlug({ params }) {
  const slugs = await params.slug;
  console.log(slugs);
  return <div>BlogsBySlug</div>;
}

export default BlogsBySlug;
