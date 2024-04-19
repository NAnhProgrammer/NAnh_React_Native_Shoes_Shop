import { View, Text, Dimensions, Image, TextInput, ScrollView, TouchableOpacity, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import WelcomeBanner from '../components/WelcomeBanner'
import CustomButton from '../components/CustomButton'
import CustomTextInput from '../components/CustomTextInput'
import Block from '../components/Block'
import AntDesign from 'react-native-vector-icons/AntDesign'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Ionicons from 'react-native-vector-icons/Ionicons'
import emailValidation from '../functions/emailValidation'

import axios from 'axios'

import { useTheme } from '../components/Theme/MyTheme'

import LocalData from '../LocalData'

import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth'
import { GoogleSignin } from '@react-native-google-signin/google-signin'

GoogleSignin.configure({
    webClientId:
        '858655302305-auou7fhfs755c4kda7i7v8aebun25h5c.apps.googleusercontent.com'
})

const onGoogleButtonPress = async () => {
    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true })

    const { idToken } = await GoogleSignin.signIn().catch(error => console.log('ERROR: ', error))

    const googleCredential = auth.GoogleAuthProvider.credential(idToken)
    return auth().signInWithCredential(googleCredential)
}

const { width: screenWidth, height: screenHeight } = Dimensions.get('window')

