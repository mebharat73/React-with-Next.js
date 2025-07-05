import { getSattapattaItemById } from '@/api/sattapattaItem';
import {
  MdArrowBack,
  MdOutlineStarPurple500,
  MdStarHalf,
} from 'react-icons/md';
import Link from 'next/link';
import { SATTAPATTA_ROUTE } from '@/constants/routes'; // make sure this exists or replace with your route constant

export default async function SattapattaItemPage({ params }) {
  const id = params.id;
  const item = await getSattapattaItemById(id);

  return (
    <div className="min-h-screen py-12 px-10 flex flex-col lg:flex-row justify-around bg-gradient-to-br from-[#fdffc0] to-[#f1d2f9] dark:bg-gradient-to-br dark:from-[#1f1f1f] dark:to-[#4b4b4b]">


      {/* Left Column: Image */}
      <div className="p-5 rounded-2xl border-2 border-[#84a123] relative w-full lg:w-1/2 md:p-16 bg-gradient-to-tl from-[#f0f656] to-[#e382fb] dark:bg-gradient-to-tl dark:from-[#000000] dark:to-[#979595] flex items-center justify-center transition-transform transform hover:scale-105 hover:shadow-xl duration-300 ease-in-out">
        <img
          src={item.imageUrls?.[0]}
          alt={item.title}
          className="rounded-3xl max-w-full max-h-[500px] object-contain"
        />
      </div>

      {/* Right Column: Details */}
      <div className="w-full lg:w-1/2 p-10 md:px-10 bg-gradient-to-br from-[#fdffc0] to-[#f1d2f9] dark:bg-gray-700 rounded-2xl border-2 border-[#8b2fa2] dark:bg-gradient-to-tl dark:from-[#b4b0b0] dark:to-[#504e4e]">

        <Link
          href={SATTAPATTA_ROUTE || '/sattapatta'}
          className="hidden lg:flex items-center dark:text-gray-100 hover:underline font-bold text-[#68217A] py-2 px-2 hover:bg-[#d0fa44] rounded-3xl"
        >
          <MdArrowBack className="mr-3 bg-gradient-to-tl from-[#8e912d] to-[#dd53ff] rounded-full" />
          Go Back
        </Link>

        {/* Title */}
        <h1 className="text-3xl md:text-2xl mt-5 font-bold text-[#8b2fa2] dark:text-white my-0 slide-up">
          {item.title}
        </h1>

        {/* Description */}
        <div className="py-5">
          <div className="border-b border-gray-300 mb-5">
            <h3 className="font-serif text-xl font-extrabold text-[#84a123] dark:text-gray-100">
              Description
            </h3>
          </div>
          <p className="mt-3 dark:text-white fade-in">
            {item.description}
          </p>
          <ul className="mt-3 px-6 list-disc dark:text-gray-100">
            <li>Estimated Value: ${item.estimatedValue}</li>
            <li>Features: High quality material</li>
            <li>Delivery: On time</li>
            <li>Available all over Nepal</li>
          </ul>
        </div>

        {/* Additional details or ratings if any */}
        <div className="flex items-center justify-between mt-2">

          {/* Estimated Price */}
          <div className="flex items-center">
            <span className="text-xl md:text-3xl text-[#68217A] font-bold dark:text-white mr-2">
              $
            </span>
            <span className="text-[#d15bee] font-mono dark:text-white text-xl md:text-2xl font-bold">
              {Math.floor(item.estimatedValue)}
            </span>
          </div>

          {/* Ratings (optional, you can customize or remove) */}
          <div className="flex text-yellow-500 md:text-2xl items-center">
            <MdOutlineStarPurple500 />
            <MdOutlineStarPurple500 />
            <MdOutlineStarPurple500 />
            <MdOutlineStarPurple500 />
            <MdStarHalf />
            <span className="text-gray-600 text-xs md:text-sm ml-3 font-semibold dark:text-gray-300">
              4.5 (329 rev.)
            </span>
          </div>
        </div>

      </div>
    </div>
  );
}
