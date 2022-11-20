import styled from "styled-components/native";
import { LinearGradient } from "expo-linear-gradient";
import { RFValue } from "react-native-responsive-fontsize";
import { BottomSheetFlatList } from "@gorhom/bottom-sheet";

export const Container = styled.View`
  flex: 1;
  background: ${({ theme }) => theme.bg};
`;

export const HeaderBanner = styled.ImageBackground`
  width: 100%;
  height: 250px;
`;

export const HeaderTop = styled.View`
  justify-content: space-between;
  flex-direction: row;
  margin: 40px 16px 0px 16px;
  position: relative;
`;

export const Gradient = styled(LinearGradient)`
  width: 100%;
  height: 250px;
`;

export const Paper = styled.View`
  background: #fff;
  flex: 1;
  padding: ${RFValue(16)}px;
  padding-top: 8px;
  width: 100%;
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
  height: 28px;
  background: ${({ state }) => (state ? "#3bc651" : "#e33627")};
  border-radius: 14px;
  align-items: center;
  justify-content: center;
  padding: 0px 8px;
  flex-direction: row;
`;

export const RecipeCheckText = styled.Text`
  color: #fff;
  margin-right: 8px;
`;

export const IngredientsList = styled(BottomSheetFlatList).attrs({
  showsVerticalScrollIndicator: false,
})`
  margin-top: 12px;
  width: 100%;
`;

export const FloatingCounter = styled.View`
  position: absolute;
  bottom: 20px;
  right: 20px;
  z-index: 1;
`;

export const SectionTitle = styled.Text`
  font-weight: bold;
  font-size: ${RFValue(16)}px;
  margin-top: 24px;
  margin-bottom: 8px;
`;
