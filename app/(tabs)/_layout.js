import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from '@expo/vector-icons';

export default function Layout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="home"
        options={{
          title: "",
          headerShown: false,
          tabBarIcon: ({ focused }) =>
            focused ? (
              <MaterialIcons name="home" size={32} color="black" />
            ) : (
              <MaterialIcons name="home" size={24} color="grey" />
            ),
        }}
      />

      <Tabs.Screen
        name="chat"
        options={{
          title: "",
          headerShown: false,
          tabBarIcon: ({ focused }) =>
            focused ? (
              <Ionicons name="chatbubble-ellipses" size={32} color="black" />
            ) : (
              <Ionicons name="chatbubble-ellipses" size={24} color="grey" />
            ),
        }}
      />

      <Tabs.Screen
        name="bio"
        options={{
          title: "",
          headerShown: false,
          tabBarIcon: ({ focused }) =>
            focused ? (
              <MaterialIcons name="person" size={32} color="black" />
            ) : (
              <MaterialIcons name="person" size={24} color="grey" />
            ),
        }}
      />
    </Tabs>
  );
}