import styled from "styled-components/native";
import { LinearGradient } from "expo-linear-gradient";
import { RFValue } from "react-native-responsive-fontsize";
import { FlatList, FlatListProps } from "react-native";
import { RectButton } from "react-native-gesture-handler";

export const Container = styled.View`
  flex: 1;
  background: ${({ theme }) => theme.bg};
`;

export const HeaderBanner = styled.ImageBackground`
  width: 100%;
  height: 250px;
`;

export const Gradient = styled(LinearGradient)`
  width: 100%;
  height: 250px;
  position: absolute;
`;

export const Paper = styled.View`
  background: #fff;
  flex: 1;
  border-top-left-radius: 16px;
  border-top-right-radius: 16px;
  margin-top: -16px;
  padding: ${RFValue(20)}px;
`;

export const Title = styled.Text`
  font-size: ${RFValue(20)}px;
  font-weight: 500;
`;

export const RecipeInfos = styled.View`
  flex-direction: row;
  align-items: center;
  margin: 20px 0;
`;

export const Info = styled.View`
  flex-direction: row;
  align-items: center;
  margin-right: 16px;
`;

export const RecipeCheck = styled.View<{ state: boolean }>`
  width: 28px;
  height: 28px;
  background: ${({ state }) => (state ? "#3bc651" : "#D8A729")};
  border-radius: 14px;
  align-items: center;
  justify-content: center;
`;

export const IngredientsList = styled(
  FlatList as new (props: FlatListProps<string>) => FlatList<string>
).attrs({
  showsVerticalScrollIndicator: false,
})`
  margin-top: 12px;
`;

export const FloatingCounter = styled.View`
  position: absolute;
  bottom: 20px;
  right: 20px;
  z-index: 4;
`;
