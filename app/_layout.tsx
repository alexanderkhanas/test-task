import {Stack} from "expo-router";
import {useEffect, useState} from "react";
import firebase from "@react-native-firebase/app";

export default function RootLayout() {
    const [firebaseInitialized, setFirebaseInitialized] = useState(false);
    useEffect(() => {
        (async () => {
            firebase.initializeApp({
                projectId: 'book-app-cc0a8',
                apiKey: "AIzaSyBNwpiSeMuovdEmIwYrjRvBTJ77to1XCVE",
                appId: '1:161428970931',
                databaseURL: "https://book-app-cc0a8.firebaseio.com",
                messagingSenderId: '161428970931',
                storageBucket: "book-app-cc0a8.appspot.com"
            }).then(() => {
                setFirebaseInitialized(true)

            }).catch(console.error);
        })()
    }, []);
    return firebaseInitialized ? (
        <Stack>
            <Stack.Screen name="main"/>
            <Stack.Screen name="detail"/>
        </Stack>
    ) : null
}
