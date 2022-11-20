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
import { IngredientCard } from "../../components/IngredientCard";

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

  const handleAdd = React.useCallback(async (item: Ingredient) => {
    let newList;

    setCurrentIngredients((state) => {
      newList = [...state, item];
      return newList;
    });

    await AsyncStorage.setItem("ingredients", JSON.stringify(newList));
  }, []);

  const renderItem = React.useCallback(
    ({ item }: { item: Ingredient }) => (
      <IngredientCard item={item} onPress={handleAdd} type="add" />
    ),
    []
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
          renderItem={renderItem}
        />
      </AddIngredientsContainer>
    </Modal>
  );
}
