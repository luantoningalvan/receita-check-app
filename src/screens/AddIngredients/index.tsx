import { MagnifyingGlass, PlusCircle } from "phosphor-react-native";
import { Modal } from "react-native";
import { INGRENDIENTS } from "../../assets/ingredients";
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

interface AddIngredientsProps {
  visible: boolean;
  onRequestClose: () => void;
}

export function AddIngredients(props: AddIngredientsProps) {
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
          data={INGRENDIENTS}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => (
            <ListItem>
              <ListItemIcon source={item.image} />
              <ListItemText>{item.name}</ListItemText>
              <AddIngredientButton>
                <PlusCircle color={theme.orange} size={32} />
              </AddIngredientButton>
            </ListItem>
          )}
        />
      </AddIngredientsContainer>
    </Modal>
  );
}
