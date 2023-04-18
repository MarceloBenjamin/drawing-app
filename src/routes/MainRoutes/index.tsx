import React from 'react'

import {createNativeStackNavigator} from '@react-navigation/native-stack'

import Main from '../../pages/Main'

const {Navigator, Screen} = createNativeStackNavigator()

const MainRoutes: React.FC = () => {
	return (
		<Navigator>
			<Screen name="Main" component={Main} options={{headerShown: false}} />
		</Navigator>
	)
}

export default MainRoutes
