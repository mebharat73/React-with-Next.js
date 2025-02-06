export default function UserLayout({ children }) {
  const randomNumber = Math.floor(Math.random() * 10);

  if (randomNumber == 5) {
    throw new Error("Number is 5");
  }

  return (
    <div>
      {children}
    </div>
  );
}
