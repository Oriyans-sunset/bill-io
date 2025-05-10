import * as React from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

//screens
import HomeScreen from "./screens/HomeScreen";
import BillScreen from "./screens/BillScreen";
import CameraScreen from "./screens/CameraScreen";
import DisplayPictureScreen from "./screens/DisplayPictureScreen";
import SavedBillScreen from "./screens/SavedBillScreen";
import PrivacyScreen from "./screens/PrivacyScreen";

const Stack = createStackNavigator();

export default function MainContainer() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          options={{ headerShown: false }}
          name="Home"
          component={HomeScreen}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="Bill"
          component={BillScreen}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="Camera"
          component={CameraScreen}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="DisplayPicture"
          component={DisplayPictureScreen}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="SavedBill"
          component={SavedBillScreen}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="Privacy"
          component={PrivacyScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
