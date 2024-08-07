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
  SectionTitle,
  HeaderTop,
  RecipeCheckText,
} from "./styles";
import { Recipe } from "../../common/interfaces/Recipe";
import {
  Clock,
  UsersThree,
  CaretLeft,
  ThumbsUp,
  ThumbsDown,
} from "phosphor-react-native";
import { Tabs } from "../../components/Tabs";
import { Checkbox } from "../../components/Checkbox";
import { useState } from "react";
import { theme } from "../../styles/theme";
import { IconButton } from "../../components/IconButton";
import { SaveRecipeButton } from "../../components/SaveRecipeButton";
import { Ingredient } from "../../common/interfaces/Ingredient";
import CircularProgress from "react-native-circular-progress-indicator";
import AsyncStorage from "@react-native-async-storage/async-storage";
import BottomSheet from "@gorhom/bottom-sheet";

type RecipeWithTotals = Recipe & {
  totalIngredients: number;
  totalSteps: number;
};

export function ViewRecipe(props: any) {
  const [ingredientsDone, setIngredientsDone] = useState<string[]>([]);
  const [stepsDone, setStepsDone] = useState<string[]>([]);
  const [activeTab, setActiveTab] = React.useState("ingredients");
  const [candDoIt, setCanDoIt] = React.useState(false);
  const bottomSheetRef = React.useRef<BottomSheet>(null);

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

  const snapPoints = React.useMemo(() => ["75%", "100%"], []);

  const recipe: RecipeWithTotals = React.useMemo(() => {
    const routeRecipe: Recipe = props.route.params.recipe;

    const totalIngredients = routeRecipe.ingredients.filter(
      (ingredient) => !ingredient.startsWith("#")
    ).length;
    const totalSteps = routeRecipe.preparation_mode.filter(
      (step) => !step.startsWith("#")
    ).length;

    let steps: string[] = [];
    let currentStep = 1;

    routeRecipe.preparation_mode.forEach((value) => {
      if (value.startsWith("#")) {
        steps.push(value);
      } else {
        steps.push(`${currentStep}. ${value}`);
        currentStep += 1;
      }
    });

    return {
      ...routeRecipe,
      preparation_mode: steps,
      totalIngredients,
      totalSteps,
    };
  }, [props.route.params.recipe]);

  React.useEffect(() => {
    AsyncStorage.getItem("ingredients").then((result) => {
      if (result) {
        const parseIngredients = JSON.parse(result).map(
          (item: Ingredient) => item.id
        );

        setCanDoIt(
          recipe.ingredients_ref.every((elem) =>
            parseIngredients.includes(elem)
          )
        );
      } else {
        setCanDoIt(false);
      }
    });
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
          uri: recipe.image_url,
        }}
      >
        <Gradient colors={["rgba(0,0,0,0.6)", "rgba(0,0,0,0)"]}>
          <HeaderTop>
            <IconButton onPress={props.navigation.goBack} icon={CaretLeft} />
            <SaveRecipeButton recipe={recipe} />
          </HeaderTop>
        </Gradient>
      </HeaderBanner>

      {activeTab == "ingredients" ? (
        <FloatingCounter>
          <CircularProgress
            maxValue={recipe.totalIngredients}
            value={ingredientsDone.length}
            radius={35}
            activeStrokeColor={theme.orange}
            inActiveStrokeColor={theme.orangeLight}
            rotation={180}
            duration={150}
            circleBackgroundColor="rgba(255,255,255,0.9)"
            progressFormatter={() => {
              "worklet";

              return `${ingredientsDone.length}/${recipe.totalIngredients}`;
            }}
          />
        </FloatingCounter>
      ) : (
        <FloatingCounter>
          <CircularProgress
            maxValue={recipe.totalSteps}
            value={stepsDone.length}
            radius={35}
            activeStrokeColor={theme.orange}
            inActiveStrokeColor={theme.orangeLight}
            rotation={180}
            duration={150}
            circleBackgroundColor="rgba(255,255,255,0.9)"
            progressFormatter={() => {
              "worklet";

              return `${stepsDone.length}/${recipe.totalSteps}`;
            }}
          />
        </FloatingCounter>
      )}

      <BottomSheet
        ref={bottomSheetRef}
        index={0}
        snapPoints={snapPoints}
        style={{ zIndex: 4 }}
      >
        <Paper>
          <Title>{recipe.title}</Title>

          <RecipeInfos>
            <Info>
              <Clock size={24} />
              <Text
                style={{ marginLeft: 8 }}
              >{`${recipe.preparation_time} min`}</Text>
            </Info>

            <Info style={{ flex: 1 }}>
              <UsersThree size={24} />
              <Text
                style={{ marginLeft: 8 }}
              >{`${recipe.how_many_people} porções`}</Text>
            </Info>

            <RecipeCheck state={candDoIt}>
              {candDoIt ? (
                <>
                  <RecipeCheckText>Tenho tudo?</RecipeCheckText>
                  <ThumbsUp color="#fff" />
                </>
              ) : (
                <>
                  <RecipeCheckText>Tenho tudo?</RecipeCheckText>
                  <ThumbsDown color="#fff" />
                </>
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
            <IngredientsList
              data={recipe.ingredients}
              renderItem={({ item }: any) => (
                <>
                  {item.startsWith("#") ? (
                    <SectionTitle>{item.replace("#", "")}</SectionTitle>
                  ) : (
                    <Checkbox
                      label={item}
                      key={item}
                      checked={ingredientsDone.includes(item)}
                      onChange={() => handleIngredientDone(item)}
                    />
                  )}
                </>
              )}
            />
          )}

          {activeTab === "steps" && (
            <IngredientsList
              data={recipe.preparation_mode}
              renderItem={({ item }: any) => (
                <>
                  {item.startsWith("#") ? (
                    <SectionTitle>{item.replace("#", "")}</SectionTitle>
                  ) : (
                    <Checkbox
                      label={item}
                      key={item}
                      checked={stepsDone.includes(item)}
                      onChange={() => handleStepDone(item)}
                    />
                  )}
                </>
              )}
            />
          )}
        </Paper>
      </BottomSheet>
    </Container>
  );
}
