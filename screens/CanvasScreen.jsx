import React from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import { LineChart } from "react-native-chart-kit";

const CanvasScreen = ({ route }) => {
  const { data } = route.params;
  const chartData = {
    labels: ["Week", "Month", "Year"],
    datasets: [
      {
        data: data,
        color: (opacity = 1) => `rgba(0, 122, 255, ${opacity})`, // Blue line
        strokeWidth: 2,
      },
    ],
    legend: [`Weight ${route.params.goal === "lose" ? "Loss" : "Gain"}`],
  };

  return (
    <View style={styles.container}>
      <LineChart
        data={chartData}
        width={Dimensions.get("window").width - 40} // Adjust for padding
        height={220}
        yAxisLabel=""
        chartConfig={{
          backgroundColor: "#ffffff",
          backgroundGradientFrom: "#ffffff",
          backgroundGradientTo: "#ffffff",
          decimalPlaces: 1,
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          style: {
            borderRadius: 16,
          },
          propsForDots: {
            r: "4",
            strokeWidth: "2",
            stroke: "#007AFF",
          },
        }}
        bezier
        style={styles.chart}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
});

export default CanvasScreen;
