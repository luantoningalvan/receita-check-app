import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Recipes } from "../screens/Recipes";
import { ForkKnife, ListChecks, BookmarkSimple } from "phosphor-react-native";
import { theme } from "../styles/theme";
import { TabIcon } from "../components/TabBarIcon";
import { Saved } from "../screens/Saved";
import { Ingredients } from "../screens/Ingredients";
import { ViewRecipe } from "../screens/ViewRecipe";
import { Platform } from "react-native";
import { Category } from "../screens/Category";
import { SearchRecipes } from "../screens/SearchRecipes";

const BottomTabNavigator = createBottomTabNavigator();

const RecipesNavigator = createNativeStackNavigator();

function RootRoutes() {
  return (
    <BottomTabNavigator.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: theme.orange,
        tabBarStyle: {
          height: Platform.OS === "ios" ? 80 : 64,
          backgroundColor: theme.orangeLight,
          elevation: 0,
          borderTopWidth: 0,
        },
      }}
    >
      <BottomTabNavigator.Screen
        name="Recipes"
        component={Recipes}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon icon={ForkKnife} focused={focused} />
          ),
        }}
      />
      <BottomTabNavigator.Screen
        name="Ingredients"
        component={Ingredients}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon icon={ListChecks} focused={focused} />
          ),
        }}
      />
      <BottomTabNavigator.Screen
        name="Favorites"
        component={Saved}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon icon={BookmarkSimple} focused={focused} />
          ),
        }}
      />
    </BottomTabNavigator.Navigator>
  );
}

export function AppRoutes() {
  return (
    <NavigationContainer>
      <RecipesNavigator.Navigator screenOptions={{ headerShown: false }}>
        <RecipesNavigator.Screen name="Root" component={RootRoutes} />
        <RecipesNavigator.Screen name="ViewRecipe" component={ViewRecipe} />
        <RecipesNavigator.Screen name="Category" component={Category} />
        <RecipesNavigator.Screen name="Search" component={SearchRecipes} />
      </RecipesNavigator.Navigator>
    </NavigationContainer>
  );
}
