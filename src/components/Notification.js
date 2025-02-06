"use client";
import { HOME_ROUTE } from "@/constants/routes";
import { usePathname } from "next/navigation";

function Notification() {
  const pathname = usePathname();

  if (pathname !== HOME_ROUTE) return <div></div>;

  return (
    <div className="w-full bg-primary-900 text-center text-white">
      <h1>This is some Notification</h1>
    </div>
  );
}

export default Notification;
