import React from "react";
import { Text, StatusBar } from "react-native";
import {
  Container,
  HeaderBanner,
  Paper,
  Title,
  Gradient,
  RecipeInfos,
  Info,
  RecipeCheck,
  IngredientsList,
  FloatingCounter,
} from "./styles";
import { Recipe } from "../../common/interfaces/Recipe";
import { Check, Clock, UsersThree } from "phosphor-react-native";
import { Tabs } from "../../components/Tabs";
import { Checkbox } from "../../components/Checkbox";
import { useState } from "react";
import CircularProgress from "react-native-circular-progress-indicator";
import { theme } from "../../styles/theme";

export function ViewRecipe(props: any) {
  const recipe: Recipe = props.route.params.recipe;
  const [done, setDone] = useState<string[]>([]);

  function handleDone(ingredient: string) {
    setDone((state) => {
      if (state.includes(ingredient)) {
        return state.filter((ig) => ig !== ingredient);
      } else {
        return [...state, ingredient];
      }
    });
  }

  return (
    <Container>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="light-content"
      />
      <HeaderBanner
        source={{
          uri: recipe.imageUrl,
        }}
      >
        <Gradient colors={["rgba(0,0,0,0.6)", "rgba(0,0,0,0)"]} />
      </HeaderBanner>
      <Paper>
        <Title>{recipe.title}</Title>

        <RecipeInfos>
          <Info>
            <Clock size={24} />
            <Text style={{ marginLeft: 8 }}>{`${recipe.time} min`}</Text>
          </Info>

          <Info style={{ flex: 1 }}>
            <UsersThree size={24} />
            <Text
              style={{ marginLeft: 8 }}
            >{`${recipe.portions} porções`}</Text>
          </Info>

          <RecipeCheck>
            <Check color="#fff" size={22} />
          </RecipeCheck>
        </RecipeInfos>

        <FloatingCounter>
          <CircularProgress
            maxValue={recipe.ingredients.length}
            value={done.length}
            radius={35}
            activeStrokeColor={theme.orange}
            inActiveStrokeColor={theme.orangeLight}
            rotation={180}
            duration={150}
            progressFormatter={() => {
              "worklet";

              return `${done.length}/${recipe.ingredients.length}`;
            }}
          />
        </FloatingCounter>

        <Tabs
          initialActive="ingredients"
          tabs={[
            { label: "Ingredientes", value: "ingredients" },
            { label: "Modo de preparo", value: "steps" },
          ]}
        />

        <IngredientsList
          data={recipe.ingredients}
          renderItem={({ item }) => (
            <Checkbox
              label={item}
              key={item}
              onChange={() => handleDone(item)}
            />
          )}
        />
      </Paper>
    </Container>
  );
}
