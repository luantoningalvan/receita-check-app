import React from "react";
import { Container, Title, RecipesList } from "./styles";
import { RecipeCard } from "../../components/RecipeCard";
import { RECIPES } from "../../assets/recipes";

export function Saved() {
  return (
    <Container>
      <Title>Receitas salvas</Title>

      <RecipesList
        data={RECIPES}
        numColumns={2}
        renderItem={({ item }) => <RecipeCard recipe={item} />}
        columnWrapperStyle={{ justifyContent: "space-between" }}
      />
    </Container>
  );
}
