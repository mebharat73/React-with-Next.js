"use client";

import { getUserById, updateUser  } from "@/api/user";
import ProfileImage from "@/components/profile/Image";
import Spinner from "@/components/Spinner";
import { LOGIN_ROUTE } from "@/constants/routes";
import { updateAuthUser  } from "@/redux/auth/authSlice";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import { FaUser , FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa"; // Import icons

function EditProfilePage() {
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      city: user?.address.city,
      country: user?.address.country,
      name: user?.name,
      email: user?.email,
      phone: user?.phone,
      province: user?.address.province,
      street: user?.address.street,
    },
  });

  async function submitForm(data) {
    setLoading(true);
    try {
      await updateUser (user.id, {
        address: {
          street: data.street,
          city: data.city,
          province: data.province,
          country: data.country,
        },
        phone: data.phone,
        name: data.name,
      });

      const userData = await getUserById(user.id);
      dispatch(updateAuthUser (userData));
      toast.success("User  update successful.", { autoClose: 1500 });
    } catch (error) {
      toast.error(error?.response?.data, { autoClose: 1500 });
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (!user) router.replace(LOGIN_ROUTE);
  }, [router, user]);

  return (
    <div className="py-8 min-h-screen w-auto bg-gradient-to-tl from-[#ebacfb] to-[#f9fbc6] flex items-center justify-center dark:bg-gradient-to-tl dark:from-[#504e4e] dark:to-[#b4b0b0]">
      <div className="rounded-2xl shadow-lg p-8 w-full max-w-lg dark:bg-gradient-to-tl dark:from-[#504e4e] dark:to-[#b4b0b0]">
        <ProfileImage />
        <h2 className="p-4 font-serif text-2xl text-[#68217A] font-bold text-center mb-1">Edit Profile</h2>
        <form onSubmit={handleSubmit(submitForm)}>
          <div className="py-2">
            <label htmlFor="name" className="flex items-center">
              <FaUser  className="mr-2" /> Name
            </label>
            <input
              type="text"
              id="name"
              className="h-8 px-4 py-2 w-full border bg-gradient-to-b from-[#faaae0] to-[#bacfef] focus:outline-none focus:ring-1 focus:ring-primary-500 rounded-md text-gray-800 dark:text-white"
              {...register("name", { required: "Name is required." })}
            />
            <p className="text-red-600 text-sm m-1">{errors.name?.message}</p>
          </div>
          <div className="py-2">
            <label htmlFor="email" className="flex items-center">
              <FaEnvelope className="mr-2" /> Email
            </label>
            <input
              type="text"
              id="email"
              disabled={true}
              className="h-8 px-4 py-2 w-full border bg-gradient-to-b from-[#faaae0] to-[#bacfef] focus:outline-none focus:ring-1 focus:ring-primary-500 rounded-md text-gray-800 dark:text-white"
              {...register("email", { required: "Email is required." })}
            />
            <p className="text-red-600 text-sm m-1">{errors.email?.message}</p>
          </div>
          <div className="py-2">
            <label htmlFor="address" className="flex items-center">
              <FaMapMarkerAlt className="mr-2" /> Address
            </label>
            <input
              type="text"
              id="street"
              placeholder="Street"
              className="h-8 px-4 py-2 w-full border bg-gradient-to-b from-[#faaae0] to-[#bacfef] focus:outline-none focus:ring-1 focus:ring-primary-500 rounded-md text-gray-800 dark:text-white"
              {...register("street", { required: "Street is required." })}
            />
            <p className="text-red-600 text-sm m-1">{errors.street?.message}</p>
            <div className="grid md:grid-cols-3 gap-2">
              <div>
                <input
                  type="text"
                  id="city"
                  placeholder="City"
                  className="h-8 px-4 py-2 w-full border bg-gradient-to-b from-[#faaae0] to-[#bacfef] focus:outline-none focus:ring-1 focus:ring-primary-500 rounded-md text-gray-800 dark:text-white0"
                  {...register("city", { required: "City is required." })}
                />
                <p className="text-red-600 text-sm m-1">{errors.city?.message}</p>
              </div>
              <div>
                <input
                  type="text"
                  id="province"
                  placeholder="Province"
                  className="h-8 px-4 py-2 w-full border bg-gradient-to-b from-[#faaae0] to-[#bacfef] focus:outline-none focus:ring-1 focus:ring-primary-500 rounded-md text-gray-800 dark:text-white"
                  {...register("province", { required: "Province is required." })}
                />
                <p className="text-red-600 text-sm m-1">{errors.province?.message}</p>
              </div>
              <div>
                <input
                  type="text"
                  id="country"
                  placeholder="Country"
                  className="h-8 px-4 py-2 w-full border bg-gradient-to-b from-[#faaae0] to-[#bacfef] focus:outline-none focus:ring-1 focus:ring-primary-500 rounded-md text-gray-800 dark:text-white"
                  {...register("country", { required: "Country is required." })}
                />
                <p className="text-red-600 text-sm m-1">{errors.country?.message}</p>
              </div>
            </div>
          </div>
          <div className="py-2">
            <label htmlFor="phone" className="flex items-center">
              <FaPhone className="mr-2" /> Phone number
            </label>
            <input
              type="text"
              id="phone"
              className="h-8 px-4 py-2 w-full border bg-gradient-to-b from-[#faaae0] to-[#bacfef] focus:outline-none focus:ring-1 focus:ring-primary-500 rounded-md text-gray-800 dark:text-white"
              {...register("phone", { required: "Phone number is required." })}
            />
            <p className="text-red-600 text-sm m-1">{errors.phone?.message}</p>
          </div>
          <div className="pt-5">
            <button
              disabled={loading}
              type="submit"
              className="font-serif font-semibold bg-[#68217A] text-[#d0fa44] px-4 py-0 h-8 rounded-3xl cursor-pointer disabled:bg-blue-300 disabled:cursor-not-allowed flex items-center justify-center transition duration-200 hover:bg-[#8b2fa2] hover:text-white"
            >
              {loading ? (
                <>
                  <span>Updating</span>
                  <Spinner className="h-6 w-6 ml-2" />
                </>
              ) : (
                "Update"
              )}
            </button>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
}

export default EditProfilePage;