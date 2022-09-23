import React from "react";
import {
  Container,
  Grettings,
  SearchArea,
  SearchInput,
  VoiceSeachButton,
  CategoriesList,
  CategoryListItem,
  CategoryListItemText,
  RecipesList,
} from "./styles";
import { MagnifyingGlass, Microphone } from "phosphor-react-native";
import { View } from "react-native";
import { RecipeCard } from "../../components/RecipeCard";
import { RECIPES } from "../../assets/recipes";
import axios from "axios";

export function Recipes() {
  const [recipes, setRecipes] = React.useState([]);

  async function fetchRecipes() {
    const result = await axios.get("http://192.168.0.103:3000/recipes");
    setRecipes(result.data);
  }

  React.useEffect(() => {
    fetchRecipes();
  }, []);

  return (
    <Container>
      <RecipesList
        ListHeaderComponent={
          <>
            <Grettings>Confira o que você pode cozinhar hoje!</Grettings>

            <SearchArea>
              <MagnifyingGlass color="#878787" />

              <SearchInput
                placeholder="Buscar receita"
                placeholderTextColor="#878787"
              />

              <VoiceSeachButton>
                <Microphone color="#6A6A6A" />
              </VoiceSeachButton>
            </SearchArea>

            <View>
              <CategoriesList
                data={["Salgados", "Veganos", "Massas", "Doces"]}
                keyExtractor={(v: string) => v}
                renderItem={({ item }) => (
                  <CategoryListItem>
                    <CategoryListItemText>{item}</CategoryListItemText>
                  </CategoryListItem>
                )}
                horizontal
              />
            </View>
          </>
        }
        data={recipes}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: "space-between" }}
        renderItem={({ item }) => <RecipeCard recipe={item} />}
      />
    </Container>
  );
}
