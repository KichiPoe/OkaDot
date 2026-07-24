import palette from "./palette.json";

export const themes = palette.Themes;

export const themeKeys = Object.keys(themes);

export const defaultTheme = themes[themeKeys[0]];