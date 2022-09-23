import React from "react";
import { Check } from "phosphor-react-native";
import { CheckboxContainer, ItemContainer, ItemText } from "./styles";

interface CheckboxProps {
  label: string;
  onChange?: (checked: boolean) => void;
}

export function Checkbox({ label, onChange }: CheckboxProps) {
  const [active, setActive] = React.useState(false);

  function handleChange() {
    setActive(!active);
    typeof onChange === "function" && onChange(!active);
  }

  return (
    <ItemContainer
      onPress={handleChange}
      style={{ display: "flex", flexDirection: "row", alignItems: "center" }}
    >
      <CheckboxContainer active={active} onPress={handleChange}>
        {active && <Check size={24} color="#fff" />}
      </CheckboxContainer>
      <ItemText>{label}</ItemText>
    </ItemContainer>
  );
}
