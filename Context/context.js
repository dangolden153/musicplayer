import React, { useEffect, useState } from "react";
import { Audio } from "expo-av";
import * as MediaLibrary from "expo-media-library";

export const Context = React.createContext();

const AppState = ({ children }) => {
  const [currentAudio, setCurrentAudio] = useState(null);
  const [soundObj, setSoundObj] = useState(null);
  const [playbackObj, setPlaybackObj] = useState(null);
  const [playbackStatus, setPlaybackStatus] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [musicData, setMusicData] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);

  //   *********get permission******************
  const getPermission = async () => {
    const permission = await MediaLibrary.getPermissionsAsync();
    const { status, granted } = permission;
    if (granted === false) {
      const response = await MediaLibrary.requestPermissionsAsync();
      //  console.log('response', response)
      if (response?.granted) {
        const media = await MediaLibrary.getAssetsAsync({
          mediaType: "audio",
        });
        setMusicData(media?.assets);
        //   console.log("media", media);
        return;
      }
      return;
    }
    if (granted) {
      const media = await MediaLibrary.getAssetsAsync({
        mediaType: "audio",
      });
      setMusicData(media?.assets);
      //   console.log("media", media);
      return;
    }
    console.log("permission", permission);
  };

  useEffect(() => {
    getPermission();
  }, [musicData]);

  // ******play Track*******
  const playTrack = async (audio, audioIndex) => {
    // console.log("audio", audio);
    console.log("audioIndex", audioIndex);
    // ******* playing music**********
    if (soundObj === null && audio) {
      const playbackObj = new Audio.Sound();
      playbackObj.setOnPlaybackStatusUpdate((playbackStatus) => {
        setPlaybackStatus(playbackStatus);
        // setPositionMillis(playbackStatus?.positionMillis)
      });
      const status = await playbackObj.loadAsync(
        {
          uri: audio?.uri,
        },
        { shouldPlay: true }
      );

      setSoundObj(status);
      setPlaybackObj(playbackObj);
      setCurrentAudio(audio);
      setCurrentIndex(audioIndex);
      setIsPlaying(true);
      return;
    }
    // ******* pausing the music**********
    if (
      soundObj.isLoaded &&
      soundObj.isPlaying &&
      currentAudio.id === audio.id
    ) {
      const status = await playbackObj.setStatusAsync({ shouldPlay: false });
      setSoundObj(status);
      setIsPlaying(false);

      return;
    }

    // ******* resuming the music**********
    if (
      soundObj.isLoaded &&
      !soundObj.isPlaying &&
      currentAudio.id === audio.id
    ) {
      const status = await playbackObj.playAsync({ shouldPlay: false });
      setSoundObj(status);
      setIsPlaying(true);

      return;
    }

    // ******* playing another music ********
    if (soundObj.isLoaded && currentAudio.id !== audio.id) {
      setSoundObj(null);
      await playbackObj.stopAsync();
      await playbackObj.unloadAsync();
      const status = await playbackObj.loadAsync(
        {
          uri: audio.uri,
        },
        { shouldPlay: true }
      );

      setSoundObj(status);
      // setPlaybackObj(playbackObj);
      setCurrentAudio(audio);
      setCurrentIndex(audioIndex);
      setIsPlaying(true);

      return;
    }
  };

  // **********seekAudio******
  const seekAudio = () => {
    // console.log("playbackStatus", playbackStatus);
    if (!playbackStatus?.positionMillis) {
      return 0;
    }
    if (playbackStatus) {
      return playbackStatus?.positionMillis / playbackStatus?.durationMillis;
    }
  };

  //   ******next music******
  const nextMusic = async () => {
    const nextMusicIndex = currentIndex + 1;
    const nextMusic = musicData[nextMusicIndex];

    // check the last music index
    if (!soundObj.isLoaded || musicData.length === nextMusicIndex) {
      return alert("you are playing the last song");
    }
    // ******* playing another music**********
    if (soundObj.isLoaded) {
      // setSoundObj(null);
      await playbackObj.stopAsync();
      await playbackObj.unloadAsync();

      const status = await playbackObj.loadAsync(
        {
          uri: nextMusic.uri,
        },
        { shouldPlay: true }
      );

      setSoundObj(status);
      setPlaybackObj(playbackObj);
      setCurrentAudio(nextMusic);
      setCurrentIndex(nextMusicIndex);
      setIsPlaying(true);

      return;
    }
  };

  //   ******previos music******
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
          uri: prevMusic.uri,
        },
        { shouldPlay: true }
      );

      setSoundObj(status);
      setPlaybackObj(playbackObj);
      setCurrentAudio(prevMusic);
      setCurrentIndex(prevMusicIndex);
      setIsPlaying(true);

      return;
    }
  };

  // ******swipe to next track******
  const onSwipeLeft = (e) => {
    console.log("onSwipeLeft");
    nextMusic();
  };

  // ******swipe to prev track******
  const onSwipeRight = (e) => {
    console.log("onSwipeRight");
    prevMusic();
  };

  const config = {
    velocityThreshold: 0.3,
    directionalOffsetThreshold: 80,
  };
  return (
    <Context.Provider
      value={{
        playTrack,
        seekAudio,
        nextMusic,
        prevMusic,
        onSwipeLeft,
        onSwipeRight,
        musicData,
        soundObj,
        playbackStatus,
        config,
        isPlaying,
        currentAudio,
        currentIndex,
        setSoundObj,
        setPlaybackStatus,
        playbackObj,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default AppState;
