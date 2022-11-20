import React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { MagnifyingGlass, X } from "phosphor-react-native";
import { Alert, Keyboard } from "react-native";
import { Ingredient } from "../../common/interfaces/Ingredient";
import { RecipeCard } from "../../components/RecipeCard";
import { api } from "../../services/api";
import {
  Container,
  SearchInput,
  RecipesList,
  SearchArea,
  EmptyList,
  EmptyListTitle,
} from "./styles";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Recipe } from "../../common/interfaces/Recipe";

export function SearchRecipes() {
  const [recipes, setRecipes] = React.useState<Recipe[] | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [search, setSearch] = React.useState("");
  const [inputFocus, setInputFocus] = React.useState(false);

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
      <SearchArea>
        <MagnifyingGlass color="#878787" />

        <SearchInput
          placeholder="Buscar por receitas"
          returnKeyType="search"
          returnKeyLabel="Buscar"
          value={search}
          onChangeText={setSearch}
          onBlur={() => setInputFocus(false)}
          onFocus={() => setInputFocus(true)}
          autoFocus
          blurOnSubmit={false}
          removeClippedSubviews={false}
          onSubmitEditing={(e) => {
            if (!search) return;
            Keyboard.dismiss();
            fetchRecipes();
          }}
        />

        {inputFocus && search && (
          <TouchableOpacity onPress={() => setSearch("")}>
            <X color="#878787" />
          </TouchableOpacity>
        )}
      </SearchArea>

      <RecipesList
        refreshing={isLoading}
        data={recipes || []}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: "space-between" }}
        renderItem={({ item }) => <RecipeCard recipe={item} />}
        ListEmptyComponent={
          recipes !== null ? (
            <EmptyList>
              <EmptyListTitle>
                Não encontramos nenhuma receita que somente utilize os
                ingredientes que você possui para a sua busca 😔
              </EmptyListTitle>
            </EmptyList>
          ) : undefined
        }
      />
    </Container>
  );
}
