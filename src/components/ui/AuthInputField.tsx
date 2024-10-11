"use client";
import { Credentials } from "@/types/credentials";
import { EyeIcon, EyeOff } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export function AuthInputField({
  type,
  placeholder,
  id,
  handleInput,
  credentials,
  setCredentials,
}: Readonly<{
  type: string;
  placeholder: string;
  id: string;
  handleInput: (inputValue: string, valueToUpdate: string) => void;
  credentials: Credentials;
  setCredentials: (credentials: Credentials) => void;
}>) {
  const [showPassword, setShowPassword] = useState<Boolean>(false);
  function checkShowPassword() {
    if (showPassword) return "text";
    return "password";
  }
  return (
    <label htmlFor={id} className="relative">
      <input
        type={id === "password" ? checkShowPassword() : id}
        placeholder={placeholder}
        id={id}
        value={credentials[id] || ""}
        onChange={(e) => {
          handleInput(e.target.value, id);
        }}
        required
        className="py-2 px-3 bg-[#EBEBEB] rounded-md focus:outline-1 focus:border-none focus:outline-[#d2d2d2] w-full text-[#606060] placeholder-gray-400 placeholder:pl-1  caret-gray-400 "
      />
      {id === "password" && (
        <button
          tabIndex={-1}
          onClick={(e) => {
            e.preventDefault();
            setShowPassword(!showPassword);
          }}
          type="button"
        >
          {showPassword ? (
            <EyeOff className="w-4 h-4 absolute right-2 top-[calc(50%-0.5rem)] text-[#717171]" />
          ) : (
            <EyeIcon className="w-4 h-4 absolute right-2 top-[calc(50%-0.5rem)] text-[#717171]" />
          )}
        </button>
      )}
    </label>
  );
}
