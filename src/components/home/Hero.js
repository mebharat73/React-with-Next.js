'use client';
import Slider from "react-slick";
import Image from "next/image";
import Link from "next/link";
import ipad from "@/assets/images/ipad.png";
import apache from "@/assets/images/apache.png";
import s24 from "@/assets/images/s24.png";
import acer from "@/assets/images/acer.png";
import { PRODUCTS_ROUTE } from "@/constants/routes";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useEffect, useState } from "react";

const slides = [
  {
    title: "Ipad Pro",
    price: 999,
    brand: "Apple",
    image: ipad,
  },
  {
    title: "Samsung Galaxy S24 Ultra",
    price: 1299,
    brand: "Samsung",
    image: s24,
  },
  {
    title: "Acer Predator Helios",
    price: 2599,
    brand: "Acer",
    image: acer,
  },
  {
    title: "Apache RTR 160 4V",
    price: 5999,
    brand: "TVS",
    image: apache,
  },
];

const Hero = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null; // Prevent React Slick from rendering during SSR
  }

  return (
        <div className="relative bg-gradient-to-tl from-[#ebacfb] to-[#f9fbc6] border-t-2 border-[#84a123] rounded-3xl">
        <Slider
          dots={true}
          infinite={true}
          speed={500}
          autoplay={true}
          autoplaySpeed={3000}
          slidesToShow={1}
          slidesToScroll={1}
          fade={true}
          className="transition-all ease-in-out duration-500" // Slider transition effect
        >
          {slides.map((slide, index) => (
            <div key={index} className="flex items-center justify-center min-h-[60vh]">
              <div className="rounded-2xl grid grid-cols-1 gap-10 md:grid-cols-2 p-10 md:px-16 lg:p-0">
                {/* Image with smooth transition effect */}
                <div className="overflow-hidden transition-transform transform hover:scale-105 duration-700">
                  <Image
                    src={slide.image}
                    alt={slide.title}
                    height={500}
                    width={500}
                    className="px-5 max-h-[50vh] w-auto md:max-h-full rounded-lg shadow-xl transition-all duration-700"
                  />
                </div>
                {/* Text and Info */}
                <div className="flex flex-col items-start justify-center space-y-4">
                  <span className="bg-[#68217A] text-white px-4 py-2 rounded-xl text-lg">
                    {slide.brand}
                  </span>
                  <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold text-[#68217A] dark:text-white">
                    {slide.title}
                  </h1>
                  <h4 className="text-2xl md:text-3xl lg:text-5xl font-bold text-orange-500 my-5">
                    <span className="text-3xl md:text-4xl lg:text-6xl">$</span>
                    {slide.price}
                  </h4>
                  <Link
                    href={PRODUCTS_ROUTE}
                    className="inline-block px-6 py-3 text-lg font-semibold rounded-full text-[#d0fa44] bg-[#68217A] hover:bg-[#8b2fa2] hover:text-white transition duration-300"
                  >
                    Shop Now
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
  );
};

export default Hero;
