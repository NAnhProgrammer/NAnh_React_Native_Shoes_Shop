import { FlatList, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../redux/store'

import { useRoute } from '@react-navigation/native';

import { useTheme } from '../../components/Theme/MyTheme'
import FavoriteCardItem from '../../components/FavoriteCardItem';
import CartItemCard from '../../components/CartItemCard';


const Cart:React.FC = () => {
  const route = useRoute();
  const { theme, changeTheme } = useTheme()
  const ListCart = useSelector((state: RootState)=> state.CartStore.ListCart)

  return (
    <View style={{ flex: 1, backgroundColor: theme === 'light' ? '#f1f3f5' : '#171717', paddingTop:5 }}>
       <View style={{marginBottom:50}}>
       <FlatList
            data={ListCart}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => {
              return <CartItemCard cart={item}/>
            }}
          />
       </View>
    </View>
  )
}

export default Cart

const styles = StyleSheet.create({})