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
import Confetti from "react-confetti"; // Import Confetti
import AnimatedBox from "../AnimatedBox";
import Modal from "@/components/Advertise.js"; // Import your Modal component

// Add this flag to control AnimatedBox display
const showAnimatedBox = false; // Set to true later when you want to enable it


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
  const [confetti, setConfetti] = useState(false); // State to trigger confetti
  const [showModal, setShowModal] = useState(true); // State to manage modal visibility
  const handleShowModal = () => {
    setShowModal(true);
  };


  useEffect(() => {
    setIsClient(true);
    setConfetti(false); // Trigger confetti when the component loads
    setTimeout(() => {
      setConfetti(false); // Stop the confetti after 5 seconds (adjust timing if needed)
    }, 5000);
  }, []);

  if (!isClient) {
    return null; // Prevent React Slick from rendering during SSR
  }

  // Add this flag to control Modal display
  const showAdModal = false; // Change to true later when you want to show it

  return (
    <div className="relative bg-gradient-to-tl from-[#ebacfb] to-[#f9fbc6] dark:bg-gradient-to-tl dark:from-[#000000] dark:to-[#979595] border-t-2 border-[#84a123] rounded-3xl ">
      {confetti && (
        <Confetti
          width={window.innerWidth}
          height={window.innerHeight}
          recycle={false} // Confetti will stop after one burst
          numberOfPieces={1500} // Higher number for a bigger burst
          colors={['#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF', '#00FFFF']} // Vibrant colors for the burst
          initialVelocityX={40} // Burst spread horizontally
          initialVelocityY={40} // Burst spread vertically
          gravity={0.15} // Slight gravity to make it spread and fall more naturally
          confettiSource={{
            x: window.innerWidth / 3, // Horizontal center of the screen
            y: window.innerHeight / 1, // Vertical center of the screen
          }}
        />
      )}
      
       {showAnimatedBox && <AnimatedBox />}


      <Slider
        dots={true}
        infinite={true}
        speed={400}
        autoplay={true}
        autoplaySpeed={4000}
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
                  <span className="text-3xl md:text-4xl lg:text-6xl">Rs</span>
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
      {/* Button to Show Modal */}
      <div className="bg-gradient-to-tl from-[#ebacfb] to-[#f9fbc6] dark:bg-gradient-to-tl dark:from-[#000000] dark:to-[#979595] ">
        


        {/* Modal with Advertisement */}
        {showAdModal && (
          <Modal
            title="Special Offer!"
            imageUrl="https://images.unsplash.com/photo-1478827217976-7214a0556393?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            adText="Get inspired by this beautiful image!"
            show={showModal}
            setShow={setShowModal}
          />
        )}
      </div>
      
    </div>
  );
};

export default Hero;
