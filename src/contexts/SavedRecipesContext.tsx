import React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Recipe } from "../common/interfaces/Recipe";
import { ToastAndroid } from "react-native";

interface SavedRecipesContextProps {
  savedRecipes: number[];
  saveRecipe(recipe: Recipe): Promise<void>;
  unsaveRecipe(recipe: number): Promise<void>;
}

const SavedRecipesContext = React.createContext<SavedRecipesContextProps>(
  {} as SavedRecipesContextProps
);

interface SavedRecipesContextProviderProps {
  children: React.ReactNode;
}

export const SavedRecipesContextProvider = ({
  children,
}: SavedRecipesContextProviderProps) => {
  const [savedRecipes, setSavedRecipes] = React.useState<Recipe[]>([]);

  const savedRecipesIds = savedRecipes.map((recipe) => recipe.id);

  const handleSaveRecipe = React.useCallback(
    async (recipe: Recipe) => {
      setSavedRecipes((state) => [...state, recipe]);
      ToastAndroid.show("A receita foi salva", ToastAndroid.SHORT);

      await AsyncStorage.setItem(
        "savedRecipes",
        JSON.stringify([...savedRecipes, recipe])
      );
    },
    [savedRecipes]
  );

  const handleUnsaveRecipe = React.useCallback(
    async (recipeId: number) => {
      const newState = savedRecipes.filter(
        (savedRecipe) => savedRecipe.id !== recipeId
      );
      setSavedRecipes((state) => newState);
      await AsyncStorage.setItem("savedRecipes", JSON.stringify(newState));

      ToastAndroid.show(
        "A receita foi removida das salvas",
        ToastAndroid.SHORT
      );
    },
    [savedRecipes]
  );

  React.useEffect(() => {
    AsyncStorage.getItem("savedRecipes").then((result) => {
      if (result) {
        setSavedRecipes(JSON.parse(result));
      }
    });
  }, []);

  return (
    <SavedRecipesContext.Provider
      value={{
        savedRecipes: savedRecipesIds,
        saveRecipe: handleSaveRecipe,
        unsaveRecipe: handleUnsaveRecipe,
      }}
      children={children}
    />
  );
};

export function useSavedRecipes() {
  return React.useContext(SavedRecipesContext);
}
