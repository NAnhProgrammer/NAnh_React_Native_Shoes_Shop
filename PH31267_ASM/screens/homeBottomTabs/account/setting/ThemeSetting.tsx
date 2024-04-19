import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { useTheme } from '../../../../components/Theme/MyTheme'
import { useNavigation } from '@react-navigation/native'

import Entypo from 'react-native-vector-icons/Entypo'

const ThemeSetting: React.FC = () => {
    const { theme, changeTheme } = useTheme()
    const [chooseTheme, setChooseTheme] = React.useState<String>(theme)
    const navigation = useNavigation()

    const handleSetLight = () => {
        if (theme === 'dark') {
            changeTheme()
            setChooseTheme('light')
        }
    }

    const handleSetDark = () => {
        if (theme === 'light') {
            changeTheme()
            setChooseTheme('dark')
        }
    }

    return (
        <View style={{ flex: 1, backgroundColor: theme === 'light' ? '#f1f3f5' : '#010101' }}>
            <View style={{ flexDirection: 'row', padding: 10, justifyContent: 'space-between', alignItems: 'center' }}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Entypo name='chevron-thin-left' size={28} color={theme === 'light' ? '#000000' : '#fff'} />
                </TouchableOpacity>
                <Text style={{ flex: 1, color: theme === 'light' ? '#000000' : '#fff', fontSize: 20, marginLeft: 20 }}>Theme</Text>
            </View>

            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 10 }}>
                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <View style={{ width: 160, height: 170, borderWidth: 1, marginBottom: 20, borderColor: '#ccc', borderRadius: 20 }}>
                        <View style={{ height: 50, backgroundColor: '#0097fb',borderColor: '#ccc', borderBottomWidth: 1, borderTopLeftRadius: 20, borderTopRightRadius: 20 }}></View>
                    </View>

                    <View style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
                        <TouchableOpacity
                            onPress={handleSetLight}
                        >
                            <Entypo name={chooseTheme === 'light' ? 'vinyl' : 'circle'} size={25} color='#0097fb' />
                        </TouchableOpacity>
                        <Text style={{ marginLeft: 5, fontSize: 16, color: theme === 'light' ? '#000' : '#fff' }}>Light</Text>
                    </View>
                </View>

                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <View style={{ width: 160, height: 170, marginBottom: 20, borderWidth: 1, borderColor: '#ccc', borderRadius: 20 }}>
                        <View style={{ height: 50, backgroundColor: '#1e1e1e',borderColor: '#ccc', borderBottomWidth: 1, borderTopLeftRadius: 20, borderTopRightRadius: 20 }}></View>
                    </View>

                    <View style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
                        <TouchableOpacity
                            onPress={handleSetDark}
                        >
                            <Entypo name={chooseTheme === 'dark' ? 'vinyl' : 'circle'} size={25} color='#0097fb' />
                        </TouchableOpacity>
                        <Text style={{ marginLeft: 5, fontSize: 16, color: theme === 'light' ? '#000' : '#fff' }}>Dark</Text>
                    </View>

                </View>
            </View>

        </View>
    )
}

export default ThemeSetting