"use client";

import { getUserById, updateUser } from "@/api/user";
import ProfileImage from "@/components/profile/Image";
import Spinner from "@/components/Spinner";
import { LOGIN_ROUTE } from "@/constants/routes";
import { updateAuthUser } from "@/redux/auth/authSlice";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import { FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa"; 

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
      await updateUser(user.id, {
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
      dispatch(updateAuthUser(userData));
      toast.success("User update successful.", { autoClose: 1500 });
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
    <div className="py-2 md:py-8 min-h-screen w-auto bg-gradient-to-tl from-[#ebacfb] to-[#f9fbc6] flex items-center justify-center dark:bg-gradient-to-tl dark:from-[#504e4e] dark:to-[#b4b0b0]">
      {/* Back Button */}
      <button
        className="absolute top-20 right-5 bg-[#8b2fa2] text-white hover:text-[#C3EF38] h-6 px-3 mt-1 mr-6 rounded-lg hover:bg-[#68217A] transition-colors md:absolute md:top-16 md:right-5 animate-bounce z-10"
        onClick={() => router.back()}
      >
        Back
      </button>

      <div className="-mt-12 md:-mt-2 rounded-2xl shadow-xl p-5 w-11/12 max-w-lg bg-white dark:bg-gray-800 transform transition-all duration-500 ease-in-out hover:scale-105">
        <ProfileImage className="rounded-full shadow-xl mb-2" /> {/* Profile image styling */}
        <h2 className="p-1 text-xl md:p-2 font-serif md:text-3xl text-[#68217A] font-bold text-center mb-1">Edit Profile</h2>
        <form onSubmit={handleSubmit(submitForm)} className="space-y-2 md:space-y-3 animate__animated animate__fadeIn">
          {/* Name Input */}
          <div>
            <label htmlFor="name" className="flex items-center text-lg dark:text-white">
              <FaUser className="mr-2" /> Name
            </label>
            <input
              type="text"
              id="name"
              className="h-8 md:h-10 px-4 py-2 w-full border-2 bg-gradient-to-b from-[#faaae0] to-[#bacfef] focus:outline-none focus:ring-2 focus:ring-primary-500 rounded-lg text-gray-800 dark:text-white transition-all ease-in-out duration-300 transform hover:scale-105"
              {...register("name", { required: "Name is required." })}
            />
            <p className="text-red-600 text-sm m-1">{errors.name?.message}</p>
          </div>
          
          {/* Email Input */}
          <div>
            <label htmlFor="email" className="flex items-center text-lg dark:text-white">
              <FaEnvelope className="mr-2" /> Email
            </label>
            <input
              type="text"
              id="email"
              disabled={true}
              className="h-8 md:h-10 px-4 py-2 w-full border-2 bg-gradient-to-b from-[#faaae0] to-[#bacfef] focus:outline-none focus:ring-2 focus:ring-primary-500 rounded-lg text-gray-800 dark:text-white"
              {...register("email", { required: "Email is required." })}
            />
            <p className="text-red-600 text-sm m-1">{errors.email?.message}</p>
          </div>

          {/* Address Inputs */}
          <div className="space-y-2">
            <div>
              <label htmlFor="address" className="flex items-center text-lg dark:text-white">
                <FaMapMarkerAlt className="mr-2" /> Address
              </label>
              <input
                type="text"
                id="street"
                placeholder="Street"
                className="h-8 md:h-10 px-4 py-2 w-full border-2 bg-gradient-to-b from-[#faaae0] to-[#bacfef] focus:outline-none focus:ring-2 focus:ring-primary-500 rounded-lg text-gray-800 dark:text-white transition-all ease-in-out duration-300 transform hover:scale-105"
                {...register("street", { required: "Street is required." })}
              />
              <p className="text-red-600 text-sm m-1">{errors.street?.message}</p>
            </div>
            <div className="grid sm:grid-cols-2 gap-1">
              <div>
                <input
                  type="text"
                  id="city"
                  placeholder="City"
                  className="h-8 md:h-10 px-4 py-2 w-full border-2 bg-gradient-to-b from-[#faaae0] to-[#bacfef] focus:outline-none focus:ring-2 focus:ring-primary-500 rounded-lg text-gray-800 dark:text-white transition-all ease-in-out duration-300 transform hover:scale-105"
                  {...register("city", { required: "City is required." })}
                />
                <p className="text-red-600 text-sm m-1">{errors.city?.message}</p>
              </div>
              <div>
                <input
                  type="text"
                  id="province"
                  placeholder="Province"
                  className="h-8 md:h-10 px-4 py-2 w-full border-2 bg-gradient-to-b from-[#faaae0] to-[#bacfef] focus:outline-none focus:ring-2 focus:ring-primary-500 rounded-lg text-gray-800 dark:text-white transition-all ease-in-out duration-300 transform hover:scale-105"
                  {...register("province", { required: "Province is required." })}
                />
                <p className="text-red-600 text-sm m-1">{errors.province?.message}</p>
              </div>
              <div>
                <input
                  type="text"
                  id="country"
                  placeholder="Country"
                  className="h-8 md:h-10 px-4 py-2 w-full border-2 bg-gradient-to-b from-[#faaae0] to-[#bacfef] focus:outline-none focus:ring-2 focus:ring-primary-500 rounded-lg text-gray-800 dark:text-white transition-all ease-in-out duration-300 transform hover:scale-105"
                  {...register("country", { required: "Country is required." })}
                />
                <p className="text-red-600 text-sm m-1">{errors.country?.message}</p>
              </div>
            </div>
          </div>

          {/* Phone Number Input */}
          <div>
            <label htmlFor="phone" className="flex items-center text-lg dark:text-white">
              <FaPhone className="mr-2" /> Phone Number
            </label>
            <input
              type="text"
              id="phone"
              className="h-8 md:h-10 px-4 py-2 w-full border-2 bg-gradient-to-b from-[#faaae0] to-[#bacfef] focus:outline-none focus:ring-2 focus:ring-primary-500 rounded-lg text-gray-800 dark:text-white transition-all ease-in-out duration-300 transform hover:scale-105"
              {...register("phone", { required: "Phone number is required." })}
            />
            <p className="text-red-600 text-sm m-1">{errors.phone?.message}</p>
          </div>

          {/* Submit Button */}
          <div className="pt-1">
            <button
              disabled={loading}
              type="submit"
              className="px-2 py-0 font-serif font-semibold bg-[#68217A] text-[#d0fa44] md:px-3 md:py-1 rounded-3xl cursor-pointer disabled:bg-blue-300 disabled:cursor-not-allowed flex items-center justify-center transition-all ease-in-out duration-300 transform hover:bg-[#8b2fa2] hover:scale-105 hover:text-white"
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
