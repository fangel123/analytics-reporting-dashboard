import { useEffect } from "react";
import { useThemeStore } from "./store/themeStore";
import Dashboard from "./pages/Dashboard";

function App() {
  const theme = useThemeStore((state) => state.theme);

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [theme]);

  return (
    <div className="bg-gray-100 dark:bg-gray-900 min-h-screen p-4 sm:p-8 transition-colors duration-300">
      <Dashboard />
    </div>
  );
}

export default App;
