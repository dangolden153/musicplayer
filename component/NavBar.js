import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { colors } from "./Colors";
import pics from "../assets/images/dp.jpg";

const NavBar = () => {
  return (
    <View style={styles.navBar}>
      <View style={styles.rowSection}>
        <Text style={styles.text}>radiohead</Text>
        <Image
          source={pics}
          style={{ width: 40, height: 40, borderRadius: 10 }}
        />
      </View>
    </View>
  );
};

export default NavBar;

const styles = StyleSheet.create({
  navBar: {
    top: 0,
    backgroundColor: colors.tertiaryColor,
    height: 80,
    borderBottomStartRadius: 15,
    borderBottomEndRadius: 15,
    padding: 10,
    justifyContent: "center",
  },
  rowSection: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 17,
    paddingHorizontal: 15,
  },
  text: {
    color: colors.whiteColor,
    fontSize: 18,
    fontWeight: "bold",
    letterSpacing:.6,
    textTransform: "uppercase",
  },
});
