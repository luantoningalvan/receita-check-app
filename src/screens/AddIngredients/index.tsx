import React from "react";
import { MagnifyingGlass } from "phosphor-react-native";
import { Modal, TouchableWithoutFeedback } from "react-native";
import { theme } from "../../styles/theme";
import {
  AddIngredientsContainer,
  Backdrop,
  SearchArea,
  SearchInput,
  IngredientsList,
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
  const [search, setSearch] = React.useState("");

  const fetchIngredients = React.useCallback(async () => {
    const result = await api.get("ingredients");
    setIngredients(result.data);
  }, []);

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

  const ingredientsWithoutAlreadyIncluded = React.useMemo(() => {
    const ingredientsIds = currentIngredients.map(({ id }) => id);
    return ingredients.filter((item) => {
      if (ingredientsIds.includes(item.id)) {
        return false;
      }

      if (
        search &&
        !item.description
          .toLocaleLowerCase()
          .includes(search.toLocaleLowerCase())
      ) {
        return false;
      }

      return true;
    });
  }, [currentIngredients, ingredients, search]);

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
            value={search}
            onChangeText={setSearch}
          />
        </SearchArea>

        <IngredientsList
          data={ingredientsWithoutAlreadyIncluded}
          keyExtractor={(item) => String(item.id)}
          renderItem={renderItem}
          keyboardShouldPersistTaps="handled"
        />
      </AddIngredientsContainer>
    </Modal>
  );
}
