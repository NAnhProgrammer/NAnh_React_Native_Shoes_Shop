import { View, Text, Image, TouchableOpacity, FlatList, ActivityIndicator, StyleSheet, ImageBackground, Alert, Dimensions } from 'react-native'
import React from 'react'
import Entypo from 'react-native-vector-icons/Entypo'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Ionicons from 'react-native-vector-icons/Ionicons'
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import Swiper from 'react-native-swiper'
import { useNavigation, useRoute } from '@react-navigation/native'
import axios from 'axios'

import generateRandomId from '../../functions/generateRandomId';

import { useTheme } from '../../components/Theme/MyTheme'
import { useDispatch } from 'react-redux'
import { addFavoriteAPI, deleteFavoriteAPI } from '../../redux/actions/FavoriteAction'
import BottomModal from '../../components/BottomModal';
import { addCartAPI } from '../../redux/actions/CartAction'

const { width, height } = Dimensions.get('window')

const getShoesVarianSize = async id => {
    try {
        const shoesVarianSizeResponse = await axios.post(`http://10.0.2.2:3000/get-shoes-varian-size-by-id-shoes-varian`, { idShoesVarian: id })
        const shoesVarianSize = shoesVarianSizeResponse.data
        shoesVarianSize.sort((a, b) => a.sizeNumber - b.sizeNumber)
        return shoesVarianSize
    } catch (error) {
        console.log('err: ', error)
    }
}

