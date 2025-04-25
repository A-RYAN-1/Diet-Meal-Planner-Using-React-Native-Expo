import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const HomeScreen = ({ navigation, route }) => {
  const { calories, dietPreference } = route.params || {};
  const [step, setStep] = useState(1); // 1: Goal selection, 2: Meal display
  const [goal, setGoal] = useState(null);
  const [filter, setFilter] = useState(null); // null, "protein", or "carbs"
  const [meals, setMeals] = useState([]);
  const [suggestedMeals, setSuggestedMeals] = useState([]);

  const vegMeals = [
    {
      id: "1",
      name: "Aloo Paratha",
      calories: 300,
      carbs: 40,
      protein: 6,
      fat: 12,
      time: "8:00 AM",
    },
    {
      id: "2",
      name: "Vegetable Pulao",
      calories: 250,
      carbs: 45,
      protein: 5,
      fat: 6,
      time: "12:00 PM",
    },
    {
      id: "3",
      name: "Dal Tadka",
      calories: 200,
      carbs: 25,
      protein: 9,
      fat: 7,
      time: "6:00 PM",
    },
    {
      id: "4",
      name: "Paneer Tikka",
      calories: 350,
      carbs: 10,
      protein: 18,
      fat: 25,
      time: "3:00 PM",
    },
    {
      id: "5",
      name: "Chole Bhature",
      calories: 450,
      carbs: 60,
      protein: 12,
      fat: 18,
      time: "12:00 PM",
    },
    {
      id: "6",
      name: "Rajma Masala",
      calories: 220,
      carbs: 30,
      protein: 10,
      fat: 6,
      time: "6:00 PM",
    },
    {
      id: "7",
      name: "Palak Paneer",
      calories: 300,
      carbs: 15,
      protein: 14,
      fat: 20,
      time: "12:00 PM",
    },
    {
      id: "8",
      name: "Vegetable Korma",
      calories: 280,
      carbs: 20,
      protein: 8,
      fat: 18,
      time: "6:00 PM",
    },
    {
      id: "9",
      name: "Masala Dosa",
      calories: 350,
      carbs: 50,
      protein: 8,
      fat: 12,
      time: "8:00 AM",
    },
    {
      id: "10",
      name: "Baingan Bharta",
      calories: 200,
      carbs: 15,
      protein: 4,
      fat: 14,
      time: "6:00 PM",
    },
    {
      id: "11",
      name: "Sambar Vada",
      calories: 250,
      carbs: 35,
      protein: 7,
      fat: 10,
      time: "3:00 PM",
    },
    {
      id: "12",
      name: "Aloo Gobi",
      calories: 220,
      carbs: 25,
      protein: 5,
      fat: 12,
      time: "12:00 PM",
    },
    {
      id: "13",
      name: "Matar Paneer",
      calories: 320,
      carbs: 15,
      protein: 15,
      fat: 22,
      time: "6:00 PM",
    },
    {
      id: "14",
      name: "Pav Bhaji",
      calories: 400,
      carbs: 55,
      protein: 10,
      fat: 15,
      time: "6:00 PM",
    },
    {
      id: "15",
      name: "Idli Sambar",
      calories: 200,
      carbs: 35,
      protein: 6,
      fat: 4,
      time: "8:00 AM",
    },
    {
      id: "16",
      name: "Kadhi Pakora",
      calories: 280,
      carbs: 25,
      protein: 8,
      fat: 16,
      time: "12:00 PM",
    },
    {
      id: "17",
      name: "Vegetable Biryani",
      calories: 300,
      carbs: 50,
      protein: 6,
      fat: 10,
      time: "12:00 PM",
    },
    {
      id: "18",
      name: "Gobi Manchurian",
      calories: 250,
      carbs: 30,
      protein: 5,
      fat: 12,
      time: "3:00 PM",
    },
    {
      id: "19",
      name: "Bhindi Masala",
      calories: 220,
      carbs: 15,
      protein: 4,
      fat: 15,
      time: "6:00 PM",
    },
    {
      id: "20",
      name: "Upma",
      calories: 200,
      carbs: 30,
      protein: 5,
      fat: 8,
      time: "8:00 AM",
    },
    {
      id: "21",
      name: "Methi Thepla",
      calories: 250,
      carbs: 35,
      protein: 6,
      fat: 10,
      time: "3:00 PM",
    },
    {
      id: "22",
      name: "Dum Aloo",
      calories: 280,
      carbs: 30,
      protein: 5,
      fat: 15,
      time: "12:00 PM",
    },
    {
      id: "23",
      name: "Shahi Paneer",
      calories: 350,
      carbs: 12,
      protein: 16,
      fat: 26,
      time: "6:00 PM",
    },
    {
      id: "24",
      name: "Poha",
      calories: 180,
      carbs: 30,
      protein: 4,
      fat: 5,
      time: "8:00 AM",
    },
    {
      id: "25",
      name: "Malai Kofta",
      calories: 400,
      carbs: 20,
      protein: 12,
      fat: 30,
      time: "6:00 PM",
    },
    {
      id: "26",
      name: "Rava Dosa",
      calories: 300,
      carbs: 45,
      protein: 6,
      fat: 10,
      time: "8:00 AM",
    },
    {
      id: "27",
      name: "Aloo Matar",
      calories: 220,
      carbs: 25,
      protein: 6,
      fat: 10,
      time: "12:00 PM",
    },
    {
      id: "28",
      name: "Khichdi",
      calories: 200,
      carbs: 30,
      protein: 7,
      fat: 6,
      time: "6:00 PM",
    },
    {
      id: "29",
      name: "Vegetable Upma",
      calories: 210,
      carbs: 32,
      protein: 5,
      fat: 7,
      time: "8:00 AM",
    },
    {
      id: "30",
      name: "Paneer Bhurji",
      calories: 320,
      carbs: 10,
      protein: 18,
      fat: 22,
      time: "12:00 PM",
    },
    {
      id: "31",
      name: "Chana Masala",
      calories: 250,
      carbs: 35,
      protein: 10,
      fat: 8,
      time: "6:00 PM",
    },
    {
      id: "32",
      name: "Uttapam",
      calories: 280,
      carbs: 40,
      protein: 7,
      fat: 10,
      time: "8:00 AM",
    },
    {
      id: "33",
      name: "Lauki Kofta",
      calories: 270,
      carbs: 20,
      protein: 6,
      fat: 18,
      time: "6:00 PM",
    },
    {
      id: "34",
      name: "Corn Palak",
      calories: 260,
      carbs: 25,
      protein: 8,
      fat: 14,
      time: "12:00 PM",
    },
    {
      id: "35",
      name: "Vegetable Jalfrezi",
      calories: 230,
      carbs: 20,
      protein: 5,
      fat: 14,
      time: "6:00 PM",
    },
    {
      id: "36",
      name: "Rava Idli",
      calories: 200,
      carbs: 35,
      protein: 6,
      fat: 4,
      time: "8:00 AM",
    },
    {
      id: "37",
      name: "Mushroom Masala",
      calories: 220,
      carbs: 15,
      protein: 6,
      fat: 15,
      time: "12:00 PM",
    },
    {
      id: "38",
      name: "Palak Dal",
      calories: 210,
      carbs: 25,
      protein: 9,
      fat: 8,
      time: "6:00 PM",
    },
    {
      id: "39",
      name: "Sabudana Khichdi",
      calories: 250,
      carbs: 40,
      protein: 4,
      fat: 10,
      time: "8:00 AM",
    },
    {
      id: "40",
      name: "Paneer Makhani",
      calories: 350,
      carbs: 12,
      protein: 16,
      fat: 26,
      time: "6:00 PM",
    },
    {
      id: "41",
      name: "Veg Seekh Kebab",
      calories: 270,
      carbs: 20,
      protein: 8,
      fat: 16,
      time: "3:00 PM",
    },
    {
      id: "42",
      name: "Aloo Tikki",
      calories: 220,
      carbs: 30,
      protein: 5,
      fat: 10,
      time: "3:00 PM",
    },
    {
      id: "43",
      name: "Dahi Vada",
      calories: 260,
      carbs: 30,
      protein: 8,
      fat: 12,
      time: "3:00 PM",
    },
    {
      id: "44",
      name: "Vegetable Curry",
      calories: 240,
      carbs: 25,
      protein: 6,
      fat: 14,
      time: "6:00 PM",
    },
    {
      id: "45",
      name: "Methi Paratha",
      calories: 280,
      carbs: 40,
      protein: 6,
      fat: 12,
      time: "8:00 AM",
    },
    {
      id: "46",
      name: "Gobi Paratha",
      calories: 300,
      carbs: 45,
      protein: 6,
      fat: 12,
      time: "8:00 AM",
    },
    {
      id: "47",
      name: "Vegetable Fried Rice",
      calories: 250,
      carbs: 40,
      protein: 5,
      fat: 8,
      time: "12:00 PM",
    },
    {
      id: "48",
      name: "Tofu Tikka",
      calories: 280,
      carbs: 10,
      protein: 14,
      fat: 20,
      time: "3:00 PM",
    },
    {
      id: "49",
      name: "Dal Makhani",
      calories: 320,
      carbs: 30,
      protein: 12,
      fat: 18,
      time: "6:00 PM",
    },
    {
      id: "50",
      name: "Veg Kolhapuri",
      calories: 260,
      carbs: 20,
      protein: 6,
      fat: 16,
      time: "6:00 PM",
    },
  ];

  const nonVegMeals = [
    {
      id: "51",
      name: "Chicken Biryani",
      calories: 450,
      carbs: 50,
      protein: 20,
      fat: 18,
      time: "12:00 PM",
    },
    {
      id: "52",
      name: "Butter Chicken",
      calories: 400,
      carbs: 15,
      protein: 25,
      fat: 28,
      time: "6:00 PM",
    },
    {
      id: "53",
      name: "Chicken Tikka",
      calories: 350,
      carbs: 5,
      protein: 30,
      fat: 20,
      time: "3:00 PM",
    },
    {
      id: "54",
      name: "Fish Curry",
      calories: 300,
      carbs: 10,
      protein: 22,
      fat: 18,
      time: "6:00 PM",
    },
    {
      id: "55",
      name: "Mutton Rogan Josh",
      calories: 420,
      carbs: 10,
      protein: 28,
      fat: 30,
      time: "6:00 PM",
    },
    {
      id: "56",
      name: "Chicken Korma",
      calories: 380,
      carbs: 15,
      protein: 24,
      fat: 25,
      time: "12:00 PM",
    },
    {
      id: "57",
      name: "Prawn Masala",
      calories: 320,
      carbs: 10,
      protein: 20,
      fat: 22,
      time: "6:00 PM",
    },
    {
      id: "58",
      name: "Egg Curry",
      calories: 250,
      carbs: 15,
      protein: 12,
      fat: 16,
      time: "6:00 PM",
    },
    {
      id: "59",
      name: "Chicken 65",
      calories: 360,
      carbs: 10,
      protein: 25,
      fat: 22,
      time: "3:00 PM",
    },
    {
      id: "60",
      name: "Keema Matar",
      calories: 400,
      carbs: 15,
      protein: 26,
      fat: 28,
      time: "12:00 PM",
    },
    {
      id: "61",
      name: "Tandoori Chicken",
      calories: 350,
      carbs: 5,
      protein: 30,
      fat: 20,
      time: "6:00 PM",
    },
    {
      id: "62",
      name: "Fish Fry",
      calories: 320,
      carbs: 10,
      protein: 20,
      fat: 22,
      time: "3:00 PM",
    },
    {
      id: "63",
      name: "Chicken Chettinad",
      calories: 380,
      carbs: 15,
      protein: 24,
      fat: 25,
      time: "6:00 PM",
    },
    {
      id: "64",
      name: "Mutton Biryani",
      calories: 460,
      carbs: 50,
      protein: 22,
      fat: 20,
      time: "12:00 PM",
    },
    {
      id: "65",
      name: "Chicken Seekh Kebab",
      calories: 340,
      carbs: 5,
      protein: 28,
      fat: 20,
      time: "3:00 PM",
    },
    {
      id: "66",
      name: "Prawn Biryani",
      calories: 420,
      carbs: 50,
      protein: 18,
      fat: 18,
      time: "12:00 PM",
    },
    {
      id: "67",
      name: "Egg Bhurji",
      calories: 220,
      carbs: 10,
      protein: 12,
      fat: 15,
      time: "8:00 AM",
    },
    {
      id: "68",
      name: "Chicken Saag",
      calories: 360,
      carbs: 15,
      protein: 25,
      fat: 22,
      time: "6:00 PM",
    },
    {
      id: "69",
      name: "Fish Tikka",
      calories: 330,
      carbs: 5,
      protein: 25,
      fat: 20,
      time: "3:00 PM",
    },
    {
      id: "70",
      name: "Mutton Korma",
      calories: 410,
      carbs: 15,
      protein: 26,
      fat: 28,
      time: "6:00 PM",
    },
    {
      id: "71",
      name: "Chicken Fried Rice",
      calories: 350,
      carbs: 45,
      protein: 18,
      fat: 12,
      time: "12:00 PM",
    },
    {
      id: "72",
      name: "Prawn Fry",
      calories: 340,
      carbs: 10,
      protein: 20,
      fat: 22,
      time: "3:00 PM",
    },
    {
      id: "73",
      name: "Chicken Vindaloo",
      calories: 370,
      carbs: 15,
      protein: 24,
      fat: 24,
      time: "6:00 PM",
    },
    {
      id: "74",
      name: "Egg Paratha",
      calories: 320,
      carbs: 40,
      protein: 12,
      fat: 14,
      time: "8:00 AM",
    },
    {
      id: "75",
      name: "Chicken Manchurian",
      calories: 360,
      carbs: 20,
      protein: 22,
      fat: 20,
      time: "3:00 PM",
    },
    {
      id: "76",
      name: "Mutton Curry",
      calories: 400,
      carbs: 15,
      protein: 26,
      fat: 28,
      time: "6:00 PM",
    },
    {
      id: "77",
      name: "Chicken Do Pyaza",
      calories: 380,
      carbs: 15,
      protein: 24,
      fat: 25,
      time: "6:00 PM",
    },
    {
      id: "78",
      name: "Fish Biryani",
      calories: 430,
      carbs: 50,
      protein: 20,
      fat: 18,
      time: "12:00 PM",
    },
    {
      id: "79",
      name: "Chicken Roll",
      calories: 350,
      carbs: 40,
      protein: 18,
      fat: 14,
      time: "3:00 PM",
    },
    {
      id: "80",
      name: "Prawn Curry",
      calories: 320,
      carbs: 15,
      protein: 20,
      fat: 20,
      time: "6:00 PM",
    },
    {
      id: "81",
      name: "Chicken Bharta",
      calories: 370,
      carbs: 15,
      protein: 24,
      fat: 24,
      time: "6:00 PM",
    },
    {
      id: "82",
      name: "Egg Fried Rice",
      calories: 300,
      carbs: 45,
      protein: 10,
      fat: 10,
      time: "12:00 PM",
    },
    {
      id: "83",
      name: "Chicken Lollipop",
      calories: 340,
      carbs: 10,
      protein: 22,
      fat: 22,
      time: "3:00 PM",
    },
    {
      id: "84",
      name: "Mutton Keema",
      calories: 390,
      carbs: 15,
      protein: 25,
      fat: 28,
      time: "6:00 PM",
    },
    {
      id: "85",
      name: "Chicken Kolhapuri",
      calories: 380,
      carbs: 15,
      protein: 24,
      fat: 25,
      time: "6:00 PM",
    },
    {
      id: "86",
      name: "Prawn Fried Rice",
      calories: 350,
      carbs: 45,
      protein: 18,
      fat: 12,
      time: "12:00 PM",
    },
    {
      id: "87",
      name: "Chicken Patiala",
      calories: 390,
      carbs: 15,
      protein: 25,
      fat: 25,
      time: "6:00 PM",
    },
    {
      id: "88",
      name: "Fish Korma",
      calories: 340,
      carbs: 15,
      protein: 22,
      fat: 20,
      time: "6:00 PM",
    },
    {
      id: "89",
      name: "Chicken Tikka Masala",
      calories: 400,
      carbs: 15,
      protein: 25,
      fat: 28,
      time: "6:00 PM",
    },
    {
      id: "90",
      name: "Mutton Seekh Kebab",
      calories: 360,
      carbs: 5,
      protein: 28,
      fat: 22,
      time: "3:00 PM",
    },
    {
      id: "91",
      name: "Chicken Kadhai",
      calories: 380,
      carbs: 15,
      protein: 24,
      fat: 25,
      time: "6:00 PM",
    },
    {
      id: "92",
      name: "Prawn Korma",
      calories: 350,
      carbs: 15,
      protein: 20,
      fat: 22,
      time: "6:00 PM",
    },
    {
      id: "93",
      name: "Chicken Shawarma",
      calories: 360,
      carbs: 40,
      protein: 18,
      fat: 14,
      time: "3:00 PM",
    },
    {
      id: "94",
      name: "Mutton Bhuna",
      calories: 410,
      carbs: 15,
      protein: 26,
      fat: 28,
      time: "6:00 PM",
    },
    {
      id: "95",
      name: "Chicken Jalfrezi",
      calories: 370,
      carbs: 15,
      protein: 24,
      fat: 24,
      time: "6:00 PM",
    },
    {
      id: "96",
      name: "Fish Patra",
      calories: 320,
      carbs: 10,
      protein: 22,
      fat: 20,
      time: "3:00 PM",
    },
    {
      id: "97",
      name: "Chicken Afghani",
      calories: 390,
      carbs: 15,
      protein: 25,
      fat: 25,
      time: "6:00 PM",
    },
    {
      id: "98",
      name: "Prawn Tikka",
      calories: 340,
      carbs: 5,
      protein: 22,
      fat: 22,
      time: "3:00 PM",
    },
    {
      id: "99",
      name: "Mutton Vindaloo",
      calories: 420,
      carbs: 15,
      protein: 26,
      fat: 28,
      time: "6:00 PM",
    },
    {
      id: "100",
      name: "Chicken Malai Tikka",
      calories: 360,
      carbs: 5,
      protein: 28,
      fat: 22,
      time: "3:00 PM",
    },
  ];

  // Calculate calorie target based on goal
  const calorieTarget = () => {
    if (!calories) return 2000; // Fallback if calories not provided
    if (goal === "lose") return calories - 500;
    if (goal === "gain") return calories + 500;
    return calories;
  };

  const targetCalories = calorieTarget();

  // Generate meal plan to match calorie target
  useEffect(() => {
    if (step !== 2 || !dietPreference) return;

    const allMeals = dietPreference === "veg" ? vegMeals : nonVegMeals;
    let selectedMeals = [];
    let totalCalories = 0;
    const times = ["8:00 AM", "12:00 PM", "3:00 PM", "6:00 PM"];
    let timeIndex = 0;

    // Sort meals by calories to make selection easier
    const sortedMeals = [...allMeals].sort((a, b) => a.calories - b.calories);

    // Select meals to match the calorie target
    while (totalCalories < targetCalories && sortedMeals.length > 0) {
      const remainingCalories = targetCalories - totalCalories;
      const meal = sortedMeals.find(
        (m) => m.calories <= remainingCalories && !selectedMeals.includes(m)
      );

      if (!meal) break;

      meal.time = times[timeIndex % times.length];
      timeIndex++;
      selectedMeals.push(meal);
      totalCalories += meal.calories;
      sortedMeals.splice(sortedMeals.indexOf(meal), 1); // Remove selected meal
    }

    setMeals(selectedMeals);
    setSuggestedMeals(selectedMeals); // Store original suggestion for filtering
  }, [step, dietPreference, goal, targetCalories]);

  // Apply protein or carbs filter
  useEffect(() => {
    if (!filter) {
      setMeals(suggestedMeals);
      return;
    }

    const filteredMeals = suggestedMeals
      .map((meal) => ({
        ...meal,
        ratio:
          filter === "protein"
            ? meal.protein / meal.calories
            : meal.carbs / meal.calories,
      }))
      .sort((a, b) => b.ratio - a.ratio) // Sort by protein or carbs per calorie
      .slice(0, Math.min(suggestedMeals.length, 4)); // Limit to top meals

    setMeals(filteredMeals);
  }, [filter, suggestedMeals]);

  // Calculate weight progress
  const calculateProgress = () => {
    const dailyDeficit =
      calories - meals.reduce((sum, meal) => sum + meal.calories, 0);
    const caloriesPerPeriod = {
      week: dailyDeficit * 7,
      month: dailyDeficit * 30,
      year: dailyDeficit * 365,
    };
    const weightChange = {
      week: (caloriesPerPeriod.week / 3500).toFixed(1),
      month: (caloriesPerPeriod.month / 3500).toFixed(1),
      year: (caloriesPerPeriod.year / 3500).toFixed(1),
    };
    return weightChange;
  };

  const progress = calculateProgress();
  const goalText =
    (goal || "maintain").charAt(0).toUpperCase() +
    (goal || "maintain").slice(1);
  const totalCalories = meals.reduce((sum, meal) => sum + meal.calories, 0);

  const renderMealItem = ({ item }) => (
    <View style={styles.mealCard}>
      <Text style={styles.mealName}>{item.name}</Text>
      <Text style={styles.mealDetails}>
        {item.calories} cal | {item.carbs}g Carbs | {item.protein}g Protein |{" "}
        {item.fat}g Fat - {item.time}
      </Text>
    </View>
  );

  // Step 1: Goal Selection
  if (step === 1) {
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Select Your Fitness Goal</Text>
        <Text style={styles.subtitle}>
          Choose whether you want to maintain, lose, or gain weight.
        </Text>

        <View style={styles.toggleGroup}>
          <TouchableOpacity
            style={[
              styles.toggleButton,
              goal === "maintain" && styles.toggleButtonActive,
            ]}
            onPress={() => setGoal("maintain")}
          >
            <Text
              style={[
                styles.toggleText,
                goal === "maintain" && styles.toggleTextActive,
              ]}
            >
              Maintain Weight
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.toggleButton,
              goal === "lose" && styles.toggleButtonActive,
            ]}
            onPress={() => setGoal("lose")}
          >
            <Text
              style={[
                styles.toggleText,
                goal === "lose" && styles.toggleTextActive,
              ]}
            >
              Lose Weight
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.toggleButton,
              goal === "gain" && styles.toggleButtonActive,
            ]}
            onPress={() => setGoal("gain")}
          >
            <Text
              style={[
                styles.toggleText,
                goal === "gain" && styles.toggleTextActive,
              ]}
            >
              Gain Weight
            </Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={[styles.continueButton, !goal && styles.buttonDisabled]}
          onPress={() => goal && setStep(2)}
          disabled={!goal}
        >
          <View style={styles.solidButton}>
            <Text style={styles.buttonText}>Continue</Text>
          </View>
        </TouchableOpacity>
      </ScrollView>
    );
  }

  // Step 2: Display Meals with Filters and Graph
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Your Meal Plan</Text>
      <Text style={styles.header}>Goal: {goalText}</Text>
      <Text style={styles.header}>
        Daily Calorie Target: {targetCalories} cal
      </Text>
      <Text style={styles.header}>
        Total Calories in Plan: {totalCalories} cal
      </Text>
      <Text style={styles.subHeader}>
        Suggested {dietPreference === "veg" ? "Vegetarian" : "Non-Vegetarian"}{" "}
        Meals
      </Text>

      <View style={styles.filterContainer}>
        <TouchableOpacity
          style={[
            styles.filterButton,
            filter === null && styles.filterButtonActive,
          ]}
          onPress={() => setFilter(null)}
        >
          <Text
            style={[
              styles.filterText,
              filter === null && styles.filterTextActive,
            ]}
          >
            All
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.filterButton,
            filter === "protein" && styles.filterButtonActive,
          ]}
          onPress={() => setFilter("protein")}
        >
          <Text
            style={[
              styles.filterText,
              filter === "protein" && styles.filterTextActive,
            ]}
          >
            High Protein
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.filterButton,
            filter === "carbs" && styles.filterButtonActive,
          ]}
          onPress={() => setFilter("carbs")}
        >
          <Text
            style={[
              styles.filterText,
              filter === "carbs" && styles.filterTextActive,
            ]}
          >
            High Carbs
          </Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={meals}
        renderItem={renderMealItem}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No meals suggested yet</Text>
        }
      />

      <Text style={styles.graphTitle}>Potential Weight Progress</Text>
      <View style={styles.graphContainer}>
        <Text style={styles.progressText}>
          Week: {progress.week} lbs {goal === "lose" ? "loss" : "gain"}
        </Text>
        <Text style={styles.progressText}>
          Month: {progress.month} lbs {goal === "lose" ? "loss" : "gain"}
        </Text>
        <Text style={styles.progressText}>
          Year: {progress.year} lbs {goal === "lose" ? "loss" : "gain"}
        </Text>
        <TouchableOpacity
          style={styles.graphButton}
          onPress={() => {
            const chartData = [
              parseFloat(progress.week),
              parseFloat(progress.month),
              parseFloat(progress.year),
            ];
            navigation.navigate("Canvas", { data: chartData, goal });
          }}
        >
          <View style={[styles.solidButton, styles.graphButtonSolid]}>
            <Text style={styles.buttonText}>View Graph</Text>
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
    paddingBottom: 80,
    backgroundColor: "grey",
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
  toggleGroup: {
    flexDirection: "row",
    justifyContent: "space-between", // Changed to space-between for even distribution
    marginVertical: 20,
  },
  toggleButton: {
    flex: 1, // Equal width for all buttons
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    paddingVertical: 12,
    paddingHorizontal: 10, // Adjusted for consistency
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.3)",
    alignItems: "center", // Center the text horizontally
  },
  toggleButtonActive: {
    backgroundColor: "#fff",
    borderColor: "#fff",
  },
  toggleText: {
    fontSize: 16,
    color: "#fff",
    textAlign: "center", // Center the text
  },
  toggleTextActive: {
    color: "#2575fc",
    fontWeight: "600",
  },
  continueButton: {
    marginTop: 20,
  },
  buttonDisabled: {
    opacity: 0.5,
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
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  header: {
    fontSize: 18,
    fontWeight: "600",
    color: "#fff",
    marginBottom: 8,
  },
  subHeader: {
    fontSize: 20,
    fontWeight: "600",
    color: "#e0e0e0",
    marginBottom: 15,
  },
  filterContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
  },
  filterButton: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.3)",
  },
  filterButtonActive: {
    backgroundColor: "#fff",
    borderColor: "#fff",
  },
  filterText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
  },
  filterTextActive: {
    color: "#2575fc",
  },
  mealCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 15,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  mealName: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
  },
  mealDetails: {
    fontSize: 14,
    color: "#666",
    marginTop: 5,
  },
  emptyText: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
    color: "#e0e0e0",
  },
  graphTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#fff",
    marginTop: 20,
    marginBottom: 10,
  },
  graphContainer: {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 12,
    padding: 15,
    marginBottom: 20,
  },
  progressText: {
    fontSize: 16,
    color: "#e0e0e0",
    marginBottom: 5,
  },
  graphButton: {
    marginTop: 10,
  },
  graphButtonSolid: {
    backgroundColor: "#007AFF",
  },
  addButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
  },
  addButtonSolid: {
    backgroundColor: "#FF6F61",
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
});

export default HomeScreen;
