import { View, Text, Dimensions } from 'react-native'
import React from 'react'
import Entypo from 'react-native-vector-icons/Entypo'
import WelcomeBanner from '../components/WelcomeBanner'
import CustomButton from '../components/CustomButton'
import { useTheme } from '../components/Theme/MyTheme'

const Welcome = (props) => {
    const { theme, changeTheme } = useTheme()

    const { navigation } = props
    const { width: screenWidth, height: screenHeight } = Dimensions.get('window')

    const handleGoToLogin = () => {
        navigation.navigate('Login')
    }

    return (
        <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'space-between', backgroundColor: theme === 'light' ? '#f1f3f5' : '#171717' }}>
            <View style={{ alignItems: 'center', justifyContent: 'center', flexDirection: 'row', marginBottom: 20 }}>
                <Text style={{ fontSize: 25, fontWeight: 'bold', color: '#ff7b3b', marginRight: 5 }}>SHOE</Text>
                <Text style={{ fontSize: 25, fontWeight: 'bold', color: '#0097fb' }}>SHOP</Text>
            </View>
            <WelcomeBanner
                style={{ flex: 1 }}
                img={require('../images/WelcomeBanner/WelcomeBanner1.png')}
                titleStyle={{ textAlign: 'center', color: '#ff7c3f', marginTop: 30, fontSize: 23, fontWeight: 'bold' }}
                imageStyle={{ width: screenWidth, height: screenHeight * 0.5, resizeMode: 'center' }}
            />

            <View style={{ marginTop: 15, flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ color: theme === 'light' ? '#000' : '#fff', fontSize: 25, fontWeight: 'bold' }}>Comfort is</Text>
                <Text style={{ color: '#0097fb', fontSize: 33, fontWeight: 'bold' }}>Everything</Text>
                <Text style={{ marginTop: 10, fontSize: 15, color: theme === 'light' ? '#000' : '#fff' }}>Find the best shoes for you</Text>

                <CustomButton
                    onPress={handleGoToLogin}
                    style={{ height: 45, width: 45, backgroundColor: theme === 'light' ? '#0097fb' : '#fff', borderRadius: 25, justifyContent: 'center', alignItems: 'center', marginTop: 30 }}
                >
                    <Entypo name='chevron-thin-right' color={theme === 'light' ? '#fff' : '#000'} size={20} />
                </CustomButton>
            </View>
        </View>
    )

}

export default Welcome
