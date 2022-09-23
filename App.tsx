import { StatusBar } from "expo-status-bar";
import { ThemeProvider } from "styled-components/native";
import { AppRoutes } from "./src/routes/AppRoute";
import { theme } from "./src/styles/theme";

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <StatusBar style="auto" />
      <AppRoutes />
    </ThemeProvider>
  );
}
