import React, { useEffect } from 'react'
import { TouchableOpacity, View } from 'react-native'
import { useGlobalStore } from '../../store/GlobalStore'
import { FormProvider, useForm } from 'react-hook-form'
import { CustomButton, TextField } from '../../components/atoms'
import MockAdapter from 'axios-mock-adapter'
import axios from 'axios'
import { loginUser } from '../../services/loginService'
import {
	GoogleSignin,
	GoogleSigninButton,
} from '@react-native-google-signin/google-signin'

interface loginValues {
	userName: string
	password: string
}

const AuthScreen = () => {
	const configureGoogleSignIn = () => {
		GoogleSignin.configure({
			iosClientId:
				'557401731562-lms0h4laks83v74i8ei6hveuqfali4ca.apps.googleusercontent.com',
		})
	}
	useEffect(() => {
		configureGoogleSignIn()
	})
	const googleSignIn = async () => {
		try {
			await GoogleSignin.hasPlayServices()
			const userInfo = await GoogleSignin.signIn()
			if (userInfo.user) {
				setUser(userInfo.user.name as string)
				setIsLoggin(true)
			}
		} catch (e) {}
	}
	const mock = new MockAdapter(axios)
	const { setIsFirstLaunch, setIsLoggin, setUser } = useGlobalStore()
	const methods = useForm<loginValues>({
		defaultValues: {
			userName: '',
			password: '',
		},
	})
	mock.onPost('/api/login').reply(config => {
		const { username, password } = JSON.parse(config.data)
		if (username === 'admin' && password === 'password123') {
			return [200, { success: true, message: 'Login successful' }]
		} else {
			return [401, { success: false, message: 'Invalid credentials' }]
		}
	})

	const handleOnSubmit = async (data: loginValues) => {
		try {
			const result = await loginUser(data.userName, data.password)
			if (result.success) {
				setIsLoggin(true)
				setUser(data.userName)
			}
		} catch (error: any) {
			console.log(error.response.data)
		}
	}
	return (
		<View>
			<FormProvider {...methods}>
				<TextField name='userName' isControled />
				<TextField name='password' isControled />
			</FormProvider>
			<CustomButton onPress={methods.handleSubmit(handleOnSubmit)}>
				Log In
			</CustomButton>
			<GoogleSigninButton onPress={googleSignIn} />
			<TouchableOpacity
				onPress={() => setIsFirstLaunch(false)}
			></TouchableOpacity>
		</View>
	)
}

export { AuthScreen }
