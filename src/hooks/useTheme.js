import { useContext } from "react";

import { ThemeContext } from "../theme/ThemeProvider";

export default function useTheme(){
    return useContext(
        ThemeContext
    );
}