import styled from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";
import { SafeAreaView } from "react-native-safe-area-context";
import { FlatListProps } from "react-native";
import { FlatList } from "react-native";
import { Recipe } from "../../common/interfaces/Recipe";

export const Container = styled(SafeAreaView)`
  flex: 1;
  padding: 0px 20px;
`;

export const SearchInput = styled.TextInput`
  width: 100%;
  height: 56px;
  border-bottom-width: 1px;
  border-bottom-color: ${({ theme }) => theme.border};
`;

export const RecipesList = styled(
  FlatList as new (props: FlatListProps<Recipe>) => FlatList<Recipe>
).attrs({
  showsVerticalScrollIndicator: false,
})`
  background: #fff;
`;
