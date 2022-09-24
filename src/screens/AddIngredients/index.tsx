import React from "react";
import { MagnifyingGlass, PlusCircle } from "phosphor-react-native";
import { Modal } from "react-native";
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
import axios from "axios";
import { Ingredient } from "../../common/interfaces/Ingredient";

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
    const result = await axios.get("http://192.168.0.103:3000/ingredients");
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
      <Backdrop />
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
              <ListItemIcon source={{ uri: item.image }} />
              <ListItemText>{item.name}</ListItemText>
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
