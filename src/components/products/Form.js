"use client";

import { addProduct, editProduct } from "@/api/products";
import { PRODUCTS_ROUTE } from "@/constants/routes";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { motion } from "framer-motion";

function ProductForm({ isEditing = false, product }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    values: product,
  });

  const [loading, setLoading] = useState(false);
  const [productImages, setProductImages] = useState([]);
const [localImageUrls, setLocalImageUrls] = useState([]);
const [existingImageUrls, setExistingImageUrls] = useState(product?.imageUrls || []);

  const router = useRouter();



  async function submitForm(data) {
  setLoading(true);

  const formData = new FormData();

  formData.append("brand", data.brand || "");
  formData.append("category", data.category || "");
  formData.append("description", data.description || "");
  formData.append("name", data.name || "");
  formData.append("price", Number(data.price));
  formData.append("stock", Number(data.stock));

  if (isEditing) {
  formData.append("existingImages", JSON.stringify(existingImageUrls));
}


  productImages.forEach((file) => {
    formData.append("imageFiles", file);
  });

  // Log all formData entries
  console.group("FormData contents:");
  for (const pair of formData.entries()) {
    // For files, log just file name and type, not full object
    if (pair[1] instanceof File) {
      console.log(pair[0], pair[1].name, pair[1].type);
    } else {
      console.log(pair[0], pair[1]);
    }
  }
  console.groupEnd();

  try {
    if (isEditing) {
      await editProduct(product._id, formData);
    } else {
      await addProduct(formData);
    }
    toast.success(isEditing ? "Product updated." : "Product created.", {
      autoClose: 1500,
      onClose: () => router.replace(PRODUCTS_ROUTE),
    });
  } catch (err) {
    console.error("Form error:", err);
    if (err?.response) {
      console.error("Response data:", err.response.data);
      console.error("Response status:", err.response.status);
      console.error("Response headers:", err.response.headers);
    }
    toast.error(err?.response?.data || "Something went wrong", {
      autoClose: 1500,
    });
  } finally {
    setLoading(false);
  }
}




  return (
  <div className="min-h-screen dark:bg-zinc-800">
      <div className="container mx-auto px-4 py-8">
        <motion.form
          onSubmit={handleSubmit(submitForm)}
          className="w-full -mt-6 max-w-4xl mx-auto p-6 sm:p-8 shadow-xl rounded-2xl bg-gradient-to-br from-[#F5F5F7] to-[#97bee7] dark:from-[#504e4e] dark:to-[#b4b0b0]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Product Name */}
            <div>
              <label htmlFor="name" className="-mt-2 block text-sm font-semibold text-[#1A1A1A] dark:text-white">
                Product Name
              </label>
              <input
                type="text"
                id="name"
                className="block w-full mt-1 px-3 py-1 border rounded-lg shadow-sm dark:bg-zinc-600 dark:text-black"
                {...register("name", { required: "Product name is required." })}
              />
              {errors.name && <p className="text-red-600 text-sm mt-1">{errors.name.message}</p>}
            </div>

            {/* Brand */}
            <div>
              <label htmlFor="brand" className="-mt-2 block text-sm font-semibold text-[#1A1A1A] dark:text-white">
                Brand
              </label>
              <input
                type="text"
                id="brand"
                className="block w-full mt-1 px-3 py-1 border rounded-lg shadow-sm dark:bg-zinc-600 dark:text-black"
                {...register("brand")}
              />
            </div>

            {/* Category */}
            <div>
              <label htmlFor="category" className="-mt-3 block text-sm font-semibold text-[#1A1A1A] dark:text-white">
                Category
              </label>
              <input
                type="text"
                id="category"
                className="block w-full mt-1 px-3 py-1 border rounded-lg shadow-sm dark:bg-zinc-600 dark:text-black"
                {...register("category")}
              />
            </div>

            {/* Price */}
            <div>
              <label htmlFor="price" className="-mt-3 block text-sm font-semibold text-[#1A1A1A] dark:text-white">
                Price
              </label>
              <input
                type="number"
                id="price"
                className="block w-full mt-1 px-3 py-1 border rounded-lg shadow-sm dark:bg-zinc-600 dark:text-black"
                {...register("price", {
                  required: "Price is required.",
                  min: { value: 0, message: "Product price must be positive." },
                })}
              />
              {errors.price && <p className="text-red-600 text-sm mt-1">{errors.price.message}</p>}
            </div>

            {/* Stock */}
            <div>
              <label htmlFor="stock" className="-mt-3 block text-sm font-semibold text-[#1A1A1A] dark:text-white">
                Stock
              </label>
              <input
                type="number"
                id="stock"
                className="block w-full mt-1 px-3 py-1 border rounded-lg shadow-sm dark:bg-zinc-600 dark:text-black"
                {...register("stock", {
                  required: "Stock is required.",
                  min: { value: 0, message: "Stock must be positive or zero." },
                })}

              />
              {errors.stock && <p className="text-red-600 text-sm mt-1">{errors.stock.message}</p>}
            </div>

            {/* Description (Full width) */}
            <div className="md:col-span-2">
              <label htmlFor="description" className="-mt-3 block text-sm font-semibold text-[#1A1A1A] dark:text-white">
                Description
              </label>
              <textarea
                id="description"
                rows={4}
                className="block w-full mt-1 px-3 py-1 border rounded-lg shadow-sm dark:bg-zinc-600 dark:text-black"
                {...register("description")}
              ></textarea>
            </div>

            {/* Images (Full width) */}
            <div className="md:col-span-2">
              <label htmlFor="images" className="-mt-4 block text-sm font-semibold text-[#1A1A1A] dark:text-white">
                Images
              </label>

              {/* Existing Images (Edit Mode) */}
              {isEditing && existingImageUrls.length > 0 && (
                <div className="my-2">
                  <p className="font-bold mb-2">Existing Images:</p>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                    {existingImageUrls.map((url, idx) => (
                      <div key={url} className="relative">
                        <Image
                          src={url}
                          alt={`existing-${idx}`}
                          width={100}
                          height={100}
                          className="rounded-md"
                        />
                        <button
                          type="button"
                          className="absolute top-0 right-0 bg-red-600 text-white text-xs px-1 py-0.5 rounded"
                          onClick={() => {
                            const updated = existingImageUrls.filter((_, i) => i !== idx);
                            setExistingImageUrls(updated);
                          }}
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* New Previews */}
              {localImageUrls.length > 0 && (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 my-3">
                  {localImageUrls.map((url, index) => (
                    <Image key={index} src={url} alt="upload preview" height={100} width={100} />
                  ))}
                </div>
              )}

              {/* Upload Field */}
              <input
                type="file"
                multiple
                className="block w-full mt-1 px-3 py-1 border rounded-xl shadow-sm dark:bg-zinc-600 dark:text-black"
                onChange={(e) => {
                  const files = [];
                  const urls = [];
                  Array.from(e.target.files).forEach((file) => {
                    files.push(file);
                    urls.push(URL.createObjectURL(file));
                  });
                  setProductImages(files);
                  setLocalImageUrls(urls);
                }}
              />
            </div>

            {/* Submit Button (Full width) */}
            <div className="md:col-span-2 flex justify-center">
              <motion.input
                type="submit"
                value={loading ? "Submitting..." : isEditing ? "Edit Product" : "Add Product +"}
                disabled={loading}
                className="px-4 py-1 rounded-xl cursor-pointer bg-[#007BFF] text-[#1A1A1A] hover:bg-[#0056D2] hover:text-white disabled:bg-gray-400"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 200 }}
              />
            </div>
          </div>

          <ToastContainer position="top-right" autoClose={1500} theme="light" />
        </motion.form>
      </div>
    </div>
  );
}

export default ProductForm;