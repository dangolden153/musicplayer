import {
  View,
  Text,
  Image,
  StyleSheet,
  useWindowDimensions,
  TouchableOpacity,
} from "react-native";
import React, { useState, useContext } from "react";
import { colors } from "../component/Colors";
import pics from "../assets/images/musicBg.jpg";
import { StatusBar } from "expo-status-bar";
import { Feather, Entypo, FontAwesome5 } from "@expo/vector-icons";
import TrackSlider from "../component/TrackSlider";
import VolumeTracker from "../component/VolumeTracker";
import BottomTab from "../component/BottomTab";
import { Context } from "../Context/context";
import GestureRecognizer from "react-native-swipe-gestures";
import { useNavigation } from "@react-navigation/native";

const NowPlayingScreen = ({ route }) => {
  const { height } = useWindowDimensions();
  const {
    playTrack,
    soundObj,
    isPlaying,
    nextMusic,
    prevMusic,
    onSwipeLeft,
    onSwipeRight,
    currentAudio,
    config,
  } = useContext(Context);
  const { index, item } = route?.params;
  const navigation = useNavigation()
  // console.log('currentAudio', currentAudio)

  const togglePlayer = () => {
    playTrack(item, index);
  };

  const img =
  "https://images.unsplash.com/photo-1511379938547-c1f69419868d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80";

  return (
    <>
      <View style={styles.container}>
        <StatusBar style="light" />

        {/* up section for background picture */}
        <GestureRecognizer
          onSwipeLeft={(state) => onSwipeLeft(state)}
          onSwipeRight={(state) => onSwipeRight(state)}
          config={config}
          style={styles.picsBackground}
        >
          <TouchableOpacity onPress={()=>navigation.goBack()}
            style={{ position: "absolute", top: 20, right: 20 }}
          >
            <FontAwesome5 name="angle-down" size={30} color="black" />
          </TouchableOpacity>
          <Image
            source={{uri: currentAudio?.imageUri || img}}
            style={{ width: "100%", height: height * 0.45,zIndex:-1 }}
          />
          <View
            style={{
              top: -12,
              backgroundColor: `${colors.primaryColor}90`,
              height: 35,
            }}
          />
          <View
            style={{
              top: -10,
              backgroundColor: `${colors.primaryColor}99`,
              height: 35,
            }}
          />
        </GestureRecognizer>

        {/* down section for music buttons */}
        <View style={styles.musicContent}>
          {/* music title and more icon */}
          <View style={styles.musicTitle_moreIcon}>
            <View>
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: "bold",
                  color: colors.mainTextColor,
                  textTransform: "capitalize",
                  width: 150,
                }}
                numberOfLines={1}
              >
                {currentAudio?.filename || currentAudio?.artist}
              </Text>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "bold",
                  color: colors.subTextColor,
                  textTransform: "capitalize",
                  width: 300,
                }}
                numberOfLines={1}
              >
                {currentAudio?.filename || currentAudio?.title}
              </Text>
            </View>

            <TouchableOpacity>
              <Feather name="more-vertical" size={24} color="white" />
            </TouchableOpacity>
          </View>

          {/* music duration slider*/}
          <TrackSlider />

          {/* prev play and next button*/}
          <View style={styles.controllerBtn}>
            <TouchableOpacity onPress={() => prevMusic()}>
              <Entypo name="controller-jump-to-start" size={28} color="white" />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.playBg}
              onPress={() => togglePlayer()}
              activeOpacity={0.5}
            >
              {isPlaying ? (
                <Entypo name="controller-paus" size={28} color="white" />
              ) : (
                <Entypo name="controller-play" size={28} color="white" />
              )}
            </TouchableOpacity>

            <TouchableOpacity onPress={() => nextMusic()}>
              <Entypo name="controller-next" size={28} color="white" />
            </TouchableOpacity>
          </View>

          {/*volume slider*/}
          <VolumeTracker />
        </View>

        {/*bottom Tab*/}
        <BottomTab />
      </View>
    </>
  );
};

export default NowPlayingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primaryColor,
    // position:"relative",
  },

  picsBackground: {
    position: "relative",
    backgroundColor: colors.primaryColor,
  },
  musicContent: {
    paddingHorizontal: 20,
  },
  musicTitle_moreIcon: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  },
  playBg: {
    width: 50,
    height: 50,
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.purpleColor,
    marginHorizontal: 40,
  },
  controllerBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 25,
  },
});
