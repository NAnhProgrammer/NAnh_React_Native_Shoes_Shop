import { View, Text, Dimensions, TouchableOpacity, ActivityIndicator, Image } from 'react-native'
import React from 'react'

import { useTheme } from '../components/Theme/MyTheme'
import { useNavigation } from '@react-navigation/native'
import axios from 'axios'
import useState from 'react';

interface props {
    cart: any,
}

const { width } = Dimensions.get('window')

const CartItemCard: React.FC<props> = ({ cart }) => {

    const { theme, changeTheme } = useTheme()

    const [shoesName, setShoesName] = React.useState<string>('')
    const [tradeMarkName, setTradeMarkName] = React.useState<string>('')
    const [price, setPrice] = React.useState<number>(0)
    const [size, setSize] = React.useState<number>(0)
    const [color, setColor] = React.useState<string>('')
    const [image, setImage] = React.useState<string>('')
    const [loading,setLoading] = React.useState<boolean>(true)

    const callApi = async () => {
        try {
            const shoesVarianSize = await axios.get(`http://10.0.2.2:3000/get-shoes-varian-size-by-id?id=${cart.idShoesVarianSize}`)
            setSize(shoesVarianSize.data.sizeNumber)
            
            const shoesVarian = await axios.get(`http://10.0.2.2:3000/get-shoes-varian-by-id?id=${shoesVarianSize.data.idShoesVarian}`)
            setColor(shoesVarian.data.color)
            setPrice(shoesVarian.data.price)
            setImage(shoesVarian.data.images[0])
            const shoes = await axios.get(`http://10.0.2.2:3000/get-shoes-by-id?id=${shoesVarian.data.idShoes}`)
            setShoesName(shoes.data.name)
            const trademark = await axios.get(`http://10.0.2.2:3000/get-trademark-by-id?id=${shoes.data.idTrademark}`)
            setTradeMarkName(trademark.data.name)

            setLoading(false)
        } catch (error) {
            console.log('err: ', error)
        }
    }

    React.useEffect(() => {
        callApi()
    }, [])

    if (loading) {
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
        <View
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
                source={{ uri: image }}
                style={{ height: 170, width: 150, resizeMode: 'cover', borderRadius: 10 }} />

            <View style={{ padding: 4 }}>
                <Text style={{ fontSize: 20, color: theme === 'light' ? '#000000' : '#000' }} >{tradeMarkName}</Text>
                <Text style={{ fontSize: 17, color: theme === 'light' ? '#000000' : '#000' }} >{shoesName} - {color}</Text>
                <Text style={{ fontSize: 17, color: theme === 'light' ? '#000000' : '#000' }} >Size: {''+size}</Text>
                <Text style={{ fontSize: 15, color: theme === 'light' ? '#000000' : '#000' }} >Price: {price + ' VND'}</Text>
                <Text style={{ fontSize: 17, color: theme === 'light' ? '#000000' : '#000' }} >Quantity: {''+cart.quantity}</Text>
            </View>

        </View >
    )
}

export default CartItemCard