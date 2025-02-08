
import PopularBrand from "@/components/home/Brand";
import HomeCategories from "@/components/home/Categories";
import HomeFeaturedProduct from "@/components/home/Featured";
import Hero from "@/components/home/Hero";

export default function Home() {
  return (
    <div className="bg-gradient-to-br from-[#fdffc0] to-[#f1d2f9] dark:bg-gray-800">
      <div className="max-w-screen-xl mx-auto py-5 min-h-screen"> {/* Make sure this div takes full height */}
        {/* Hero Section */}
        <div className="min-h-[60vh]">  {/* Ensure the Hero section has enough height */}
          <Hero />
        </div>
        {/* Categories Section */}
        <HomeCategories />
      </div>
      {/* Featured Products Section */}
      <HomeFeaturedProduct />
      {/* Popular Brands Section */}
      <PopularBrand />
    </div>
  );
}
