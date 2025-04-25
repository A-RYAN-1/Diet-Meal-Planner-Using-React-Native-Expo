import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
  Modal,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const CalorieCalculatorScreen = ({ navigation }) => {
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("male");
  const [heightFeet, setHeightFeet] = useState("");
  const [heightInches, setHeightInches] = useState("");
  const [weight, setWeight] = useState("");
  const [activityLevel, setActivityLevel] = useState("sedentary");
  const [dietPreference, setDietPreference] = useState("non-veg");
  const [activityModalVisible, setActivityModalVisible] = useState(false);

  const activityOptions = [
    { label: "Sedentary: little or no exercise", value: "sedentary" },
    { label: "Light: exercise 1-3 times/week", value: "light" },
    { label: "Moderate: exercise 4-5 times/week", value: "moderate" },
    {
      label: "Intense: exercise 45-120 min of elevated heart rate",
      value: "intense",
    },
    {
      label: "Very Intense: 2+ hours of elevated heart rate",
      value: "veryIntense",
    },
  ];

  const calculateCalories = () => {
    if (
      !age ||
      !heightFeet ||
      !heightInches ||
      !weight ||
      isNaN(age) ||
      isNaN(heightFeet) ||
      isNaN(heightInches) ||
      isNaN(weight)
    ) {
      Alert.alert("Invalid Input", "Please fill out all fields correctly.");
      return;
    }

    const ageVal = parseInt(age);
    const feet = parseInt(heightFeet);
    const inches = parseInt(heightInches);
    const weightVal = parseInt(weight);

    if (
      ageVal < 15 ||
      ageVal > 80 ||
      feet < 0 ||
      inches < 0 ||
      inches >= 12 ||
      weightVal <= 0
    ) {
      Alert.alert("Invalid Input", "Please enter valid values for each field.");
      return;
    }

    const height = feet * 12 + inches;
    const weightKg = weightVal * 0.453592;
    const heightCm = height * 2.54;

    let bmr;
    if (gender === "male") {
      bmr = 10 * weightKg + 6.25 * heightCm - 5 * ageVal + 5;
    } else {
      bmr = 10 * weightKg + 6.25 * heightCm - 5 * ageVal - 161;
    }

    const activityMultipliers = {
      sedentary: 1.2,
      light: 1.375,
      moderate: 1.55,
      intense: 1.725,
      veryIntense: 1.9,
    };

    const calories = Math.round(bmr * activityMultipliers[activityLevel]);

    navigation.navigate("Home", { calories, dietPreference });
  };

  const clearForm = () => {
    setAge("");
    setGender("male");
    setHeightFeet("");
    setHeightInches("");
    setWeight("");
    setActivityLevel("sedentary");
    setDietPreference("non-veg");
  };

  const getActivityLabel = () => {
    const option = activityOptions.find((opt) => opt.value === activityLevel);
    return option ? option.label : "Select Activity Level";
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Calorie Calculator</Text>
      <Text style={styles.subtitle}>
        Estimate your daily calorie needs for a healthy diet.
      </Text>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Age (15-80)</Text>
        <View style={styles.inputWrapper}>
          <Ionicons
            name="person-outline"
            size={20}
            color="#666"
            style={styles.inputIcon}
          />
          <TextInput
            style={styles.input}
            value={age}
            onChangeText={setAge}
            placeholder="Enter age"
            placeholderTextColor="#999"
            keyboardType="numeric"
          />
        </View>
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Gender</Text>
        <View style={styles.toggleGroup}>
          <TouchableOpacity
            style={[
              styles.toggleButton,
              gender === "male" && styles.toggleButtonActive,
            ]}
            onPress={() => setGender("male")}
          >
            <Text
              style={[
                styles.toggleText,
                gender === "male" && styles.toggleTextActive,
              ]}
            >
              Male
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.toggleButton,
              gender === "female" && styles.toggleButtonActive,
            ]}
            onPress={() => setGender("female")}
          >
            <Text
              style={[
                styles.toggleText,
                gender === "female" && styles.toggleTextActive,
              ]}
            >
              Female
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Height</Text>
        <View style={styles.heightContainer}>
          <View style={[styles.inputWrapper, { flex: 1, marginRight: 10 }]}>
            <Ionicons
              name="resize-outline"
              size={20}
              color="#666"
              style={styles.inputIcon}
            />
            <TextInput
              style={styles.input}
              value={heightFeet}
              onChangeText={setHeightFeet}
              placeholder="Feet"
              placeholderTextColor="#999"
              keyboardType="numeric"
            />
          </View>
          <View style={[styles.inputWrapper, { flex: 1 }]}>
            <Ionicons
              name="resize-outline"
              size={20}
              color="#666"
              style={styles.inputIcon}
            />
            <TextInput
              style={styles.input}
              value={heightInches}
              onChangeText={setHeightInches}
              placeholder="Inches"
              placeholderTextColor="#999"
              keyboardType="numeric"
            />
          </View>
        </View>
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Weight (pounds)</Text>
        <View style={styles.inputWrapper}>
          <Ionicons
            name="barbell-outline"
            size={20}
            color="#666"
            style={styles.inputIcon}
          />
          <TextInput
            style={styles.input}
            value={weight}
            onChangeText={setWeight}
            placeholder="Enter weight"
            placeholderTextColor="#999"
            keyboardType="numeric"
          />
        </View>
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Activity Level</Text>
        <TouchableOpacity
          style={styles.dropdownButton}
          onPress={() => setActivityModalVisible(true)}
        >
          <Text style={styles.dropdownText}>{getActivityLabel()}</Text>
          <Ionicons name="chevron-down" size={20} color="#666" />
        </TouchableOpacity>

        <Modal
          transparent={true}
          visible={activityModalVisible}
          animationType="fade"
          onRequestClose={() => setActivityModalVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              {activityOptions.map((option) => (
                <TouchableOpacity
                  key={option.value}
                  style={styles.modalItem}
                  onPress={() => {
                    setActivityLevel(option.value);
                    setActivityModalVisible(false);
                  }}
                >
                  <Text style={styles.modalText}>{option.label}</Text>
                </TouchableOpacity>
              ))}
              <TouchableOpacity
                style={styles.modalCloseButton}
                onPress={() => setActivityModalVisible(false)}
              >
                <Text style={styles.modalCloseText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Diet Preference</Text>
        <View style={styles.toggleGroup}>
          <TouchableOpacity
            style={[
              styles.toggleButton,
              dietPreference === "veg" && styles.toggleButtonActive,
            ]}
            onPress={() => setDietPreference("veg")}
          >
            <Text
              style={[
                styles.toggleText,
                dietPreference === "veg" && styles.toggleTextActive,
              ]}
            >
              Vegetarian
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.toggleButton,
              dietPreference === "non-veg" && styles.toggleButtonActive,
            ]}
            onPress={() => setDietPreference("non-veg")}
          >
            <Text
              style={[
                styles.toggleText,
                dietPreference === "non-veg" && styles.toggleTextActive,
              ]}
            >
              Non-Vegetarian
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.calculateButton}
          onPress={calculateCalories}
        >
          <View style={styles.solidButton}>
            <Text style={styles.buttonText}>Calculate</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.clearButton} onPress={clearForm}>
          <View style={[styles.solidButton, styles.clearButtonSolid]}>
            <Text style={styles.buttonText}>Clear</Text>
          </View>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 25,
    paddingBottom: 50,
    backgroundColor: "grey", // Solid background color
  },
  title: {
    fontSize: 32,
    fontWeight: "700",
    color: "#fff",
    textAlign: "center",
    marginBottom: 10,
    textShadowColor: "rgba(0, 0, 0, 0.3)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  subtitle: {
    fontSize: 16,
    color: "#e0e0e0",
    textAlign: "center",
    marginBottom: 25,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    color: "#fff",
    marginBottom: 8,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 12,
    paddingHorizontal: 15,
    paddingVertical: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: "#333",
  },
  heightContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  toggleGroup: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 10,
  },
  toggleButton: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.3)",
  },
  toggleButtonActive: {
    backgroundColor: "#fff",
    borderColor: "#fff",
  },
  toggleText: {
    fontSize: 16,
    color: "#fff",
  },
  toggleTextActive: {
    color: "#2575fc",
    fontWeight: "600",
  },
  dropdownButton: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 12,
    paddingHorizontal: 15,
    paddingVertical: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  dropdownText: {
    fontSize: 16,
    color: "#333",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
    width: "80%",
    maxHeight: "60%",
  },
  modalItem: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  modalText: {
    fontSize: 16,
    color: "#333",
  },
  modalCloseButton: {
    marginTop: 15,
    alignItems: "center",
  },
  modalCloseText: {
    fontSize: 16,
    color: "#007AFF",
    fontWeight: "600",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 25,
  },
  calculateButton: {
    flex: 1,
    marginRight: 10,
  },
  clearButton: {
    flex: 1,
  },
  solidButton: {
    backgroundColor: "#28a745",
    padding: 15,
    borderRadius: 12,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
  },
  clearButtonSolid: {
    backgroundColor: "#dc3545",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default CalorieCalculatorScreen;
