"use client";
import navLinks from "@/constants/navlinks";
import { HOME_ROUTE } from "@/constants/routes";
import Link from "next/link";
import { usePathname } from "next/navigation";

function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="md:w-1/2 flex justify-between">
      {navLinks.map((navLink, index) => {
        const isActive =
          navLink.route == HOME_ROUTE
            ? pathname === navLink.route
            : pathname.startsWith(navLink.route);

        return (
          <Link
            href={navLink.route}
            key={index}
            className={isActive ? "font-semibold px-3 py-2 text-yellow-300" : "px-3 py-2"}
          >
            {navLink.label}
          </Link>
        );
      })}
    </nav>
  );
}

export default Navbar;
