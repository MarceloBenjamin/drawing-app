import React from 'react'
import {NavigationContainer} from '@react-navigation/native'
import {createNativeStackNavigator} from '@react-navigation/native-stack'

import MainRoutes from './MainRoutes'
import EditorRoutes from './EditorRoutes'

const {Navigator, Screen} = createNativeStackNavigator()

const routes: React.FC = () => {
	return (
		<NavigationContainer>
			<Navigator initialRouteName="MainRoutes">
				<Screen
					name="MainRoutes"
					component={MainRoutes}
					options={{headerShown: false}}
				/>
				<Screen
					name="EditorRoutes"
					component={EditorRoutes}
					options={{headerShown: false}}
				/>
			</Navigator>
		</NavigationContainer>
	)
}

export default routes
