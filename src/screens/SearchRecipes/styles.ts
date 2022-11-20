import styled from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";
import { FlatListProps, FlatList } from "react-native";
import { Recipe } from "../../common/interfaces/Recipe";
import { SafeAreaView } from "react-native-safe-area-context";

export const Container = styled(SafeAreaView)`
  flex: 1;
`;

export const SearchArea = styled.View`
  background: #fff;
  height: ${RFValue(44)}px;
  border-radius: ${RFValue(22)}px;
  padding: 8px 16px;
  flex-direction: row;
  align-items: center;
  margin: 16px 20px 8px 20px;
`;

export const SearchInput = styled.TextInput`
  flex: 1;
  margin: 0px 16px;
  font-size: ${RFValue(14)}px;
  color: #000;
`;

export const RecipesList = styled(
  FlatList as new (props: FlatListProps<Recipe>) => FlatList<Recipe>
).attrs({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: {
    paddingHorizontal: 20,
  },
})`
  flex: 1;
`;

export const EmptyList = styled.View`
  padding: 32px;
  justify-content: center;
  align-items: center;
  flex: 1;
`;

export const EmptyListTitle = styled.Text`
  font-size: ${RFValue(14)}px;
  line-height: ${RFValue(20)}px;
  text-align: center;
`;
