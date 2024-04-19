import { TouchableOpacity } from 'react-native'
import React, { forwardRef } from 'react'

const index = forwardRef(({ children, style, onPress }, ref) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            ref={ref}
            style={style}
        >
            {children}
        </TouchableOpacity>
    )
}
)

export default index