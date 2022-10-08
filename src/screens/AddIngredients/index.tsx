import React from "react";
import { MagnifyingGlass, PlusCircle } from "phosphor-react-native";
import { Modal, TouchableWithoutFeedback } from "react-native";
import { theme } from "../../styles/theme";
import {
  AddIngredientsContainer,
  Backdrop,
  SearchArea,
  SearchInput,
  IngredientsList,
  ListItem,
  ListItemIcon,
  ListItemText,
  AddIngredientButton,
} from "./styles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ingredient } from "../../common/interfaces/Ingredient";
import { api } from "../../services/api";

interface AddIngredientsProps {
  visible: boolean;
  onRequestClose: () => void;
}

export function AddIngredients(props: AddIngredientsProps) {
  const [currentIngredients, setCurrentIngredients] = React.useState<
    Ingredient[]
  >([]);
  const [ingredients, setIngredients] = React.useState<Ingredient[]>([]);

  async function fetchIngredients() {
    const result = await api.get("ingredients");
    setIngredients(result.data);
  }

  React.useEffect(() => {
    fetchIngredients();
  }, []);

  React.useEffect(() => {
    AsyncStorage.getItem("ingredients").then((data) => {
      if (data) {
        setCurrentIngredients(JSON.parse(data));
      }
    });
  }, [props.visible]);

  const ingredientsWithoutAlreadyIncluded = React.useMemo(() => {
    const ingredientsIds = currentIngredients.map(({ id }) => id);
    return ingredients.filter((item) => !ingredientsIds.includes(item.id));
  }, [currentIngredients, ingredients]);

  const handleAdd = React.useCallback(
    async (item: Ingredient) => {
      const newList = [...currentIngredients, item];
      setCurrentIngredients(newList);
      await AsyncStorage.setItem("ingredients", JSON.stringify(newList));
    },
    [currentIngredients]
  );

  return (
    <Modal transparent statusBarTranslucent animationType="fade" {...props}>
      <TouchableWithoutFeedback onPress={props.onRequestClose}>
        <Backdrop />
      </TouchableWithoutFeedback>

      <AddIngredientsContainer>
        <SearchArea>
          <MagnifyingGlass color="#878787" />

          <SearchInput
            placeholder="Buscar ingrediente"
            placeholderTextColor="#878787"
            selectionColor={theme.orange}
          />
        </SearchArea>

        <IngredientsList
          data={ingredientsWithoutAlreadyIncluded}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => (
            <ListItem>
              <ListItemIcon source={{ uri: item.image_url }} />
              <ListItemText>{item.description}</ListItemText>
              <AddIngredientButton onPress={() => handleAdd(item)}>
                <PlusCircle color={theme.orange} size={32} />
              </AddIngredientButton>
            </ListItem>
          )}
        />
      </AddIngredientsContainer>
    </Modal>
  );
}
