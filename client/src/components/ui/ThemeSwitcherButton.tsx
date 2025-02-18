import { useTheme } from "next-themes";
import { useEffect } from "react";
import { FaMoon, FaSun } from "react-icons/fa";

const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, [setTheme]);

  const handleThemeChange = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);

    // Save the theme preference to localStorage
    localStorage.setItem("theme", newTheme);
  };

  return (
    <button
      onClick={handleThemeChange}
      className="p-2 rounded-full"
      style={{
        backgroundColor: theme === "dark" ? "#484848" : "#000000",
      }}
    >
      {theme === "dark" ? (
        <FaSun size={24} className="text-yellow-300" />
      ) : (
        <FaMoon size={24} className="text-white" />
      )}
    </button>
  );
};

export default ThemeSwitcher;
