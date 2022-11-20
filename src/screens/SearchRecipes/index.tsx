import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Alert, Keyboard } from "react-native";
import { Ingredient } from "../../common/interfaces/Ingredient";
import { RecipeCard } from "../../components/RecipeCard";
import { api } from "../../services/api";
import { Container, SearchInput, RecipesList } from "./styles";

export function SearchRecipes() {
  const [recipes, setRecipes] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [emptyIngredientsList, setEmptyIngredientsList] = React.useState(false);
  const [search, setSearch] = React.useState("");

  async function fetchRecipes() {
    setIsLoading(true);

    try {
      const fetchIngredientsFromStorage = await AsyncStorage.getItem(
        "ingredients"
      );

      if (fetchIngredientsFromStorage) {
        const decodeIngredients: Ingredient[] = JSON.parse(
          fetchIngredientsFromStorage
        );

        if (!!decodeIngredients.length) {
          setEmptyIngredientsList(false);
          const ingredientsId = decodeIngredients.map((item) => item.id);
          const result = await api.post(
            "recipes/list",
            {
              ingredients: ingredientsId,
            },
            {
              params: {
                title: search,
              },
            }
          );
          setRecipes(result.data);
        } else {
          setEmptyIngredientsList(true);
          setRecipes([]);
        }
      }
    } catch (error) {
      Alert.alert("Houve um erro ao tentar comunicar nossos servidores");
    }

    setIsLoading(false);
  }

  return (
    <Container>
      <SearchInput
        autoFocus
        placeholder="Buscar por receitas"
        returnKeyType="search"
        returnKeyLabel="Buscar"
        value={search}
        onChangeText={setSearch}
        blurOnSubmit={false}
        onSubmitEditing={(e) => {
          if (!search) return;
          Keyboard.dismiss();
          fetchRecipes();
        }}
      />
      <RecipesList
        refreshing={isLoading}
        data={isLoading ? [] : recipes}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: "space-between" }}
        renderItem={({ item }) => <RecipeCard recipe={item} />}
      />
    </Container>
  );
}
