import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import { KeyboardAvoidingView } from "react-native";
import { Provider } from "react-redux";
import { store } from "./reducer/store";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Platform } from "react-native";
import ButtomTab from "./Screens/ButtomTabs";
import NowPlayingScreen from "./Screens/NowPlayingScreen";
import AppState from "./Context/context";

export default function App() {
  const Stack = createStackNavigator();

  return (
    <Provider store={store}>
      <AppState>
        <NavigationContainer>
          <SafeAreaProvider>
            <KeyboardAvoidingView
              style={{ flex: 1 }}
              behavior={Platform.OS === "ios" ? "padding" : "height"}
              keyboardVerticalOffset={Platform.OS === "ios" ? -64 : 0}
            >
              <Stack.Navigator>
                <Stack.Screen
                  name="Tab"
                  component={ButtomTab}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="play"
                  component={NowPlayingScreen}
                  options={{ headerShown: false }}
                />

                {/* <Stack.Screen
                name="homeScreen"
                component={HomePage}
                options={{ headerShown: false }}
              /> */}
              </Stack.Navigator>
            </KeyboardAvoidingView>
          </SafeAreaProvider>
        </NavigationContainer>
      </AppState>
    </Provider>
  );
}

//play and pause /
// swiping ../
// seek ../
// modal of the playing music on the homescreen ../
// toolkit .. /
// display another list in the second tab ../
// volume
