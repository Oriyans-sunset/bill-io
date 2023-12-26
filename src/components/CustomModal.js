import React, { useState } from "react";
import {
  Modal,
  Portal,
  TextInput,
  Button,
  PaperProvider,
  Text,
} from "react-native-paper";
import { colours } from "../assets/colours";
import ImageService from "../service/Image/ImageService";

const CustomModal = ({ visible, imageUri, navigation }) => {
  const [isModalVisible, setIsModalVisible] = useState(visible);
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");

  const closeModal = () => {
    setIsModalVisible(false);
  };

  function addToDatabase() {
    let amountF;
    if (amount !== "") {
      amountF = parseFloat(amount);
    }

    //save picture to db
    ImageService.saveToDatabase(imageUri, title, amountF);

    //close modal
    closeModal();
    navigation.navigate("Bill");
  }

  return (
    <PaperProvider>
      <Portal>
        <Modal
          visible={isModalVisible}
          contentContainerStyle={{
            backgroundColor: "rgba(255, 255, 255, 0.2)",
            borderColor: colours.black,
            borderWidth: 1,
            padding: 20,
            width: "80%",
            height: 300,
            alignSelf: "center",
            borderRadius: 10,
            marginBottom: 100,
            elevation: 50,
            justifyContent: "space-between",
          }}
        >
          <TextInput
            mode="flat"
            label={
              <Text style={{ fontFamily: "handjet", color: colours.white }}>
                Enter Title
              </Text>
            }
            textColor={colours.lightBlue}
            value={title}
            onChangeText={(text) => setTitle(text)}
            underlineStyle={{ width: 0 }}
            style={{
              borderColor: colours.black,
              backgroundColor: colours.black,
              borderRadius: 20,
              marginBottom: 7,
            }}
            theme={{
              colors: {
                primary: colours.white,
              },
            }}
          />
          <TextInput
            mode="flat"
            label={
              <Text style={{ fontFamily: "handjet", color: colours.white }}>
                Enter Amount
              </Text>
            }
            textColor={colours.lightBlue}
            value={amount}
            onChangeText={(text) => setAmount(text)}
            underlineStyle={{ width: 0 }}
            keyboardType="numeric"
            style={{
              borderColor: colours.black,
              backgroundColor: colours.black,
              borderRadius: 20,
              marginBottom: 7,
            }}
            theme={{
              colors: {
                primary: colours.white,
              },
            }}
          />

          <Button
            onPress={addToDatabase}
            style={{ backgroundColor: colours.black }}
            labelStyle={{
              fontSize: 20,
              padding: 2,
            }}
          >
            <Text style={{ fontFamily: "handjet", color: colours.white }}>
              Submit
            </Text>
          </Button>
          <Button
            onPress={() => {
              navigation.navigate("Home");
            }}
            style={{ backgroundColor: colours.lightBlue }}
            labelStyle={{
              fontSize: 20,
              padding: 2,
            }}
          >
            <Text style={{ fontFamily: "handjet", color: colours.black }}>
              Cancel
            </Text>
          </Button>
        </Modal>
      </Portal>
    </PaperProvider>
  );
};

export default CustomModal;
