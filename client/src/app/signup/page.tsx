"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import Image from "next/image";
import logo from "../../../public/images/ChatTottLogo.png";
import Input from "../../components/ui/Input";
import Link from "next/link";

type SignupFormInputs = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const Signup = () => {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormInputs>();

  const onSubmit = async (data: SignupFormInputs) => {
    try {
      const response = await fetch("http://localhost:8000/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          password: data.password,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        setErrorMessage(null);
        console.log("Signup successful, redirecting to login...");
        router.push("/login");
      } else {
        console.log("Signup error", result.Error);
        setErrorMessage(
          result.Error || "Error during signup. Please try again."
        );
      }
    } catch (error) {
      console.log("Error during signup", error);
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
          Create your <strong>ChatTott</strong> account
        </h1>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="mt-4">
          {/* Name Input */}
          <Input
            label="Name"
            type="text"
            placeholder="Enter your name"
            {...register("name", { required: "Name is required" })}
            error={errors.name?.message}
          />

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

          {/* Confirm Password Input */}
          <Input
            label="Confirm Password"
            type="password"
            placeholder="Confirm your password"
            {...register("confirmPassword", {
              required: "Confirm password is required",
            })}
            error={errors.confirmPassword?.message}
          />

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full mt-4 bg-extra border bg-button-bg-light hover:bg-button-hover-light text-black font-semibold py-2 rounded-lg"
          >
            Signup
          </button>
        </form>

        {/* Login Link */}
        <p className="text-center mt-2 text-sm">
          Already have an account?{" "}
          <Link href="/login" className="text-primary underline font-semibold">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
