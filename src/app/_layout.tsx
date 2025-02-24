import { Stack } from "expo-router";
import { useEffect, useState } from "react";
import firebase from "@react-native-firebase/app";
import CustomSplashScreen from "../components/common/CustomSplashScreen";
import * as SplashScreen from "expo-splash-screen";

import {
  useFonts,
  NunitoSans_400Regular,
  NunitoSans_600SemiBold,
  NunitoSans_700Bold,
  NunitoSans_800ExtraBold,
} from "@expo-google-fonts/nunito-sans";
import { View } from "react-native";

export default function RootLayout() {
  const [firebaseInitialized, setFirebaseInitialized] = useState(true);
  const [animationEnded, setAnimationEnded] = useState(false);

  const [fontsLoaded] = useFonts({
    NunitoSans_400Regular,
    NunitoSans_600SemiBold,
    NunitoSans_700Bold,
    NunitoSans_800ExtraBold,
  });

  useEffect(() => {
    if (!firebase.apps.length) {
      firebase
        .initializeApp({
          projectId: "book-app-cc0a8",
          apiKey: "AIzaSyBNwpiSeMuovdEmIwYrjRvBTJ77to1XCVE",
          appId: "1:161428970931:android:8d66b60990bb62ba15bfc6",
          databaseURL: "https://book-app-cc0a8.firebaseio.com",
          messagingSenderId: "161428970931",
          storageBucket: "book-app-cc0a8.appspot.com",
        })
        .then(() => setFirebaseInitialized(true))
        .catch(console.error);
    } else {
      setFirebaseInitialized(true);
    }
  }, []);
  return (
    <View style={{ flex: 1 }}>
      <CustomSplashScreen
        onFinish={() => setAnimationEnded(true)}
        animationEnded={animationEnded}
      />
      {firebaseInitialized && animationEnded && fontsLoaded && (
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="index" />
          <Stack.Screen name="detail/:id" />
        </Stack>
      )}
    </View>
  );
}
