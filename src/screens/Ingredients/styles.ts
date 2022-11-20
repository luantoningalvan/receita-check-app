import styled from "styled-components/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { RFValue } from "react-native-responsive-fontsize";
import { FlatListProps } from "react-native";
import { FlatList } from "react-native";
import { Ingredient } from "../../common/interfaces/Ingredient";

export const Container = styled(SafeAreaView)`
  flex: 1;
  background: ${({ theme }) => theme.bg};
`;

export const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
  padding: 0px 20px;
`;

export const Title = styled.Text`
  font-size: ${RFValue(20)}px;
  font-weight: 500;
`;

export const Button = styled.TouchableOpacity`
  background: ${({ theme }) => theme.orange};
  border-radius: 24px;
  padding: 12px 20px;
  flex-direction: row;
  align-items: center;
`;

export const ButtonText = styled.Text`
  margin-left: 8px;
  color: #fff;
  font-size: ${RFValue(14)}px;
`;

export const Paper = styled.View`
  flex: 1;
  background: #fff;
  border-top-right-radius: 16px;
  border-top-left-radius: 16px;
  margin-top: 20px;
`;

export const IngredientsList = styled(
  FlatList as new (props: FlatListProps<Ingredient>) => FlatList<Ingredient>
).attrs({
  showsVerticalScrollIndicator: false,
})``;

export const EmptyList = styled.View`
  padding: 32px;
  justify-content: center;
  align-items: center;
`;

export const EmptyListTitle = styled.Text`
  font-size: ${RFValue(14)}px;
  font-weight: bold;
  text-align: center;
`;
