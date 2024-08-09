import React, { FC } from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import { TextInput, TextInputProps } from 'react-native'
import { styles } from './TextField.style'

interface TextFieldProps extends TextInputProps {
	name?: string
	isControled?: boolean
}

const TextField: FC<TextFieldProps> = ({
	isControled = false,
	name = '',
	...props
}) => {
	const { textField } = styles()

	if (isControled) {
		const { control } = useFormContext()
		return (
			<Controller
				control={control}
				name={name}
				render={({ field: { onChange, value } }) => (
					<TextInput
						onChangeText={onChange}
						value={value}
						{...props}
						style={[textField, props.style]}
					/>
				)}
			/>
		)
	}
	return <TextInput {...props} style={[textField, props.style]} />
}

export { TextField }
