import React from 'react'

import {Animated, useWindowDimensions} from 'react-native'

import {
	Gesture,
	GestureDetector,
	GestureHandlerRootView,
} from 'react-native-gesture-handler'

import Draw from '../Draw'

interface Props {
	scale: Animated.AnimatedValue
	onStartPinch: any
	onUpdatePinch: any
	onEndPinch: any

	enablePan: boolean
	onStartPan: any
	onUpdatePan: any
	onEndPan: any
}

const GestureHandler: React.FC<Props> = ({
	scale,
	onStartPinch,
	onUpdatePinch,
	onEndPinch,

	enablePan,
	onStartPan,
	onUpdatePan,
	onEndPan,
}: Props) => {
	const pinchGesture = Gesture.Pinch()
		.onStart(onStartPinch)
		.onUpdate(onUpdatePinch)
		.onEnd(onEndPinch)

	const panGesture = Gesture.Pan()
		.onStart(onStartPan)
		.onUpdate(onUpdatePan)
		.onEnd(onEndPan)
		.enabled(enablePan)

	const gestures = Gesture.Simultaneous(panGesture, pinchGesture)

	return (
		<GestureHandlerRootView>
			<GestureDetector gesture={gestures}>
				<Animated.View
					style={{
						width: useWindowDimensions().width,
						height: (useWindowDimensions().height * 70) / 100,
						backgroundColor: '#fff',
						transform: [{scale: scale}],
					}}>
					<Draw />
				</Animated.View>
			</GestureDetector>
		</GestureHandlerRootView>
	)
}

export default GestureHandler
