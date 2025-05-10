import React from "react";
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  Linking,
  TouchableOpacity,
} from "react-native";
import { colours } from "../../assets/colours";
import { IconButton } from "react-native-paper";
import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";

export default function PrivacyScreen({ navigation }) {
  const openURL = (url) => Linking.openURL(url);

  return (
    <LinearGradient
      colors={["#0d6cf9", "#7fc4ff", "#fff7d6"]}
      style={styles.gradient}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.headerRow}>
          <IconButton
            icon="chevron-left"
            size={26}
            onPress={() => navigation.goBack()}
          />
          <Text style={styles.screenTitle}>Privacy & Acknowledgements</Text>
        </View>

        {/* Privacy Policy */}
        <BlurView intensity={60} tint="light" style={styles.sectionBox}>
          <Text style={styles.sectionTitle}>Privacy Policy</Text>
          <Text style={styles.paragraph}>
            Bill.io stores your receipt images{" "}
            <Text style={styles.bold}>only</Text> on your device. The app does
            not upload, share, or transmit any personal data to external
            servers. All currency and locale information is read from your
            device settings and never leaves your phone.
          </Text>
          <Text style={styles.paragraph}>
            We request camera and media‑library permissions{" "}
            <Text style={styles.bold}>solely</Text> to capture receipts and save
            processed images. You can revoke these permissions at any time in
            your system Settings without breaking other parts of the app.
          </Text>
        </BlurView>

        {/* Data Usage */}
        <BlurView intensity={60} tint="light" style={styles.sectionBox}>
          <Text style={styles.sectionTitle}>Data Usage</Text>
          <Text style={styles.paragraph}>
            • No third‑party analytics SDKs{"\n"}• No ad networks{"\n"}• No
            background data collection{"\n"}• No user tracking or profiling
            {"\n"}
          </Text>
        </BlurView>

        {/* Open‑source Acknowledgements */}
        <BlurView intensity={60} tint="light" style={styles.sectionBox}>
          <Text style={styles.sectionTitle}>Open‑source Libraries</Text>
          <Text style={styles.paragraph}>
            Bill.io is built with love on top of the following open‑source
            projects:
          </Text>
          <TouchableOpacity onPress={() => openURL("https://reactnative.dev/")}>
            <Text style={styles.link}>• React Native</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => openURL("https://docs.expo.dev/versions/latest/")}
          >
            <Text style={styles.link}>• Expo SDK</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              openURL("https://github.com/mrousavy/react-native-vision-camera")
            }
          >
            <Text style={styles.link}>• react‑native‑vision‑camera</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              openURL("https://callstack.github.io/react-native-paper")
            }
          >
            <Text style={styles.link}>• React Native Paper</Text>
          </TouchableOpacity>
        </BlurView>

        {/* Credits */}
        <BlurView intensity={60} tint="light" style={styles.sectionBox}>
          <Text style={styles.sectionTitle}>Credits</Text>
          <Text style={styles.paragraph}>
            Designed & developed by Priyanshu Rastogi as an open‑source project
            for personal finance tracking. Icons from Material Community Icons.
            Blur effects provided by{" "}
            <Text
              style={styles.link}
              onPress={() =>
                openURL(
                  "https://github.com/react-native-community/react-native-blur"
                )
              }
            >
              react‑native‑blur
            </Text>
            . Handjet typeface courtesy of{" "}
            <Text
              style={styles.link}
              onPress={() =>
                openURL("https://fonts.google.com/specimen/Handjet")
              }
            >
              Google Fonts
            </Text>
            .
          </Text>

          <Text style={styles.paragraphCenter}>
            © {new Date().getFullYear()} Bill.io • All rights reserved
          </Text>
        </BlurView>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingTop: 10,
    backgroundColor: colours.background || "#FFFFFF",
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  screenTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: colours.darkBlue || "#1e1e1e",
  },
  sectionTitle: {
    marginTop: 18,
    marginBottom: 6,
    fontSize: 16,
    fontWeight: "600",
    color: colours.darkBlue || "#1e1e1e",
  },
  paragraph: {
    fontSize: 14,
    color: "#374151",
    lineHeight: 20,
    marginBottom: 4,
  },
  paragraphCenter: {
    fontSize: 12,
    textAlign: "center",
    color: "#6b7280",
    marginVertical: 24,
  },
  bold: {
    fontWeight: "700",
  },
  link: {
    fontSize: 14,
    color: colours.lightBlue || "#0ea5e9",
    marginBottom: 4,
  },
  sectionBox: {
    borderRadius: 12,
    padding: 12,
    marginBottom: 14,
    backgroundColor: "rgba(255,255,255,0.3)",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  gradient: {
    flex: 1,
  },
});
