export const metadata = {
  title: "Courses",
};

export default function CoursesLayout({ children }) {
  return (
    <div>
      <div className="py-3 bg-slate-400">Courses Layout</div>
      <div>{children}</div>
    </div>
  );
}
