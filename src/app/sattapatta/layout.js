// sattapatta/layout.jsx
export default function SattapattaLayout({ children }) {
  return (
    <div className="min-h-screen bg-[#F5F5F7] dark:bg-gradient-to-tl dark:from-[#000000] dark:to-[#979595]">
      {children}
    </div>
  );
}
