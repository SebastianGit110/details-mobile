import { Tabs } from "expo-router";
import React from "react";
import { MaterialIcons } from "@expo/vector-icons";

import { HapticTab } from "@/components/haptic-tab";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { Platform } from "react-native";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerShown: false,
        tabBarButton: HapticTab,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="house.fill" color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="products"
        options={{
          title: "Productos",
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="shopping-cart" size={28} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="invoice"
        options={{
          title: "Facturas",
          tabBarIcon: ({ color, size, focused }) => (
            <MaterialIcons
              name={focused ? "receipt" : "receipt-long"}
              size={28}
              color={color}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="movements"
        options={{
          title: "Movimientos",
          tabBarIcon: ({ color, size, focused }) => (
            <MaterialIcons
              name={focused ? "compare-arrows" : "swap-horiz"} // alterna según si está activo
              size={28}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
