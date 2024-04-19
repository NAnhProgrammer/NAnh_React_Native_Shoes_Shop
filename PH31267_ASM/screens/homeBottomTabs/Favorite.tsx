import { FlatList, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../redux/store'

import { useRoute } from '@react-navigation/native';

import { useTheme } from '../../components/Theme/MyTheme'
import FavoriteCardItem from '../../components/FavoriteCardItem';


const Favorite:React.FC = () => {
  const route = useRoute();
  const { theme, changeTheme } = useTheme()
  const ListFavorite = useSelector((state: RootState)=> state.FavoriteStore.ListFavorite)

  const [account, setAccount] = React.useState<Object>({})

  React.useEffect(() => {
    const { account } = route.params as { account: string };
    setAccount(account)
  }, [])

  return (
    <View style={{ flex: 1, backgroundColor: theme === 'light' ? '#f1f3f5' : '#171717', paddingTop:5 }}>
          <FlatList
            data={ListFavorite}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => {
              return <FavoriteCardItem cart={item} account={account}/>
            }}
          />
    </View>
  )
}

export default Favorite

const styles = StyleSheet.create({})