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

  const onSubmit = (data: LoginFormInputs) => {
    console.log("Form data submitted:", data); // Debugging
    if (data.email === "nahin@gmail.com" && data.password === "123456") {
      setErrorMessage(null);
      console.log("Login successful, redirecting..."); // Debugging
      router.push("/");
    } else {
      console.log("Invalid credentials"); // Debugging
      setErrorMessage("Invalid email or password");
    }
  };

  return (
    <div className="bg-[#f7f6e9] w-screen min-h-screen flex justify-center items-center px-4 text-black">
      {/* Login Box */}
      <div className="bg-login-box-bg border border-card-border-light px-6 py-8 sm:px-8 sm:py-10 w-full sm:w-[90%] md:w-[75%] lg:w-[50%] xl:w-[40%] max-w-md rounded-xl shadow-lg">
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
        <p className="text-center mt-2 text-sm">
          Don't have an account?{" "}
          <Link href="/signup" className="text-primary underline font-semibold">
            Signup
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