const Login = (props) => {
    const [initializing, setInitializing] = useState(true)

    const { theme, changeTheme } = useTheme()

    const { navigation } = props

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const [errUsername, setErrUsername] = useState('')
    const [errPassword, setErrPassword] = useState('')

    const [rememberChecked, setRememberChecked] = useState(false)
    const [textEntryChecked, setTextEntryChecked] = useState(true)

    useEffect(() => {
        const subscriber = auth().onAuthStateChanged(userState => {
            try {
                console.log('Firebase Auth: ', userState)
                if (userState) {
                    setInitializing(false)

                    LocalData.save({
                        key: 'loginStatus',
                        data: {
                            loginStatus: true
                        },
                    });
                    LocalData.save({
                        key: 'accountData',
                        data: {
                            account: userState
                        },
                    });
                    navigation.navigate('Menu', { account: account.data })

                } else {
                    console.log('Null user gg')
                }
            } catch (error) {
                console.log('Err gg login: ', error)
            }
        })
        return subscriber
    }, [])

    const handleLogin = async () => {
        if (username == '') {
            setErrUsername('Please enter username')
        }

        if (password == '') {
            setErrPassword('Please enter password')
        }

        if (username == '' || password == '') {
            return
        }

        if (emailValidation(username)) {
            try {
                const account = await axios.post(`http://10.0.2.2:3000/find-user-by-email`, { email: username })
                if (account.status === 201) {
                    if (account.data.password === password) {
                        if (rememberChecked === true) {
                            LocalData.save({
                                key: 'loginStatus',
                                data: {
                                    loginStatus: true
                                },
                            });
                            LocalData.save({
                                key: 'accountData',
                                data: {
                                    account: account.data
                                },
                            });
                            navigation.navigate('Menu', { account: account.data })
                        } else {
                            navigation.navigate('Menu', { account: account.data })
                        }
                    } else {
                        Alert.alert('Incorrect password')
                    }
                } else if (account.status === 200) {
                    Alert.alert('Email is not registered')
                } else {
                    Alert.alert('An error occurred, please try again')
                }
            } catch (error) {
                console.log(error)
            }
        } else {
            try {
                const account = await axios.post(`http://10.0.2.2:3000/find-user-by-username`, { username: username })
                if (account.status === 201) {
                    if (account.data.password === password) {
                        if (rememberChecked === true) {
                            LocalData.save({
                                key: 'loginStatus',
                                data: {
                                    loginStatus: true
                                },
                            });
                            LocalData.save({
                                key: 'accountData',
                                data: {
                                    account: account.data
                                },
                            });
                            navigation.navigate('Menu', { account: account.data })
                        } else {
                            navigation.navigate('Menu', { account: account.data })
                        }
                    } else {
                        Alert.alert('Incorrect password')
                    }
                } else if (account.status === 200) {
                    Alert.alert('Username does not exist')
                } else {
                    Alert.alert('An error occurred, please try again')
                }
            } catch (error) {
                console.log(error)
            }
        }
    }

    const handleGoToSignup = () => {
        navigation.replace('Signup')
    }
    return (
        <View style={{ flex: 1, backgroundColor: theme === 'light' ? '#f1f3f5' : '#171717' }}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <WelcomeBanner
                    style={{ flex: 1 }}
                    img={require('../images/WelcomeBanner/WelcomeBanner1.png')}
                    imageStyle={{ width: screenWidth, height: screenHeight * 0.38, resizeMode: 'center' }}
                >
                    <View style={{ alignItems: 'center', justifyContent: 'center', flexDirection: 'row', marginBottom: 20 }}>
                        <Text style={{ fontSize: 25, fontWeight: 'bold', color: '#ff7b3b', marginRight: 5 }}>SHOE</Text>
                        <Text style={{ fontSize: 25, fontWeight: 'bold', color: '#0097fb' }}>SHOP</Text>
                    </View>

                </WelcomeBanner>
                <Text style={{ color: theme === 'light' ? '#0097fb' : '#fff', fontWeight: 'bold', fontSize: 22, textAlign: 'center' }}>Login</Text>

                <Block title={'User name'} titleStyle={{ color: theme === 'light' ? '#000' : '#fff', fontSize: 14 }} viewStyle={{ marginHorizontal: 20, marginTop: 10 }}>
                    <View style={{
                        borderWidth: theme == 'light' ? 0 : 1, borderColor: '#fff',
                        borderRadius: 13, backgroundColor: theme === 'light' ? '#ffffff' : '#171717', marginTop: 2, paddingVertical: 2, paddingHorizontal: 10, justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center'
                    }}>
                        <AntDesign name='user' color={theme === 'light' ? '#000' : '#fff'} size={25} />
                        <CustomTextInput
                            onChangeText={text => {
                                setErrUsername('')
                                setUsername(text)
                            }}
                            value={username}
                            style={{ flex: 1, color: theme === 'light' ? '#000' : '#fff' }}
                            placeholder={'Username / Email'}
                            placeholderTextColor={theme === 'light' ? '#000' : '#fff'} />
                    </View>
                    {errUsername != '' &&
                        <Text style={{ color: 'red', marginTop: 3, fontSize: 11 }}>{errUsername}</Text>}
                </Block>
                <Block title={'Password'} titleStyle={{ color: theme === 'light' ? '#000' : '#fff', fontSize: 14 }} viewStyle={{ marginHorizontal: 20, marginTop: 10 }}>
                    <View style={{
                        borderWidth: theme == 'light' ? 0 : 1, borderColor: '#fff',
                        borderRadius: 13, backgroundColor: theme === 'light' ? '#ffffff' : '#171717', marginTop: 2, paddingVertical: 2, paddingHorizontal: 10, justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center'
                    }}>
                        <FontAwesome name='lock' color={theme === 'light' ? '#000' : '#fff'} size={25} style={{ marginHorizontal: 5 }} />
                        <CustomTextInput
                            onChangeText={text => {
                                setErrPassword('')
                                setPassword(text)
                            }}
                            value={password}
                            secureTextEntry={textEntryChecked}
                            style={{ flex: 1, color: theme === 'light' ? '#000' : '#fff' }}
                            placeholder={'Password'}
                            placeholderTextColor={theme === 'light' ? '#000' : '#fff'} />
                        <CustomButton
                            onPress={() => setTextEntryChecked(!textEntryChecked)}
                        >
                            <Ionicons name={textEntryChecked == true ? 'eye-outline' : 'eye-off-outline'} color={theme === 'light' ? '#000' : '#fff'} size={25} />
                        </CustomButton>
                    </View>
                    {errPassword != '' &&
                        <Text style={{ color: 'red', marginTop: 3, fontSize: 11 }}>{errPassword}</Text>}
                </Block>

                <View style={{ marginHorizontal: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 5 }}>
                        <CustomButton
                            onPress={() => setRememberChecked(!rememberChecked)}
                        >
                            <FontAwesome name={rememberChecked == true ? 'check-square-o' : 'square-o'} color={theme === 'light' ? '#000' : '#fff'} size={25} style={{ marginRight: 5 }} />
                        </CustomButton>
                        <Text style={{ color: theme === 'light' ? '#000' : '#fff', fontSize: 13 }}>Remember me</Text>
                    </View>

                    <CustomButton style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', marginTop: 5 }}>
                        <Text style={{ color: theme === 'light' ? '#000' : '#fff', fontSize: 13 }}>Forgot password?</Text>
                    </CustomButton>
                </View>

                <CustomButton
                    onPress={handleLogin}
                    style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 25, backgroundColor: theme === 'light' ? '#0097fb' : '#fff', marginHorizontal: 20, paddingVertical: 10, borderRadius: 20 }}>
                    <Text style={{ fontSize: 18, fontWeight: 'bold', color: theme === 'light' ? '#fff' : '#000' }}>Log in</Text>
                </CustomButton>

                <Block title={'Or login with'} titleStyle={{ color: theme === 'light' ? '#0097fb' : '#fff', fontSize: 13, fontWeight: 'bold', textAlign: 'center' }} viewStyle={{ marginTop: 20, justifyContent: 'center', alignItems: 'center' }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginVertical: 15 }}>
                        <CustomButton
                            onPress={onGoogleButtonPress}
                            style={{
                                justifyContent: 'center', alignItems: 'center', padding: 8, backgroundColor: '#ffffff', borderRadius: 50,
                                shadowColor: '#000', shadowOffset: { width: 0, height: 0, }, shadowOpacity: 0.3, shadowRadius: 5, elevation: 4
                            }}>
                            <Image style={{ width: 30, height: 30 }} source={require('../images/CustomButton/google.png')} />
                        </CustomButton>
                        <CustomButton style={{
                            justifyContent: 'center', alignItems: 'center', padding: 8, backgroundColor: '#ffffff', borderRadius: 50, marginHorizontal: 30,
                            shadowColor: '#000', shadowOffset: { width: 0, height: 0, }, shadowOpacity: 0.3, shadowRadius: 5, elevation: 4
                        }}>
                            <Image style={{ width: 30, height: 30 }} source={require('../images/CustomButton/facebook.png')} />
                        </CustomButton>
                        <CustomButton style={{
                            justifyContent: 'center', alignItems: 'center', padding: 8, backgroundColor: '#ffffff', borderRadius: 50,
                            shadowColor: '#000', shadowOffset: { width: 0, height: 0, }, shadowOpacity: 0.3, shadowRadius: 5, elevation: 4
                        }}>
                            <Image style={{ width: 30, height: 30 }} source={require('../images/CustomButton/appleD.png')} />
                        </CustomButton>
                    </View>

                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 10 }}>
                        <Text style={{ fontSize: 13, color: theme === 'light' ? '#9E9E9E' : '#ffffff' }}>Don't have an account?</Text>
                        <TouchableOpacity
                            onPress={handleGoToSignup}
                        >
                            <Text style={{ color: theme === 'light' ? '#0097fb' : '#fff', fontWeight: 'bold', fontSize: 13, marginLeft: 5 }}>Sign up</Text>
                        </TouchableOpacity>
                    </View>
                </Block>
            </ScrollView>
        </View>
    )
}

export default Login