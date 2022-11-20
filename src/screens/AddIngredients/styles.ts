import styled from "styled-components/native";
import { FlatList, FlatListProps } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { Ingredient } from "../../common/interfaces/Ingredient";

export const Backdrop = styled.View`
  background: rgba(0, 0, 0, 0.5);
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

export const AddIngredientsContainer = styled.View`
  background: #fff;
  border-top-left-radius: 16px;
  border-top-right-radius: 16px;
  height: 80%;
  top: 20%;
`;

export const SearchArea = styled.View`
  background: #f6f6f6;
  height: ${RFValue(44)}px;
  border-radius: ${RFValue(22)}px;
  padding: 8px 16px;
  flex-direction: row;
  align-items: center;
  margin: ${RFValue(20)}px;
`;

export const SearchInput = styled.TextInput`
  flex: 1;
  margin: 0px 16px;
  font-size: ${RFValue(14)}px;
`;

export const IngredientsList = styled(
  FlatList as new (props: FlatListProps<Ingredient>) => FlatList<Ingredient>
).attrs({
  showsVerticalScrollIndicator: false,
})``;
