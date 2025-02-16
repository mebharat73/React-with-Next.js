import "./globals.css";
import MainLayout from "@/layouts/MainLayout";
import Providers from "@/redux/providers";
import config from "@/config/config";

// Static metadata
export const metadata = {
  title: config.appName,
  description: "Online buy/sell electronic items.",
  keywords: "Online buy electronics products",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" >
      <body className="bg-gradient-to-tl from-[#ebacfb] to-[#f9fbc6] dark:bg-gradient-to-tl dark:from-[#b4b0b0] dark:to-[#504e4e]">
        <Providers>
          <MainLayout>{children}</MainLayout>
        </Providers>
      </body>
    </html>
  );
}

// Layout: It is a UI that is shared between multiple pages
