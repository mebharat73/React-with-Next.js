export const metadata = {
  title: "Profile",
};

export default function ProfileLayout({ children }) {
  return (
    <div className="dark:bg-gradient-to-tl dark:from-[#504e4e] dark:to-[#b4b0b0]">
      <div className="w-auto">{children}</div>
    </div>
  );
}
