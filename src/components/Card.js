import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { colours } from "../assets/colours";

const Card = ({ card }) => (
  <View style={styles.card}>
    <Image source={{ uri: card.image }} style={styles.cardImage}></Image>
  </View>
);

const styles = StyleSheet.create({
  card: {
    flex: 0.85,
    borderRadius: 10,
    justifyContent: "center",
    backgroundColor: "white",
    marginTop: 30,
    elevation: 10,
  },
  text: {
    textAlign: "center",
    fontSize: 50,
  },
  cardImage: {
    flex: 1,
    resizeMode: "cover",
    borderColor: colours.black,
    borderWidth: 2,
    borderRadius: 10,
  },
});
export default Card;
