import * as React from "react";
import { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  Button,
  ActivityIndicator,
} from "react-native";
import { colours } from "../../assets/colours";
import { LinearGradient } from "expo-linear-gradient";
import { Appbar, Icon, IconButton } from "react-native-paper";
import { BlurView } from "expo-blur";
import ImageService from "../../service/Image/ImageService";
import Swiper from "react-native-deck-swiper";
import Card from "../../components/Card";
import LottieView from "lottie-react-native";
import { useIsFocused } from "@react-navigation/native";

export default function HomeScreen({ navigation }) {
  const [bills, setBills] = useState([]);
  const [index, setIndex] = useState(0);
  const isFocused = useIsFocused();

  const swiperRef = React.createRef();

  useEffect(() => {
    //get all rows from db
    console.log("use effect called");
    getAllData();
  }, [isFocused]);

  getAllData = async () => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    const rows = await ImageService.getAllRows();
    setBills(rows._array);
    //console.log(rows);
  };

  return (
    <LinearGradient colors={colours.linearGradient} style={styles.container}>
      <LottieView
        style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0 }}
        source={require("../../assets/animations/stars.json")}
        autoPlay
        loop
      />
      <Appbar.Header
        elevated="true"
        style={{
          shadowOpacity: 0.9,
          shadowOffset: { width: 30, height: 30 },
          shadowRadius: 10,
          elevation: 50,
          backgroundColor: colours.black,
        }}
      >
        <Appbar.Action
          icon={require("../../assets/images/bill-io-logo.png")}
          size={45}
          color={colours.seaYellow}
          onPress={() => {
            navigation.navigate("Home");
          }}
        />

        <Appbar.Content
          title="Bill.io"
          titleStyle={{
            fontFamily: "handjet",
            fontSize: 25,
            color: colours.white,
          }}
        />
        <Appbar.Action
          icon="note-check"
          size={27}
          iconColor={colours.white}
          onPress={() => navigation.navigate("SavedBill")}
        />
        <Appbar.Action
          icon="camera"
          size={27}
          iconColor={colours.white}
          onPress={() => navigation.navigate("Camera")}
        />
      </Appbar.Header>

      {bills.length > 0 ? (
        <>
          <Swiper
            ref={swiperRef}
            cards={bills}
            renderCard={(card) => {
              return <Card card={card} />;
            }}
            cardIndex={index}
            onSwiped={(cardIndex) => {
              console.log(cardIndex);
              setIndex(cardIndex);
            }}
            onSwipedLeft={(cardIndex) => {
              console.log("swiped left");
              //delete from db
              ImageService.deleteRow(bills[cardIndex].id);
            }}
            onSwipedAll={() => {
              console.log("swiped all");
              setBills([]);
            }}
            backgroundColor={"transparent"}
            showSecondCard={true}
            stackSize={5}
            stackScale={5.5}
            stackSeparation={32}
            disableBottomSwipe
            disableTopSwipe
            overlayLabels={{
              left: {
                title: "DELETE",
                style: {
                  label: {
                    backgroundColor: colours.warning,

                    color: colours.black,
                    fontSize: 12,
                  },
                  wrapper: {
                    flexDirection: "column",
                    alignItems: "flex-end",
                    justifyContent: "flex-start",
                    marginTop: 40,
                    marginLeft: -11,
                  },
                },
              },
              right: {
                title: "KEEP",
                style: {
                  label: {
                    backgroundColor: colours.success,
                    color: colours.white,
                    fontSize: 12,
                  },
                  wrapper: {
                    flexDirection: "column",
                    alignItems: "flex-start",
                    justifyContent: "flex-start",
                    marginTop: 40,
                    marginLeft: 11,
                  },
                },
              },
            }}
          ></Swiper>
          <View
            style={{
              flexDirection: "row",
              position: "absolute",
              bottom: 7,
              alignSelf: "center",
              width: "70%",
              justifyContent: "space-between",
            }}
          >
            <IconButton
              icon="delete"
              size={35}
              iconColor={colours.black}
              onPress={() => {
                swiperRef.current.swipeLeft();
              }}
              mode="contained-tonal"
              containerColor={colours.warning}
            />
            <IconButton
              icon="check"
              size={35}
              iconColor={colours.white}
              onPress={() => {
                swiperRef.current.swipeRight();
              }}
              mode="contained"
              containerColor={colours.success}
            />
          </View>
        </>
      ) : (
        // Render a message if bills array is empty
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <Text style={{ fontFamily: "handjet", fontSize: 40 }}>
            No bills available.
          </Text>
          <Text
            style={{
              fontFamily: "handjet",
              fontSize: 15,
              color: colours.lightBlue,
            }}
          >
            P.S. Add a bill by pressing the camera icon!
          </Text>
        </View>
      )}
    </LinearGradient>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
