import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'

import Entypo from 'react-native-vector-icons/Entypo'

const MyProfile = () => {
    const navigation = useNavigation()
    return (
        <View style={{ flex: 1 }}>

            <TouchableOpacity
                style={{ margin: 10 }}
                onPress={() => navigation.goBack()}>
                <Entypo name='chevron-thin-left' size={28} color={'#000'} />
            </TouchableOpacity>

            <View style={{ flex: 1 }}>
                <Text style={styles.text}>Fullame: Đinh Ngọc Anh</Text>
                <Text style={styles.text}>Student ID:PH31267</Text>
                <Text style={styles.text}>Class: CRO102-MD18305</Text>

            </View>

        </View>
    )
}

export default MyProfile

const styles = StyleSheet.create({
    text: {
        fontSize: 20,
        color: '#000',
        borderBottomWidth:0.8,
        padding:10,

    }
})