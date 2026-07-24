import React, { createContext, useEffect, useState } from "react";
import { Appearance } from "react-native";

import { themes, defaultTheme } from "./themes";
import { saveThemePreference, loadThemePreference } from "../storage/themeStorage";

export const ThemeContext = createContext(null);

function getSystemTheme() {
    const mode = Appearance.getColorScheme();

    if (mode === "light") {
        return themes.ivory;
    }
    return themes.basalt;
}

export function ThemeProvider({ children }) {
    const [theme, setTheme] = useState(defaultTheme);
    const [preference, setPreference] = useState({ mode: "system", theme: null }); // mode: 'system' -> follow device theme, 'manual' -> use selected theme
    const [loading, setLoading] = useState(true);

    // Loads on app startup
    useEffect(() => {
        async function init() {
            const saved = await loadThemePreference();

            // Restore manual or follow system apperance
            if (saved) {
                setPreference(saved);
                if (saved.mode === "manual" && saved.theme) { setTheme(themes[saved.theme]); } else { setTheme(getSystemTheme()); }
            }
            else {
                setTheme(getSystemTheme());
            }
            setLoading(false);
        }
        init();
    }, []);

    async function useSystemTheme() {
        const newPreference = { mode: "system", theme: null };

        setPreference(newPreference);
        setTheme(getSystemTheme());

        await saveThemePreference(newPreference);
    }

    async function setManualTheme(themeKey) {
        const newPreference = { mode: "manual", theme: themeKey };

        setPreference(newPreference);
        setTheme(themes[themeKey]);

        await saveThemePreference(newPreference);
    }

    return (
        // Values exposed to all components using ThemeContext.
        <ThemeContext.Provider
            value={{ theme, themes, preference, setManualTheme, useSystemTheme, loading }}
        >
            {children}
        </ThemeContext.Provider>
    );
}