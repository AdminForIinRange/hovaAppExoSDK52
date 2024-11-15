import { View, Text, StyleSheet } from "react-native";
import "../../global.css";

export default function Home() {
  return (
    <View className="flex-1 justify-center items-center bg-white">
      <Text className="text-2xl">
        Hello, this is the Home Page!
      </Text>
    </View>
  );
}
