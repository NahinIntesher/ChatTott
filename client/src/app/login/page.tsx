"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import Image from "next/image";
import logo from "../../../public/images/ChatTottLogo.png";
import Input from "@/components/ui/Input";
import Link from "next/link";

type LoginFormInputs = {
  email: string;
  password: string;
};

const Login = () => {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>();

  const onSubmit = async (data: LoginFormInputs) => {
    try {
      console.log("Submitting login data:", data.email);

      const response = await fetch("http://localhost:8000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        mode: "cors",
        body: JSON.stringify({
          email: data.email,
          password: data.password,
        }),
      });

      const result = await response.json();
      console.log("Login response:", result);

      if (result.status === "Success") {
        setErrorMessage(null);
        console.log("Login successful, redirecting...");
        router.replace("/chat");
      } else {
        console.log("Login failed:", result.Error);
        setErrorMessage(result.Error || "Invalid email or password");
      }
    } catch (error) {
      console.log("Error during login:", error);
      setErrorMessage("An error occurred, please try again later");
    }
  };
  return (
    <div className="bg-[#f7f6e9] w-screen min-h-screen flex justify-center items-center px-4 text-black">
      <div className="bg-login-box-bg border border-card-border-light px-6 py-8 sm:px-8 sm:py-10 rounded-xl shadow-lg">
        {/* Logo */}
        <div className="flex justify-center">
          <Image src={logo} alt="ChatTott" width={70} height={70} />
        </div>

        {/* Title */}
        <h1 className="text-center text-2xl font-semibold mt-2">
          Welcome to <strong>ChatTott</strong>
        </h1>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="mt-4">
          {/* Email Input */}
          <Input
            label="Email"
            type="email"
            placeholder="Enter your email"
            {...register("email", { required: "Email is required" })}
            error={errors.email?.message}
          />

          {/* Password Input */}
          <Input
            label="Password"
            type="password"
            placeholder="Enter your password"
            {...register("password", { required: "Password is required" })}
            error={errors.password?.message}
          />

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full mt-4 bg-extra border bg-button-bg-light hover:bg-button-hover-light text-black font-semibold py-2 rounded-lg"
          >
            Login
          </button>
        </form>

        {/* Signup Link */}
        <div className="text-center mt-2 text-sm">
          Don't have an account?{" "}
          <Link href="/signup" className="underline font-semibold">
            Signup
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
