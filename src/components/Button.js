import React from "react";
import { IconButton, Button, Text } from "react-native-paper";
import { colours } from "../assets/colours";

const CustomButton = ({ onPress, icon, label, colour, iconColour }) => (
  <Button
    icon={icon}
    mode="contained"
    onPress={onPress}
    style={{
      backgroundColor: colour,
      paddingVertical: 5,
      borderRadius: 30,
      elevation: 4, // Add elevation for shadow
      shadowOffset: { width: 1, height: 3 }, // Customize shadow offset if needed
      shadowOpacity: 0.5, // Customize shadow opacity if needed
      shadowRadius: 4, // Customize shadow radius if needed
    }}
  >
    <Text
      style={{
        fontFamily: "handjet",
        fontSize: 21,
        color: colours.white,
      }}
    >
      {label}
    </Text>
  </Button>
);

export default CustomButton;
