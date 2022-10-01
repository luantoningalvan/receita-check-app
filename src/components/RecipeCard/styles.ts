import styled from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";
import { Animated } from "react-native";

export const Container = styled.TouchableOpacity`
  margin: 12px 0px;
  width: 47%;
`;

export const CoverContainer = styled.View`
  width: 100%;
  height: ${RFValue(140)}px;
  border-radius: 8px;
  overflow: hidden;
`;

export const Cover = styled.Image`
  width: 100%;
  height: ${RFValue(140)}px;
  border-radius: 8px;
`;

export const BlurCover = styled(Animated.View)`
  border-radius: 8px;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
`;

export const Title = styled.Text`
  font-size: ${RFValue(14)}px;
  margin-top: 12px;
`;
