import React, { FC } from 'react'
import { FlatList } from 'react-native'
import { TagItem, TagItemProps } from '../../atoms/TagItem/TagItem.component'
import { styles } from './ListOfTagItems.style'

interface ListOfTagItemsProps {
	arrayOfTagItems: TagItemProps[]
}

const ListOfTagItems: FC<ListOfTagItemsProps> = ({ arrayOfTagItems }) => {
	const { cointaier } = styles()

	return (
		<FlatList
			data={arrayOfTagItems}
			contentContainerStyle={cointaier}
			renderItem={({ item, index }) => {
				return (
					<TagItem
						title={item.title}
						isActive={item.isActive}
						key={index}
						id={item.id}
					/>
				)
			}}
		/>
	)
}

export { ListOfTagItems }
