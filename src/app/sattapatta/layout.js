// sattapatta/layout.jsx
export default function SattapattaLayout({ children }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fdffc0] to-[#f1d2f9] dark:bg-gradient-to-tl dark:from-[#000000] dark:to-[#979595]">
      {children}
    </div>
  );
}
