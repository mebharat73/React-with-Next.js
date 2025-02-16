export const metadata = {
    title: "Chat",
  };
  
  export default function chatLayout({ children }) {
    return (
      <div>
        <div className="flex items-center justify-center">{children}</div>
      </div>
    );
  }
  