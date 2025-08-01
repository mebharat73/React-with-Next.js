import { ThemeProvider } from "next-themes";
import "./globals.css";
import MainLayout from "@/layouts/MainLayout";
import Providers from "@/redux/providers";
import config from "@/config/config";



export const metadata = {
  title: config.appName,
  description: "Online buy/sell electronic items.",
  keywords: "Online buy electronics products",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('theme');
                  if (theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                    document.documentElement.classList.add('dark');
                  } else {
                    document.documentElement.classList.remove('dark');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem={true}>
          <Providers>
            <MainLayout>{children}</MainLayout>
          </Providers>
          
        </ThemeProvider>
      </body>
    </html>
  );
}
