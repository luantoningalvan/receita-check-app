import styled from "styled-components/native";
import { theme } from "../../styles/theme";

export const TabBarIconContainer = styled.View`
  align-items: center;
  height: 64px;
`;

export const TabBarIconFocusedIndicator = styled.View<{ focused?: boolean }>`
  width: 70px;
  height: 4px;
  background-color: ${({ focused }) =>
    focused ? theme.orange : "transparent"};
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
`;
