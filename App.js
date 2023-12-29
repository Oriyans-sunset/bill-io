import { StatusBar } from "expo-status-bar";
import React from "react";
import { useState } from "react";
import MainContainer from "./src/navigation/MainContainer";
import * as Font from "expo-font";
import AppLoading from "expo-app-loading";
import { RootSiblingParent } from "react-native-root-siblings";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useCallback } from "react";
import { View } from "react-native";

const fetchFonts = () => {
  return Font.loadAsync({
    handjet: require("./src/assets/fonts/Handjet-Bold.ttf"),
  });
};

export default function App() {
  // const [fontsLoaded, setFontsLoaded] = useState(false);

  // if (!fontsLoaded) {
  //   return (
  //     <AppLoading
  //       startAsync={fetchFonts}
  //       onFinish={() => setFontsLoaded(true)}
  //       onError={(err) => console.log(err)}
  //     />
  //   );
  // }

  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        // Pre-load fonts, make any API calls you need to do here
        await Font.loadAsync({
          handjet: require("./src/assets/fonts/Handjet-Bold.ttf"),
        });
        // Artificially delay for two seconds to simulate a slow loading
        // experience. Please remove this if you copy and paste the code!
        await new Promise((resolve) => setTimeout(resolve, 2000));
      } catch (e) {
        console.warn(e);
      } finally {
        // Tell the application to render
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      // This tells the splash screen to hide immediately! If we call this after
      // `setAppIsReady`, then we may see a blank screen while the app is
      // loading its initial state and rendering its first pixels. So instead,
      // we hide the splash screen once we know the root view has already
      // performed layout.
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
    <RootSiblingParent>
      <MainContainer onLayout={onLayoutRootView}></MainContainer>
    </RootSiblingParent>
  );
}
