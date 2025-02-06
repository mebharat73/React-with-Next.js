"use client";

import { LOGIN_ROUTE } from "@/constants/routes";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useSelector } from "react-redux";

export default function OrderLayout({ children }) {
  const { user } = useSelector((state) => state.auth);

  const router = useRouter();

  useEffect(() => {
    if (!user) router.replace(LOGIN_ROUTE);
  }, [router, user]);

  return <>{children}</>;
}
