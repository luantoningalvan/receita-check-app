import { RectButtonProps } from "react-native-gesture-handler";
import { IconButtonContainer } from "./styles";
import { Icon } from "phosphor-react-native";
import { theme } from "../../styles/theme";

interface IconButtonProps extends RectButtonProps {
  icon: Icon;
  active?: boolean;
}

export function IconButton({
  icon: SelectedIcon,
  active,
  ...rest
}: IconButtonProps) {
  return (
    <IconButtonContainer {...rest}>
      <SelectedIcon
        size={28}
        color={active ? theme.orange : "#fff"}
        weight={active ? "fill" : "regular"}
      />
    </IconButtonContainer>
  );
}
