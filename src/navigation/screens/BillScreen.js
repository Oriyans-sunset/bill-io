import * as React from "react";
import { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  Button,
} from "react-native";
import { colours } from "../../assets/colours";
import { LinearGradient } from "expo-linear-gradient";
import { Appbar, Icon, IconButton } from "react-native-paper";
import { BlurView } from "expo-blur";
import ImageService from "../../service/Image/ImageService";
import Swiper from "react-native-deck-swiper";
import Card from "../../components/Card";

export default function HomeScreen({ navigation }) {
  const [bills, setBills] = useState([]);
  const [index, setIndex] = useState(0);

  const swiperRef = React.createRef();

  useEffect(() => {
    //get all rows from db
    console.log("use effect called");
    getAllData();
  }, []);

  getAllData = async () => {
    const rows = await ImageService.getAllRows();
    setBills(rows._array);
  };

  return (
    <LinearGradient colors={colours.linearGradient} style={styles.container}>
      <Appbar.Header
        elevated="true"
        style={{
          shadowColor: "black",
          shadowOpacity: 0.9,
          shadowOffset: { width: 0, height: 2 },
          shadowRadius: 10,
          elevation: 50,
          backgroundColor: "black",
        }}
      >
        <Appbar.Action
          icon={require("../../assets/images/bill-io-logo.png")}
          size={45}
          color={colours.seaBlue}
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
          icon="camera-outline"
          size={30}
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
            onSwipedAll={() => {
              console.log("onSwipedAll");
            }}
            backgroundColor={"transparent"}
            showSecondCard={true}
            stackSize={5}
            stackScale={5}
            stackSeparation={32}
            disableBottomSwipe
            disableTopSwipe
            infinite
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
              backgroundColor: "transparent",
              flexDirection: "row",
              position: "absolute",
              bottom: 5,
              alignSelf: "center",
              width: "70%",
              justifyContent: "space-between",
            }}
          >
            <IconButton
              icon="delete"
              size={35}
              iconColor={colours.warning}
              onPress={() => {
                swiperRef.current.swipeLeft();
              }}
              mode="contained-tonal"
            />
            <IconButton
              icon="check"
              size={35}
              iconColor={colours.success}
              onPress={() => {
                swiperRef.current.swipeRight();
              }}
              mode="contained"
            />
          </View>
        </>
      ) : (
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <Text style={{ fontFamily: "handjet", fontSize: 40 }}>
            Loading...
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
