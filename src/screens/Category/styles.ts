import styled from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";
import { SafeAreaView } from "react-native-safe-area-context";
import { FlatListProps } from "react-native";
import { FlatList } from "react-native";
import { Recipe } from "../../common/interfaces/Recipe";
import { RectButton } from "react-native-gesture-handler";

export const Container = styled(SafeAreaView)`
  flex: 1;
  background: ${({ theme }) => theme.bg};
`;

export const RecipesList = styled(
  FlatList as new (props: FlatListProps<Recipe>) => FlatList<Recipe>
).attrs({
  showsVerticalScrollIndicator: false,
})``;

export const Loading = styled.View`
  justify-content: center;
  align-items: center;
  padding: 32px;
`;

export const LoadingText = styled.Text`
  text-align: center;
  font-size: ${RFValue(14)}px;
  margin-top: 16px;
`;

export const Header = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 12px;
  margin-top: 8px;
  padding: 0px 20px;
`;

export const BackButton = styled(RectButton)`
  padding: 8px;
  margin: -8px;
  border-radius: 999px;
`;

export const CategoryTitle = styled.Text`
  font-size: 18px;
  margin-left: 16px;
`;
