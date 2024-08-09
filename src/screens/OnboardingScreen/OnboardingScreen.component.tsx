import { BottomSheetModal, BottomSheetView } from '@gorhom/bottom-sheet'
import React, { useEffect, useRef, useState } from 'react'
import { Dimensions, View } from 'react-native'
import Animated, {
	useAnimatedStyle,
	useSharedValue,
	withSpring,
} from 'react-native-reanimated'
import { listOfTabs } from '../../constants'
import { useGlobalStore } from '../../store/GlobalStore'
import { CustomButton, Indicator } from '../../components/atoms'
import { FirstStep, LastStep, SecondStep } from './components'
import { styles } from './OnboardingScreen.style'

const { width } = Dimensions.get('window')

const OnboardingScreen = () => {
	const [currentIndex, setCurrentIndex] = useState(0)

	const { setIsFirstLaunch } = useGlobalStore()
	const bottomSheetRef = useRef<BottomSheetModal>(null)
	const translateX = useSharedValue(0)
	const { slide, carousel, bottomSheetContainer } = styles({ width })

	const animatedStyle = useAnimatedStyle(() => {
		return {
			transform: [{ translateX: translateX.value }],
		}
	})
	const handleNext = () => {
		if (currentIndex < listOfTabs.length - 1) {
			setCurrentIndex(currentIndex + 1)
			translateX.value = withSpring(-(currentIndex + 1) * width, {
				damping: 15,
				stiffness: 90,
				mass: 0.5,
			})
		} else {
			setIsFirstLaunch(true)
		}
	}

	useEffect(() => {
		bottomSheetRef.current?.present()
	}, [])

	return (
		<View>
			<View>
				<Animated.View style={[carousel, animatedStyle]}>
					{listOfTabs.map((_, index) => (
						<View key={index} style={[slide, { width }]}>
							{index === 0 && <FirstStep />}
							{index === 1 && <SecondStep />}
							{index === 2 && <LastStep />}
						</View>
					))}
				</Animated.View>
			</View>
			<BottomSheetModal
				ref={bottomSheetRef}
				snapPoints={['20%']}
				enableOverDrag={false}
				enablePanDownToClose={false}
			>
				<BottomSheetView>
					<View style={bottomSheetContainer}>
						<Indicator array={listOfTabs} currentStep={currentIndex} />
						<CustomButton onPress={handleNext}>Next</CustomButton>
					</View>
				</BottomSheetView>
			</BottomSheetModal>
		</View>
	)
}

export { OnboardingScreen }
