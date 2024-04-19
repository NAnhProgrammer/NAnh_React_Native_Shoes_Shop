import { View, Text, TextInput } from 'react-native'
import React from 'react'

const index = (props) => {
    return (
        <TextInput {...props} style={props.style} placeholderTextColor={props.placeholderTextColor || "blue"} />
    )
}

export default index