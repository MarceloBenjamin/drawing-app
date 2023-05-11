import React, {memo} from 'react'

import {Canvas} from '@shopify/react-native-skia'

import {useRecoilValue} from 'recoil'

import Actual from './components/Actual'
import Temp from './components/Temp'

import {pathsAtom, tempPathsAtom} from '../../../../store'

const Editor: React.FC = () => {
	const path = useRecoilValue(pathsAtom)
	const tempPaths = useRecoilValue(tempPathsAtom)

	return (
		<Canvas style={{flex: 8}}>
			<Actual path={path} />

			<Temp path={tempPaths} />
		</Canvas>
	)
}

export default memo(Editor)
