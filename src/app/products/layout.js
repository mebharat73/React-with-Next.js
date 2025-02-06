export const metadata = {
  title: "Featured products",
};

export default function ProductsLayout({ children }) {
  return (
    <div className="px-14 bg-gradient-to-br from-[#fdffc0] to-[#f1d2f9] dark:bg-gray-800">
      <div className="bg-gradient-to-br from-[#fdffc0] to-[#f1d2f9]">{children}</div>
    </div>
  );
}
