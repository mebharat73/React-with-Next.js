export const metadata = {
  title: "Products by brand",
};

export default function BrandLayout({ children }) {
  return (
    <div className="dark:bg-gray-800">
      <div className="max-w-screen-xl mx-auto min-h-svh">{children}</div>
    </div>
  );
}
