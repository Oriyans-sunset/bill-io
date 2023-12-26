import { StatusBar } from "expo-status-bar";
import React from "react";
import { useState } from "react";
import MainContainer from "./src/navigation/MainContainer";
import * as Font from "expo-font";
import AppLoading from "expo-app-loading";
import { RootSiblingParent } from "react-native-root-siblings";

const fetchFonts = () => {
  return Font.loadAsync({
    handjet: require("./src/assets/fonts/Handjet-Bold.ttf"),
  });
};

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  if (!fontsLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setFontsLoaded(true)}
        onError={(err) => console.log(err)}
      />
    );
  }

  return (
    <RootSiblingParent>
      <MainContainer></MainContainer>
    </RootSiblingParent>
  );
}
