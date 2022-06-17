import { View, Text, TouchableOpacity, StyleSheet, useWindowDimensions } from "react-native";
import React from "react";
import Slider from "@react-native-community/slider";
import { colors } from "./Colors";
import { FontAwesome } from "@expo/vector-icons";

const VolumeTracker = () => {
  return (
    <View>
      <Slider
        style={{ width: "100%", height: 12,  }}
        minimumValue={0}
        maximumValue={1}
        // value={seekAudio()}
        minimumTrackTintColor={colors.brownColor}
        maximumTrackTintColor={colors.brownColor}
        thumbTintColor={colors.brownColor}
        // onSlidingStart={async () => {
        //   if (!soundObj) return;
        //   try {
        //     // const status = await playbackObj.setStatusAsync({
        //     //   // shouldPlay: false,
        //     // });
        //     // setSoundObj(status);
        //   } catch (error) {
        //     console.log("error", error);
        //   }
        // }}
        // onSlidingComplete={async (value) => {
        //   if (soundObj === null) return;
        //   // console.log('value', value)
        //   try {
        //     const status = await playbackObj.setPositionAsync(
        //       Math.floor(soundObj?.durationMillis * value)
        //     );
        //     setSoundObj(status);
        //     setPlaybackStatus(status);
        //   } catch (error) {
        //     console.log("error", error);
        //   }
        // }}
      />

      <View style={styles.volContainer}>
        <TouchableOpacity>
          <FontAwesome name="volume-off" size={24} color={colors.brownColor} />
        </TouchableOpacity>


        <TouchableOpacity>
          <FontAwesome name="volume-up" size={20} color={colors.brownColor} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default VolumeTracker;


const styles = StyleSheet.create({
    volContainer:{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        width: "100%",
        paddingHorizontal:15,
        marginTop: 5,

    }
})