import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import CalorieCalculatorScreen from "./screens/CalorieCalculatorScreen";
import HomeScreen from "./screens/HomeScreen";
import AddMealScreen from "./screens/AddMealScreen";
import CanvasScreen from "./screens/CanvasScreen";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="CalorieCalculator"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen
          name="CalorieCalculator"
          component={CalorieCalculatorScreen}
          options={{ title: "Calorie Calculator" }}
        />
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: "Meal Planner" }}
        />
        <Stack.Screen
          name="AddMeal"
          component={AddMealScreen}
          options={{ title: "Add New Meal" }}
        />
        <Stack.Screen
          name="Canvas"
          component={CanvasScreen}
          options={{ title: "Progress Chart" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
