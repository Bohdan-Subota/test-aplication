import React, { useEffect, useState } from 'react'
import { Text, View, AppState } from 'react-native'
import { useGlobalStore } from '../../store/GlobalStore'
import { useTagStore } from '../../store/TagStore'
import { ListOfTagItems } from '../../components/molecules'
import DateTimePicker, {
	DateTimePickerEvent,
} from '@react-native-community/datetimepicker'
import * as Notifications from 'expo-notifications'
import { CustomButton } from '../../components/atoms'

const HomeScreen = () => {
	const {
		user,
		date: dateString,
		setDate,
		removeUser,
		setIsLoggin,
		setIsFirstLaunch,
	} = useGlobalStore()
	const { Tags } = useTagStore()
	const [date, setDateState] = useState<Date | null>(
		dateString ? new Date(dateString) : null
	)

	useEffect(() => {
		setDateState(dateString ? new Date(dateString) : null)
	}, [dateString])

	useEffect(() => {
		async function requestNotificationPermission() {
			const { status } = await Notifications.requestPermissionsAsync()
			if (status !== 'granted') {
				alert('Permission to access notifications was denied!')
			}
		}
		requestNotificationPermission()
	}, [])

	const scheduleNotification = async () => {
		await Notifications.cancelAllScheduledNotificationsAsync()
		const filteredTags = Tags.filter(item => item.isActive !== false)
			.map(item => item.title)
			.join(', ')
		await Notifications.scheduleNotificationAsync({
			content: {
				title: 'Toggles',
				body: `Toggles ${filteredTags} are ON`,
			},
			trigger: {
				seconds: 600,
			},
		})
	}

	useEffect(() => {
		const subscription = AppState.addEventListener('change', nextAppState => {
			if (nextAppState === 'background') {
				scheduleNotification()
			}
		})
		return () => {
			subscription.remove()
		}
	}, [Tags])

	const onChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
		if (event.type === 'set' && selectedDate) {
			//@ts-ignore
			setDate(selectedDate)
		}
	}

	return (
		<View>
			<Text>Welcome {user?.username}</Text>
			<View>
				<ListOfTagItems arrayOfTagItems={Tags} />
			</View>

			<View>
				<DateTimePicker
					value={date || new Date()}
					display='default'
					onChange={onChange}
				/>
			</View>

			<Text>
				Selected Date: {date ? date.toLocaleDateString() : 'No date selected'}
			</Text>
			<CustomButton
				onPress={() => {
					removeUser(), setIsFirstLaunch(false), setIsLoggin(false)
				}}
			>
				Clear Store
			</CustomButton>
		</View>
	)
}

export { HomeScreen }
