import { Text, View } from "react-native";
import Model from "@/components/Model"

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Model />
    </View>
  );
}
