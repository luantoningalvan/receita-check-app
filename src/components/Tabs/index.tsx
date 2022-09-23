import React from "react";
import { TabGroup, Tab, TabText } from "./styles";

type Tab = {
  label: string;
  value: string;
};

interface TabsProps {
  tabs: Tab[];
  initialActive: string;
}
export function Tabs({ tabs, initialActive }: TabsProps) {
  const [activeTab, setActiveTab] = React.useState(initialActive);

  return (
    <TabGroup>
      {tabs.map((tab) => (
        <Tab
          key={tab.value}
          active={activeTab === tab.value}
          onPress={() => setActiveTab(tab.value)}
        >
          <TabText>{tab.label}</TabText>
        </Tab>
      ))}
    </TabGroup>
  );
}
