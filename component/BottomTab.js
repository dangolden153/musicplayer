import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { colors } from "./Colors";

const BottomTab = () => {
  return (
    <View style={styles.bottomTab}>
      <Text style={styles.text}>
        i'm tryna put you in my worse mood, ah{"\n"} P1 cleaner than{" "}
        <Text style={styles.subText}>your church shoes, ah</Text>
      </Text>
    </View>
  );
};

export default BottomTab;

const styles = StyleSheet.create({
  bottomTab: {
    backgroundColor: colors.tertiaryColor,
    height: 70,
    width: "100%",
    borderTopStartRadius: 10,
    borderTopEndRadius: 10,
    position: "absolute",
    bottom: 0,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: colors.purpleColor,
    fontSize: 15,
    textAlign: "center",
    letterSpacing: 0.6,
  },
  subText: {
    color: colors.subTextColor,
    fontSize: 15,
    letterSpacing: 0.6,
  },
});
