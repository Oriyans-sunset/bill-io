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
import * as Localization from "expo-localization";

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
  };

  const renderItem = ({ item }) => {
    // Determine device currency (falls back to USD)
    const currencyCode =
      Localization.currency || (Localization.isoCurrencyCodes?.[0] ?? "USD");

    // Format the amount using device locale & currency
    const formattedAmount = new Intl.NumberFormat(Localization.locale, {
      style: "currency",
      currency: currencyCode,
    }).format(Number(item.amount));

    return (
      <BlurView intensity={60} tint="light" style={styles.listItem}>
        <List.Item
          title={item.title}
          titleStyle={styles.title}
          description={formattedAmount}
          descriptionStyle={styles.amount}
          left={() => (
            <Image
              source={{ uri: item.image }}
              style={styles.thumbnail}
              resizeMode="cover"
            />
          )}
        />
      </BlurView>
    );
  };

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
    borderRadius: 12,
    overflow: "hidden",
    padding: 12,
    marginBottom: 12,
    backgroundColor: "rgba(255,255,255,0.3)",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  thumbnail: {
    width: 48,
    height: 48,
    borderRadius: 8,
    marginRight: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1e1e1e",
  },
  amount: {
    fontSize: 14,
    fontWeight: "500",
    color: "#374151",
  },
});
