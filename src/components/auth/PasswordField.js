"use client";

import { useState } from "react";
import { MdPassword } from "react-icons/md";
import { RiEyeFill, RiEyeOffFill } from "react-icons/ri";

function PasswordField(props) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  function togglePasswordVisibility() {
    setIsPasswordVisible(!isPasswordVisible);
  }

  return (
    <div className="flex items-end border-b border-gray-500 dark:text-white">
      <MdPassword className="mb-2" />
      <input
        type={isPasswordVisible ? "text" : "password"}
        className="px-3 py-1 w-full mt-1 bg-transparent focus:outline-none"
        {...props}
      />
      {isPasswordVisible ? (
        <RiEyeFill className="mb-2" onClick={togglePasswordVisibility} />
      ) : (
        <RiEyeOffFill className="mb-2" onClick={togglePasswordVisibility} />
      )}
    </div>
  );
}

export default PasswordField;
