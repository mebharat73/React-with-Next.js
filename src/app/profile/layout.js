export const metadata = {
  title: "Profile",
};

export default function ProfileLayout({ children }) {
  return (
    <div className="dark:bg-gray-800">
      <div className="w-auto">{children}</div>
    </div>
  );
}
