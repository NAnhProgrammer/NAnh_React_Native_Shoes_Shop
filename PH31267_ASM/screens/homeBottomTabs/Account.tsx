import { View, Text, TouchableOpacity, Image, ActivityIndicator, StyleSheet } from 'react-native'
import React from 'react'
import { useNavigation, useRoute } from '@react-navigation/native';
import Entypo from 'react-native-vector-icons/Entypo'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Feather from 'react-native-vector-icons/Feather'

import { useTheme } from '../../components/Theme/MyTheme'

const Account = () => {
  const navigation = useNavigation()
  const route = useRoute();

  const { theme, changeTheme } = useTheme()

  const [account, setAccount] = React.useState<Object>({})
  const [loading, setLoading] = React.useState<Boolean>(true)

  React.useEffect(() => {
    const { account } = route.params as { account: string };
    setAccount(account)
    setLoading(false)
  }, [])

  return (
    <View style={{ flex: 1, backgroundColor: theme === 'light' ? '#f1f3f5' : '#010101' }}>
      {
        loading && <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" color={theme === 'light' ? "#000000" : '#fafafa'} />
        </View>
      }
      {!loading && <TouchableOpacity style={[styles.button, {
        paddingVertical: 30,
        backgroundColor: theme === 'light' ? '#fff' : '#171717' }]}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Image source={{ uri: account.avatar }} style={{ borderRadius: 10, marginRight: 10, width: 80, height: 80 }} />
          <View>
            <Text style={{ fontSize: 20, fontWeight: 'bold', color: theme === 'light' ? '#000000' : '#fff' }}>{account.fullname}</Text>
            <Text style={{ fontSize: 16, color: theme === 'light' ? '#000000' : '#fff', marginTop: 10 }}>{account.email}</Text>
          </View>
        </View>
        <Entypo name='chevron-thin-right' color={theme === 'light' ? '#000000' : '#fff'} size={20} />
      </TouchableOpacity>}

      <TouchableOpacity
        onPress={() => navigation.navigate('MyProfile')}
        style={[styles.button,
        {
          backgroundColor: theme === 'light' ? '#fff' : '#171717',
          borderTopWidth: theme === 'light' ? 0 : 1,
          borderBottomWidth: theme === 'light' ? 0 : 1,
        }]}>
        <View style={{ flexDirection: 'row', alignItems: 'center', }}>
          <AntDesign name='profile' color={theme === 'light' ? '#000000' : '#fff'} size={30} />
          <Text style={{ fontSize: 16, color: theme === 'light' ? '#000000' : '#fff', marginLeft: 10 }}>My Profile</Text>
        </View>
        <Entypo name='chevron-thin-right' color={theme === 'light' ? '#000000' : '#fff'} size={20} />
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.navigate('DeviceInFormation')}
        style={[styles.button,
        {
          backgroundColor: theme === 'light' ? '#fff' : '#171717',
          borderTopWidth: theme === 'light' ? 0 : 1,
          borderBottomWidth: theme === 'light' ? 0 : 1,
        }]}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Feather name='smartphone' color={theme === 'light' ? '#000000' : '#fff'} size={30} />
          <Text style={{ fontSize: 16, color: theme === 'light' ? '#000000' : '#fff', marginLeft: 10 }}>Device Information</Text>
        </View>
        <Entypo name='chevron-thin-right' color={theme === 'light' ? '#000000' : '#fff'} size={20} />
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.navigate('Setting')}
        style={[styles.button,
        {
          backgroundColor: theme === 'light' ? '#fff' : '#171717',
          borderTopWidth: theme === 'light' ? 0 : 1,
          borderBottomWidth: theme === 'light' ? 0 : 1,
        }]}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <AntDesign name='setting' color={theme === 'light' ? '#000000' : '#fff'} size={30} />
          <Text style={{ fontSize: 16, color: theme === 'light' ? '#000000' : '#fff', marginLeft: 10 }}>Setting</Text>
        </View>
        <Entypo name='chevron-thin-right' color={theme === 'light' ? '#000000' : '#fff'} size={20} />
      </TouchableOpacity>

    </View>
  )
}

export default Account

const styles = StyleSheet.create({
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