import { Stack } from "expo-router";
import { useEffect, useState } from "react";

export default function RootLayout() {
  const [firebaseInitialized, setFirebaseInitialized] = useState(true);
  useEffect(() => {
    // if (!firebase.apps.length) {
    //   firebase
    //     .initializeApp({
    //       projectId: "book-app-cc0a8",
    //       apiKey: "AIzaSyBNwpiSeMuovdEmIwYrjRvBTJ77to1XCVE",
    //       appId: "1:161428970931:android:8d66b60990bb62ba15bfc6",
    //       databaseURL: "https://book-app-cc0a8.firebaseio.com",
    //       messagingSenderId: "161428970931",
    //       storageBucket: "book-app-cc0a8.appspot.com",
    //     })
    //     .then(() => {
    //       setFirebaseInitialized(true);
    //     })
    //     .catch(console.error);
    // } else {
    //   setFirebaseInitialized(true);
    // }
  }, []);
  return (
    <Stack>
      <Stack.Screen name="main" />
      <Stack.Screen name="detail" />
    </Stack>
  );
}
