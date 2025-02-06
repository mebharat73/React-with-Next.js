"use client";

import Link from "next/link";
import PasswordField from "./PasswordField";
import Spinner from "../Spinner";
import { LOGIN_ROUTE } from "@/constants/routes";
import { MdOutlineMailOutline } from "react-icons/md";
import { PASSWORD_REGEX } from "@/constants/regex";
import { RiUser3Fill } from "react-icons/ri";
import { registerUser } from "@/redux/auth/authActions";
import { toast, ToastContainer } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion"; // Import Framer Motion for animations

function RegisterForm() {
  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm();

  const password = watch("password");

  const { loading, error } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  function submitForm(data) {
    dispatch(registerUser(data));
  }

  useEffect(() => {
    if (error) {
      toast.error(error, { autoClose: 1500 });
    }
  }, [error]);

  return (
    <motion.form
      onSubmit={handleSubmit(submitForm)}
      className="max-w-md mx-auto p-6 border-2 border-[#8e912d] border-dashed bg-gradient-to-br from-[#fdffc0] to-[#f1d2f9] dark:bg-gray-800 rounded-lg shadow-lg transform transition-all"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div className="text-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">
          Create Your Account
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Join us and start your journey
        </p>
      </div>

      <div className="py-2">
        <div className="flex items-center border-b border-gray-300 dark:border-gray-600">
          <RiUser3Fill className="text-gray-500 dark:text-gray-200 text-lg mr-2" />
          <input
            type="text"
            id="name"
            className="h-8 px-4 py-2 w-full border bg-gradient-to-b from-[#faaae0] to-[#bacfef] focus:outline-none focus:ring-1 focus:ring-primary-500 rounded-md text-gray-800 dark:text-white"
            placeholder="Your full name"
            {...register("name", {
              required: "Full name is required.",
            })}
          />
        </div>
        <p className="text-red-600 text-sm m-1">{errors.name?.message}</p>
      </div>

      <div className="py-1">
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

      <div className="py-2">
        <PasswordField
          id="password"
          placeholder="Your password"
          className="h-8 px-4 py-2 w-full border bg-gradient-to-b from-[#faaae0] to-[#bacfef] focus:outline-none focus:ring-1 focus:ring-primary-500 rounded-md text-gray-800 dark:text-white"
          {...register("password", {
            required: "Password is required.",
            pattern: {
              value: PASSWORD_REGEX,
              message:
                "Password must contain uppercase, lowercase, numbers and special characters.",
            },
            minLength: {
              value: 6,
              message: "Password length must be greater than 6.",
            },
          })}
        />
        <p className="text-red-600 text-sm m-1">{errors.password?.message}</p>
      </div>

      <div className="py-2">
        <PasswordField
          id="confirmPassword"
          placeholder="Confirm password"
          className="h-8 px-4 py-2 w-full border bg-gradient-to-b from-[#faaae0] to-[#bacfef] focus:outline-none focus:ring-1 focus:ring-primary-500 rounded-md text-gray-800 dark:text-white"
          {...register("confirmPassword", {
            required: "Confirm password is required.",
            validate: (value) => {
              return value == password || "Passwords do not match.";
            },
          })}
        />
        <p className="text-red-600 text-sm m-1">
          {errors.confirmPassword?.message}
        </p>
      </div>

      <motion.button
        type="submit"
        disabled={loading}
        className="h-8 w-full mt-3 font-serif font-bold bg-[#68217A] text-[#d0fa44] hover:text-white py-3 rounded-lg disabled:bg-primary-300 disabled:cursor-not-allowed hover:bg-[#8b2fa2] transition duration-200 flex justify-center items-center"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {loading ? <Spinner className="w-6 h-6 mr-2 text-white animate-spin" /> : null}
        Register
      </motion.button>

      <div className="text-center mt-6">
        <Link
          href={LOGIN_ROUTE}
          className="text-[#68217A] hover:text-[#8b2fa2] hover:underline dark:text-white"
        >
          Already have an account?
        </Link>
      </div>

      <ToastContainer />
    </motion.form>
  );
}

export default RegisterForm;