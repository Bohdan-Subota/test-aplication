import { StyleSheet } from 'react-native'

export const styles = () =>
	StyleSheet.create({
		indicatorContainer: {
			flexDirection: 'row',
			justifyContent: 'center',
			gap: 8,
			marginBottom: 16,
		},
		indicator: {
			width: 8,
			height: 8,
			borderRadius: 100,
		},
	})
