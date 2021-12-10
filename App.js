import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Main from './components/Main';
import Show from './components/Show';
import AddMenu from './components/AddMenu';
import { LogBox } from 'react-native';
const Stack = createNativeStackNavigator();

LogBox.ignoreLogs(['Non-serializable ']);
export default function App() {

  return (
    <NavigationContainer >
      {/* {console.log(Font.isLoaded('myfont'), "font")} */}
      <Stack.Navigator>
        <Stack.Screen
          name='Main'
          component={Main}

          options={{
            headerShown: false,
          }}
        />

        < Stack.Screen
          name="Show"
          component={Show}
          options={{
            title: 'Lista budzików',
            headerStyle: {
              backgroundColor: '#8BC34A',
            },
            headerTintColor: '#ffffff',
            headerTitleStyle: {
              fontWeight: 'bold',
              fontSize: 12,
            },

          }} />
        <Stack.Screen
          name='AddMenu'
          component={AddMenu}
          options={{
            title: 'dodaj budzik',
            headerStyle: {
              backgroundColor: '#8BC34A',
            },
            headerTintColor: '#ffffff',
            headerTitleStyle: {
              fontWeight: 'bold',
              fontSize: 12,
            },

          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
