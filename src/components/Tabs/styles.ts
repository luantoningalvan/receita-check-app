import styled, { css } from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";

export const TabGroup = styled.View`
  padding: 4px 8px;
  background-color: ${({ theme }) => theme.orangeLight};
  height: 48px;
  border-radius: 999px;
  flex-direction: row;
`;

export const Tab = styled.TouchableOpacity<{ active?: boolean }>`
  border-radius: 20px;
  flex: 1;
  justify-content: center;
  align-items: center;

  ${({ active, theme }) =>
    active
      ? css`
          background: #fff;
          color: ${theme.orange};
          elevation: 1;
        `
      : css`
          background: ${theme.orangeLight};
          color: ${theme.orange};
        `}
`;

export const TabText = styled.Text`
  color: ${(props) => props.theme.orange};
  font-size: ${RFValue(14)}px;
`;
