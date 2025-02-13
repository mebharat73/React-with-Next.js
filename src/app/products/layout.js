export const metadata = {
  title: "Featured products",
};

export default function ProductsLayout({ children }) {
  return (
    <div className="px-2 md:px-28 bg-gradient-to-br from-[#fdffc0] to-[#f1d2f9] dark:bg-gradient-to-tl dark:from-[#000000] dark:to-[#979595]">
      <div className="bg-gradient-to-br from-[#fdffc0] to-[#f1d2f9] dark:bg-gradient-to-tl dark:from-[#000000] dark:to-[#979595]">{children}</div>
    </div>
  );
}
