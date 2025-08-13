export const metadata = {
  title: "Featured products",
};

export default function ProductsLayout({ children }) {
  return (
    <div className="px-2 lg:px-28 bg-[#F5F5F7] dark:bg-gradient-to-tl dark:from-[#000000] dark:to-[#979595]">
      <div>{children}</div>
    </div>
  );
}
