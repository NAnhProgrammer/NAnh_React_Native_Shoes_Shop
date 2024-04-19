import { View, Text } from 'react-native'
import React from 'react'

const index = ({ title, titleStyle, viewStyle, children }) => {
    return (
        <View style={viewStyle}>
            <Text style={titleStyle}>{title}</Text>
            {children}
        </View>
    )
}

export default index