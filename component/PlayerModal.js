import { Modal, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useContext } from "react";
import { colors } from "./Colors";
import { Context } from "../Context/context";
import pics from "../assets/images/musicBg.jpg";
import { Image } from "react-native";
import { Entypo } from "@expo/vector-icons";

const PlayerModal = ({ item, index }) => {
  const { playTrack, soundObj, currentAudio, currentIndex } =
    useContext(Context);
    
  const togglePlayer = () => {
    playTrack(currentAudio, currentIndex);
  };

  const img =
  "https://images.unsplash.com/photo-1511379938547-c1f69419868d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80";

  //   console.log('soundObj', isPlaying)
  return (
    <TouchableOpacity activeOpacity={.6} style={styles.bottomTab}>
      {/* image  */}
      <View style={styles.image_text}>
        <Image
          source={{uri: currentAudio?.imageUri || img}}
          style={{ width: 50, height: 50, borderRadius: 100, marginRight: 15 }}
        />

        {/* track title and sub title  */}
        <View>
          <Text style={styles.text} numberOfLines={1}>
            {currentAudio?.filename || currentAudio?.artist}
          </Text>
          <Text style={styles.subText} numberOfLines={1}>
            {currentAudio?.filename || currentAudio?.title}
          </Text>
        </View>
      </View>

      {/* play button controller  */}
      <TouchableOpacity
        style={styles.playBg}
        onPress={() => togglePlayer()}
        activeOpacity={0.5}
      >
        {soundObj?.isPlaying ? (
          <Entypo name="controller-paus" size={28} color="white" />
        ) : (
          <Entypo name="controller-play" size={28} color="white" />
        )}
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

export default PlayerModal;

const styles = StyleSheet.create({
  bottomTab: {
    backgroundColor: colors.tertiaryColor,
    height: 70,
    width: "90%",
    borderRadius: 100,
    alignSelf: "center",
    position: "absolute",
    bottom: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  image_text: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 15,
    fontWeight: "bold",
    color: colors.mainTextColor,
    textTransform: "capitalize",
    width: 100,
  },
  subText: {
    fontSize: 13,
    fontWeight: "bold",
    color: colors.subTextColor,
    textTransform: "capitalize",
    width: 150,
  },
  playBg: {
    width: 50,
    height: 50,
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
    borderColor: colors.purpleColor,
    borderWidth: 2,
  },
  border_1: {
    borderWidth: 2,
    borderColor: "red",
    width: 45,
    height: 45,
    borderRadius: 100,
    position: "absolute",
  },
  border_2: {
    borderWidth: 4,
    borderColor: "green",
    width: 45,
    height: 45,
    borderRadius: 100,
    position: "absolute",
  },
});
