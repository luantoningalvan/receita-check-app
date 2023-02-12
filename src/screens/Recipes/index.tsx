import React from "react";
import {
  Container,
  Grettings,
  SearchArea,
  SearchInput,
  CategoriesList,
  CategoryListItem,
  CategoryListItemText,
  RecipesList,
  Loading,
  LoadingText,
  EmptyIngredientsListMessage,
  EmptyIngredientsList,
} from "./styles";
import { CaretRight, MagnifyingGlass } from "phosphor-react-native";
import { ActivityIndicator, Alert, View } from "react-native";
import { RecipeCard } from "../../components/RecipeCard";
import { Ingredient } from "../../common/interfaces/Ingredient";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { theme } from "../../styles/theme";
import { api } from "../../services/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Lottie from "lottie-react-native";
import cookingAnimation from "../../assets/animations/cooking.json";
import { Button, ButtonText } from "../Ingredients/styles";

export function Recipes() {
  const [recipes, setRecipes] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [emptyIngredientsList, setEmptyIngredientsList] = React.useState(false);
  const navigation = useNavigation();

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
          const result = await api.post("recipes/list", {
            ingredients: ingredientsId,
          });
          setRecipes(result.data);
        } else {
          setEmptyIngredientsList(true);
          setRecipes([]);
        }
      } else {
        setEmptyIngredientsList(true);
        setRecipes([]);
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
      {!emptyIngredientsList ? (
        <RecipesList
          ListHeaderComponent={
            <>
              <Grettings>Confira o que você pode cozinhar hoje!</Grettings>

              <SearchArea onPress={() => navigation.navigate("Search")}>
                <MagnifyingGlass color="#878787" />

                <SearchInput>Buscar receita</SearchInput>
              </SearchArea>

              <View>
                <CategoriesList
                  data={["Salgados", "Veganos", "Massas", "Doces", "Saladas"]}
                  keyExtractor={(v: string) => v}
                  renderItem={({ item }) => (
                    <CategoryListItem
                      onPress={() =>
                        navigation.navigate("Category", { category: item })
                      }
                    >
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
            !isLoading ? (
              <LoadingText>
                Não encontramos nenhuma receita que somente use os seus
                ingredientes 😔
              </LoadingText>
            ) : undefined
          }
        />
      ) : (
        <EmptyIngredientsList>
          <Lottie
            source={cookingAnimation}
            autoPlay
            loop
            style={{ height: 160 }}
          />
          <EmptyIngredientsListMessage>
            Pronto para fazer uma receita maravilhosa? Basta montar uma lista
            com todos ingredientes que você possui em casa e nós iremos mostrar
            receitas que só utilizam eles.
          </EmptyIngredientsListMessage>
          <Button onPress={() => navigation.navigate("Ingredients")}>
            <CaretRight color="#fff" />
            <ButtonText>Montar lista</ButtonText>
          </Button>
        </EmptyIngredientsList>
      )}
    </Container>
  );
}
