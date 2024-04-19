import { View, Text, Dimensions, TouchableOpacity, ActivityIndicator, Image } from 'react-native'
import React from 'react'

import { useTheme } from '../components/Theme/MyTheme'
import { useNavigation } from '@react-navigation/native'
import axios from 'axios'

interface props {
    cart: any,
    account: any
}

const { width } = Dimensions.get('window')

const FavoriteCardItem: React.FC<props> = ({ cart, account }) => {

    const navigation = useNavigation()
    const { theme, changeTheme } = useTheme()

    const [shoes, setShoes] = React.useState<any>(null)
    const [trademark, setTrademark] = React.useState<string>('')
    const [min, setMin] = React.useState<number>(0)
    const [max, setMax] = React.useState<number>(0)

    const callApi = async () => {
        try {
            const shoes = await axios.get(`http://10.0.2.2:3000/get-shoes-by-id?id=${cart.idShoes}`)
            
            const trademark = await axios.get(`http://10.0.2.2:3000/get-trademark-by-id?id=${shoes.data.idTrademark}`)
            setTrademark(trademark.data.name)

            const response = await axios.post(`http://10.0.2.2:3000/get-shoes-varian-by-id-shoes`,{idShoes: shoes.data.id})
            const shoesVarian = response.data
            shoesVarian.sort((a, b) => a.price - b.price)
            setMin(shoesVarian[0].price)
            setMax(shoesVarian[shoesVarian.length-1].price)
            setShoes(shoes.data)
        } catch (error) {
            console.log('err: ', error)
        }
    }

    React.useEffect(() => {
        callApi()
    }, [])

    if (!shoes) {
        return <View style={{
            borderRadius: 15,
            backgroundColor: '#fff',
            shadowColor: '#000',
            shadowOffset: {
                width: 1,
                height: 2,
            },
            shadowOpacity: 0.3,
            shadowRadius: 3.84,
            elevation: 3,
            marginHorizontal: 5, marginBottom: 5, width: width - 10, height: 170, flexDirection: 'row',
        }}>
            <ActivityIndicator size='large' color='#000' />
        </View>
    }

    return (
        <TouchableOpacity
            onPress={() => {
                navigation.navigate('ShoesDetail', { shoes: shoes, account: account })
            }}
            style={{
                borderRadius: 15,
                backgroundColor: '#fff',
                shadowColor: '#000',
                shadowOffset: {
                    width: 1,
                    height: 2,
                },
                shadowOpacity: 0.3,
                shadowRadius: 3.84,
                elevation: 3,
                marginHorizontal: 5, marginBottom: 5, width: width - 10, flexDirection: 'row', height: 170
            }}>

            <Image
                source={{ uri: shoes.images[0] }}
                style={{ height: 170, width: 150, resizeMode: 'cover', borderRadius: 10 }} />

            <View style={{ padding: 4 }}>
                <Text style={{ fontSize: 20, color: theme === 'light' ? '#000000' : '#000' }} >{trademark}</Text>
                <Text style={{ fontSize: 17, color: theme === 'light' ? '#000000' : '#000' }} >{shoes.name}</Text>
                <Text style={{ fontSize: 15, color: theme === 'light' ? '#000000' : '#000' }} >{min + ' VND - ' + max + ' VND'}</Text>

            </View>

        </TouchableOpacity >
    )
}

export default FavoriteCardItem