import { getProductById } from "@/api/products";
import ProductForm from "@/components/products/Form";
import EditProductLoading from "./loading";

async function EditProduct({ params }) {
  const id = (await params).productId;

  const product = await getProductById(id);

  return (
    <div className="bg-gradient-to-tl from-[#ebacfb] to-[#f9fbc6] flex items-center flex-col p-2 dark:bg-gradient-to-tl dark:from-[#504e4e] dark:to-[#b4b0b0]">
      <h2 className="text-3xl font-extrabold font-serif dark:text-white text-[#68217A] p-2">
        Edit Product Page
      </h2>
      <ProductForm isEditing={true} product={product} />
    </div>
  );
}

export default EditProduct;
