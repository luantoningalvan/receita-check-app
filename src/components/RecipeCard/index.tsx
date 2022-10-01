import React from "react";
import { useNavigation } from "@react-navigation/native";
import { Container, CoverContainer, Cover, Title, BlurCover } from "./styles";
import { Recipe } from "../../common/interfaces/Recipe";
import { Animated } from "react-native";
import { Blurhash } from "react-native-blurhash";

interface RecipeCardProps {
  recipe: Recipe;
}

export function RecipeCard({ recipe }: RecipeCardProps) {
  const navigation = useNavigation<any>();
  const fadeAnim = React.useRef(new Animated.Value(1)).current;

  function onLoad() {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }

  return (
    <Container onPress={() => navigation.navigate("ViewRecipe", { recipe })}>
      <CoverContainer>
        <BlurCover style={{ opacity: fadeAnim }}>
          <Blurhash
            blurhash="LGFFaXYk^6#M@-5c,1J5@[or[Q6."
            style={{ flex: 1 }}
          />
        </BlurCover>
        <Cover
          source={{
            uri: recipe.imageUrl,
          }}
          onLoad={onLoad}
        />
      </CoverContainer>
      <Title>{recipe.title}</Title>
    </Container>
  );
}
