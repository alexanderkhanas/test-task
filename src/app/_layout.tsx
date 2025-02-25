import { Stack } from "expo-router";
import React, { useState } from "react";
import CustomSplashScreen from "../components/common/CustomSplashScreen";

import { View } from "react-native";
import StoreWrapper from "../store";

export default function RootLayout() {
  const [animationEnded, setAnimationEnded] = useState(false);

  return (
    <StoreWrapper>
      <View style={{ flex: 1 }}>
        <CustomSplashScreen
          onFinish={() => setAnimationEnded(true)}
          animationEnded={animationEnded}
        />
        {animationEnded && (
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="index" />
            <Stack.Screen name="detail/[id]" />
          </Stack>
        )}
      </View>
    </StoreWrapper>
  );
}
