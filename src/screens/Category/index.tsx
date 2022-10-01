import React from "react";
import {
  Container,
  RecipesList,
  Loading,
  LoadingText,
  BackButton,
  CategoryTitle,
  Header,
} from "./styles";
import { ActivityIndicator, Alert } from "react-native";
import { RecipeCard } from "../../components/RecipeCard";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ingredient } from "../../common/interfaces/Ingredient";
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { theme } from "../../styles/theme";
import { CaretLeft } from "phosphor-react-native";

export function Category() {
  const [recipes, setRecipes] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [emptyList, setEmptyList] = React.useState(false);

  const route = useRoute();
  const navigation = useNavigation();
  const params = route.params as { category: string };

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
          const result = await axios.get(
            "https://web-lsr5.vercel.app/api/recipes",
            {
              params: { i: formatToParam },
            }
          );
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
      <Header>
        <BackButton onPress={navigation.goBack}>
          <CaretLeft />
        </BackButton>
        <CategoryTitle>{params.category}</CategoryTitle>
      </Header>

      {isLoading && (
        <Loading>
          <ActivityIndicator size={48} color={theme.orange} />
          <LoadingText>
            Buscando receitas com{"\n"}os seus ingredientes
          </LoadingText>
        </Loading>
      )}
      <RecipesList
        refreshing={isLoading}
        data={isLoading ? [] : recipes}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: "space-between" }}
        renderItem={({ item }) => <RecipeCard recipe={item} />}
        contentContainerStyle={{ padding: 20 }}
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
