import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const GoalSelectionScreen = ({ route, navigation }) => {
  const { maintenanceCalories, dietPreference } = route.params;
  const [goal, setGoal] = useState("maintain");

  const handleGoalSelection = () => {
    let calories = maintenanceCalories;
    if (goal === "lose") {
      calories = Math.max(maintenanceCalories - 500, 1200); // Minimum 1200 kcal for safety
    } else if (goal === "gain") {
      calories = maintenanceCalories + 500;
    }

    // Navigate to HomeScreen with adjusted calories, diet preference, and goal
    navigation.navigate("Home", {
      calories,
      dietPreference,
      goal: goal || "maintain",
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select Your Fitness Goal</Text>
      <Text style={styles.subtitle}>
        Choose whether you want to maintain, lose, or gain weight.
      </Text>

      <View style={styles.radioGroup}>
        <TouchableOpacity
          style={styles.radioOption}
          onPress={() => setGoal("maintain")}
        >
          <Ionicons
            name={goal === "maintain" ? "radio-button-on" : "radio-button-off"}
            size={24}
            color="#007AFF"
          />
          <Text style={styles.radioText}>Maintain Weight</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.radioOption}
          onPress={() => setGoal("lose")}
        >
          <Ionicons
            name={goal === "lose" ? "radio-button-on" : "radio-button-off"}
            size={24}
            color="#007AFF"
          />
          <Text style={styles.radioText}>Lose Weight</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.radioOption}
          onPress={() => setGoal("gain")}
        >
          <Ionicons
            name={goal === "gain" ? "radio-button-on" : "radio-button-off"}
            size={24}
            color="#007AFF"
          />
          <Text style={styles.radioText}>Gain Weight</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={styles.continueButton}
        onPress={handleGoalSelection}
      >
        <Text style={styles.buttonText}>Continue</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    marginBottom: 20,
  },
  radioGroup: {
    marginVertical: 20,
  },
  radioOption: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  radioText: {
    fontSize: 18,
    marginLeft: 10,
    color: "#333",
  },
  continueButton: {
    backgroundColor: "#28a745",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default GoalSelectionScreen;
