import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'

import { useNavigation } from '@react-navigation/native'

import Entypo from 'react-native-vector-icons/Entypo'

import { useTheme } from '../../../components/Theme/MyTheme'

import LocalData from '../../../LocalData'
import AsyncStorage from '@react-native-async-storage/async-storage';

const Setting = () => {
  const { theme, changeTheme } = useTheme()
  const navigation = useNavigation()
  return (
    <View style={{ flex: 1, backgroundColor: theme === 'light' ? '#f1f3f5' : '#010101' }}>

      <View style={{ flexDirection: 'row', padding: 10, justifyContent: 'space-between', alignItems: 'center' }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Entypo name='chevron-thin-left' size={28} color={theme === 'light' ? '#000000' : '#fff'} />
        </TouchableOpacity>
        <Text style={{ flex: 1, color: theme === 'light' ? '#000000' : '#fff', fontSize: 20, textAlign: 'center' }}>Setting</Text>
      </View>

      <TouchableOpacity
        style={[styles.button,
        {
          backgroundColor: theme === 'light' ? '#fff' : '#171717',
          borderTopWidth: theme === 'light' ? 0 : 1,
          borderBottomWidth: theme === 'light' ? 0 : 1,
        }]}>
        <Text style={{ fontSize: 16, color: theme === 'light' ? '#000000' : '#fff', marginLeft: 10 }}>Account security</Text>
        <Entypo name='chevron-thin-right' color={theme === 'light' ? '#000000' : '#fff'} size={20} />
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.navigate('ThemeSetting')}
        style={[styles.button,
        {
          backgroundColor: theme === 'light' ? '#fff' : '#171717',
          borderTopWidth: theme === 'light' ? 0 : 1,
          borderBottomWidth: theme === 'light' ? 0 : 1,
        }]}>
        <Text style={{ fontSize: 16, color: theme === 'light' ? '#000000' : '#fff', marginLeft: 10 }}>Theme</Text>
        <Entypo name='chevron-thin-right' color={theme === 'light' ? '#000000' : '#fff'} size={20} />
      </TouchableOpacity>

      <TouchableOpacity
        onPress={async () => {
          LocalData.save({
            key: 'loginStatus',
            data: {
              loginStatus: false
            },
          });
          LocalData.remove({
            key: 'accountData', 
          });
          navigation.navigate('Login')
        }}
        style={[styles.button, {
          justifyContent: 'center', alignItems: 'center', marginTop: 10,
          backgroundColor: theme === 'light' ? '#fff' : '#171717',
          borderTopWidth: theme === 'light' ? 0 : 1,
          borderBottomWidth: theme === 'light' ? 0 : 1,
        }]}>
        <Text style={{ fontSize: 18, color: theme === 'light' ? '#000000' : '#fff', marginLeft: 10, textAlign: 'center' }}>Logout</Text>
      </TouchableOpacity>

    </View>
  )
}

export default Setting

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    color: '#000'
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginBottom: 10,
    paddingVertical: 15,
    borderColor: '#ccc'
  }
})