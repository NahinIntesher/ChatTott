"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
import { useRouter } from "next/navigation";
import ThemeSwitcher from "@/components/ui/ThemeSwitcherButton";

const steps = [
  {
    id: 1,
    title: "Welcome to ChatTott",
    description:
      "Connect, chat, and collaborate seamlessly with your friends and colleagues.",
    image: "/images/onboarding1.png",
  },
  {
    id: 2,
    title: "Dark & Light Mode",
    description:
      "Easily switch between dark and light mode for a comfortable experience.",
    image: "/images/onboarding2.png",
  },
  {
    id: 3,
    title: "Stay Connected",
    description:
      "Get instant notifications and never miss an important message again.",
    image: "/images/onboarding3.png",
  },
];

const OnboardingScreen = () => {
  const [step, setStep] = useState(0);
  const router = useRouter();

  const nextStep = () => {
    if (step < steps.length - 1) {
      setStep(step + 1);
    } else {
      onFinish();
    }
  };

  const prevStep = () => {
    if (step > 0) {
      setStep(step - 1);
    }
  };

  const onFinish = () => {
    console.log("Onboarding completed, redirecting...");
    router.push("/login");
  };

  return (
    <div className="bg-bg w-screen h-screen flex flex-col items-center justify-center text-text px-6">
      {/* Content Wrapper */}
      <motion.div
        key={steps[step].id}
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -50 }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-md flex flex-col items-center justify-center"
      >
        <Image
          src={steps[step].image}
          alt="Onboarding"
          width={350}
          height={350}
          className="mx-auto mb-8 rounded-xl shadow-xl  sm:max-w-sm"
        />
        <h2 className="text-3xl font-bold">{steps[step].title}</h2>
        <p className="text-lg text-gray-500 mt-3">{steps[step].description}</p>
      </motion.div>

      {/* Navigation Controls */}
      <div className="flex items-center justify-between w-full max-w-sm mt-8">
        {step > 0 && (
          <button
            onClick={prevStep}
            className="px-5 py-3 bg-button-border text-text rounded-lg flex items-center gap-2 hover:bg-button-hover transition-all duration-300"
          >
            <FaArrowLeft /> Back
          </button>
        )}

        <button
          onClick={nextStep}
          className="px-6 py-3 bg-primary text-text rounded-lg flex items-center gap-2 hover:bg-opacity-80 transition-all duration-300 ml-auto"
        >
          {step < steps.length - 1 ? "Next" : "Get Started"} <FaArrowRight />
        </button>
      </div>
      <ThemeSwitcher />

      {/* Progress Indicators */}
      <div className="flex items-center justify-center space-x-3 mt-6">
        {steps.map((_, index) => (
          <span
            key={index}
            className={`h-2 w-2 rounded-full transition-all duration-300 ${
              step === index ? "bg-primary w-4" : "bg-card-border"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default OnboardingScreen;
