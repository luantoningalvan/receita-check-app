import React from "react";
import { Check } from "phosphor-react-native";
import { CheckboxContainer, ItemContainer, ItemText } from "./styles";

interface CheckboxProps {
  label: string;
  checked: boolean;
  onChange?: (checked: boolean) => void;
}

export function Checkbox({ label, onChange, checked }: CheckboxProps) {
  function handleChange() {
    typeof onChange === "function" && onChange(!checked);
  }

  return (
    <ItemContainer
      onPress={handleChange}
      style={{ display: "flex", flexDirection: "row", alignItems: "center" }}
    >
      <CheckboxContainer active={checked} onPress={handleChange}>
        {checked && <Check size={24} color="#fff" />}
      </CheckboxContainer>
      <ItemText>{label}</ItemText>
    </ItemContainer>
  );
}
