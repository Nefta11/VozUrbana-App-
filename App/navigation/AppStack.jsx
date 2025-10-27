import React, { useState, useEffect } from 'react';
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
    const [isLoading, setIsLoading] = useState(true);

    // Componente wrapper para el LoaderScreen
    const LoaderWrapper = ({ navigation }) => {
        const handleLoaderComplete = () => {
            setIsLoading(false);
            navigation.replace('Landing');
        };

        return <LoaderScreen onComplete={handleLoaderComplete} />;
    };

    // Componente wrapper para el LandingScreen
    const LandingWrapper = ({ navigation }) => {
        const handleNavigateToLogin = () => {
            navigation.navigate('Login');
        };

        return <LandingScreen animated={true} onNavigateToLogin={handleNavigateToLogin} />;
    };

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
                    component={LoaderWrapper}
                    options={{
                        headerShown: false,
                        animation: 'fade',
                        animationDuration: 300,
                        gestureEnabled: false,
                    }}
                />
                <Stack.Screen
                    name="Landing"
                    component={LandingWrapper}
                    options={{
                        headerShown: false,
                        animation: 'fade',
                        animationDuration: 400,
                        gestureEnabled: false,
                    }}
                />
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

// Registro de pantallas disponibles
export const screens = {
    LOADER: 'Loader',
    LANDING: 'Landing',
    LOGIN: 'Login',
    // Aquí se pueden agregar más pantallas en el futuro
    // REGISTER: 'Register',
    // HOME: 'Home',
    // PROFILE: 'Profile',
};