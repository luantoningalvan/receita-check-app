import styled from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";

export const Container = styled.TouchableOpacity`
  margin: 12px 0px;
  width: 47%;
`;

export const Cover = styled.Image`
  width: 100%;
  height: ${RFValue(140)}px;
  border-radius: 8px;
`;

export const Title = styled.Text`
  font-size: ${RFValue(14)}px;
  margin-top: 12px;
`;
