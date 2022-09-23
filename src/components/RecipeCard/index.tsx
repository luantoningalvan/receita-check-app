import React from "react";
import { useNavigation } from "@react-navigation/native";
import { Container, Cover, Title } from "./styles";
import { Recipe } from "../../common/interfaces/Recipe";

interface RecipeCardProps {
  recipe: Recipe;
}

export function RecipeCard({ recipe }: RecipeCardProps) {
  const navigation = useNavigation<any>();

  return (
    <Container onPress={() => navigation.navigate("ViewRecipe", { recipe })}>
      <Cover
        source={{
          uri: recipe.imageUrl,
        }}
      />
      <Title>{recipe.title}</Title>
    </Container>
  );
}
