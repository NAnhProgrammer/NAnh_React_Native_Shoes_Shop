import { View, ImageBackground } from 'react-native'
import React from 'react'

const index = ({ img, children, viewStyle, imageStyle }) => {
    return (
        <View style={viewStyle}>
            <ImageBackground
                source={img}
                style={imageStyle}
            >
                {children}
            </ImageBackground>
        </View>
    )
}

export default index