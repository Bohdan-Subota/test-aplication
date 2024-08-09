import React, { FC } from 'react'
import { Text, TouchableOpacity, TouchableOpacityProps } from 'react-native'
import { styles } from './CustomButton.style'

interface CustomButtonProps extends TouchableOpacityProps {}

const CustomButton: FC<CustomButtonProps> = ({ children, ...props }) => {
	const { button, buttonTitle } = styles()
	return (
		<TouchableOpacity {...props} style={[button, props.style]}>
			<Text style={buttonTitle}>{children}</Text>
		</TouchableOpacity>
	)
}

export { CustomButton }
