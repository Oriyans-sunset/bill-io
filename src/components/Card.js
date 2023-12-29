import React from "react";
import { View, Text, StyleSheet, Image, ImageBackground } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { colours } from "../assets/colours";
import { BlurView } from "expo-blur";

const Card = ({ card }) => (
  <View style={styles.card}>
    {/* <Image source={{ uri: card.image }} style={styles.cardImage}></Image> */}
    <ImageBackground source={{ uri: card.image }} style={styles.cardImage}>
      <LinearGradient
        colors={["transparent", "rgba(0, 0, 0, 0.5)"]}
        style={styles.overlay}
      >
        <Text
          style={{
            fontFamily: "handjet",
            fontSize: 24,
            color: colours.seaYellow,
          }}
        >
          {card.title.toUpperCase()}
        </Text>
        <Text
          style={{
            fontFamily: "handjet",
            fontSize: 24,
            color: colours.lightBlue,
          }}
        >
          {card.amount}
        </Text>
      </LinearGradient>
    </ImageBackground>
  </View>
);

const styles = StyleSheet.create({
  card: {
    flex: 0.85,
    borderRadius: 10,
    justifyContent: "center",
    marginTop: 30,
    elevation: 10,
  },
  cardImage: {
    flex: 1,
    resizeMode: "cover",
    borderColor: colours.black,
    borderWidth: 3,
    borderRadius: 10,
    overflow: "hidden",
    alignItems: "center",
  },
  overlay: {
    position: "absolute",
    bottom: 0,
    height: 50,
    width: "100%",
    paddingLeft: 10,
    paddingRight: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
export default Card;
