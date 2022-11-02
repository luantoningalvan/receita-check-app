import { RFValue } from "react-native-responsive-fontsize";
import styled, { css } from "styled-components/native";

export const CheckboxContainer = styled.TouchableOpacity<{ active: boolean }>`
  height: 24px;
  width: 24px;
  border-radius: 4px;
  align-items: center;
  justify-content: center;
  ${(props) =>
    props.active
      ? css`
          background-color: ${props.theme.orange};
        `
      : css`
          border-width: 1px;
          border-color: #c9c9c9;
        `}
`;

export const ItemContainer = styled.TouchableOpacity`
  padding: 12px 0px;
  flex-direction: row;
  align-items: center;
`;

export const ItemText = styled.Text`
  margin-left: 12px;
  font-size: ${RFValue(15)}px;
  flex: 1;
`;
