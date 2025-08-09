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
  <div className="min-h-screen -mt-8">
  <div className="flex justify-center items-center py-8 px-4">
    
    <motion.form
      onSubmit={handleSubmit(submitForm)}
      className="w-full  px-6 py-8 md:px-20 md:py-14 shadow-xl rounded-2xl dark:bg-gradient-to-tl dark:from-[#504e4e] dark:to-[#b4b0b0] bg-gradient-to-br from-[#fdffc0] to-[#f1d2f9]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 -mt-4">
        <div className="py-2">
          <motion.label
            htmlFor="name"
            className="block text-sm font-semibold text-[#8b2fa2] dark:text-white"
            initial={{ x: -30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            Product Name
          </motion.label>
          <input
            type="text"
            id="name"
            className="w-full mt-2 px-2 border rounded-lg shadow-sm dark:bg-zinc-600 dark:text-black"
            {...register("name", {
              required: "Product name is required.",
            })}
          />
          {errors.name && <p className="text-red-600 text-sm mt-1">{errors.name?.message}</p>}
        </div>

        <div className="py-2">
          <motion.label
            htmlFor="brand"
            className="block text-sm font-semibold text-[#8b2fa2] dark:text-white"
            initial={{ x: -30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.7 }}
          >
            Brand
          </motion.label>
          <input
            type="text"
            id="brand"
            className="w-full mt-2 px-2 border rounded-lg shadow-sm dark:bg-zinc-600 dark:text-black"
            {...register("brand")}
          />
        </div>

        <div className="py-2 -mt-4">
          <motion.label
            htmlFor="category"
            className="block text-sm font-semibold text-[#8b2fa2] dark:text-white"
            initial={{ x: -30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            Category
          </motion.label>
          <input
            type="text"
            id="category"
            className="w-full mt-2 px-2 border rounded-lg shadow-sm dark:bg-zinc-600 dark:text-black"
            {...register("category")}
          />
        </div>

        <div className="py-2 -mt-4">
          <motion.label
            htmlFor="price"
            className="block text-sm font-semibold text-[#8b2fa2] dark:text-white"
            initial={{ x: -30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.9 }}
          >
            Price
          </motion.label>
          <input
            type="number"
            id="price"
            className="w-full mt-2 px-2 border rounded-lg shadow-sm dark:bg-zinc-600 dark:text-black"
            {...register("price", {
              required: "Price is required.",
              min: {
                value: 0,
                message: "Product price must be positive value.",
              },
            })}
          />
          {errors.price && <p className="text-red-600 text-sm mt-1">{errors.price?.message}</p>}
        </div>

        <div className="py-2 -mt-4">
          <motion.label
            htmlFor="stock"
            className="block text-sm font-semibold text-[#8b2fa2] dark:text-white"
            initial={{ x: -30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 1 }}
          >
            Stock
          </motion.label>
          <input
            type="number"
            id="stock"
            className="w-full mt-2 px-2 border rounded-lg shadow-sm dark:bg-zinc-600 dark:text-black"
            {...register("stock", {
              min: {
                value: 0,
                message: "Product stock must be positive value.",
              },
            })}
          />
          {errors.stock && <p className="text-red-600 text-sm mt-1">{errors.stock?.message}</p>}
        </div>

        <div className="py-2 col-span-2 -mt-4">
          <motion.label
            htmlFor="description"
            className="block text-sm font-semibold text-[#8b2fa2] dark:text-white"
            initial={{ x: -30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 1.1 }}
          >
            Description
          </motion.label>
          <textarea
            id="description"
            className="w-full mt-2 p-2 border rounded-lg shadow-sm dark:bg-zinc-600 dark:text-black"
            {...register("description")}
          ></textarea>
        </div>

        <div className="py-2 col-span-2 -mt-6">
          <motion.label
            htmlFor="images"
            className="block text-sm font-semibold text-[#8b2fa2] dark:text-white"
            initial={{ x: -30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 1.2 }}
          >
            Images
          </motion.label>

          {/* ✅ Show Existing Images (if editing) */}
          {isEditing && existingImageUrls.length > 0 && (
            <div className="my-2">
              <p className="font-bold mb-2">Existing Images:</p>
              <div className="grid grid-cols-2 gap-3">
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
                        const updatedUrls = existingImageUrls.filter((_, i) => i !== idx);
                        setExistingImageUrls(updatedUrls);
                      }}
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ✅ Show New Image Previews */}
          {localImageUrls.length > 0 && (
            <div className="p-5 bg-gray-100 dark:bg-zinc-600 my-1 rounded grid grid-cols-2 gap-3 items-center justify-evenly">
              {localImageUrls.map((url, index) => (
                <Image key={index} src={url} alt="image" height={100} width={100} />
              ))}
            </div>
          )}

          {/* ✅ File Upload Input */}
          <input
            type="file"
            multiple
            className="w-full px-2 border rounded-xl shadow-sm dark:bg-zinc-600 dark:text-black"
            id="images"
            onChange={(e) => {
              const files = [];
              const urls = [];

              Array.from(e.target?.files).forEach((file) => {
                files.push(file);
                urls.push(URL.createObjectURL(file));
              });

              setProductImages(files);
              setLocalImageUrls(urls);
            }}
          />
        </div>

        <div className="flex justify-center pt-5 col-span-2 -mt-4">
          <motion.input
            type="submit"
            value={loading ? "Submitting..." : isEditing ? "Edit Product" : "Add Product +"}
            disabled={loading}
            className="px-2 py-0 rounded-xl cursor-pointer bg-[#68217A] text-[#C3EF38] hover:bg-[#8b2fa2] hover:text-white disabled:bg-gray-400"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 200 }}
          />
        </div>
      </div>

      <ToastContainer
        position="top-right"
        autoClose={1500}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </motion.form>
  </div>
  </div>
  );
}

export default ProductForm;
