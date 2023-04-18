import React from 'react'

import {Canvas, Path} from '@shopify/react-native-skia'

interface IPath {
	segments: string[]
	color?: string
}

interface Props {
	paths: any
}

const Editor: React.FC<Props> = ({paths}: Props) => {
	return (
		<Canvas style={{flex: 8}}>
			{paths.map((p: IPath, index: number) => (
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
