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
} from "./styles";
import { INGRENDIENTS } from "../../assets/ingredients";
import { AddIngredients } from "../AddIngredients";
import { RectButton } from "react-native-gesture-handler";
import { theme } from "../../styles/theme";

export function Ingredients() {
  const [showAddIngredients, setShowAddIngredients] = React.useState(false);

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
          data={INGRENDIENTS}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => (
            <ListItem>
              <ListItemIcon source={item.image} />
              <ListItemText>{item.name}</ListItemText>
              <RectButton>
                <MinusCircle color={theme.orange} size={32} />
              </RectButton>
            </ListItem>
          )}
        />
      </Paper>
    </Container>
  );
}
