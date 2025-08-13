
import PopularBrand from "@/components/home/Brand";
import HomeCategories from "@/components/home/Categories";
import HomeFeaturedProduct from "@/components/home/Featured";
import Hero from "@/components/home/Hero";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="bg-[#F5F5F7] dark:bg-gradient-to-tl dark:from-[#504e4e] dark:to-[#b4b0b0]">
      <div className="max-w-screen-xl mx-auto py-5 px-7 min-h-screen"> {/* Make sure this div takes full height */}
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
      <div className="py-7 px-7 max-w-screen-xl mx-auto">
        <PopularBrand />
      </div>
      <Footer />
    </div>
  );
}
