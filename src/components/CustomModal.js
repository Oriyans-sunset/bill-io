import React, { useState, useEffect } from "react";
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
  const [titleError, setTitleError] = useState("");
  const [amountError, setAmountError] = useState("");

  useEffect(() => {
    setIsModalVisible(visible);
  }, [visible]);

  const closeModal = () => {
    setIsModalVisible(false);
  };

  function addToDatabase() {
    let hasError = false;

    // Reset errors
    setTitleError("");
    setAmountError("");

    if (title.trim() === "") {
      setTitleError("Title cannot be empty");
      hasError = true;
    }

    const parsedAmount = parseFloat(amount);
    if (amount.trim() === "") {
      setAmountError("Amount cannot be empty");
      hasError = true;
    } else if (isNaN(parsedAmount)) {
      setAmountError("Amount must be a number");
      hasError = true;
    } else if (parsedAmount < 0) {
      setAmountError("Amount must be positive");
      hasError = true;
    }

    if (hasError) return;

    // Save picture to DB
    ImageService.saveToDatabase(imageUri, title, parsedAmount);

    // Close modal and navigate
    closeModal();
    navigation.navigate("Bill");
  }

  return (
    <PaperProvider>
      <Portal>
        <Modal
          visible={isModalVisible}
          contentContainerStyle={{
            backgroundColor: colours.lightBlue,
            borderColor: colours.black,
            borderWidth: 3,
            padding: 20,
            width: "80%",
            height: 350,
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
            error={!!titleError}
          />
          {titleError ? (
            <Text style={{ color: "red", fontSize: 12 }}>{titleError}</Text>
          ) : null}

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
            error={!!amountError}
          />
          {amountError ? (
            <Text style={{ color: "red", fontSize: 12 }}>{amountError}</Text>
          ) : null}

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
