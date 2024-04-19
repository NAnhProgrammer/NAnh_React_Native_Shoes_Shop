import { View, Text, Dimensions, Image, TextInput, ScrollView, TouchableOpacity, Modal, Button, Alert } from 'react-native'
import React, { useState } from 'react'
import WelcomeBanner from '../components/WelcomeBanner'
import CustomButton from '../components/CustomButton'
import CustomTextInput from '../components/CustomTextInput'
import Block from '../components/Block'
import AntDesign from 'react-native-vector-icons/AntDesign'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Ionicons from 'react-native-vector-icons/Ionicons'

import emailValidation from '../functions/emailValidation'
import generateRandomVerificationCode from '../functions/generateRandomVerificationCode'
import generateRandomId from '../functions/generateRandomId'

import axios from 'axios'

import { useTheme } from '../components/Theme/MyTheme'

const Signup = (props) => {
    const { width: screenWidth, height: screenHeight } = Dimensions.get('window')

    const { navigation } = props

    const { theme, changeTheme } = useTheme()

    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const [errUsername, setErrUsername] = useState('')
    const [errEmail, setErrEmail] = useState('')
    const [errPassword, setErrPassword] = useState('')

    const [textEntryChecked, setTextEntryChecked] = useState(true)

    const [modalVisible, setModalVisible] = useState(false)
    const [verificationCode, setVerificationCode] = useState('')
    const [verificationCodeConfirm, setVerificationCodeConfirm] = useState('')

    const handleSingup = async () => {

        let checkUsername = false
        let checkEmail = false
        let checkPassword = false

        if (username == '') {
            setErrUsername('Please enter username')
            checkPassword = true
        }

        if (email == '') {
            setErrEmail('Please enter email')
            checkEmail = true
        }

        if (emailValidation(email) == false) {
            setErrEmail('Invalid email')
            checkEmail = true
        }

        if (password == '') {
            setErrPassword('Please enter password')
            checkPassword = true
        }

        if (password.length < 8) {
            setErrPassword('Password must be longer than 7 characters')
            checkPassword = true
        }

        if (checkUsername == true || checkEmail == true || checkPassword == true) {
            return
        }

        try {
            const usernameRespo = await axios.post(`http://10.0.2.2:3000/find-user-by-username`, { username: username })
            if (usernameRespo.status === 201) {
                setErrUsername('Username already exists')
                checkUsername = true
            }

            const emailRespo = await axios.post(`http://10.0.2.2:3000/find-user-by-email`, { email: email })
            if (emailRespo.status === 201) {
                setErrEmail('Email is already in use')
                checkEmail = true
            }
        } catch (error) {
            console.log(error)
        }

        if (checkUsername == true || checkEmail == true) {
            return
        }

        const code = generateRandomVerificationCode()
        const sendCode = await axios.post(`http://10.0.2.2:3000/send-email`, {
            to: email,
            subject: 'Verification Code',
            text: `Your Registration Code Is ${code}`
        })

        if (sendCode.status == 200) {
            setVerificationCode(code)
            setModalVisible(true)
        }
    }

    const handleGoToLogin = () => {
        navigation.replace('Login')
    }
    return (
        <View style={{ flex: 1, backgroundColor: theme === 'light' ? '#f1f3f5' : '#171717' }}>

            <Modal
                visible={modalVisible}
                animationType="slide"
                transparent={true}
            >
                <View style={{ flex: 1, justifyContent: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
                    <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 10, margin: 20 }}>
                        <Text style={{ fontSize: 15, marginBottom: 10 }}>The system has sent a confirmation code to your email</Text>
                        <Text style={{ fontSize: 15, marginBottom: 10 }}>Please check your email to receive the confirmation code</Text>
                        <TextInput
                            style={{ borderWidth: 1, borderColor: 'gray', padding: 10, marginBottom: 10 }}
                            placeholder="Verification code"
                            onChangeText={text => setVerificationCodeConfirm(text)}
                        />
                        <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                            <Button title="Cancel" onPress={() => setModalVisible(false)} />
                            <Button title="Sumit" onPress={async () => {
                                if (verificationCodeConfirm == '') {
                                    Alert.alert('Please enter verification code')
                                    return
                                }
                                if (verificationCodeConfirm == verificationCode) {

                                    const user = {
                                        id: generateRandomId('US'),
                                        username: username,
                                        password: password,
                                        email: email,
                                        fullname: `Costumer${generateRandomVerificationCode()}`,
                                        avatar: 'https://icons.veryicon.com/png/o/internet--web/prejudice/user-128.png',
                                        phone: '',
                                        address: '',
                                        status: true
                                    }
                                    try {
                                        const response = await axios.post(`http://10.0.2.2:3000/add-user`, user)
                                        if (response.status == 200) {
                                            Alert.alert('Registration successful')
                                            setUsername('')
                                            setEmail('')
                                            setPassword('')
                                            setVerificationCode('')
                                            setVerificationCodeConfirm('')
                                            setModalVisible(false)
                                        }
                                    } catch (error) {
                                        console.log(error)
                                    }

                                } else {
                                    Alert.alert('Incorrect verification code')
                                    setVerificationCode('')
                                    setVerificationCodeConfirm('')
                                    setModalVisible(false)
                                }
                            }} />
                        </View>
                    </View>
                </View>
            </Modal>

            <ScrollView showsVerticalScrollIndicator={false}>

                <WelcomeBanner
                    style={{ flex: 1 }}
                    img={require('../images/WelcomeBanner/WelcomeBanner1.png')}
                    imageStyle={{ width: screenWidth, height: screenHeight * 0.33, resizeMode: 'center' }}
                >
                    <View style={{ alignItems: 'center', justifyContent: 'center', flexDirection: 'row', marginBottom: 20 }}>
                        <Text style={{ fontSize: 25, fontWeight: 'bold', color: '#ff7b3b', marginRight: 5 }}>SHOE</Text>
                        <Text style={{ fontSize: 25, fontWeight: 'bold', color: '#0097fb' }}>SHOP</Text>
                    </View>

                </WelcomeBanner>
                <Text style={{ color: theme === 'light' ? '#0097fb' : '#fff', fontWeight: 'bold', fontSize: 22, textAlign: 'center' }}>Sign up</Text>

                <Block title={'User name'} titleStyle={{ color: theme === 'light' ? '#000' : '#fff', fontSize: 14 }} viewStyle={{ marginHorizontal: 20, marginTop: 5 }}>
                    <View>
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
                                style={{ flex: 1, color: theme === 'light' ? '#000' : '#fff' }}
                                placeholder={'Username'}
                                value={username}
                                placeholderTextColor={theme === 'light' ? '#000' : '#fff'} />
                        </View>
                        {errUsername != '' &&
                            <Text style={{ color: 'red', marginTop: 3, fontSize: 11 }}>{errUsername}</Text>}
                    </View>
                </Block>

                <Block title={'Email'} titleStyle={{ color: theme === 'light' ? '#000' : '#fff', fontSize: 14 }} viewStyle={{ marginHorizontal: 20, marginTop: 5 }}>
                    <View>
                        <View style={{
                            borderWidth: theme == 'light' ? 0 : 1, borderColor: '#fff',
                            borderRadius: 13, backgroundColor: theme === 'light' ? '#ffffff' : '#171717', marginTop: 2, paddingVertical: 2, paddingHorizontal: 10, justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center'
                        }}>
                            <AntDesign name='mail' color={theme === 'light' ? '#000' : '#fff'} size={25} />
                            <CustomTextInput
                                onChangeText={text => {
                                    setErrEmail('')
                                    setEmail(text)
                                }}
                                value={email}
                                style={{ flex: 1, color: theme === 'light' ? '#000' : '#fff' }}
                                placeholder={'Email'}
                                placeholderTextColor={theme === 'light' ? '#000' : '#fff'} />
                        </View>
                        {errEmail != '' &&
                            <Text style={{ color: 'red', marginTop: 3, fontSize: 11 }}>{errEmail}</Text>}
                    </View>
                </Block>

                <Block title={'Password'} titleStyle={{ color: theme === 'light' ? '#000' : '#fff', fontSize: 14 }} viewStyle={{ marginHorizontal: 20, marginTop: 5 }}>
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

                <CustomButton
                    onPress={handleSingup}
                    style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 25, backgroundColor: theme === 'light' ? '#0097fb' : '#fff', marginHorizontal: 20, paddingVertical: 10, borderRadius: 20 }}>
                    <Text style={{ color: '#000000', fontSize: 18, fontWeight: 'bold', color: theme === 'light' ? '#fff' : '#000' }}>Sign up</Text>
                </CustomButton>

                <Block title={'Or signup with'} titleStyle={{ color: theme === 'light' ? '#0097fb' : '#fff', fontSize: 13, fontWeight: 'bold', textAlign: 'center' }} viewStyle={{ marginTop: 20, justifyContent: 'center', alignItems: 'center' }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginVertical: 15 }}>
                        <CustomButton style={{
                            justifyContent: 'center', alignItems: 'center', padding: 8, backgroundColor: '#ffffff', borderRadius: 60,
                            shadowColor: '#000', shadowOffset: { width: 0, height: 0, }, shadowOpacity: 0.3, shadowRadius: 5, elevation: 4
                        }}>
                            <Image style={{ width: 30, height: 30 }} source={require('../images/CustomButton/google.png')} />
                        </CustomButton>
                        <CustomButton style={{
                            justifyContent: 'center', alignItems: 'center', padding: 8, backgroundColor: '#ffffff', borderRadius: 60, marginHorizontal: 30,
                            shadowColor: '#000', shadowOffset: { width: 0, height: 0, }, shadowOpacity: 0.3, shadowRadius: 5, elevation: 4
                        }}>
                            <Image style={{ width: 30, height: 30 }} source={require('../images/CustomButton/facebook.png')} />
                        </CustomButton>
                        <CustomButton style={{
                            justifyContent: 'center', alignItems: 'center', padding: 8, backgroundColor: '#ffffff', borderRadius: 60,
                            shadowColor: '#000', shadowOffset: { width: 0, height: 0, }, shadowOpacity: 0.3, shadowRadius: 5, elevation: 4
                        }}>
                            <Image style={{ width: 30, height: 30 }} source={require('../images/CustomButton/appleD.png')} />
                        </CustomButton>
                    </View>

                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 10 }}>
                        <Text style={{ fontSize: 14, color: theme === 'light' ? '#9E9E9E' : '#F5F5F5' }}>Already have an account?</Text>
                        <TouchableOpacity
                            onPress={handleGoToLogin}
                        >
                            <Text style={{ color: theme === 'light' ? '#0097fb' : '#fff', fontWeight: 'bold', fontSize: 14, marginLeft: 5 }}>Log in</Text>
                        </TouchableOpacity>
                    </View>
                </Block>

            </ScrollView>
        </View>
    )
}

export default Signup

