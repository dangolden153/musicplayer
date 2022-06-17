import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { colors } from "./Colors";
import { FontAwesome } from "@expo/vector-icons";

const SearchInput = () => {
  const [text, setText] = useState("");
  return (
    <View style={styles.searchInput}>
      <TextInput
        value={text}
        onChangeText={setText}
        style={styles.input}
        placeholder="Search"
        placeholderTextColor={colors.subTextColor}
      />
      <TouchableOpacity>
        <FontAwesome name="search" size={24} color={colors.subTextColor} />
      </TouchableOpacity>
    </View>
  );
};

export default SearchInput;

const styles = StyleSheet.create({
  searchInput: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: colors.tertiaryColor,
    borderRadius: 50,
    marginTop:20
  },
  input: {
    flex: 1,
    color:colors.whiteColor
  },
});
