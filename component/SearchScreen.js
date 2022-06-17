import { FlatList, StyleSheet, Text, View } from "react-native";
import React, { useContext } from "react";
import { StatusBar } from "expo-status-bar";
import { colors } from "./Colors";
import NavBar from "./NavBar";
import BigText from "./Shared/BigText";
import SearchInput from "./SearchInput";
import { TouchableOpacity } from "react-native";
import MusicItem from "./MusicItem";
import { Context } from "../Context/context";
import PlayerModal from "./PlayerModal";
import { selectMusicData } from "../reducer/navSlice";
import { useSelector } from "react-redux";

const SearchScreen = () => {
  const { musicData, soundObj } = useContext(Context);
  // console.log('musicData', musicData)
  const MusicArr = useSelector(selectMusicData);
  // console.log("MusicArr", MusicArr);
  return (
    <>
      <View style={styles.homeScreen}>
        <StatusBar style="light" />
        {/* navbar  */}
        <NavBar />

        <View style={styles.innerContainer}>
          {/* header  */}
          <BigText>Today's Hit</BigText>

          {/* search input  */}
          <SearchInput />

          {/* button tabs  */}
          <View style={styles.btnContainer}>
            <TouchableOpacity
              style={{
                backgroundColor: colors.purpleColor,
                padding: 10,
                borderRadius: 10,
                flexGrow: 0.5,
              }}
            >
              <Text
                style={{
                  color: colors.whiteColor,
                  fontSize: 18,
                  textAlign: "center",
                }}
              >
                Shuffle PLay
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                backgroundColor: colors.tertiaryColor,
                padding: 10,
                borderRadius: 10,
                flexGrow: 0.42,
              }}
            >
              <Text
                style={{
                  color: colors.whiteColor,
                  fontSize: 18,
                  textAlign: "center",
                }}
              >
                PLay
              </Text>
            </TouchableOpacity>
          </View>
          {/* music flatlist content   */}
          <FlatList
            data={MusicArr}
            keyExtractor={({ id }) => id.toString()}
            renderItem={({ item, index }) => (
              <MusicItem item={item} index={index} />
            )}
            contentContainerStyle={{ marginTop: 15 }}
          />
        </View>

        {soundObj?.isLoaded && <PlayerModal />}
      </View>

      {/* <PlayerModal /> */}
    </>
  );
};

export default SearchScreen;
const styles = StyleSheet.create({
  homeScreen: {
    flex: 1,
    backgroundColor: colors.primaryColor,
    paddingBottom: 20,
  },

  innerContainer: {
    padding: 20,
  },
  btnContainer: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
});
