import React, { FC } from 'react'
import { Switch, Text, View } from 'react-native'
import { styles } from './TagItem.style'
import { useTagStore } from '../../../store/TagStore'

export interface TagItemProps {
	id: number
	title: string
	isActive: boolean
}

const TagItem: FC<TagItemProps> = ({ title, isActive = false, id }) => {
	const { tagConatiner } = styles()
	const { setTag } = useTagStore()

	return (
		<View style={tagConatiner}>
			<Text>{title}</Text>
			<Switch value={isActive} onChange={() => setTag(id)} />
		</View>
	)
}

export { TagItem }
