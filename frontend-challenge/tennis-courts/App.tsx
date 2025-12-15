import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { CourtListScreen } from './src/screens/CourtListScreen';
import { CourtDetailScreen } from './src/screens/CourtDetailScreen';
import { RootStackParamList } from './src/types/Court';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="dark" />
      <Stack.Navigator
        initialRouteName="Courts"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#FFF',
          },
          headerTintColor: '#222',
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 18,
          },
          contentStyle: {
            backgroundColor: '#F8F9FA',
          },
        }}
      >
        <Stack.Screen
          name="Courts"
          component={CourtListScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="CourtDetail"
          component={CourtDetailScreen}
          options={{
            title: 'Court Details',
            headerBackTitle: 'Back',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
