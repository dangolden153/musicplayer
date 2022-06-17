import { StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";
import React, { useContext } from "react";
import { Feather } from "@expo/vector-icons";
import { colors } from "./Colors";
import { Context } from "../Context/context";
import { useNavigation } from "@react-navigation/native";

const MusicItem = ({ item, index }) => {
  const navigation = useNavigation();
  const { playTrack } = useContext(Context);
  // console.log('item', item)

  const handleClick = () => {
    if (!item) return;
    playTrack(item, index);
    navigation.navigate("play", { item, index });
  };
  const img =
    "https://images.unsplash.com/photo-1487180144351-b8472da7d491?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=872&q=80";

  return (
    <TouchableOpacity onPress={() => handleClick()} style={styles.container}>
      <View style={styles.img_text}>
        <Image source={{ uri: item?.imageUri || img }} style={styles.image} />
        <View>
          <Text numberOfLines={1} style={styles.textTitle}>
            {item?.filename || item?.artist}
          </Text>
          <Text numberOfLines={1} style={styles.artist}>
            {item?.filename || item?.title}
          </Text>
        </View>
      </View>

      <TouchableOpacity>
        <Feather name="more-vertical" size={24} color="white" />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

export default MusicItem;

const styles = StyleSheet.create({
  image: {
    height: 40,
    width: 40,
    borderRadius: 100,
    marginRight: 15,
  },
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 15,
  },
  img_text: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  textTitle: {
    color: "white",
    fontWeight: "500",
    fontSize: 16,
    textTransform: "capitalize",
    width: 100,
  },
  artist: {
    color: colors.subTextColor,
    fontWeight: "500",
    fontSize: 16,
    textTransform: "capitalize",
    width: 250,
  },
});
