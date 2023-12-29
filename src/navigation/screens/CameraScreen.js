import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Linking,
  Image,
  StatusBar,
} from "react-native";
import { Button, IconButton } from "react-native-paper";
import { colours } from "../../assets/colours";
import { Camera, useCameraDevice } from "react-native-vision-camera";
import convertToBase64 from "../../utility/base64";
import { useIsFocused } from "@react-navigation/native";

export default function CameraScreen({ navigation }) {
  const cameraDevice = useRef(null);
  const device = useCameraDevice("back");
  const [hasPermission, setHasPermission] = useState(false);

  useEffect(() => {
    //check for permission
    checkPermission();
  }, []);

  async function checkPermission() {
    const permission = await Camera.getCameraPermissionStatus();
    console.log("permission: ", permission);

    if (permission === "granted") {
      setHasPermission(true);
    } else if (permission === "not-determined") {
      await requestPermission();
    } else if (permission === "denied") {
      setHasPermission(false);
    }

    return;
  }

  async function requestPermission() {
    const newCameraPermission = await Camera.requestCameraPermission();

    if (newCameraPermission === "granted") {
      setHasPermission(true);
    } else {
      setHasPermission(false);
    }
    return;
  }

  const handleTakePicture = async () => {
    const file = await cameraDevice.current.takePhoto({
      qualityPrioritization: "speed",
      flash: "off",
      enableShutterSound: false,
    });
    //file path
    const filePath = `file://${file.path}`;

    //navigate to display image
    //convert to base64 to send to next screen
    const base64String = await convertToBase64(filePath);

    //console.log("base64String: ", base64String);
    navigation.navigate("DisplayPicture", { base64String: base64String });
  };

  return (
    <>
      {!hasPermission ? (
        <View style={styles.warning}>
          <Text style={{ textAlign: "center", marginBottom: 30 }}>
            Cannot access camera. Please grant permission to the camera.
          </Text>
          <Button
            icon="arrow-top-right"
            mode="contained-tonal"
            buttonColor={colours.lightBlue}
            onPress={() => {
              openSettings();
            }}
          >
            Open Settings
          </Button>
        </View>
      ) : (
        <View style={styles.container}>
          <Camera
            style={styles.camera}
            device={device}
            ref={cameraDevice}
            isActive={true}
            photo={true}
          />
          <IconButton
            style={{
              alignSelf: "center",
              marginBottom: 40,
            }}
            icon="camera-iris"
            mode="outlined"
            iconColor="black"
            size={40}
            onPress={() => {
              handleTakePicture();
            }}
          ></IconButton>
          <IconButton
            style={styles.buttonContainer}
            icon="window-close"
            mode="outlined"
            iconColor="black"
            size={15}
            onPress={() => {
              navigation.goBack();
            }}
          ></IconButton>
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
  },
  warning: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  camera: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-end",
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  buttonContainer: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    top: 10,
    right: 10,
  },
  image: {
    flex: 1,
    width: "100%",
    flexDirection: "column",
    justifyContent: "flex-end",
    paddingBottom: 40,
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
});
