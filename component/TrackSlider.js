import { View, Text, StyleSheet } from "react-native";
import React, { useContext } from "react";
import Slider from "@react-native-community/slider";
import { colors } from "./Colors";
import { Context } from "../Context/context";
import momemt from "moment";

const TrackSlider = () => {
  const {
    seekAudio,
    playbackStatus,
    currentAudio,
    soundObj,
    setSoundObj,
    setPlaybackStatus,
    playbackObj
  } = useContext(Context);

  // convert track durationMillis and positionMillis to readable time
  const convertTime = (minutes) => {
    if (minutes) {
      const hrs = minutes / 60;
      const minute = hrs.toString().split(".")[0];
      const percent = parseInt(hrs.toString().split(".")[1].slice(0, 2));
      const sec = Math.ceil((60 * percent) / 100);

      if (parseInt(minute) < 10 && sec < 10) {
        return `0${minute}:0${sec}`;
      }

      if (parseInt(minute) < 10) {
        return `0${minute}:0${sec}`;
      }

      if (parseInt(sec) < 10) {
        return `0${minute}:0${sec}`;
      }
      return `${minute}:${sec}`;
    }
  };

  const renderTrackTime = () => {
    return convertTime(playbackStatus?.positionMillis / 1000);
  };
  return (
    <View style={{ marginTop: 35 }}>
      <Slider
        style={{ width: "100%", height: 12 }}
        minimumValue={0}
        maximumValue={1}
        value={seekAudio()}
        minimumTrackTintColor={colors.purpleColor}
        maximumTrackTintColor={colors.whiteColor}
        thumbTintColor={colors.purpleColor}
        onSlidingStart={async () => {
          if (!soundObj) return;
          try {
            // const status = await playbackObj.setStatusAsync({
            //   // shouldPlay: false,
            // });
            // setSoundObj(status);
          } catch (error) {
            console.log("error", error);
          }
        }}
        onSlidingComplete={async (value) => {
          if (soundObj === null) return;
          // console.log('value', value)
          try {
            const status = await playbackObj.setPositionAsync(
              Math.floor(soundObj?.durationMillis * value)
            );
            setSoundObj(status);
            setPlaybackStatus(status);
          } catch (error) {
            console.log("error", error);
          }
        }}
      />

      <View style={styles.volContainer}>
        <Text style={{ color: colors.subTextColor, fontSize: 10 }}>
          {renderTrackTime()}
        </Text>
        <Text style={{ color: colors.subTextColor, fontSize: 10 }}>
          {convertTime(currentAudio?.duration)}
        </Text>
      </View>
    </View>
  );
};

export default TrackSlider;

const styles = StyleSheet.create({
  volContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: 15,
    marginTop: 5,
  },
});
