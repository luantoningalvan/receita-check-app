import React from "react";
import { RectButtonProps } from "react-native-gesture-handler";
import { BookmarkSimple } from "phosphor-react-native";
import { IconButton } from "../IconButton";
import { useSavedRecipes } from "../../contexts/SavedRecipesContext";
import { Recipe } from "../../common/interfaces/Recipe";

interface IconButtonProps extends RectButtonProps {
  recipe: Recipe;
}

export function SaveRecipeButton({ recipe, ...rest }: IconButtonProps) {
  const { savedRecipes, saveRecipe, unsaveRecipe } = useSavedRecipes();

  const handleSaveRecipe = React.useCallback(async () => {
    if (savedRecipes.includes(recipe.id)) {
      await unsaveRecipe(recipe.id);
    } else {
      await saveRecipe(recipe);
    }
  }, [savedRecipes, recipe]);

  return (
    <IconButton
      icon={BookmarkSimple}
      active={savedRecipes.includes(recipe.id)}
      onPress={handleSaveRecipe}
      {...rest}
    />
  );
}
