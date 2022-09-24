import React from "react";
import { Text, StatusBar, View } from "react-native";
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
import {
  Check,
  Clock,
  UsersThree,
  CaretLeft,
  BookmarkSimple,
  X,
  ThumbsUp,
  ThumbsDown,
} from "phosphor-react-native";
import { Tabs } from "../../components/Tabs";
import { Checkbox } from "../../components/Checkbox";
import { useState } from "react";
import CircularProgress from "react-native-circular-progress-indicator";
import { theme } from "../../styles/theme";
import { IconButton } from "../../components/IconButton";
import { SaveRecipeButton } from "../../components/SaveRecipeButton";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ingredient } from "../../common/interfaces/Ingredient";

export function ViewRecipe(props: any) {
  const recipe: Recipe = props.route.params.recipe;
  const [ingredientsDone, setIngredientsDone] = useState<string[]>([]);
  const [stepsDone, setStepsDone] = useState<string[]>([]);
  const [activeTab, setActiveTab] = React.useState("ingredients");
  const [candDoIt, setCanDoIt] = React.useState(false);

  function handleIngredientDone(ingredient: string) {
    setIngredientsDone((state) => {
      if (state.includes(ingredient)) {
        return state.filter((ig) => ig !== ingredient);
      } else {
        return [...state, ingredient];
      }
    });
  }

  function handleStepDone(ingredient: string) {
    setStepsDone((state) => {
      if (state.includes(ingredient)) {
        return state.filter((ig) => ig !== ingredient);
      } else {
        return [...state, ingredient];
      }
    });
  }

  React.useEffect(() => {
    const fetchIngredients = AsyncStorage.getItem("ingredients").then(
      (result) => {
        if (result) {
          const parseIngredients = JSON.parse(result).map(
            (item: Ingredient) => item.id
          );

          setCanDoIt(
            recipe.ingredientsRef.every((elem) =>
              parseIngredients.includes(elem)
            )
          );
        } else {
          setCanDoIt(false);
        }
      }
    );
  }, []);

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
        <View
          style={{
            justifyContent: "space-between",
            flexDirection: "row",
            zIndex: 1,
            marginTop: 40,
            marginHorizontal: 20,
          }}
        >
          <IconButton onPress={props.navigation.goBack} icon={CaretLeft} />
          <SaveRecipeButton recipe={recipe} />
        </View>
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

          <RecipeCheck state={candDoIt}>
            {candDoIt ? (
              <ThumbsUp color="#fff" size={22} />
            ) : (
              <ThumbsDown color="#fff" size={22} />
            )}
          </RecipeCheck>
        </RecipeInfos>

        <Tabs
          activeTab={activeTab}
          onChange={(tab) => setActiveTab(tab)}
          tabs={[
            { label: "Ingredientes", value: "ingredients" },
            { label: "Modo de preparo", value: "steps" },
          ]}
        />

        {activeTab === "ingredients" && (
          <>
            <IngredientsList
              data={recipe.ingredients}
              renderItem={({ item }) => (
                <Checkbox
                  label={item}
                  key={item}
                  checked={ingredientsDone.includes(item)}
                  onChange={() => handleIngredientDone(item)}
                />
              )}
            />
            <FloatingCounter>
              <CircularProgress
                maxValue={recipe.ingredients.length}
                value={ingredientsDone.length}
                radius={35}
                activeStrokeColor={theme.orange}
                inActiveStrokeColor={theme.orangeLight}
                rotation={180}
                duration={150}
                progressFormatter={() => {
                  "worklet";

                  return `${ingredientsDone.length}/${recipe.ingredients.length}`;
                }}
              />
            </FloatingCounter>
          </>
        )}

        {activeTab === "steps" && (
          <>
            <IngredientsList
              data={recipe.steps}
              renderItem={({ item, index }) => (
                <Checkbox
                  label={`${index + 1}. ${item}`}
                  key={item}
                  checked={stepsDone.includes(item)}
                  onChange={() => handleStepDone(item)}
                />
              )}
            />
            <FloatingCounter>
              <CircularProgress
                maxValue={recipe.steps.length}
                value={stepsDone.length}
                radius={35}
                activeStrokeColor={theme.orange}
                inActiveStrokeColor={theme.orangeLight}
                rotation={180}
                duration={150}
                progressFormatter={() => {
                  "worklet";

                  return `${stepsDone.length}/${recipe.steps.length}`;
                }}
              />
            </FloatingCounter>
          </>
        )}
      </Paper>
    </Container>
  );
}
