import React from 'react'

import {Canvas, Path} from '@shopify/react-native-skia'

import {useRecoilValue} from 'recoil'

import {pathsValue} from '../../../../store'

interface IPath {
	segments: string[]
	color?: string
}

const Editor: React.FC = () => {
	const path = useRecoilValue(pathsValue)

	return (
		<Canvas style={{flex: 8}}>
			{path && path.map((p: IPath, index: number) => (
				<Path
					key={index}
					path={p.segments.join(' ')}
					strokeWidth={5}
					style="stroke"
					color={p.color}
				/>
			))}
		</Canvas>
	)
}

export default Editor
