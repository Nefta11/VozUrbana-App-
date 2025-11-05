import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoaderScreen from '../Screens/landing/LoaderScreen';
import LandingScreen from '../Screens/landing/LandingScreen';
import LoginScreen from '../Screens/auth/LoginScreen';

const Stack = createNativeStackNavigator();

/**
 * AppStack - Navegación principal de la aplicación
 * Maneja el flujo de pantallas y transiciones usando React Navigation
 */
const AppStack = () => {

    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName="Loader"
                screenOptions={{
                    headerStyle: {
                        backgroundColor: '#4F46E5',
                    },
                    headerTintColor: '#fff',
                    headerTitleStyle: {
                        fontWeight: 'bold',
                    },
                    animation: 'fade',
                    animationDuration: 350,
                    gestureEnabled: true,
                    gestureDirection: 'horizontal',
                }}
            >
                <Stack.Screen
                    name="Loader"
                    options={{
                        headerShown: false,
                        animation: 'fade',
                        animationDuration: 300,
                        gestureEnabled: false,
                    }}
                >
                    {({ navigation }) => (
                        <LoaderScreen
                            onComplete={() => navigation.replace('Landing')}
                        />
                    )}
                </Stack.Screen>
                <Stack.Screen
                    name="Landing"
                    options={{
                        headerShown: false,
                        animation: 'fade',
                        animationDuration: 400,
                        gestureEnabled: false,
                    }}
                >
                    {({ navigation }) => (
                        <LandingScreen
                            animated={true}
                            onNavigateToLogin={() => navigation.navigate('Login')}
                        />
                    )}
                </Stack.Screen>
                <Stack.Screen
                    name="Login"
                    component={LoginScreen}
                    options={{
                        headerShown: false,
                        animation: 'slide_from_right',
                        animationDuration: 400,
                        gestureEnabled: true,
                        gestureDirection: 'horizontal',
                    }}
                />
                {/* Aquí se pueden agregar más pantallas en el futuro */}
                {/*
        <Stack.Screen
          name="Register"
          component={RegisterScreen}
          options={{
            headerShown: false,
            animation: 'slide_from_right',
            animationDuration: 400,
            gestureEnabled: true,
            gestureDirection: 'horizontal',
          }}
        />
        <Stack.Screen
          name="Home"
          component={TabNavigator}
          options={{
            headerShown: false,
            animation: 'fade',
            animationDuration: 350,
            gestureEnabled: false,
          }}
        />
        */}
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default AppStack;