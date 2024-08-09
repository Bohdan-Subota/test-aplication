import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { AuthScreen, HomeScreen, OnboardingScreen } from '../screens'
import { useGlobalStore } from '../store/GlobalStore'

const AppRouter = () => {
	const Stack = createNativeStackNavigator()
	const { isFirstLaunch, isLoggin, user } = useGlobalStore()
	return (
		<NavigationContainer>
			<Stack.Navigator>
				{isFirstLaunch ? (
					<>
						{isLoggin && user ? (
							<Stack.Screen name='Home' component={HomeScreen} />
						) : (
							<Stack.Screen name='Auth' component={AuthScreen} />
						)}
					</>
				) : (
					<Stack.Screen name='Onboarding' component={OnboardingScreen} />
				)}
			</Stack.Navigator>
		</NavigationContainer>
	)
}

export { AppRouter }
