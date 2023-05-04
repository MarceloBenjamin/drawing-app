import React, {useCallback, useState} from 'react'
import {Animated, Button, SafeAreaView, useAnimatedValue} from 'react-native'

import {
	PanGestureHandlerEventPayload,
	PinchGestureHandlerEventPayload,
} from 'react-native-gesture-handler'

import {intervalToDuration} from 'date-fns'

import {useRecoilState} from 'recoil'
import {pathsAtom, tempPathsAtom} from '../../store'

import GestureHandler from './components/GestureHandler'

const Editor: React.FC = () => {
	const [pathsState, setPathsState] = useRecoilState(pathsAtom)
	const [tempPathsState, setTempPathsState] = useRecoilState(tempPathsAtom)

	const scale = useAnimatedValue(1)
	const [savedScale, setSavedValue] = useState(1)

	const [enablePan, setEnablePan] = useState(true)

	const [erase, setErase] = useState(false)

	const onStartPinch = () => {
		setEnablePan(false)

		setTimeout(() => {
			if (tempPathsState.length > 0) {
				const dateValue = tempPathsState[tempPathsState.length - 1]?.date || new Date()

				const actualDate = new Date()

				if (
					intervalToDuration({start: new Date(dateValue), end: actualDate})
						.minutes === 0
				) {
					if (actualDate.getTime() - new Date(dateValue).getTime() < 300) {
						const newPaths = JSON.parse(JSON.stringify(tempPathsState))
						newPaths.pop()
						setTempPathsState([...newPaths])
					}
				}
			}
		}, 50)
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

	const onStartPan = useCallback(
		(e: PanGestureHandlerEventPayload) => {
			setTempPathsState((prevState: any) => {
				return [
					...prevState,
					{
						segments: [`M ${e.x} ${e.y}`],
						color: '#06d6a0',
						date: new Date(),
						blend: erase ? 'clear' : undefined,
					},
				]
			})
		},
		[erase],
	)

	const onUpdatePan = useCallback(
		(e: PanGestureHandlerEventPayload) => {
			setTempPathsState((prevState: any) => {
				const index = prevState.length - 1

				const newState = JSON.parse(JSON.stringify(prevState))

				if (newState?.[index]?.segments) {
					newState[index].segments.push(`L ${e.x} ${e.y}`)
					return [...newState]
				}

				return [...newState]
			})
		},
		[],
	)

	const onEndPan = useCallback(() => {
		setPathsState((prevState: any) => {
			return [...prevState, ...tempPathsState]
		})

		setTempPathsState([])
	}, [tempPathsState])

	const handleErase = () => {
		setErase(prevState => !prevState)
	}

	return (
		<SafeAreaView style={{backgroundColor: '#e8e8e8'}}>
			<GestureHandler
				scale={scale}
				onStartPinch={onStartPinch}
				onUpdatePinch={onUpdatePinch}
				onEndPinch={onEndPinch}
				enablePan={enablePan}
				onStartPan={onStartPan}
				onUpdatePan={onUpdatePan}
				onEndPan={onEndPan}
			/>

			<Button title="Eraser" onPress={handleErase} />
		</SafeAreaView>
	)
}

export default Editor
