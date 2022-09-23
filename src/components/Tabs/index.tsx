import React from "react";
import { TabGroup, Tab, TabText } from "./styles";

type Tab = {
  label: string;
  value: string;
};

interface TabsProps {
  tabs: Tab[];
  onChange: (value: string) => void;
  activeTab: string;
}
export function Tabs({ tabs, onChange, activeTab }: TabsProps) {
  return (
    <TabGroup>
      {tabs.map((tab) => (
        <Tab
          key={tab.value}
          active={activeTab === tab.value}
          onPress={() => onChange(tab.value)}
        >
          <TabText>{tab.label}</TabText>
        </Tab>
      ))}
    </TabGroup>
  );
}
