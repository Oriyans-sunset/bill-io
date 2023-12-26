import React from "react";
import { Button } from "react-native-paper";
import { colours } from "../assets/colours";

const CustomButton = ({ onPress, icon, label, colour }) => (
  <Button
    icon={icon}
    mode="contained"
    onPress={onPress}
    style={{
      backgroundColor: colour,
      paddingVertical: 5,
      borderRadius: 30,
      elevation: 4, // Add elevation for shadow
      shadowColor: colours.black, // Customize shadow color if needed
      shadowOffset: { width: 1, height: 3 }, // Customize shadow offset if needed
      shadowOpacity: 0.5, // Customize shadow opacity if needed
      shadowRadius: 4, // Customize shadow radius if needed
    }}
    labelStyle={{
      color: colours.white,
      fontSize: 18,
      fontFamily: "handjet",
      fontWeight: "bold",
    }}
  >
    {label}
  </Button>
);

export default CustomButton;
