import { View, Text, Image, StyleSheet, FlatList, ActivityIndicator, TouchableOpacity, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import AntDesign from "react-native-vector-icons/AntDesign";

import Swiper from 'react-native-swiper'

import ShoesCardItem from '../../components/ShoesCardItem'
import axios from 'axios';

import { useRoute } from '@react-navigation/native';

import { useTheme } from '../../components/Theme/MyTheme'
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { getFavorite } from '../../redux/actions/FavoriteAction';
import { getCart } from '../../redux/actions/CartAction';

const Home: React.FC = () => {
  const route = useRoute();
  const { theme, changeTheme } = useTheme()

  const [account, setAccount] = React.useState<Object>({})

  React.useEffect(() => {
    const { account } = route.params as { account: string };
    setAccount(account)

  }, [])

  const [trademarkSelected, setTrademarkSelected] = React.useState<String>('')

  const [shoesData, setShoesData] = React.useState<Array<Object>>([])
  const [shoesDataLoading, setShoesDataLoading] = React.useState<Boolean>(true)
  const [shoesDataExtra, setShoesDataExtra] = React.useState<Number>(shoesData.length)

  const [trademarkData, setTrademarkData] = React.useState<Array<Object>>([])
  const [trademarkDataLoading, setTrademarkDataLoading] = React.useState<Boolean>(true)

  const [newShoesData, setNewShoesData] = React.useState<Array<Object>>([])
  const [newShoesDataLoading, setNewShoesDataLoading] = React.useState<Boolean>(true)

  const [hotShoesData, sethotShoesData] = React.useState<Array<Object>>([])
  const [hotShoesDataLoading, setHotShoesDataLoading] = React.useState<Boolean>(true)

  const ListShoes = useSelector((state: RootState) => state.ShoesStore.ListShoes)
  const ListTrademark = useSelector((state: RootState) => state.TrademarkStore.ListTrademark)

  const selectShoesByIdTrademark = async (id: String) => {
    const shoeses = await axios.post('http://10.0.2.2:3000/find-shoes-by-id-trademark', { idTrademark: id })
    setShoesData(shoeses.data)
    setShoesDataLoading(false)
  }

  const api = async () => {
    try {
      const trademarks = await axios.get('http://10.0.2.2:3000/get-trademarks')
      const newShoeses = await axios.post('http://10.0.2.2:3000/find-shoes-by-classify', { classify: 0 })
      const hotShoeses = await axios.post('http://10.0.2.2:3000/find-shoes-by-classify', { classify: 1 })

      setTrademarkSelected(trademarks.data[0].id)
      selectShoesByIdTrademark(trademarks.data[0].id)

      setTrademarkData(trademarks.data)
      setNewShoesData(newShoeses.data)
      sethotShoesData(hotShoeses.data)

      setTrademarkDataLoading(false)
      setNewShoesDataLoading(false)
      setHotShoesDataLoading(false)
    } catch (error) {
      console.log('111: ' + error)
    }
  }

  useEffect(() => {
    setTrademarkSelected(ListTrademark[0].id)
    api()
  }, [])

  return (
    <View style={{ flex: 1, backgroundColor: theme === 'light' ? '#f1f3f5' : '#171717' }}>

      <View style={{ alignItems: 'center', justifyContent: 'center', flexDirection: 'row', marginBottom: 20 }}>
        <Text style={{ fontSize: 25, fontWeight: 'bold', color: '#ff7b3b', marginRight: 5 }}>SHOE</Text>
        <Text style={{ fontSize: 25, fontWeight: 'bold', color: '#0097fb' }}>SHOP</Text>
      </View>

      <View style={{
        borderWidth: theme === 'light' ? 0 : 1, borderColor: '#fff',
        backgroundColor: theme === 'light' ? '#0097fb' : '#171717',
        marginHorizontal: 5, borderRadius: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 10
      }}>
        <Text style={{ color: '#fff' }}>Search</Text>
        <AntDesign name='search1' color='#fff' size={20} />
      </View>

      <View style={{ height: 250, marginHorizontal: 4, marginTop: 10, borderRadius: 10 }}>
        <Swiper
          loop={true}
          showsButtons={false}
          autoplay
          dotColor={theme === 'light' ? '#ccc' : '#9E9E9E'}
          activeDotColor={theme === 'light' ? '#0097fb' : '#fff'}
          style={{ borderRadius: 5 }}
          horizontal={true}
        >
          <Image style={styles.images} source={require('../../images/WelcomeBanner/WelcomeBanner1.png')} />
          <Image style={styles.images} source={require('../../images/WelcomeBanner/WelcomeBanner2.png')} />
          <Image style={styles.images} source={require('../../images/WelcomeBanner/WelcomeBanner3.png')} />
        </Swiper>
      </View>
      <ScrollView
        contentContainerStyle={{ paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
      >
        <Text style={{ fontSize: 23, margin: 5, fontWeight: 'bold', color: theme === 'light' ? '#000000' : '#fff' }}>Category</Text>
    
          <FlatList
            data={ListTrademark}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => {
              return <TouchableOpacity
                onPress={() => {
                  setTrademarkSelected(item.id)
                  selectShoesByIdTrademark(item.id)
                }}
                style={[trademarkSelected === item.id ? theme === 'light' ? styles.selectedLightMode : styles.selectedDarkMode : theme === 'light' ? styles.nonSelectedLightMode : styles.nonSelectedDarkMode,
                { paddingVertical: 5, borderRadius: 10, margin: 5, justifyContent: 'center', alignItems: 'center' }]}>
                <Image source={{ uri: item.image }} style={{ height: 40, width: 100, resizeMode: 'center' }} />
              </TouchableOpacity>
            }}
          />

        {shoesDataLoading && <ActivityIndicator size="large" color={theme === 'light' ? "#000000" : '#fafafa'} />}
        {!shoesDataLoading &&
          <FlatList
            data={shoesData}
            extraData={shoesDataExtra}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => {
              return <ShoesCardItem shoes={item} account={account} />
            }}
          />}


        <Text style={{ fontSize: 23, margin: 5, fontWeight: 'bold', color: theme === 'light' ? '#000000' : '#fff' }}>New Product</Text>
        {newShoesDataLoading && <ActivityIndicator size="large" color={theme === 'light' ? "#000000" : '#fafafa'} />}
        {!newShoesDataLoading &&
          <FlatList
            data={newShoesData}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => {
              return <ShoesCardItem shoes={item} account={account} />
            }}
          />}

        <Text style={{ fontSize: 23, margin: 5, fontWeight: 'bold', color: theme === 'light' ? '#000000' : '#fff' }}>Hot Product</Text>
        {hotShoesDataLoading && <ActivityIndicator size="large" color={theme === 'light' ? "#000000" : '#fafafa'} />}
        {!hotShoesDataLoading &&
          <FlatList
            data={hotShoesData}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => {
              return <ShoesCardItem shoes={item} account={account} />
            }}
          />}

      </ScrollView>
    </View>
  )
}

export default Home

const styles = StyleSheet.create({
  images: {
    width: '100%',
    resizeMode: 'cover',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    borderRadius: 5,
    marginBottom: 38
  },
  selectedLightMode: {
    backgroundColor: '#0097fb'
  },
  nonSelectedLightMode: {
    backgroundColor: '#ffffff'
  },
  selectedDarkMode: {
    backgroundColor: '#fff'
  },
  nonSelectedDarkMode: {
    backgroundColor: '#9E9E9E'
  }
})