import React, { useState, useRef, useEffect, Linking } from "react";
import { View, Text, StyleSheet } from "react-native";
import { colours } from "../../assets/colours";
import CustomButton from "../../components/Button";
import CustomModal from "../../components/CustomModal";
import { Image } from "expo-image";

export default function DisplayPictureScreen({ route, navigation }) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const imageUri = `data:image/jpeg;base64,${route.params.base64String}`;

  function handleBillPictureConfirm() {
    setIsModalVisible(true);
  }

  return (
    <View style={styles.container}>
      {isModalVisible ? (
        <CustomModal
          visible={isModalVisible}
          imageUri={imageUri}
          navigation={navigation}
        />
      ) : (
        <>
          <Image
            style={styles.image}
            source={{ uri: imageUri }}
            contentFit="cover"
            transition={1000}
          ></Image>
          <View style={styles.buttonContainer}>
            <CustomButton
              label="Retake"
              icon="restart"
              colour={colours.seaBlue}
              textColour={colours.white}
              iconSize={25}
              onPress={() => navigation.goBack()}
            ></CustomButton>
            <CustomButton
              label="Confirm"
              icon="check"
              colour={colours.black}
              iconSize={25}
              textColour={colours.white}
              onPress={handleBillPictureConfirm}
            ></CustomButton>
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colours.lightBlue,
  },
  image: {
    flex: 1,
    width: "100%",
  },
  buttonContainer: {
    flexDirection: "row",
    alignSelf: "center",
    justifyContent: "space-evenly",
    position: "absolute",
    bottom: 20,
    width: "100%",
  },
});
