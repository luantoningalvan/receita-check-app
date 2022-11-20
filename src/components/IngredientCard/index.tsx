import { MinusCircle, PlusCircle } from "phosphor-react-native";
import { memo } from "react";
import { TouchableOpacity } from "react-native";
import { Ingredient } from "../../common/interfaces/Ingredient";
import { theme } from "../../styles/theme";
import { ListItem, ListItemIcon, ListItemText } from "./styles";

interface IngredientCardProps {
  item: Ingredient;
  onPress: (item: Ingredient) => void;
  type: "add" | "remove";
}

export function IngredientCardComponent({
  item,
  onPress,
  type,
}: IngredientCardProps) {
  return (
    <ListItem>
      <ListItemIcon source={{ uri: item.image_url }} />
      <ListItemText>{item.description}</ListItemText>

      <TouchableOpacity onPress={() => onPress(item)}>
        {type == "add" ? (
          <PlusCircle color={theme.orange} size={32} />
        ) : (
          <MinusCircle color={theme.orange} size={32} />
        )}
      </TouchableOpacity>
    </ListItem>
  );
}

function comparision(prev: IngredientCardProps, curr: IngredientCardProps) {
  return prev.item.id === curr.item.id;
}

export const IngredientCard = memo(IngredientCardComponent, comparision);
