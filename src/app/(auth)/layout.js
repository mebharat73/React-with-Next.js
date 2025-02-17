"use client";

import Image from "next/image";
import blazer from "@/assets/images/blazer.png";
import ecommerce from "@/assets/images/ecommerce.png";
import login from "@/assets/images/login.png"
import register from "@/assets/images/register.png"
import { HOME_ROUTE } from "@/constants/routes";
import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";

export default function AuthLayout({ children }) {
  const router = useRouter();

  const { user } = useSelector((state) => state.auth);

  const pathname = usePathname();

  useEffect(() => {
    if (user) router.push(HOME_ROUTE);
  }, [user, router]);

  return (
    <div className="bg-gradient-to-tl from-[#ebacfb] to-[#f9fbc6] dark:bg-gradient-to-tl dark:from-[#000000] dark:to-[#979595]">
      <div className="max-w-screen-xl h-[94vh] mx-auto py-1">
        <div className="m-10 md:border-2 border-dotted border-[#8b2fa2] bg-gradient-to-tl from-[#ebacfb] to-[#f9fbc6] dark:bg-gradient-to-tl dark:from-[#504e4e] dark:to-[#b4b0b0] rounded-2xl flex items-center justify-center md:p-5 lg:m-5">
        <motion.div
            className="w-1/2 mr-7 p-3 hidden md:block"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          >
            <Image
              src={pathname == "/login" ? login : register}
              alt="Auth image"
              height={300}
              width={500}
              className="w-full transition-transform transform hover:scale-105 ease-in-out duration-300"
            />
          </motion.div>
          {children}
        </div>
      </div>
    </div>
  );
}

