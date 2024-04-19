import { View, Text, Image, ActivityIndicator, TouchableOpacity } from 'react-native'
import React from 'react'
import axios from 'axios'
import { useNavigation } from '@react-navigation/native';

import { useTheme } from '../../components/Theme/MyTheme'

interface props {
  shoes: Object
  account: Object
}

const index: React.FC<props> = ({ shoes, account }) => {

  const navigation = useNavigation()

  const { theme, changeTheme } = useTheme()

  const [trademark, setTrademark] = React.useState<String>('')
  const [loading, setLoading] = React.useState<Boolean>(true)

  const api = async () => {
    try {
      const response = await axios.get(`http://10.0.2.2:3000/get-trademark-by-id?id=${shoes.idTrademark}`)
      setTrademark(response.data.name)
      setLoading(false)
    } catch (error) {
      console.log(error)
    }
  }

  React.useEffect(() => {
    api()
  }, [])

  if (loading) {
    return <ActivityIndicator size="small" color={theme === 'light' ? "#000000" : '#fafafa'} />
  }

  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('ShoesDetail', { shoes: shoes, account: account })
      }}
      style={{
        borderRadius: 10,
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOffset: {
          width: 1,
          height: 2,
        },
        shadowOpacity: 0.3,
        shadowRadius: 3.84,
        elevation: 3,
        marginVertical: 10, marginHorizontal: 5, width: 150, height: 240, justifyContent: 'space-between',
      }}>
      <Image
        source={{ uri: shoes.images[0] }}
        style={{ height: 170, width: 150, resizeMode: 'cover', borderRadius: 10 }} />


      <Text style={{ fontSize: 15, color: theme === 'light' ? '#000000' : '#000', marginHorizontal: 3 }} >{shoes.name}</Text>
      <Text style={{ fontSize: 18, color: theme === 'light' ? '#000000' : '#000', marginHorizontal: 4 }} >{trademark}</Text>

    </TouchableOpacity>
  )
}

export default index