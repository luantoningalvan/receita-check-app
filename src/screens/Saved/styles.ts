import styled from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";
import { SafeAreaView } from "react-native-safe-area-context";
import { FlatListProps } from "react-native";
import { FlatList } from "react-native";
import { Recipe } from "../../common/interfaces/Recipe";

export const Container = styled(SafeAreaView)`
  flex: 1;
  padding: 0px 20px;
  background: ${({ theme }) => theme.bg};
`;

export const Title = styled.Text`
  font-size: ${RFValue(20)}px;
  margin: 20px 0px;
  font-weight: 500;
`;

export const RecipesList = styled(
  FlatList as new (props: FlatListProps<Recipe>) => FlatList<Recipe>
).attrs({
  showsVerticalScrollIndicator: false,
})``;
