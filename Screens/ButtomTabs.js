import { View, Text, useWindowDimensions } from "react-native";
import React, { useEffect } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../component/HomeScreen";
import MusicPlayerScreen from "../component/MusicPlayerScreen";
import { colors } from "../component/Colors";
import { Entypo, FontAwesome } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import SearchScreen from "../component/SearchScreen";
import { musicData } from "../utils/musicData";
import { setMusicData } from "../reducer/navSlice";
import { useDispatch } from "react-redux";

const Tab = createBottomTabNavigator();

const ButtomTab = () => {
  const { height } = useWindowDimensions();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setMusicData(musicData));
  }, []);

  return (
    <View
      style={{ height: height, backgroundColor: colors.primaryColor }}
    >
      <StatusBar style="light" />
      <Tab.Navigator
        screenOptions={{
          tabBarShowLabel: false,
          tabBarStyle: {
            alignItems: "center",
            justifyContent: "space-between",
            borderTopStartRadius: 10,
            borderTopEndRadius: 10,
            elevation: 0,
            backgroundColor: colors.tertiaryColor,
            height: 70,
            borderColor: "transparent",
            borderWidth: 0,
            borderTopColor: colors.tertiaryColor,
            tabBarHideOnKeyboard: true,
          },
        }}
      >
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            headerShown: false,

            tabBarIcon: ({ focused }) => (
              <Entypo
                name="home"
                size={24}
                color={focused ? colors.purpleColor : colors.subTextColor}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Search"
          component={SearchScreen}
          options={{
            headerShown: false,

            tabBarIcon: ({ focused }) => (
              <FontAwesome
                name="search"
                size={24}
                color={focused ? colors.purpleColor : colors.subTextColor}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Music"
          component={MusicPlayerScreen}
          options={{
            headerShown: false,

            tabBarIcon: ({ focused }) => (
              <Entypo
                name="folder-music"
                size={24}
                color={focused ? colors.purpleColor : colors.subTextColor}
              />
            ),
          }}
        />
      </Tab.Navigator>
    </View>
  );
};

export default ButtomTab;
