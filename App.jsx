import { SafeAreaView, StatusBar, StyleSheet, Text } from 'react-native';

import { ThemeProvider, useTheme } from "./src/theme";

function AppScreen() {
    const { theme, themes, changeTheme } = useTheme();

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle={theme.metadata.mode === "dark" ? "light-content" : "dark-content"} />
            <Text style={[{color: theme.colors.roles.text.primary}]}>Hello React Native 👋  </Text>
        </SafeAreaView>
    )
}

function App() {
    return (
        <ThemeProvider>
            <AppScreen />
        </ThemeProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default App;