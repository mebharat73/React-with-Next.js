"use client";

import Link from "next/link";
import config from "@/config/config";
import navLinks from "@/constants/navlinks";
import { HOME_ROUTE, LOGIN_ROUTE } from "@/constants/routes";
import { ImUser } from "react-icons/im";
import {
  MdLogout,
  MdOutlineDarkMode,
  MdOutlineLightMode,
} from "react-icons/md";
import { HiMenuAlt3 } from "react-icons/hi";
import { LIGHT_MODE } from "@/constants/theme";
import { RxCross2 } from "react-icons/rx";
import { logoutUser } from "@/redux/auth/authSlice";
import { toggleTheme } from "@/redux/userPreferences/userPreferencesSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import dokanLogo from "@/assets/images/dokan.png";



function Header() {
  const { user } = useSelector((state) => state.auth);
  const { products } = useSelector((state) => state.cart);

  const { theme } = useSelector((state) => state.userPreferences);

  const [showProfile, setShowProfile] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [hideNavbar, setHideNavbar] = useState(false);

  const isAuth = user ? true : false;

  const dispatch = useDispatch();

  const router = useRouter();

  // Scroll handling for auto-hide navbar
  useEffect(() => {
    let lastScrollY = window.scrollY;
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (window.scrollY > lastScrollY) {
            // Scrolling down
            setHideNavbar(true);
          } else {
            // Scrolling up
            setHideNavbar(false);
          }
          lastScrollY = window.scrollY;
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);


  function toggleShowProfile() {
    setShowProfile(!showProfile);
  }

  function logout() {
    dispatch(logoutUser());
    router.push(LOGIN_ROUTE);
    setShowProfile(false);
  }


  function switchTheme() {
    dispatch(toggleTheme());
  }

  useEffect(() => {}, [showProfile]);

  return (
    <header
      className={`${
        hideNavbar ? "transform -translate-y-full opacity-0" : "transform translate-y-0 opacity-100"
      } transition-all duration-500 ease-in-out shadow sticky top-0 z-10`}
    >
      <div className="antialiased bg-gradient-to-r from-[#FD9EFC] to-[#e28ae0] dark:bg-gradient-to-tl dark:from-[#504e4e] dark:to-[#b4b0b0]">
        <div className="h-10 w-full text-[white] bg-gradient-to-tr from-[#C3EF38] to-[#dd53ff] dark:bg-gradient-to-tl dark:from-[#000000] dark:to-[#979595]">
          <div className="flex flex-col max-w-screen-xl mx-auto md:items-center md:justify-between md:flex-row">
              <div className="flex flex-row items-center justify-between">
                <div className="flex items-center">
                  <motion.div
                    initial={{ scale: 1 }}
                    animate={{ scale: 0.8 }}
                    transition={{ duration: 1, delay: 2 }} // Adjust delay and duration as needed
                    className="mr-2"
                  >
                    <Image
                      src={dokanLogo}
                      alt="Dokan Logo"
                      width={50} // Adjust size as needed
                      height={50} // Adjust size as needed
                      className="h-10 w-10 rounded-lg transition-transform duration-300 hover:scale-150 animate-spin"
                    />
                  </motion.div>
                  <Link
                    href={HOME_ROUTE}
                    className="text-xl font-extrabold font-serif tracking-widest text-[#68217A] hover:text-white uppercase rounded-lg  focus:outline-none focus:shadow-outline dark:text-white"
                  >
                    {config.appName}
                  </Link>
                </div>
                <div className="flex items-center gap-4 md:hidden">
                  <button onClick={switchTheme} className="bg-transparent rounded-full hover:text-[#8b2fa2] lg:text-[#68217A] bg-[#C3EF38]">
                    {theme === LIGHT_MODE ? (
                      <MdOutlineDarkMode className="h-5 w-5 animate-pulse" />
                    ) : (
                      <MdOutlineLightMode className="h-5 w-5 animate-spin" />
                    )}
                  </button>

                  <button
                    className="rounded-lg focus:outline-none focus:shadow-outline"
                    onClick={() => setShowMobileMenu(true)}
                  >
                    <HiMenuAlt3 className="h-7 w-7 hover:text-white" />
                  </button>
                </div>
              </div>
              <nav className="flex-col flex-grow hidden pb-4 md:pb-0 md:flex md:justify-end md:flex-row items-center">
                {navLinks.map((navlink) => {
                  if (navlink.isAuth && !user) return <div key={navlink.route}></div>;

                  return (
                    <div key={navlink.route} className="relative">
                      <Link
                        className="h-8 px-5 py-1 mt-2 font-semibold text-[#d0fa44] dark:text-white font-serif bg-transparent rounded-3xl dark:bg-transparent md:mt-0 md:ml-4 hover:text-white focus:text-white hover:bg-[#8b2fa2] focus:bg-[#68217A] focus:outline-none focus:shadow-outline transition-all transform hover:scale-90 active:scale-105"
                        href={navlink.route}
                      >
                        {navlink.label}
                      </Link>
                      {navlink.notification && (
                        <span className="absolute top-0 -right-1 bg-red-500 text-white rounded-full text-[0.6rem] h-4 w-4 flex items-center justify-center">
                          {products.length}
                        </span>
                      )}
                    </div>
                  );
                })}

              <button onClick={switchTheme} className="mx-5 bg-transparent rounded-3xl border-2 hover:text-white lg:text-[#C3EF38] bg-[#8b2fa2] hover:bg-[#68217A] transition-transform transform hover:scale-105 active:scale-105">
                {theme === LIGHT_MODE ? (
                  <MdOutlineDarkMode className="w-5 h-5 transition-all duration-300 ease-in-out transform hover:scale-85" />
                ) : (
                  <MdOutlineLightMode className="w-5 h-5 animate-ping" />
                )}
              </button>

              {user ? (
                <div className="relative mx-6">
                  <button
                    className="p-1 border-2 hover:bg-white rounded-3xl hover:dark:bg-gray-800 animate-pulse transition-transform transform hover:scale-105 active:scale-105"
                    onClick={toggleShowProfile}
                  >
                    {user.profileImageUrl ? (
                      <Image
                        src={user.profileImageUrl}
                        alt="profile-img"
                        width={28}
                        height={28}
                        className="h-6 w-6 rounded-full object-cover"
                      />
                    ) : (
                      <ImUser  className=" rounded-full border" />
                    )}
                  </button>
                  <div
                    className={`${
                      showProfile ? "block" : "hidden"
                    } w-52 py-3 px-5 rounded-xl border border-[#8e912d] bg-gradient-to-b from-[#faaae0] to-[#bacfef] absolute top-10 right-0 shadow-lg transition-all duration-300 ease-in-out`}
                    onClick={() => setShowProfile(false)}
                  >
                    <h3 className="mb-2 font-bold">Hi! {user.name}</h3>

                    <Link
                      href={"/profile/edit"}
                      className="bg-[#dd53ff] text-white font-serif w-full rounded-3xl hover:bg-[#8b2fa2] flex items-center justify-center my-3 transition-transform transform hover:scale-105 active:scale-105"
                    >
                      Profile
                    </Link>

                    <button
                      className="bg-[#68217A] text-[#d0fa44] font-serif hover:bg-[#8b2fa2] hover:text-white w-full rounded-3xl flex items-center justify-center transition-transform transform hover:scale-200 active:scale-105"
                      onClick={logout}
                    >
                      Logout
                      <MdLogout className="ml-2" />
                    </button>
                  </div>
                </div>
              ) : (
                <Link
                  href={LOGIN_ROUTE}
                  className="animate-pulse px-4 py-1 mt-2 text-sm font-semibold font-serif bg-[#68217A] dark:bg-zinc-600 text-[#C3EF38] rounded-lg md:mt-0 md:ml-4 hover:bg-[#8b2fa2] hover:text-white focus:bg-[#8b2fa2] focus:outline-none focus:shadow-outline"
                >
                  Login
                </Link>
              )}
            </nav>
          </div>
        </div>
      </div>

      <div
        className={`${
          showMobileMenu ? "block" : "hidden"
        } md:hidden absolute top-0 right-0 bottom-0 w-full bg-slate-300  bg-opacity-50 dark:bg-opacity-50 h-screen z-40 transition-all`}
        onClick={() => setShowMobileMenu(false)}
      >
        <div className="w-3/4 h-auto border-2 border-double border-[#68217A] rounded-3xl bg-gradient-to-b from-[#faaae0] to-[#bacfef] float-right p-6 grid grid-cols-1 grid-rows-[auto,1fr,auto] dark:bg-gradient-to-tl dark:from-[#000000] dark:to-[#979595]">
          <div className="border-b pl-2 pb-3 flex items-center justify-between">
            {user ? (
              <div className="flex items-center justify-start ">
                <Image
                        src={user.profileImageUrl}
                        alt="profile-img"
                        width={35}
                        height={35}
                        className="h-10 w-10 rounded-full border-2 border-white animate-bounce"
                      />
                <h3 className="font-bold font-serif text-lg text-[#68217A] ml-4">Hi! {user.name}</h3>
              </div>
            ) : (
              <h3 className="font-extrabold text-xl font-serif text-[#68217A] dark:text-white">Guest user</h3>
            )}

            <button
              className="rounded-lg md:hidden focus:outline-none focus:shadow-outline"
              onClick={() => setShowMobileMenu(false)}
            >
              <RxCross2 className="h-7 w-7 rounded-full bg-[#dd53ff] dark: hover:bg-[#8b2fa2] animate-bounce" />
            </button>
          </div>


          <nav className="flex flex-col flex-grow p-3 m-1 border-2 border-dashed border-[#8e912d]  md:hidden">
            {navLinks.map((navlink) => {
              if (navlink.isAuth && !user)
                return <div key={navlink.route}></div>;

              return (
                <Link
                  key={navlink.route}
                  className="p-1 mt-4 text-sm font-semibold font-serif bg-transparent rounded-3xl md:mt-0 md:ml-4 hover:text-white focus:text-gray-900 hover:bg-white focus:bg-primary-100 focus:outline-none focus:shadow-outline"
                  href={navlink.route}
                >
                  <div className="px-4 py-2 text-[#d0fa44] dark:text-white font-serif font-semibold hover:text-white border-[#dd53ff] rounded-2xl bg-[#dd53ff] dark:dark:bg-gradient-to-tl dark:from-[#000000] dark:to-[#979595]">
                  {navlink.label}
                </div>
                </Link>
              );
            })}
          </nav>


          {user ? (
            <>
              <button
                className="bg-[#68217A] text-[#d0fa44] hover:bg-[#8b2fa2] hover:text-white w-full rounded-full py-1 flex items-center justify-center"
                onClick={logout}
              >
                Logout
                <MdLogout className="ml-2" />
              </button>
            </>
          ) : (
            <Link
              href={LOGIN_ROUTE}
              className="px-3 py-1.5 mt-2 text-sm font-semibold font-serif bg-[#68217A] dark:bg-[#b4b0b0] text-center text-[#d0fa44] dark:text-white hover:text-white dark:hover:text-[#d0fa44] rounded-lg md:mt-0 md:ml-4 hover:bg-[#8b2fa2] dark:hover:bg-black focus:bg-primary-600 focus:outline-none focus:shadow-outline"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
