import AsyncStorage from "@react-native-async-storage/async-storage";

const THEME_STORAGE_KEY = "@theme_preference";

export async function saveThemePreference(preference) {
    try {
        await AsyncStorage.setItem(
            THEME_STORAGE_KEY,
            JSON.stringify(preference)
        );
    }
    catch (error) {
        console.log("Theme save error", error);
    }
}

export async function loadThemePreference() {
    try {
        const value = await AsyncStorage.getItem(
            THEME_STORAGE_KEY
        );

        if (!value) return null;

        return JSON.parse(value);
    }
    catch (error) {

        console.log("Theme load error", error);
        return null;
    }
}