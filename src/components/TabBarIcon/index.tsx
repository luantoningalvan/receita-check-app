import { Icon as IconType } from "phosphor-react-native";
import { View } from "react-native";
import { theme } from "../../styles/theme";
import { TabBarIconContainer, TabBarIconFocusedIndicator } from "./styles";

interface TabIconProps {
  icon: IconType;
  focused: boolean;
}

export function TabIcon({ icon: Icon, focused }: TabIconProps) {
  return (
    <TabBarIconContainer>
      <View style={{ flex: 1, justifyContent: "center" }}>
        <Icon size={32} color={focused ? theme.orange : "#636363"} />
      </View>
      <TabBarIconFocusedIndicator focused={focused} />
    </TabBarIconContainer>
  );
}
