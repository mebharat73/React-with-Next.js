import ProductForm from "@/components/products/Form";

function AddProductPage() {
  return (
    <div className="bg-gradient-to-tl from-[#ebacfb] to-[#f9fbc6] flex items-center flex-col p-2">
      <h2 className="text-3xl font-extrabold font-serif dark:text-white text-[#68217A] p-2">
        Add Product Page
      </h2>
      <ProductForm />
    </div>
  );
}

export default AddProductPage;
