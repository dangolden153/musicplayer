import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  TouchableOpacity,
} from "react-native";
import tw from "tailwind-react-native-classnames";
import { useDispatch, useSelector } from "react-redux";
import { Audio } from "expo-av";
import Slider from "@react-native-community/slider";
import GestureRecognizer from "react-native-swipe-gestures";


const HomePage = () => {
 
 

  // console.log("soundObj", soundObj);

 

 
  // console.log('currentIndex', currentIndex)

  const prevMusic = async () => {
    if (currentIndex === 0) {
      return alert("you are playing the first song");
    }
    const prevMusicIndex = currentIndex - 1;
    const prevMusic = musicData[prevMusicIndex];

    // ******* playing another music**********
    if (soundObj.isLoaded) {
      // setSoundObj(null);
      await playbackObj.stopAsync();
      await playbackObj.unloadAsync();

      const status = await playbackObj.loadAsync(
        {
          uri: prevMusic.audio,
        },
        { shouldPlay: true }
      );

      setSoundObj(status);
      setPlaybackObj(playbackObj);
      setCurrentAudio(prevMusic);
      setCurrentIndex(prevMusicIndex);
      return;
    }
  };

 



  // console.log('soundObj', soundObj)

  return (
    <>
      <SafeAreaView style={tw`bg-white h-full`}>
        <View style={tw`p-5`}>
          <Text>hello world!</Text>
          {musicData.map((audioItem, i) => (
            <TouchableOpacity
              key={i}
              onPress={() => playTrack(audioItem, i)}
              style={tw`bg-red-400 p-4 m-3 flex-1`}
            >
              <Text>{audioItem.title}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <TouchableOpacity
          style={tw`bg-blue-400 p-4 m-3 `}
          onPress={() => prevMusic()}
        >
          <Text>Back</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={tw`bg-green-400 p-4 m-3 `}
          onPress={() => nextMusic()}
        >
          <Text>Next</Text>
        </TouchableOpacity>
        <Slider
          style={{ width: 200, height: 40 }}
          minimumValue={0}
          maximumValue={1}
          value={seekAudio()}
          minimumTrackTintColor="#A9FDD3"
          maximumTrackTintColor="#000000"
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

        {/* <TouchableOpacity style={tw`bg-purple-400 p-4 m-3 flex-1`}> */}
        <GestureRecognizer
          onSwipeLeft={(state) => onSwipeLeft(state)}
          onSwipeRight={(state) => onSwipeRight(state)}
          config={config}
          style={{
            flex: 1,
            backgroundColor: "pink",
          }}
        >
          <Text>onSwipe callback received gesture</Text>
        </GestureRecognizer>
        {/* </TouchableOpacity> */}
      </SafeAreaView>
    </>
  );
};

export default HomePage;

const styles = StyleSheet.create({});
