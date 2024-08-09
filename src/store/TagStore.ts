import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { TagItemProps } from '../components/atoms/TagItem/TagItem.component'

const mockItem: TagItemProps[] = [
	{ id: 1, isActive: false, title: 'tag 1' },
	{ id: 2, isActive: true, title: 'tag 2' },
	{ id: 3, isActive: false, title: 'tag 3' },
	{ id: 4, isActive: true, title: 'tag 4' },
	{ id: 5, isActive: false, title: 'tag 5' },
	{ id: 6, isActive: false, title: 'tag 6' },
	{ id: 7, isActive: false, title: 'tag 7' },
	{ id: 8, isActive: false, title: 'tag 8' },
	{ id: 9, isActive: false, title: 'tag 9' },
	{ id: 10, isActive: false, title: 'tag 10' },
]

interface TagStore {
	Tags: TagItemProps[]
	setTag: (id: number) => void
}

export const useTagStore = create<TagStore>()(
	persist(
		set => ({
			Tags: mockItem,
			setTag: id =>
				set(state => ({
					Tags: state.Tags.map(tag =>
						tag.id === id ? { ...tag, isActive: !tag.isActive } : tag
					),
				})),
		}),
		{
			name: 'tag-storage',
			storage: createJSONStorage(() => AsyncStorage),
		}
	)
)
