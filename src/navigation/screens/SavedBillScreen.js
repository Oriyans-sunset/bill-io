import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Linking,
  Image,
  StatusBar,
  FlatList,
} from "react-native";
import { Button, IconButton, List } from "react-native-paper";

import { colours } from "../../assets/colours";

import { LinearGradient } from "expo-linear-gradient";
import LottieView from "lottie-react-native";
import ImageService from "../../service/Image/ImageService";
import { BlurView } from "expo-blur";

export default function SavedBillScreen({ navigation }) {
  const [bills, setBills] = useState([]);

  useEffect(() => {
    //fetch data from db
    getAllData();
  }, []);

  getAllData = async () => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    const rows = await ImageService.getAllRows();
    setBills(rows._array);
    //console.log(rows);
  };

  const renderItem = ({ item }) => (
    <BlurView intensity={50} tint="light" style={styles.listItem}>
      <List.Item
        title={item.title}
        description={item.amount}
        left={(props) => (
          <Image
            source={{ uri: item.image }}
            style={{ width: 20, height: 42 }}
            resizeMode="contain"
          />
        )}
      />
    </BlurView>
  );

  return (
    <LinearGradient colors={colours.linearGradient} style={styles.container}>
      <LottieView
        style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0 }}
        source={require("../../assets/animations/stars.json")}
        autoPlay
        loop
      />
      <FlatList
        data={bills}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ flexGrow: 1, justifyContent: "flex-start" }}
      />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  listItem: {
    borderRadius: 10,
    overflow: "hidden",
    padding: 10,
  },
});
