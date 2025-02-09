export const metadata = {
    title: "Courses",
  };
  
  export default function chatLayout({ children }) {
    return (
      <div>
        <div className="py-5"></div>
        <div className="flex items-center justify-center">{children}</div>
      </div>
    );
  }
  