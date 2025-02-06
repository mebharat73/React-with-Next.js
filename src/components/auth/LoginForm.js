"use client";

import Link from "next/link";
import PasswordField from "./PasswordField";
import Spinner from "../Spinner";
import { FORGOT_PASSWORD_ROUTE, REGISTER_ROUTE } from "@/constants/routes";
import { MdOutlineMailOutline } from "react-icons/md";
import { loginUser } from "@/redux/auth/authActions";
import { toast, ToastContainer } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion"; // Import Framer Motion for animations

function LoginForm() {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const { loading, error } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  function submitForm(data) {
    dispatch(loginUser(data));
  }

  useEffect(() => {
    if (error) {
      toast.error(error, { autoClose: 1500 });
    }
  }, [error]);

  return (
    <motion.form
      onSubmit={handleSubmit(submitForm)}
      className="max-w-md mx-auto border-2 border-[#8e912d] border-dashed p-6 bg-gradient-to-br from-[#fdffc0] to-[#f1d2f9] dark:bg-gray-800 rounded-xl shadow-lg transform transition-all"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div className="text-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">
          Welcome Back
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Please login to continue
        </p>
      </div>

      <div className="py-4">
        <div className="flex items-center border-b border-gray-300 dark:border-gray-600">
          <MdOutlineMailOutline className="text-gray-500 dark:text-gray-200 text-lg mr-2" />
          <input
            type="email"
            id="email"
            className="h-8 px-4 py-2 w-full border bg-gradient-to-b from-[#faaae0] to-[#bacfef] focus:outline-none focus:ring-1 focus:ring-primary-500 rounded-md text-gray-800 dark:text-white"
            placeholder="Your email address"
            {...register("email", {
              required: "Email address is required.",
            })}
          />
        </div>
        <p className="text-red-600 text-sm m-1">{errors.email?.message}</p>
      </div>

      <div className="py-4">
        <PasswordField
          id="password"
          placeholder="Your password"
          className="h-8 px-4 py-2 w-full border bg-gradient-to-b from-[#faaae0] to-[#bacfef] focus:outline-none focus:ring-1 focus:ring-primary-500 rounded-md text-gray-800 dark:text-white"
          {...register("password", {
            required: "Password is required.",
          })}
        />
        <p className="text-red-600 text-sm m-1">{errors.password?.message}</p>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-center mb-5">
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="rememberMe"
            className="focus:ring-[#68217A] text-[#68217A] dark:text-white"
          />
          <label htmlFor="rememberMe" className="text-sm text-[#68217A] dark:text-white">
            Remember me
          </label>
        </div>

        <Link
          href={FORGOT_PASSWORD_ROUTE}
          className="text-sm text-[#8b2fa2] hover:text-primary-600 dark:text-white hover:dark:text-primary-400"
        >
          Forgot password?
        </Link>
      </div>

      <motion.button
        type="submit"
        disabled={loading}
        className="h-8 w-full mt-3 font-serif font-bold bg-[#68217A] text-[#d0fa44] hover:text-white py-3 rounded-lg disabled:bg-primary-300 disabled:cursor-not-allowed hover:bg-[#8b2fa2] transition duration-200 flex justify-center items-center"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {loading ? <Spinner className="w-6 h-6 mr-2 text-white animate-spin" /> : null}
        Login
      </motion.button>

      <div className="text-center mt-6">
        <Link
          href={REGISTER_ROUTE}
          className="text-[#68217A] hover:text-[#8b2fa2] hover:underline dark:text-white"
        >
          Don't have an account? Create one
        </Link>
      </div>

      <ToastContainer />
    </motion.form>
  );
}

export default LoginForm;
