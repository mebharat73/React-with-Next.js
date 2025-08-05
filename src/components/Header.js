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
import { useTheme } from "next-themes";



function Header() {
  const { user } = useSelector((state) => state.auth);
  const { products } = useSelector((state) => state.cart);

 const { setTheme, theme: currentTheme } = useTheme(); // <- add this
  const reduxTheme = useSelector((state) => state.userPreferences.theme);
  const dispatch = useDispatch();

  const switchTheme = () => {
    const newTheme = reduxTheme === LIGHT_MODE ? "dark" : "light";
    dispatch(toggleTheme());        // Update Redux state
    setTheme(newTheme);             // Update actual DOM class via next-themes
  };

  const [showProfile, setShowProfile] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [hideNavbar, setHideNavbar] = useState(false);

  const isAuth = user ? true : false;

  

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


  
  useEffect(() => {}, [showProfile]);

  return (
    <header
      className={`${
        hideNavbar ? "transform -translate-y-full opacity-0" : "transform translate-y-0 opacity-100"
      } transition-all duration-500 ease-in-out shadow sticky top-0 z-50`}
    >
      <div className="antialiased bg-gradient-to-r from-[#3B82F6] to-[#0EA5E9] dark:bg-gradient-to-tl dark:from-[#504e4e] dark:to-[#b4b0b0]">
        <div className="h-10 w-full text-[white] bg-gradient-to-tr from-[#3B82F6] to-[#0EA5E9] dark:bg-gradient-to-tl dark:from-[#000000] dark:to-[#979595]">
          <div className="flex flex-col max-w-screen-xl mx-auto md:items-center md:justify-between md:flex-row">
             <div className="flex flex-row flex-wrap items-center justify-between w-full px-4">

                <div className="flex items-center">
                  <motion.div
                    initial={{ scale: 1 }}
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                    className="mr-2"
                  >
                    <Image
                      src={dokanLogo}
                      alt="Dokan Logo"
                      width={40} // Adjust size as needed
                      height={40} // Adjust size as needed
                      className="h-8 w-8 rounded-lg lg:hover:scale-125 transition-transform duration-300"
                    />
                  </motion.div>
                  <Link
                    href={HOME_ROUTE}
                    className="font-serif font-semibold animate-pulse text-[#68217A] lg:text-xl "
                  >
                    {config.appName}
                  </Link>
                </div>
                <div className="flex items-center gap-4 md:hidden">
                  <button onClick={switchTheme} className="bg-transparent rounded-full hover:text-[#8b2fa2] lg:text-[#68217A] bg-[#C3EF38]">
                    {currentTheme === LIGHT_MODE ? (
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
                {currentTheme === LIGHT_MODE ? (
                  <MdOutlineDarkMode className="w-5 h-5 transition-all duration-300 ease-in-out transform hover:scale-85" />
                ) : (
                  <MdOutlineLightMode className="w-5 h-5 animate-ping" />
                )}
              </button>

              {user ? (
                <div className="relative mx-6">
                  <button
                      className="p-1 border-2 rounded-full hover:bg-white hover:dark:bg-gray-800 transition-transform transform hover:scale-105 active:scale-105"
                      onClick={toggleShowProfile}
                    >
                      {user.profileImageUrl ? (
                        <div className="h-7 w-7 overflow-hidden rounded-full">
                          <Image
                            src={user.profileImageUrl}
                            alt="profile-img"
                            width={28}
                            height={28}
                            className="h-full w-full object-cover"
                          />
                        </div>
                      ) : (
                        <ImUser className="h-6 w-6 rounded-full border" />
                      )}
                    </button>

                  <div
                    className={`${
                      showProfile ? "block" : "hidden"
                    } w-52 py-3 px-5 rounded-xl border border-[#8e912d] bg-gradient-to-b from-[#faaae0] to-[#bacfef] dark:bg-gradient-to-tl dark:from-[#504e4e] dark:to-[#b4b0b0] absolute top-10 right-0 shadow-lg transition-all duration-300 ease-in-out`}
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
          } md:hidden absolute top-2 right-1 bottom-0 w-full bg-opacity-50 dark:bg-opacity-50 h-screen z-40 transition-all`}
          onClick={() => setShowMobileMenu(false)} // Close the mobile menu when clicked outside
        >
          <div className="w-auto h-auto border-2 border-double border-[#68217A] rounded-xl bg-gradient-to-b from-[#faaae0] to-[#bacfef] float-right px-3 py-4 grid grid-cols-1 grid-rows-[auto,1fr,auto] dark:bg-gradient-to-tl dark:from-[#000000] dark:to-[#979595]">
            <div className="border-b flex items-center justify-between">
              {user ? (
                <div className="flex items-center justify-start ">
                  <button
                    className="p-1 border-2 hover:bg-white rounded-3xl hover:dark:bg-gray-800 animate-pulse transition-transform transform hover:scale-105 active:scale-105"
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent the click event from propagating to the parent
                      setShowProfile((prev) => !prev); // Toggle profile container visibility
                    }}
                  >
                    {user.profileImageUrl ? (
                      <Image
                        src={user.profileImageUrl}
                        alt="profile-img"
                        width={28}
                        height={28}
                        className="h-7 w-7 rounded-full object-cover"
                      />
                    ) : (
                      <ImUser className=" rounded-full border" />
                    )}
                  </button>

                  <div
                    className={`${
                      showProfile ? "block" : "hidden"
                    } z-10 w-32 px-1 rounded-xl border border-e-4 border-[#8e912d] bg-gradient-to-b from-[#6851ea] to-[#bacfef] dark:bg-gradient-to-tl dark:from-[#504e4e] dark:to-[#b4b0b0] absolute top-5 shadow-lg transition-all duration-300 ease-in-out transform ${
                      showProfile ? "translate-x-9 translate-y-7" : "translate-x-4 translate-y-0"
                    }`} // Smooth transition effect
                    onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the profile container
                  >
                    <Link
                      href={"/profile/edit"}
                      className="bg-[#dd53ff] text-white font-serif w-full rounded-3xl hover:bg-[#8b2fa2] flex items-center justify-center my-1 transition-transform transform hover:scale-105 active:scale-105"
                    >
                      Profile
                    </Link>

                    
                  </div>

                  <h3 className="font-bold font-serif text-base text-[#68217A] ml-2">Hi! {user.name}</h3>
                </div>
              ) : (
                <h3 className="font-extrabold text-base font-serif text-[#68217A] dark:text-white">Hi----- Guest user</h3>
              )}

              <button
                className="rounded-lg md:hidden focus:outline-none focus:shadow-outline"
                onClick={() => setShowMobileMenu(false)} // Close the mobile menu when clicked
              >
                <RxCross2 className="h-5 w-5 -mt-7 rounded-full bg-[#dd53ff] dark:hover:bg-[#8b2fa2] animate-bounce" />
              </button>
            </div>

           <nav className="flex flex-col gap-2 pt-2 md:hidden">
            {navLinks.map((navlink) => {
              if (navlink.isAuth && !user) return null;

              return (
            <Link
              key={navlink.route}
              href={navlink.route}
              className="relative bg-[#dd53ff] dark:bg-gradient-to-tl dark:from-[#000000] dark:to-[#979595] text-[#d0fa44] dark:text-white px-6 py-0.5 rounded-xl font-semibold text-base font-serif flex items-center justify-start gap-2 hover:bg-[#8b2fa2] transition-transform transform hover:scale-105"
            >
              <span>{navlink.label}</span>

              {navlink.notification && products.length > 0 && (
                <span className="ml-auto bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                  {products.length}
                </span>
              )}
            </Link>

              );
            })}
          </nav>


            {user ? (
              <>
                <button
                  className="bg-[#68217A] mt-2 text-[#d0fa44] hover:bg-[#8b2fa2] hover:text-white w-full rounded-full py-0.5 flex items-center justify-center"
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
