import React from "react";
import { Plus } from "phosphor-react-native";
import {
  Container,
  Header,
  Title,
  ButtonText,
  Button,
  Paper,
  IngredientsList,
  EmptyList,
  EmptyListTitle,
} from "./styles";
import { AddIngredients } from "../AddIngredients";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import { Ingredient } from "../../common/interfaces/Ingredient";
import { IngredientCard } from "../../components/IngredientCard";

export function Ingredients() {
  const [showAddIngredients, setShowAddIngredients] = React.useState(false);
  const [ingredients, setIngredients] = React.useState<Ingredient[]>([]);

  useFocusEffect(
    React.useCallback(() => {
      AsyncStorage.getItem("ingredients").then((data) => {
        if (data) {
          setIngredients(JSON.parse(data));
        }
      });
    }, [showAddIngredients])
  );

  const handleRemove = React.useCallback(async (item: Ingredient) => {
    let newList;

    setIngredients((state) => {
      newList = state.filter((ingredient) => ingredient.id !== item.id);
      return newList;
    });

    await AsyncStorage.setItem("ingredients", JSON.stringify(newList));
  }, []);

  const renderItem = React.useCallback(
    ({ item }: { item: Ingredient }) => (
      <IngredientCard onPress={handleRemove} item={item} type="remove" />
    ),
    []
  );

  return (
    <Container>
      <AddIngredients
        visible={showAddIngredients}
        onRequestClose={() => setShowAddIngredients(false)}
      />
      <Header>
        <Title>Ingredientes</Title>
        <Button onPress={() => setShowAddIngredients(true)}>
          <Plus size={22} color="#fff" />
          <ButtonText>Incluir</ButtonText>
        </Button>
      </Header>

      <Paper>
        <IngredientsList
          data={ingredients}
          keyExtractor={(item) => String(item.id)}
          ListEmptyComponent={
            <EmptyList>
              <EmptyListTitle>
                Você não incluiu nenhum igrediente ainda
              </EmptyListTitle>
            </EmptyList>
          }
          renderItem={renderItem}
        />
      </Paper>
    </Container>
  );
}
