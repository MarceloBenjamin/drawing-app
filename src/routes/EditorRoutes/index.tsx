import React from 'react'

import {createNativeStackNavigator} from '@react-navigation/native-stack'

import Editor from '../../pages/Editor'

const {Navigator, Screen} = createNativeStackNavigator()

const MainRoutes: React.FC = () => {
	return (
		<Navigator>
			<Screen name="Editor" component={Editor} options={{headerShown: false}} />
		</Navigator>
	)
}

export default MainRoutes
