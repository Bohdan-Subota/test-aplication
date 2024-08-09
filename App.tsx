import 'react-native-reanimated'
import { StyleSheet } from 'react-native'
import { AppRouter } from './src/router/AppRouter'
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { useCallback, useEffect, useState } from 'react'
import * as SplashScreen from 'expo-splash-screen'

SplashScreen.preventAutoHideAsync()

export default function App() {
	const [appIsReady, setAppIsReady] = useState(false)

	useEffect(() => {
		async function prepare() {
			try {
				await new Promise(resolve => setTimeout(resolve, 2000))
			} catch (e) {
				console.warn(e)
			} finally {
				setAppIsReady(true)
				SplashScreen.hideAsync()
			}
		}
		prepare()
	}, [])

	return (
		<GestureHandlerRootView>
			<BottomSheetModalProvider>
				<AppRouter />
			</BottomSheetModalProvider>
		</GestureHandlerRootView>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
})
