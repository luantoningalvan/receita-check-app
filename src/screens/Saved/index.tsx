import React from "react";
import { Container, Title, RecipesList } from "./styles";
import { RecipeCard } from "../../components/RecipeCard";
import { useFocusEffect } from "@react-navigation/native";
import { Recipe } from "../../common/interfaces/Recipe";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Text } from "react-native";

export function Saved() {
  const [recipes, setRecipes] = React.useState<Recipe[]>([]);

  useFocusEffect(
    React.useCallback(() => {
      AsyncStorage.getItem("savedRecipes").then((data) => {
        if (data) {
          setRecipes(JSON.parse(data));
        }
      });
    }, [])
  );

  return (
    <Container>
      <Title>Receitas salvas</Title>

      <RecipesList
        data={recipes}
        numColumns={2}
        renderItem={({ item }) => <RecipeCard recipe={item} />}
        columnWrapperStyle={{ justifyContent: "space-between" }}
        ListEmptyComponent={<Text>Nenhuma receita salva ainda</Text>}
      />
    </Container>
  );
}
