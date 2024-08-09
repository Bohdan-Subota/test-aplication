import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import AsyncStorage from '@react-native-async-storage/async-storage'

interface GlobalStore {
	date: string | null
	setDate: (newValue: string) => void
	isFirstLaunch: boolean
	setIsFirstLaunch: (newValue: boolean) => void
	user: {
		username: string
	} | null
	setUser: (newValue: string) => void
	isLoggin: boolean
	setIsLoggin: (newValue: boolean) => void
	removeUser: () => void
}

export const useGlobalStore = create<GlobalStore>()(
	persist(
		set => ({
			date: new Date().toISOString(),
			isFirstLaunch: false,
			isLoggin: false,
			user: null,
			setIsFirstLaunch: newValue => set(() => ({ isFirstLaunch: newValue })),
			setIsLoggin: newVelue => set(() => ({ isLoggin: newVelue })),
			setUser: newVelue => set(() => ({ user: { username: newVelue } })),
			removeUser: () => {
				set(() => ({ user: null }))
			},
			setDate: newVelue => set(() => ({ date: newVelue })),
		}),

		{
			name: 'global-storage',
			storage: createJSONStorage(() => AsyncStorage),
		}
	)
)
