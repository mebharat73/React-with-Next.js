"use client";

import { addProduct, editProduct } from "@/api/products";
import { PRODUCTS_ROUTE } from "@/constants/routes";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
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

  const router = useRouter();

  async function submitForm(data) {
    setLoading(true);

    const formData = new FormData();
    formData.append("brand", data.brand);
    formData.append("category", data.category);
    formData.append("description", data.description);
    formData.append("name", data.name);
    formData.append("price", data.price);
    formData.append("stock", data.stock);
    productImages.map((image) => {
      formData.append("images", image);
    });

    try {
      isEditing
        ? await editProduct(product.id, data)
        : await addProduct(formData);

      toast.success(
        isEditing
          ? "Product updated successfully."
          : "Product added successfully.",
        {
          autoClose: 1500,
          onClose: () => router.replace(PRODUCTS_ROUTE),
        }
      );
    } catch (error) {
      toast.error(error.response.data, {
        autoClose: 1500,
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <motion.form
      onSubmit={handleSubmit(submitForm)}
      className="w-full lg:w-2/3 xl:w-1/2 px-10 py-8 md:px-16 md:py-12 shadow-xl rounded-2xl dark:bg-gray-700 bg-gradient-to-br from-[#fdffc0] to-[#f1d2f9]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="py-2 ">
        <motion.label
          htmlFor="name"
          className="px-1 py-0 bg-gradient-to-br from-[#fdffc0] to-[#f1d2f9] rounded-md  font-semibold text-sm font-serif text-[#8b2fa2] border-2 border-solid uppercase p-1 dark:text-white"
          initial={{ x: -30, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          Product name
        </motion.label>
        <input
          type="text"
          id="name"
          className="font-semibold text-[#506118] bg-gradient-to-tl from-[#edbef9] to-[#f9fbc6] border border-gray-500 rounded-lg px-4 py-0 w-full shadow-md mt-2 dark:text-white dark:bg-zinc-600"
          {...register("name", {
            required: "Product name is required.",
          })}
        />
        <p className="bg-gradient-to-tl from-[#ebacfb] to-[#f9fbc6] text-red-600 text-sm m-1">{errors.name?.message}</p>
      </div>

      <div className="py-2">
        <motion.label
          htmlFor="brand"
          className="px-1 py-0 bg-gradient-to-br from-[#fdffc0] to-[#f1d2f9] rounded-md  font-semibold text-sm font-serif text-[#8b2fa2] border-2 border-solid uppercase p-1 dark:text-white"
          initial={{ x: -30, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.7 }}
        >
          Brand
        </motion.label>
        <input
          type="text"
          id="brand"
          className="font-semibold text-[#506118] bg-gradient-to-tl from-[#edbef9] to-[#f9fbc6] border border-gray-500 rounded-lg px-4 py-0 w-full shadow-md mt-2 dark:text-white dark:bg-zinc-600"
          {...register("brand")}
        />
      </div>

      <div className="py-2">
        <motion.label
          htmlFor="category"
          className="px-1 py-0 bg-gradient-to-br from-[#fdffc0] to-[#f1d2f9] rounded-md  font-semibold text-sm font-serif text-[#8b2fa2] border-2 border-solid uppercase p-1 dark:text-white"
          initial={{ x: -30, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          Category
        </motion.label>
        <input
          type="text"
          id="category"
          className="font-semibold text-[#506118] bg-gradient-to-tl from-[#edbef9] to-[#f9fbc6] border border-gray-500 rounded-lg px-4 py-0 w-full shadow-md mt-2 dark:text-white dark:bg-zinc-600"
          {...register("category")}
        />
      </div>

      <div className="py-2">
        <motion.label
          htmlFor="price"
          className="px-1 py-0 bg-gradient-to-br from-[#fdffc0] to-[#f1d2f9] rounded-md  font-semibold text-sm font-serif text-[#8b2fa2] border-2 border-solid uppercase p-1 dark:text-white"
          initial={{ x: -30, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.9 }}
        >
          Price
        </motion.label>
        <input
          type="number"
          id="price"
          className="font-semibold text-[#506118] bg-gradient-to-tl from-[#edbef9] to-[#f9fbc6] border border-gray-500 rounded-lg px-4 py-0 w-full shadow-md mt-2 dark:text-white dark:bg-zinc-600"
          {...register("price", {
            required: "Price is required.",
            min: {
              value: 0,
              message: "Product price must be positive value.",
            },
          })}
        />
        <p className="bg-gradient-to-tl from-[#ebacfb] to-[#f9fbc6] text-red-600 text-sm m-1">{errors.price?.message}</p>
      </div>

      <div className="py-2">
        <motion.label
          htmlFor="stock"
          className="px-1 py-0 bg-gradient-to-br from-[#fdffc0] to-[#f1d2f9] rounded-md  font-semibold text-sm font-serif text-[#8b2fa2] border-2 border-solid uppercase p-1 dark:text-white"
          initial={{ x: -30, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1 }}
        >
          Stock
        </motion.label>
        <input
          type="number"
          id="stock"
          className="font-semibold text-[#506118] bg-gradient-to-tl from-[#edbef9] to-[#f9fbc6] border border-gray-500 rounded-lg px-4 py-0 w-full shadow-md mt-2 dark:text-white dark:bg-zinc-600"
          {...register("stock", {
            min: {
              value: 0,
              message: "Product stock must be positive value.",
            },
          })}
        />
        <p className="bg-gradient-to-tl from-[#ebacfb] to-[#f9fbc6] text-red-600 text-sm m-1">{errors.stock?.message}</p>
      </div>

      <div className="py-2">
        <motion.label
          htmlFor="description"
          className="px-1 py-0 bg-gradient-to-br from-[#fdffc0] to-[#f1d2f9] rounded-md  font-semibold text-sm font-serif text-[#8b2fa2] border-2 border-solid uppercase p-1 dark:text-white"
          initial={{ x: -30, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1.1 }}
        >
          Description
        </motion.label>
        <textarea
          id="description"
          className="font-semibold text-[#506118] bg-gradient-to-tl from-[#edbef9] to-[#f9fbc6] border border-gray-500 rounded-lg px-4 py-0 w-full shadow-md mt-2 dark:text-white dark:bg-zinc-600"
          {...register("description")}
        ></textarea>
        <p className="text-red-600 text-sm m-1">{errors.description?.message}</p>
      </div>

      <div className="py-2">
        <motion.label
          htmlFor="images"
          className="px-1 py-0 bg-gradient-to-br from-[#fdffc0] to-[#f1d2f9] rounded-md  font-semibold text-sm font-serif text-[#8b2fa2] border-2 border-solid uppercase p-1 dark:text-white"
          initial={{ x: -30, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1.2 }}
        >
          Images
        </motion.label>

        {localImageUrls.length > 0 && (
          <div className="p-5 bg-gray-100 dark:bg-zinc-600 my-1 rounded grid grid-cols-2 gap-3 items-center justify-evenly">
            {localImageUrls.map((url, index) => (
              <Image key={index} src={url} alt="image" height={200} width={200} />
            ))}
          </div>
        )}

        <input
          type="file"
          multiple
          className="font-semibold text-[#506118] bg-gradient-to-tl from-[#edbef9] to-[#f9fbc6] border border-gray-500 rounded-lg px-4 py-0 w-full shadow-md mt-2 dark:text-white dark:bg-zinc-600"
          id="images"
          onChange={(e) => {
            const files = [];
            const urls = [];

            Array.from(e.target?.files).map((file) => {
              files.push(file);
              urls.push(URL.createObjectURL(file));
            });

            setProductImages(files);
            setLocalImageUrls(urls);
          }}
        />
      </div>

      <div className="flex justify-center pt-5">
        <motion.input
          type="submit"
          value={loading ? "Submitting..." : isEditing ? "Edit Product" : "Add Product +"}
          disabled={loading}
          className="font-serif font-semibold bg-[#68217A] text-[#C3EF38] hover:bg-[#8b2fa2] hover:text-white px-3 py-1 rounded-xl cursor-pointer disabled:bg-primary-300 disabled:cursor-not-allowed"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 200 }}
        />
      </div>

      <ToastContainer />
    </motion.form>
  );
}

export default ProductForm;
