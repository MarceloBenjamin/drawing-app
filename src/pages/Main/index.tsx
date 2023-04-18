import React from 'react'
import {SafeAreaView, Text, TouchableOpacity} from 'react-native'

import {useNavigation} from '@react-navigation/native'

const Main: React.FC = () => {
	const {navigate} = useNavigation()

	const handleNavigateToEditor = () => {
		navigate('EditorRoutes')
	}

	return (
		<SafeAreaView
			style={{
				flex: 1,
				alignContent: 'center',
				justifyContent: 'center',
			}}>
			<Text style={{color: '#000', alignSelf: 'center'}}>Main Screen</Text>

			<TouchableOpacity
				onPress={handleNavigateToEditor}
				style={{alignItems: 'center', marginTop: 10}}>
				<Text style={{color: '#000'}}>Ir para editor</Text>
			</TouchableOpacity>
		</SafeAreaView>
	)
}

export default Main
