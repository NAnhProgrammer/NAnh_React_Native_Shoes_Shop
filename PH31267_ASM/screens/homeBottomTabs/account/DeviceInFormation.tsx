import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'

import { useNavigation } from '@react-navigation/native'

import Entypo from 'react-native-vector-icons/Entypo'

const DeviceInFormation = () => {
  const navigation = useNavigation()
  return (
    <View style={{ flex: 1 }}>

      <TouchableOpacity
        style={{ margin: 10 }}
        onPress={() => navigation.goBack()}>
        <Entypo name='chevron-thin-left' size={28} color={'#000'} />
      </TouchableOpacity>

      <View style={{ flex: 1}}>
        <Text style={styles.text}>Device name: Pixel 6 Pro API 34</Text>
        <Text style={styles.text}>Android version: ANDROID 14.0 x 86_64</Text>
        <Text style={styles.text}>RAM: 4 GB</Text>
        <Text style={styles.text}>ROM: 64 GB</Text>

      </View>

    </View>
  )
}

export default DeviceInFormation

const styles = StyleSheet.create({
  text: {
    fontSize: 18,
    color: '#000',
    borderBottomWidth: 0.8,
    padding: 10,
  }
})