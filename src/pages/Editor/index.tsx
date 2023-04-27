import React, {useCallback, useEffect, useState} from 'react'
import {
	Animated,
	Button,
	SafeAreaView,
	useAnimatedValue,
} from 'react-native'

import {
	PanGestureHandlerEventPayload,
	PinchGestureHandlerEventPayload,
} from 'react-native-gesture-handler'

import {intervalToDuration} from 'date-fns'

import {useRecoilState} from 'recoil'
import {pathsValue} from '../../store'

import GestureHandler from './components/GestureHandler'

const Editor: React.FC = () => {
	const [pathsState, setPathsState] = useRecoilState(pathsValue)

	const scale = useAnimatedValue(1)
	const [savedScale, setSavedValue] = useState(1)

	const [enablePan, setEnablePan] = useState(true)

	const [erase, setErase] = useState(false)

	const [erasePath, setErasePath] = useState<any>([])

	const onStartPinch = () => {
		setEnablePan(false)

		setTimeout(() => {
			if (pathsState.length > 0) {
				const dateValue = pathsState[pathsState.length - 1].date

				const actualDate = new Date()

				if (
					intervalToDuration({start: new Date(dateValue), end: actualDate})
						.minutes === 0
				) {
					if (actualDate.getTime() - new Date(dateValue).getTime() < 300) {
						const newPaths = JSON.parse(JSON.stringify(pathsState))
						newPaths.pop()
						setPathsState([...newPaths])
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

	const onStartPan = useCallback(
		(e: PanGestureHandlerEventPayload) => {
			if (!erase) {
				setPathsState((prevState: any) => {
					return [
						...prevState,
						{segments: [`M ${e.x} ${e.y}`], color: '#06d6a0', date: new Date()},
					]
				})
			}

			if (erase) {
				setErasePath([[e.x, e.y]])
			}
		},
		[erase],
	)

	const onUpdatePan = useCallback(
		(e: PanGestureHandlerEventPayload) => {
			if (erase) {
				setErasePath((prevState: any) => {
					let newState: any = []

					if (prevState.length < 5) {
						newState = [...prevState, [e.x, e.y]]
					} else {
						newState = [prevState.slice(-5), [e.x, e.y]]
					}

					return [...newState]
				})
			} else {
				setPathsState((prevState: any) => {
					const index = prevState.length - 1

					const newState = JSON.parse(JSON.stringify(prevState))

					if (newState?.[index]?.segments) {
						newState[index].segments.push(`L ${e.x} ${e.y}`)
						return [...newState]
					}

					return [...newState]
				})
			}
		},
		[erase],
	)

	const handleErase = () => {
		setErase(prevState => !prevState)
	}

	const isBetween = useCallback((num: number, min: number, max: number) => {
		return num >= Math.min(min, max) && num <= Math.max(min, max)
	}, [])

	const handleEraseTool = useCallback((actualErase: any) => {
		setPathsState(prevState => {
			const newPaths: any = []

			const actualArray = prevState.map((item: any) => {
				let cutIndex = -1

				item.segments.forEach((segment: string, index: number) => {
					const segmentItem = segment.split(' ')

					if (
						actualErase &&
						isBetween(
							Number(segmentItem[1]),
							actualErase[actualErase.length - 1][0],
							actualErase[actualErase.length - 4][0],
						) &&
						isBetween(
							Number(segmentItem[2]),
							actualErase[actualErase.length - 1][1],
							actualErase[actualErase.length - 4][1],
						)
					) {
						cutIndex = index
					}
				})

				if (cutIndex !== -1) {
					if (cutIndex === 0) {
						item.segments.shift()

						if (item?.segments?.length > 0) {
							item.segments[0].replace('L', 'M')
						}
					} else if (cutIndex === item?.segments?.length - 1) {
						item?.segments?.pop()
					} else {
						let newArr = JSON.parse(JSON.stringify(item.segments))

						newArr = newArr.slice(cutIndex)

						newArr[0] = newArr[0].replace('L', 'M')

						newPaths.push({...item, date: new Date(), segments: newArr})

						item.segments = item.segments.slice(0, cutIndex - 1)
					}
				}

				return item
			})

			if (newPaths.length > 0) {
				return [...actualArray, ...newPaths]
			}

			return actualArray
		})
	}, [])

	useEffect(() => {
		if (erasePath.length > 4) {
			handleEraseTool(erasePath)
		}
	}, [erasePath])

	const onEndPan = useCallback(() => {
		setErasePath([])
	}, [])

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
