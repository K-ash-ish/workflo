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
}: {
  type: string;
  placeholder: string;
  id: string;
  handleInput: (inputValue: string, valueToUpdate: string) => void;
  credentials: Credentials;
  setCredentials: (credentials: Credentials) => void;
}) {
  return (
    <label htmlFor={id} className="relative">
      {type === "password" && (
        // TODO toggle password visibility
        <button>
          <EyeIcon className="w-4 h-4 absolute right-2 top-[calc(50%-0.5rem)] text-[#717171]" />
        </button>
      )}
      <input
        type={type}
        placeholder={placeholder}
        id={id}
        value={credentials[type] || ""}
        onChange={(e) => {
          handleInput(e.target.value, type);
        }}
        required
        className="py-2 px-3 bg-[#EBEBEB] rounded-md focus:outline-1 focus:border-none focus:outline-[#d2d2d2] w-full text-[#606060] placeholder-gray-400 placeholder:pl-1  caret-gray-400 "
      />
    </label>
  );
}
