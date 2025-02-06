// Dynamic metadata
export async function generateMetadata({ params }) {
  const id = (await params).productId;

  return {
    title: `Product id: ${id}`,
  };
}

export default function ProductByIdLayout({ children }) {
  return (
    <div>
      {children}
    </div>
  );
}
