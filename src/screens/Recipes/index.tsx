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
  Loading,
  LoadingText,
} from "./styles";
import { MagnifyingGlass, Microphone } from "phosphor-react-native";
import { ActivityIndicator, Alert, Text, View } from "react-native";
import { RecipeCard } from "../../components/RecipeCard";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ingredient } from "../../common/interfaces/Ingredient";
import { useFocusEffect } from "@react-navigation/native";
import { theme } from "../../styles/theme";

export function Recipes() {
  const [recipes, setRecipes] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [emptyList, setEmptyList] = React.useState(false);

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
          const formatToParam = decodeIngredients
            .map((item) => item.id)
            .join(",");
          const result = await axios.get("http://192.168.0.103:3000/recipes", {
            params: { i: formatToParam },
          });
          setRecipes(result.data);
        } else {
          setRecipes([]);
          setEmptyList(true);
        }
      }
    } catch (error) {
      Alert.alert("Houve um erro ao tentar comunicar nossos servidores");
    }

    setIsLoading(false);
  }

  useFocusEffect(
    React.useCallback(() => {
      fetchRecipes();
    }, [])
  );

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

            {isLoading && (
              <Loading>
                <ActivityIndicator size={48} color={theme.orange} />
                <LoadingText>
                  Buscando receitas com{"\n"}os seus ingredientes
                </LoadingText>
              </Loading>
            )}
          </>
        }
        refreshing={isLoading}
        data={isLoading ? [] : recipes}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: "space-between" }}
        renderItem={({ item }) => <RecipeCard recipe={item} />}
        ListEmptyComponent={
          <>
            {emptyList && !isLoading && (
              <LoadingText>
                Preencha a lista de ingredientes para que possamos encontrar
                receitas para você.
              </LoadingText>
            )}
          </>
        }
      />
    </Container>
  );
}
