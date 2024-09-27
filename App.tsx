import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import VoiceCommandScreen from './src/screens/VoiceCommandScreen';  // Import your voice command screen
import ProfileScreen from './src/screens/ProfileScreen';  // Other screens in your app

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="VoiceCommand">
        {/* Set VoiceCommandScreen as the default screen */}
        <Stack.Screen name="VoiceCommand" component={VoiceCommandScreen} />

        {/* Other screens */}
        <Stack.Screen name="Profile" component={ProfileScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
