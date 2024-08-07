import { StatusBar } from "expo-status-bar";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { ThemeProvider } from "styled-components/native";
import { Toast } from "./src/components/Toast";
import { SavedRecipesContextProvider } from "./src/contexts/SavedRecipesContext";
import { AppRoutes } from "./src/routes/AppRoute";
import { theme } from "./src/styles/theme";

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <StatusBar style="auto" />
        <SavedRecipesContextProvider>
          <AppRoutes />
        </SavedRecipesContextProvider>
      </GestureHandlerRootView>
      <Toast />
    </ThemeProvider>
  );
}
