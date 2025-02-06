"use client";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Notification from "@/components/Notification";
import { useSelector } from "react-redux";

function MainLayout({ children }) {
  const { theme } = useSelector((state) => state.userPreferences);

  return (
    <main className={theme}>
      <Header />
      {children}
      <Footer />
    </main>
  );
}

export default MainLayout;
