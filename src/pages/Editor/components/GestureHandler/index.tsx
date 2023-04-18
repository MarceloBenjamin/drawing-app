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

	paths: any
	enablePan: boolean
	onStartPan: any
	onUpdatePan: any
}

const GestureHandler: React.FC<Props> = ({
	scale,
	onStartPinch,
	onUpdatePinch,
	onEndPinch,

	paths,
	enablePan,
	onStartPan,
	onUpdatePan,
}: Props) => {
	const pinchGesture = Gesture.Pinch()
		.onStart(onStartPinch)
		.onUpdate(onUpdatePinch)
		.onEnd(onEndPinch)

	const panGesture = Gesture.Pan()
		.onStart(onStartPan)
		.onUpdate(onUpdatePan)
		.enabled(enablePan)

	const gestures = Gesture.Simultaneous(panGesture, pinchGesture)

	return (
		<GestureHandlerRootView>
			<GestureDetector gesture={gestures}>
				<Animated.View
					style={{
						width: useWindowDimensions().width,
						height: useWindowDimensions().height,
						backgroundColor: '#fff',
						transform: [{scale: scale}],
					}}>
					<Draw paths={paths} />
				</Animated.View>
			</GestureDetector>
		</GestureHandlerRootView>
	)
}

export default GestureHandler
