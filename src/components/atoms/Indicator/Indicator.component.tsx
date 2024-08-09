import React, { FC } from 'react'
import { StyleSheet, View } from 'react-native'
import { styles } from './Indicator.style'

interface IndicatorProps {
	array: {}[]
	currentStep: number
}

const Indicator: FC<IndicatorProps> = ({ array, currentStep }) => {
	const { indicator, indicatorContainer } = styles()

	return (
		<View style={indicatorContainer}>
			{array.map((_, index) => (
				<View
					key={index}
					style={[
						indicator,
						{
							backgroundColor: currentStep === index ? 'black' : 'grey',
						},
					]}
				></View>
			))}
		</View>
	)
}
export { Indicator }
