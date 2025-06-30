import "./globals.css";
import MainLayout from "@/layouts/MainLayout";
import Providers from "@/redux/providers";
import config from "@/config/config";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Make sure this is imported!

export const metadata = {
  title: config.appName,
  description: "Online buy/sell electronic items.",
  keywords: "Online buy electronics products",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="h-screen bg-gradient-to-br from-[#fdffc0] to-[#f1d2f9]">
        <Providers>
          <MainLayout>{children}</MainLayout>
          <ToastContainer
            position="top-right"
            autoClose={1500}
            hideProgressBar={false}
            newestOnTop
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
        </Providers>
      </body>
    </html>
  );
}
