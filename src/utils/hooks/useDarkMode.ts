import { useState, useEffect, Dispatch, SetStateAction } from "react";

type Theme = "light" | "dark";

export default function useDarkMode(): [Theme, Dispatch<SetStateAction<Theme>>] {
    const [theme, setTheme] = useState<Theme>(() => {
        if (typeof window !== "undefined") {
            const savedTheme = localStorage.getItem("theme") as Theme;
            return savedTheme || "light";
        }
        return "light";
    });

    const colorTheme: Theme = theme === "dark" ? "light" : "dark";

    useEffect(() => {
        if (typeof window !== "undefined") {
            const root = window.document.documentElement;
            root.classList.remove(colorTheme);
            root.classList.add(theme);
            localStorage.setItem("theme", theme);
        }
    }, [theme, colorTheme]);

    return [colorTheme, setTheme];
}