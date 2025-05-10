import React from "react";
import { IconButton, Button, Text } from "react-native-paper";
import { colours } from "../assets/colours";

const CustomButton = ({
  onPress,
  icon,
  label,
  colour,
  textColour,
  iconSize,
}) => (
  <Button
    icon={({ size, textColour }) => (
      <IconButton icon={icon} iconColor={textColour} size={iconSize} />
    )}
    mode="contained"
    onPress={onPress}
    style={{
      backgroundColor: colour,
      borderRadius: 16,
      elevation: 4,
      shadowOffset: { width: 1, height: 3 }, // Customize shadow offset if needed
      shadowOpacity: 0.5, // Customize shadow opacity if needed
      shadowRadius: 4, // Customize shadow radius if needed
    }}
  >
    <Text
      style={{
        fontFamily: "handjet",
        fontSize: 21,
        color: textColour,
      }}
    >
      {label}
    </Text>
  </Button>
);

export default CustomButton;