const ShoesDetail: React.FC = () => {
    const { theme, changeTheme } = useTheme()
    const navigation = useNavigation()
    const route = useRoute()
    const { shoes, account } = route.params

    const dispatch = useDispatch()

    const [visible, setVisible] = React.useState(false)

    const [shoesVarianData, setShoesVarianData] = React.useState<Array<Object>>([])
    const [shoesVarianSizeData, setShoesVarianSizeData] = React.useState<Array<Object>>([])
    const [favoriteSelected, setFavoriteSelected] = React.useState<Boolean>(false)

    const [shoeVarainSizeExtra, setShoesVarianSizeExtra] = React.useState<Number>(0)

    const [shoesVarianSelected, setShoesVarianSelected] = React.useState<String>('')
    const [shoesVarianSizeSelected, setShoesVarianSizeSelected] = React.useState<String>('')

    const [price, setPrice] = React.useState<number>(0)

    const [loading, setLoading] = React.useState<Boolean>(true)
    const [shoesVarianImg, setShoesVarianImg] = React.useState<string>('')
    const [size, setSize] = React.useState<string>('')
    const [quantity, setQuantity] = React.useState<number>(1)
    const [maxQuantity, setMaxQuantity] = React.useState<number>(0)


    const getFavorite = async () => {
        try {
            const getFavorite = await axios.post(`http://10.0.2.2:3000/get-favorite-by-id-user-and-id-shoes`, { idShoes: shoes.id, idUser: account.id })

            getFavorite.status == 201 ? setFavoriteSelected(true) : setFavoriteSelected(false)
        } catch (error) {
            console.log('err: ', error)
        }
    }

    const getShoesById = async () => {
        try {
            const shoesVarian = await axios.post(`http://10.0.2.2:3000/get-shoes-varian-by-id-shoes`, { idShoes: shoes.id })
            const shoesVarianSize = await getShoesVarianSize(shoesVarian.data[0].id)

            setShoesVarianData(shoesVarian.data)
            setShoesVarianImg(shoesVarian.data[0].images[0])
            setShoesVarianSelected(shoesVarian.data[0].id)
            setPrice(shoesVarian.data[0].price)
            setShoesVarianSizeData(shoesVarianSize)
            setShoesVarianSizeSelected(shoesVarianSize[0].id)
            setSize(shoesVarianSize[0].sizeNumber)
            setMaxQuantity(shoesVarianSize[0].quantity)

            setLoading(false)
        } catch (error) {
            console.log('err: ', error)
        }
    }

    const handlePlus = () => {
        if (quantity < maxQuantity) {
            setQuantity(quantity + 1)
        }
    }

    const handleMinus = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1)
        }
    }

    const handleGoBack = () => {
        navigation.goBack()
    }

    const handleAddFavorite = async () => {
        setFavoriteSelected(!favoriteSelected)
        const getFavorite = await axios.post(`http://10.0.2.2:3000/get-favorite-by-id-user-and-id-shoes`, { idShoes: shoes.id, idUser: account.id })
        if (getFavorite.status === 201) {
            // await axios.get(`http://10.0.2.2:3000/delete-favorite?id=${getFavorite.data.id}`)
            dispatch(deleteFavoriteAPI(getFavorite.data.id))
            Alert.alert('Favorite removed')
        } else if (getFavorite.status === 200) {
            // await axios.post(`http://10.0.2.2:3000/add-favorite`, { id: generateRandomId('FV'), idShoes: shoes.id, idUser: account.id })
            dispatch(addFavoriteAPI({ id: generateRandomId('FV'), idShoes: shoes.id, idUser: account.id }))
            Alert.alert('Added to favorites')
        }
    }

    const handleAddToCart = async () => {
        const cart = {
            id: generateRandomId('CT'),
            idShoesVarianSize: shoesVarianSizeSelected,
            idUser: account.id,
            quantity: quantity,
            checkout: false
        }
        dispatch(addCartAPI(cart))
        setVisible(false)
        Alert.alert('Add to cart successful')
    }

    React.useEffect(() => {
        getFavorite()
        getShoesById()
    }, [])

    return (
        <View style={{ flex: 1, backgroundColor: theme === 'light' ? '#f1f3f5' : '#181818', justifyContent: 'space-between' }}>


            <BottomModal
                visible={visible}
                onClose={() => setVisible(false)}
            >
                <View style={[{ backgroundColor: theme === 'light' ? 'rgba(0, 0, 0, 0.3)' : 'rgba(255, 255, 255, 0.3)' }, styles.modalContainer]}>
                    <View style={[{ backgroundColor: theme === 'light' ? '#fff' : '#000' }, styles.modalContent]}>
                        <View style={{ padding: 5 }}>
                            <Image style={{ width: width - 10, height: 320, borderTopLeftRadius: 25, borderTopRightRadius: 25 }} source={{ uri: shoesVarianImg }} />

                            <Text style={{ marginVertical: 5, fontSize: 19, color: theme === 'light' ? '#000' : '#fff' }} >{shoes.name + ' - ' + size}</Text>


                            <View style={{ flexDirection: 'row', marginTop: 20, justifyContent: 'center' }}>
                                <TouchableOpacity
                                    onPress={handleMinus}
                                    style={{ backgroundColor: theme === 'light' ? '#0097fb' : '#fff', height: 45, width: 50, borderTopLeftRadius: 15, borderBottomLeftRadius: 15, justifyContent: 'center', alignItems: 'center' }}>
                                    <Entypo name='minus' size={25} color={theme === 'light' ? '#fff' : '#000'} />
                                </TouchableOpacity>
                                <View style={{ flex: 1, backgroundColor: theme === 'light' ? '#0097fb' : '#fff', height: 45, justifyContent: 'center', alignItems: 'center' }}>
                                    <Text style={{ fontSize: 20, color: theme === 'light' ? '#fff' : '#000' }}>{'' + quantity}</Text>
                                </View>
                                <TouchableOpacity
                                    onPress={handlePlus}
                                    style={{ backgroundColor: theme === 'light' ? '#0097fb' : '#fff', height: 45, width: 50, borderTopRightRadius: 15, borderBottomRightRadius: 15, justifyContent: 'center', alignItems: 'center' }}>
                                    <Entypo name='plus' size={25} color={theme === 'light' ? '#fff' : '#000'} />
                                </TouchableOpacity>
                            </View>

                        </View>

                        <View style={{ width: width - 10, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', margin: 5 }}>
                            <TouchableOpacity onPress={() => {
                                setVisible(false)
                                setQuantity(1)
                            }}>
                                <AntDesign name='downcircle' size={48} color={theme === 'light' ? '#0097fb' : '#ffffff'} />
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={handleAddToCart}
                                style={{ flex: 1, marginLeft: 10, height: 50, borderRadius: 15, backgroundColor: theme === 'light' ? '#0097fb' : '#fff', justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={{ fontSize: 20, fontWeight: 'bold', alignItems: 'center', color: theme === 'light' ? '#fff' : '#000' }}>Add to cart</Text>
                            </TouchableOpacity>
                        </View>

                    </View>
                </View>
            </BottomModal>

            <View style={{ flex: 1 }}><View style={{ height: 420 }}>
                <Swiper
                    activeDotColor='#000'
                    dotStyle={{ width: 20, height: 4 }}
                    activeDotStyle={{ width: 20, height: 4 }}
                    horizontal={true}
                >
                    {shoes.images.map((element, index) => (
                        <ImageBackground key={index} style={{ width: '100%', flex: 1 }} source={{ uri: element }} >
                            <View style={{ flexDirection: 'row', padding: 10, justifyContent: 'space-between', alignItems: 'center' }}>
                                <TouchableOpacity onPress={handleGoBack}>
                                    <Entypo name='chevron-thin-left' size={28} color={theme === 'light' ? '#0097fb' : '#000'} />
                                </TouchableOpacity>

                                <TouchableOpacity onPress={handleAddFavorite}>
                                    <AntDesign name={favoriteSelected == true ? 'heart' : 'hearto'} size={28} color={theme === 'light' ? '#0097fb' : '#000'} />
                                </TouchableOpacity>
                            </View>
                        </ImageBackground>
                    ))}
                </Swiper>
            </View>

                <View style={{ justifyContent: 'space-between' }}>
                    <View>
                        <Text style={{ fontSize: 25, margin: 5, fontWeight: 'bold', color: theme === 'light' ? '#000' : '#fff' }}>{shoes.name}</Text>
                        <Text style={{ fontSize: 22, margin: 5, fontWeight: 'bold', color: theme === 'light' ? '#000' : '#fff' }}>{price + ' VND'}</Text>
                        <Text style={{ fontSize: 20, color: theme === 'light' ? '#000' : '#fff', margin: 5, fontWeight: 'bold' }}>Varian</Text>

                        {
                            loading && <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                <ActivityIndicator size="large" color={theme === 'light' ? "#0000ff" : '#fafafa'} />
                            </View>
                        }

                        {
                            !loading && <FlatList
                                data={shoesVarianData}
                                horizontal
                                showsHorizontalScrollIndicator={false}
                                keyExtractor={(item) => item.id}
                                renderItem={({ item }) => {
                                    return <TouchableOpacity
                                        onPress={async () => {
                                            setShoesVarianSelected(item.id)
                                            setPrice(item.price)
                                            const shoesVarianSize = await getShoesVarianSize(item.id)

                                            setShoesVarianSizeData(shoesVarianSize)
                                            setShoesVarianSizeExtra(shoesVarianSize.length)
                                            setShoesVarianImg(item.images[0])
                                            setShoesVarianSizeSelected(shoesVarianSize[0].id)
                                            setSize(shoesVarianSize[0].sizeNumber)
                                            setMaxQuantity(shoesVarianSize[0].quantity)
                                        }}
                                        style={[shoesVarianSelected === item.id ? theme === 'light' ? styles.selectedLightMode : styles.selectedDarkMode : styles.nonSelected,
                                        { borderRadius: 10, margin: 5, justifyContent: 'center', alignItems: 'center' }]}>
                                        <Image source={{ uri: item.images[0] }} style={{ height: 60, width: 60, borderRadius: 10, resizeMode: 'cover' }} />
                                    </TouchableOpacity>
                                }}
                            />
                        }
                        <Text style={{ fontSize: 20, color: theme === 'light' ? '#000' : '#fff', margin: 5, fontWeight: 'bold' }}>Size</Text>

                        <FlatList
                            data={shoesVarianSizeData}
                            horizontal
                            extraData={shoeVarainSizeExtra}
                            showsHorizontalScrollIndicator={false}
                            keyExtractor={(item) => item.id}
                            renderItem={({ item }) => {
                                return <TouchableOpacity
                                    onPress={() => {
                                        setShoesVarianSizeSelected(item.id)
                                        setSize(item.sizeNumber)
                                        setMaxQuantity(item.quantity)
                                    }}
                                    style={[shoesVarianSizeSelected === item.id ? theme === 'light' ? styles.sizeSelectedLightMode : styles.sizeSelectedDarkMode : theme === 'light' ? styles.sizeNonSelectedLightMode : styles.sizeNonSelectedDarkMode,
                                    { borderRadius: 10, margin: 5, height: 45, width: 45, justifyContent: 'center', alignItems: 'center' }]}>
                                    <Text style={[shoesVarianSizeSelected === item.id ? { color: theme === 'light' ? '#fff' : '#000' } : { color: theme === 'light' ? '#000' : '#fff' }, { fontSize: 20 }]}>{item.sizeNumber}</Text>
                                </TouchableOpacity>
                            }}
                        />

                    </View>

                </View>
            </View>


            <View style={{ flexDirection: 'row', justifyContent: 'space-between', margin: 5 }}>
                <TouchableOpacity
                    onPress={() => setVisible(true)}
                    style={{
                        borderColor: '#fff', borderWidth: theme === 'light' ? 0 : 1,
                        paddingHorizontal: 20, paddingVertical: 8, backgroundColor: theme === 'light' ? '#0097fb' : '#181818', borderRadius: 30
                    }}>
                    <Ionicons name='bag-outline' size={25} color='#fff' />
                </TouchableOpacity>
                <TouchableOpacity style={{
                    borderColor: '#fff', borderWidth: theme === 'light' ? 0 : 1,
                    paddingHorizontal: 20, paddingVertical: 8, backgroundColor: theme === 'light' ? '#0097fb' : '#181818', borderRadius: 30, marginHorizontal: 15
                }}>
                    <FontAwesome name='star-o' size={25} color='#fff' />
                </TouchableOpacity>
                <TouchableOpacity style={{
                    borderColor: '#fff', borderWidth: theme === 'light' ? 0 : 1,
                    flex: 1, justifyContent: 'center', alignItems: 'center', paddingVertical: 8, backgroundColor: theme === 'light' ? '#0097fb' : '#181818', borderRadius: 30
                }}>
                    <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 14 }}>Buy Now</Text>
                </TouchableOpacity>
            </View>

        </View>
    )
}

export default ShoesDetail

const styles = StyleSheet.create({
    images: {
        width: '100%',
        resizeMode: 'cover',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        borderRadius: 5,
        marginBottom: 35
    },
    selectedLightMode: {
        borderColor: 'blue',
        borderWidth: 1,
    },
    nonSelected: {
        borderColor: '#ccc',
        borderWidth: 1
    },
    selectedDarkMode: {
        borderWidth: 1,
        borderColor: 'red'
    },
    sizeSelectedLightMode: {
        backgroundColor: '#0097fb',
        borderWidth: 0
    },
    sizeNonSelectedLightMode: {
        backgroundColor: '#fff',
        borderWidth: 1
    },
    sizeSelectedDarkMode: {
        backgroundColor: '#fff',
        borderWidth: 0
    },
    sizeNonSelectedDarkMode: {
        backgroundColor: '#181818',
        borderWidth: 1,
        borderColor: '#fff'
    },
    modalContainer: {
        flex: 1,
        width,
        height,
    },
    modalContent: {
        flex: 1,
        marginTop: height * 0.32,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        justifyContent: 'space-between',
    },
})