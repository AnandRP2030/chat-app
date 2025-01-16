import { MoonStar, Sun } from "lucide-react";
import { useEffect, useState } from "react";

export const DarkModeToggle = () => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem("chat-app-theme") === "dark";
  });

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("chat-app-theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("chat-app-theme", "light");
    }
  }, [isDarkMode]);
  return (
    <button
      className="m-4 p-4 bg-gray-300 dark:bg-gray-700 rounded"
      onClick={() => {
        setIsDarkMode(!isDarkMode);
      }}
    >
      {isDarkMode ? <Sun /> : <MoonStar />}
    </button>
  );
};
