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

export const Grettings = styled.Text`
  font-size: ${RFValue(20)}px;
  margin-top: 24px;
  font-weight: 500;
  max-width: 300px;
`;

export const SearchArea = styled.TouchableOpacity`
  background: #fff;
  height: ${RFValue(44)}px;
  border-radius: ${RFValue(22)}px;
  padding: 8px 16px;
  flex-direction: row;
  align-items: center;
  margin: ${RFValue(20)}px 0px;
`;

export const SearchInput = styled.Text`
  flex: 1;
  margin: 0px 16px;
  font-size: ${RFValue(14)}px;
  color: #878787;
`;

export const VoiceSeachButton = styled.TouchableOpacity``;

export const CategoriesList = styled(
  FlatList as new (props: FlatListProps<string>) => FlatList<string>
).attrs({
  showsHorizontalScrollIndicator: false,
})`
  margin-bottom: 12px;
`;

export const CategoryListItem = styled.TouchableOpacity`
  background-color: ${({ theme }) => theme.orangeLight};
  padding: 8px 16px;
  margin-right: 8px;
  border-radius: 999px;
`;

export const CategoryListItemText = styled.Text`
  color: ${({ theme }) => theme.orange};
  font-size: ${RFValue(15)}px;
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
  padding: 32px;
  line-height: 24px;
  font-size: ${RFValue(14)}px;
  margin-top: 16px;
`;
