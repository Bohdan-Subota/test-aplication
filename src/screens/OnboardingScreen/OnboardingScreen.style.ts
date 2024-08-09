import { StyleSheet } from 'react-native'

interface stylesProps {
	width: number
}

export const styles = ({ width }: stylesProps) =>
	StyleSheet.create({
		slide: {
			alignItems: 'center',
		},
		carousel: {
			flexDirection: 'row',
			width: width * 3,
		},
		bottomSheetContainer: {
			padding: 12,
			gap: 4,
		},
	})
