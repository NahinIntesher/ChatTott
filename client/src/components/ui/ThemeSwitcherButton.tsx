import { useTheme } from "next-themes";
import { FaMoon, FaSun } from "react-icons/fa";

const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme();

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="p-2 rounded-full transition-colors duration-300"
      style={{
        backgroundColor: theme === "dark" ? "#e1e1e1" : "#e1e1e1", 
      }}
    >
      {theme === "dark" ? <FaSun size={24} className="text-black"/> : <FaMoon size={24} className="text-black"/>}
    </button>
  );
};

export default ThemeSwitcher;
