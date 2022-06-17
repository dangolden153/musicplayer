import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { colors } from '../Colors'

const BigText = ({children}) => {
  return (
    <View>
      <Text style={styles.text}>{children}</Text>
    </View>
  )
}

export default BigText

const styles = StyleSheet.create({
    text: {
        color: colors.whiteColor,
        fontSize: 24,
        fontWeight: "bold",
      },
})