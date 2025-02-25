import Image from "next/image";
import userImage from "@/assets/images/user.jpg";
import { getUserById, uploadProfileImage } from "@/api/user";
import { toast } from "react-toastify";
import { updateAuthUser } from "@/redux/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import Spinner from "../Spinner";

function ProfileImage() {
  const [localImageUrl, setLocalImageUrl] = useState(null);
  const [profileImage, setProfileImage] = useState(null);
  const [uploading, setUploading] = useState(false);

  const { user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  async function updateProfile(e) {
    e.preventDefault();

    setUploading(true);

    const formData = new FormData();
    formData.append("image", profileImage);

    try {
      await uploadProfileImage(user.id, formData);

      const userData = await getUserById(user.id);

      dispatch(updateAuthUser(userData));

      toast.success("Profile image upload success.", {
        autoClose: 1500,
      });
    } catch (error) {
      toast.error(error?.response?.data, {
        autoClose: 1500,
      });
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="flex items-center justify-center flex-col">
      <Image
        src={localImageUrl || user?.profileImageUrl || userImage}
        alt="image"
        height={200}
        width={200}
        className="p-1 rounded-full border-[#84a123] border-4  h-28 w-28 object-cover bg-gradient-to-tl from-[#C3EF38] to-[#dd53ff] dark:bg-gradient-to-tl dark:from-[#504e4e] dark:to-[#b4b0b0]"
      />

      <form onSubmit={updateProfile} className="flex items-center mt-2">
        <input
          type="file"
          className="border border-[#8b2fa2] h-8 rounded-2xl px-3 text-[#68217A] text-base font-bold  py-0 w-full shadow-md dark:text-white dark:bg-zinc-600"
          id="profile-image"
          onChange={(e) => {
            const files = [];
            const urls = [];

            Array.from(e.target?.files).map((file) => {
              files.push(file);
              urls.push(URL.createObjectURL(file));
            });

            setProfileImage(files[0]);
            setLocalImageUrl(urls[0]);
          }}
        />
        <button
          disabled={uploading || localImageUrl == null}
          type="submit"
          className="bg-[#68217A] text-[#C3EF38] px-4 py-1 h-7 ml-3 rounded-2xl cursor-pointer disabled:bg-[#8b2fa2] disabled:cursor-not-allowed flex items-center disabled:bg-opacity-80 hover:bg-[#8b2fa2]"
        >
          {uploading ? (
            <>
              <span>Uploading</span>
              <Spinner className="h-6 w-6 ml-2" />
            </>
          ) : (
            "Upload"
          )}
        </button>
      </form>
    </div>
  );
}

export default ProfileImage;
