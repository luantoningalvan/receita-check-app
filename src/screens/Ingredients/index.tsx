import React from "react";
import { MinusCircle, Plus } from "phosphor-react-native";
import {
  Container,
  Header,
  Title,
  ButtonText,
  Button,
  Paper,
  IngredientsList,
  ListItem,
  ListItemText,
  ListItemIcon,
  EmptyList,
  EmptyListTitle,
} from "./styles";
import { AddIngredients } from "../AddIngredients";
import { theme } from "../../styles/theme";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import { TouchableOpacity } from "react-native";
import { Ingredient } from "../../common/interfaces/Ingredient";

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

  const handleRemove = React.useCallback(
    async (item: Ingredient) => {
      const newList = ingredients.filter(
        (ingredient) => ingredient.id !== item.id
      );
      setIngredients(newList);
      await AsyncStorage.setItem("ingredients", JSON.stringify(newList));
    },
    [ingredients]
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
          renderItem={({ item }) => (
            <ListItem>
              <ListItemIcon source={{ uri: item.image }} />
              <ListItemText>{item.name}</ListItemText>
              <TouchableOpacity onPress={() => handleRemove(item)}>
                <MinusCircle color={theme.orange} size={32} />
              </TouchableOpacity>
            </ListItem>
          )}
        />
      </Paper>
    </Container>
  );
}
