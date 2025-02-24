'use client';
import { useEffect, useState } from "react";
import { getProductById } from "@/api/products";
import ProductForm from "@/components/products/Form";
import EditProductLoading from "./loading";
import { useRouter } from 'next/navigation';

function EditProduct({ params }) {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  
  useEffect(() => {
    const fetchProduct = async () => {
      const id = (await params).productId;
      const fetchedProduct = await getProductById(id);
      setProduct(fetchedProduct);
      setLoading(false);
    };

    fetchProduct();
  }, [params]);

  if (loading) {
    return <EditProductLoading />;
  }

  return (
    <div className="bg-gradient-to-tl from-[#ebacfb] to-[#f9fbc6] flex items-center flex-col p-2 dark:bg-gradient-to-tl dark:from-[#504e4e] dark:to-[#b4b0b0] relative">
      <h2 className="text-2xl  md:text-3xl font-extrabold font-serif dark:text-white text-[#68217A] p-2">
        Edit Product Page
      </h2>
      
      {/* Back Button */}
      <button
        className="bg-[#8b2fa2] text-white hover:text-[#C3EF38] h-6 px-3 mt-5 mr-[350px] rounded-lg hover:bg-[#68217A] transition-colors absolute md:top-1 md:-right-80 lg:top-1 lg:-right-14 animate-bounce"
        onClick={() => router.back()}  // Handle the back navigation
      >
        Back
      </button>
      
      {/* Product Form for Editing */}
      <ProductForm isEditing={true} product={product} />
    </div>
  );
}

export default EditProduct;
