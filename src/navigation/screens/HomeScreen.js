import * as React from "react";
import { View, StyleSheet, Image, Text } from "react-native";
import { IconButton } from "react-native-paper";
import CustomButton from "../../components/Button";
import { colours } from "../../assets/colours";
import { LinearGradient } from "expo-linear-gradient";
import LottieView from "lottie-react-native";
import Title from "../../components/Title";
import { BlurView } from "expo-blur";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen({ navigation }) {
  function navigateToCamera() {
    navigation.navigate("Camera");
  }
  return (
    <LinearGradient colors={colours.linearGradient} style={styles.container}>
      <LottieView
        style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0 }}
        source={require("../../assets/animations/stars.json")}
        autoPlay
        loop
      />
      <View style={styles.iconBar}></View>

      <BlurView intensity={17} tint="light" style={styles.centerContainer}>
        <IconButton
          style={{ position: "absolute", top: 10, right: 10 }}
          icon="file-multiple"
          mode="contained"
          iconColor={colours.black}
          containerColor="transparent"
          size={18}
          onPress={() => {
            navigation.navigate("Bill");
          }}
        ></IconButton>
        <Image
          source={require("../../assets/images/bill-io-logo.png")}
          tintColor={colours.seaYellow}
          resizeMode="contain"
          style={{ marginBottom: -30 }}
        ></Image>
        <Title title="Bill.io"></Title>

        <CustomButton
          onPress={navigateToCamera}
          colour={colours.seaYellow}
          label="Add a bill"
          icon="camera"
          iconSize={23}
          textColour={colours.black}
        ></CustomButton>
      </BlurView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  centerContainer: {
    padding: 20,
    paddingBottom: 43,
    overflow: "hidden",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "space-evenly",
    width: "85%",
    marginTop: -80,
    borderWidth: 2,
  },
  iconBar: {
    position: "absolute",
    top: 25,
    right: 15,
    borderRadius: 50,
  },
});
