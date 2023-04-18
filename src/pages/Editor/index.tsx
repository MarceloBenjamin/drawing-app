import React, {useCallback, useState} from 'react'
import {Animated, SafeAreaView, useAnimatedValue} from 'react-native'

import {
	PanGestureHandlerEventPayload,
	PinchGestureHandlerEventPayload,
} from 'react-native-gesture-handler'

import { intervalToDuration } from 'date-fns'

import GestureHandler from './components/GestureHandler'


const Editor: React.FC = () => {
	const scale = useAnimatedValue(1)
	const [savedScale, setSavedValue] = useState(1)

	const [enablePan, setEnablePan] = useState(true)

	const [paths, setPaths] = useState<any>([])

	const onStartPinch = () => {
		setEnablePan(false)

		setTimeout(() => {
			if (paths.length > 0) {
				const dateValue = paths[paths.length - 1].date

				const actualDate = new Date()

				if (intervalToDuration({start: dateValue, end: actualDate}).minutes === 0) {

					if (actualDate.getTime() - new Date(dateValue).getTime() < 300) {
						const newPaths = [...paths]
						newPaths.pop()
						setPaths([...newPaths])
					}
				}
			}
		}, 100)
	}

	const onUpdatePinch = useCallback(
		(e: PinchGestureHandlerEventPayload) => {
			Animated.timing(scale, {
				duration: 1,
				toValue: savedScale * e.scale,
				useNativeDriver: true,
			}).start()
		},
		[savedScale],
	)

	const onEndPinch = (e: PinchGestureHandlerEventPayload) => {
		setSavedValue(e.scale)
		setEnablePan(true)
	}

	const onStartPan = useCallback((e: PanGestureHandlerEventPayload) => {
		setPaths((prevState: any) => {
			return [
				...prevState,
				{segments: [`M ${e.x} ${e.y}`], color: '#06d6a0', date: new Date()},
			]
		})
	}, [])

	const onUpdatePan = useCallback((e: PanGestureHandlerEventPayload) => {
		setPaths((prevState: any) => {
			const index = prevState.length - 1

			if (prevState?.[index]?.segments) {
				prevState[index].segments.push(`L ${e.x} ${e.y}`)
				return [...prevState]
			}

			return [...prevState]
		})
	}, [])

	return (
		<SafeAreaView style={{backgroundColor: '#e8e8e8'}}>
			<GestureHandler
				scale={scale}
				onStartPinch={onStartPinch}
				onUpdatePinch={onUpdatePinch}
				onEndPinch={onEndPinch}
				paths={paths}
				enablePan={enablePan}
				onStartPan={onStartPan}
				onUpdatePan={onUpdatePan}
			/>
		</SafeAreaView>
	)
}

export default Editor
