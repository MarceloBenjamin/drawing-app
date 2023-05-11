import React, {memo} from 'react'

import {Path} from '@shopify/react-native-skia'

interface IPath {
	segments: string[]
	color?: string
	date: Date
	blend?: any
}

interface Props {
	path: any
}

const Temp: React.FC<Props> = ({path}: Props) => {
	return (
		<>
			{path.map((p: IPath, index: number) => (
				<Path
					key={`${p.segments.join(' ')}${index}`}
					path={p.segments.join(' ')}
					strokeWidth={5}
					style="stroke"
					blendMode={p.blend}
					color={p.color}
				/>
			))}
		</>
	)
}

export default memo(Temp)
