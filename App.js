import * as React from 'react';
// import { View, Text } from 'react-native';
import { Dimensions, LogBox } from 'react-native';

LogBox.ignoreLogs(['Non-serializable ']);
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

import Main from './components/Main';
import Galery from './components/Galery';
import BigFoto from './components/BigFoto';
import Kamera from './components/Kamera';

// import { StatusBar } from 'expo-status-bar';

// import { StyleSheet, Text, View } from 'react-native';

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
          name="Galery"
          component={Galery}
          options={{
            title: 'Zdjecia zapisane w telefonie',
            headerStyle: {
              backgroundColor: '#8BC34A',
            },
            headerTintColor: '#ffffff',
            headerTitleStyle: {
              fontWeight: 'bold',
              fontSize: 12,
            },

          }} />

        < Stack.Screen
          name="BigFoto"
          component={BigFoto}
          options={{
            title: 'Wybrane zdjęcie',
            headerStyle: {
              backgroundColor: '#388E3C',
              // height: 30
            },
            headerTintColor: '#ffffff',
            headerTitleStyle: {
              fontWeight: 'bold',
              fontSize: 24,
            },

          }} />
        < Stack.Screen
          name="Kamera"
          component={Kamera}
          options={{
            title: 'Kamera',
            headerStyle: {
              backgroundColor: '#8BC34A',
              // height: Dimensions.get('screen').height / 1
              // height: 30
            },
            headerTintColor: '#ffffff',
            headerTitleStyle: {
              fontWeight: 'bold',
              fontSize: 24,
            },

          }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

