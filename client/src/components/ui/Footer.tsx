import React from "react";
import { FaSignOutAlt, FaUserCircle } from "react-icons/fa";
import ThemeSwitcher from "./ThemeSwitcherButton";
import Image from "next/image";
const avater = "/images/avater.jpg";

interface FooterProps {
  handleLogout: () => void;
}

const Footer: React.FC<FooterProps> = ({ handleLogout }) => {
  return (
    <div className="p-2 mx-3 my-2 flex items-center justify-between bg-primary rounded-2xl dark:bg-gray-800 bg-gray-200 text-text shadow-md gap-2">
      <div className="flex items-center space-x-3 gap-2 w-full ">
        <Image
          src={avater}
          alt="Avatar"
          width={40}
          height={40}
          className="rounded-full "
        />
        Nahin Intesher
      </div>
      <div className="flex items-center space-x-3">
        <ThemeSwitcher />
        <button
          onClick={handleLogout}
          className="bg-button hover: text-text px-3 py-1.5 rounded-lg text-sm font-semibold flex items-center gap-2 transition-colors"
        >
          <FaSignOutAlt className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default Footer;
