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
    <html lang="en" className="bg-gradient-to-tl from-[#0e0e0e] to-[#939191]">
      <body>
        <Providers>
          <MainLayout>{children}</MainLayout>
        </Providers>
      </body>
    </html>
  );
}

// Layout: It is a UI that is shared between multiple pages
