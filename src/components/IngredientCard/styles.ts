import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

export const ListItem = styled.View`
  padding: 12px 28px;
  flex-direction: row;
  align-items: center;
`;

export const ListItemIcon = styled.Image`
  width: 28px;
  height: 28px;
`;

export const ListItemText = styled.Text`
  margin-left: 12px;
  font-size: ${RFValue(15)}px;
  flex: 1;
`;
