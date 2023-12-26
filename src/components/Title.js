import React from "react";
import { Text } from "react-native-paper";
import { colours } from "../assets/colours";

const Title = ({ title }) => (
  <Text
    style={{
      fontSize: 100,
      color: colours.black,
      fontFamily: "handjet",
    }}
  >
    {title}
  </Text>
);

export default Title;
