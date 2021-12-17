import React from 'react';
import { StyleSheet, StatusBar } from 'react-native';
import { AuthenticationContextProvider } from "./src/services/authentication/authentication.context";
import { Navigation } from "./src/infrastructure/navigation";

import { ThemeProvider } from "styled-components/native";

import { theme } from "./src/infrastructure/theme";
import * as firebase from "firebase";
import {
  useFonts as useOswald,
  Oswald_400Regular,
} from "@expo-google-fonts/oswald";
import { useFonts as useLato, Lato_400Regular } from "@expo-google-fonts/lato";
import * as analytics from "expo-firebase-analytics";
const firebaseConfig = {
  apiKey: "AIzaSyABgPJ4Bvf6ZIgC0t1OEOoJDZSZ-GvYjac",
  authDomain: "mealstogo-5fdee.firebaseapp.com",
  projectId: "mealstogo-5fdee",
  storageBucket: "mealstogo-5fdee.appspot.com",
  messagingSenderId: "461156744270",
  appId: "1:461156744270:web:0a3d9737a24acc9606571f",
  measurementId: "G-275M5W1Z8Q"
};

if (!firebase.apps.length) {
 try {
   
  firebase.initializeApp(firebaseConfig);
  analytics.setDebugModeEnabled(true);
  analytics.setUnavailabilityLogging(true);

 } catch (error) {
   console.log(error);
 }
  
}

export default function App()  {
  const [oswaldLoaded] = useOswald({
    Oswald_400Regular,
  });

  const [latoLoaded] = useLato({
    Lato_400Regular,
  });
 

  if (!oswaldLoaded || !latoLoaded) {
    return null;
  } 
  return (
    <ThemeProvider theme={theme}>
      <AuthenticationContextProvider>
        <Navigation />
      </AuthenticationContextProvider>
    </ThemeProvider>


  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight
  },
});
