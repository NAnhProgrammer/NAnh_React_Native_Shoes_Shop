import { View, Text, Button, Modal, TextInput, Alert } from 'react-native'
import React, { useState } from 'react'

const index = ({ visible, onClose, onSubmit, setVerificationCode }) => {
    const [code, setCode] = useState('')
    const handleConfirm = () => {

        if (code == '') {
            Alert.alert('Please enter verification code')
            return
        }
        setVerificationCode(code)
        // Gửi mã xác nhận lên server
        onSubmit();
        // Đóng modal
        onClose();
    };

    return (
        <Modal
            visible={visible}
            animationType="slide"
            transparent={true}
        >
            <View style={{ flex: 1, justifyContent: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
                <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 10, margin: 20 }}>
                    <Text style={{ fontSize: 18, marginBottom: 10 }}>Nhập mã xác nhận</Text>
                    <TextInput
                        style={{ borderWidth: 1, borderColor: 'gray', padding: 10, marginBottom: 10 }}
                        placeholder="Mã xác nhận"
                        onChangeText={text => setCode(text)}
                    />
                    <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                        <Button title="Hủy" onPress={onClose} />
                        <Button title="Xác nhận" onPress={handleConfirm} />
                    </View>
                </View>
            </View>
        </Modal>
    );
}

export default index
