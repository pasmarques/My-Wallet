import SafeScreen from "@/components/SafeScreen";
import { HeaderShownContext } from "@react-navigation/elements";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

export default function RootLayout() {
  return (
    <SafeScreen>
      <Stack screenOptions={{headerShown: false}}/>
      <StatusBar style="dark" />
    </SafeScreen>
  )
}
