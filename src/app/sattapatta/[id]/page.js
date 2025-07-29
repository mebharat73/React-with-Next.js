import { getSattapattaItemById } from '@/api/sattapattaItem';
import {
  MdArrowBack,
  MdOutlineStarPurple500,
  MdStarHalf,
} from 'react-icons/md';
import Link from 'next/link';
import { SattapattaItemImageGallery } from '@/app/sattapatta/[id]/SattapattaItemImageGallery'; // adjust path if needed

import { SATTAPATTA_ROUTE } from '@/constants/routes'; // make sure this exists or replace with your route constant

export default async function SattapattaItemPage(props) {
  const params = await props.params; // ✅ await the promise
  const id = params.id;
 

  const item = await getSattapattaItemById(id);

  return (
    <div className="min-h-screen px-10 flex flex-col lg:flex-row justify-around bg-gradient-to-br from-[#fdffc0] to-[#f1d2f9] dark:bg-gradient-to-br dark:from-[#1f1f1f] dark:to-[#4b4b4b]">


      {/* Left Column: Image */}
      {/* Left Column: Image Gallery */}
      <div className="w-full lg:w-1/2 md:p-16">
        <SattapattaItemImageGallery imageUrls={item.imageUrls} title={item.title} />
      </div>


      {/* Right Column: Details */}
<div className="w-full lg:w-1/2 h-full p-6 mt-2 md:mr-28 md:p-10 md:mt-12 lg:min-h-[500px] bg-gradient-to-br from-[#fdffc0] to-[#f1d2f9] dark:from-[#b4b0b0] dark:to-[#504e4e] rounded-2xl border-2 border-[#8b2fa2] flex flex-col justify-between shadow-lg">

  {/* Back Link */}
  <Link
    href={SATTAPATTA_ROUTE || '/sattapatta'}
    className="inline-flex items-center text-sm font-semibold text-[#68217A] dark:text-gray-100 hover:underline hover:text-[#4b125f] transition"
  >
    <MdArrowBack className="mr-2 text-lg bg-gradient-to-tl from-[#8e912d] to-[#dd53ff] rounded-full p-[2px]" />
    Go Back
  </Link>

  {/* Title */}
  <h1 className="text-2xl font-bold text-[#8b2fa2] dark:text-white mt-6 mb-2">
    {item.title}
  </h1>

  {/* Description */}
  <div className="mb-6">
    <h3 className="text-lg font-semibold text-[#84a123] dark:text-white mb-2 border-b pb-1 border-gray-300">
      Description
    </h3>
    <p className="text-sm text-gray-700 dark:text-gray-200 leading-relaxed mb-3">
      {item.description}
    </p>
    <ul className="list-disc pl-6 text-sm text-gray-800 dark:text-gray-100 space-y-1">
      <li>Estimated Value: Rs{item.estimatedValue}</li>
      <li>Offer must be accepted and contact owner</li>
      <li>Timely delivery</li>
      <li>Available all over Nepal</li>
    </ul>
  </div>

  {/* Footer: Price and Rating */}
  <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-300 dark:border-gray-600">
    {/* Estimated Price */}
    <div className="flex items-center">
      <span className="text-lg font-bold text-[#68217A] dark:text-white mr-1">
        Rs
      </span>
      <span className="text-2xl text-[#d15bee] font-mono font-semibold dark:text-white">
        {Math.floor(item.estimatedValue)}
      </span>
    </div>

    {/* Ratings */}
    <div className="flex items-center text-yellow-500 text-lg gap-1">
      <MdOutlineStarPurple500 />
      <MdOutlineStarPurple500 />
      <MdOutlineStarPurple500 />
      <MdOutlineStarPurple500 />
      <MdStarHalf />
      <span className="text-gray-600 text-xs font-medium ml-2 dark:text-gray-300">
        4.5 (329 reviews)
      </span>
    </div>
  </div>
</div>

    </div>
  );
}
