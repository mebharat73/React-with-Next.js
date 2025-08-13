import Image from "next/image";
import Link from "next/link";
import s24 from "@/assets/images/s24.png";
import { PRODUCTS_ROUTE } from "@/constants/routes";

function HomeFeaturedProduct() {
  return (
    <div className="mx-7 lg:mx-36 rounded-3xl border-2 border-[#D1D1D1] bg-[#F5F5F7] dark:bg-gradient-to-tl dark:from-[#000000] dark:to-[#979595]">
      <div className="grid grid-cols-1 gap-10 md:grid-cols-2 px-6 md:px-16 lg:p-5 max-w-screen-xl mx-auto">
        <div className="flex flex-col items-start justify-center dark:text-white">
          <span className="bg-blue-200 text-blue-800 px-4 rounded-xl ml-2">
            Featured Product
          </span>
          <h1 className="text-4xl md:text-5xl font-bold dark:text-white my-2">
            Samsung Galaxy S24 Ultra
          </h1>
          <p className="text-lg dark:text-gray-200 mb-4">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo facere,
            harum quasi iusto sint error sunt hic quae quia reiciendis?
          </p>
          <p className="py-2 text-md dark:text-gray-300">
            Incidunt vel consequuntur modi, dignissimos a ea sequi ducimus dicta
            quis mollitia tenetur ad atque! Delectus itaque quaerat odit
            impedit?
          </p>
          <h4 className="text-2xl md:text-3xl font-bold text-orange-500 my-3">
            <span className="text-3xl md:text-4xl">Rs</span>
            1299
          </h4>

          <Link
            href={PRODUCTS_ROUTE + "/678fad39fd4fff6eb2e21d7a"}
            className="inline-block px-6 py-2 text-lg font-semibold rounded-full text-[#1A1A1A] bg-[#cfd2ee] hover:bg-[#c7dcf0] hover:text-white transition duration-300"
          >
            Buy Now
          </Link>
        </div>
        <div className="relative">
          <Image
            src={s24}
            alt="Samsung Galaxy S24 Ultra"
            height={500}
            width={500}
            className="max-h-[50vh] w-auto md:max-h-full rounded-xl shadow-lg transition-transform duration-500 ease-in-out transform hover:scale-105"
          />
        </div>
      </div>
    </div>
  );
}

export default HomeFeaturedProduct;
